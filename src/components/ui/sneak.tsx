"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface SneakProps {
  text?: string;
}

export const Sneak = ({ text = "RenoParkiet" }: SneakProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneInitialized = useRef(false);

  useEffect(() => {
    if (!containerRef.current || sceneInitialized.current) return;
    sceneInitialized.current = true;

    const container = containerRef.current;

    // === Scene Setup ===
    const scene = new THREE.Scene();
    let aspect = container.clientWidth / container.clientHeight;
    const cameraDistance = 3.5;

    const camera = new THREE.OrthographicCamera(
      -cameraDistance * aspect,
      cameraDistance * aspect,
      cameraDistance,
      -cameraDistance,
      0.01,
      1000
    );
    camera.position.set(0, -10, 4);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // Background matches site: hsl(0, 0%, 3%) = #080808
    scene.background = new THREE.Color(0x080808);

    // === Utility: Create Text Texture ===
    function createTextTexture(displayText: string): Promise<THREE.CanvasTexture> {
      // Primary color: hsl(38, 92%, 50%) ≈ #F5A623
      const textColor = '#F5A623';
      const bgColor = '#080808';

      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="2048" height="512">
          <rect width="2048" height="512" fill="${bgColor}"/>
          <text x="1024" y="300" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="200" font-weight="800" letter-spacing="8" fill="${textColor}">${displayText}</text>
        </svg>
      `;

      const img = new Image();
      const svgBlob = new Blob([svg], { type: "image/svg+xml" });
      const url = URL.createObjectURL(svgBlob);

      return new Promise((resolve) => {
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = 2048;
          canvas.height = 512;
          const ctx = canvas.getContext("2d")!;
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          ctx.drawImage(img, 0, 0);
          const texture = new THREE.CanvasTexture(canvas);
          texture.generateMipmaps = false;
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.wrapS = THREE.ClampToEdgeWrapping;
          texture.wrapT = THREE.ClampToEdgeWrapping;
          URL.revokeObjectURL(url);
          resolve(texture);
        };
        img.src = url;
      });
    }

    // === Shader Material ===
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: null },
        uDisplacement: { value: new THREE.Vector3(1000, 1000, 1000) },
      },
      vertexShader: `
        varying vec2 vUv;
        uniform vec3 uDisplacement;

        float easeInOutCubic(float x) {
          return x < 0.5 ? 4. * x * x * x : 1. - pow(-2. * x + 2., 3.) / 2.;
        }

        float map(float value, float min1, float max1, float min2, float max2) {
          return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
        }

        void main() {
          vUv = uv;
          vec3 new_position = position;

          vec4 localPosition = vec4(position, 1.);
          vec4 worldPosition = modelMatrix * localPosition;

          float dist = length(uDisplacement - worldPosition.xyz);
          float min_distance = 3.;

          if (dist < min_distance) {
            float distance_mapped = map(dist, 0., min_distance, 1., 0.);
            float val = easeInOutCubic(distance_mapped) * 1.;
            new_position.z += val;
          }

          gl_Position = projectionMatrix * modelViewMatrix * vec4(new_position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D uTexture;
        void main() {
          vec4 color = texture2D(uTexture, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = vec4(color.rgb, 1.0);
        }
      `,
      transparent: true,
      depthWrite: false,
      side: THREE.FrontSide,
    });

    createTextTexture(text).then((texture) => {
      shaderMaterial.uniforms.uTexture.value = texture;
    });

    // === Main text plane ===
    const geometry = new THREE.PlaneGeometry(15, 15, 100, 100);
    const plane = new THREE.Mesh(geometry, shaderMaterial);
    plane.rotation.z = Math.PI / 4;
    scene.add(plane);

    // === Mouse interaction ===
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    function onPointerMove(event: PointerEvent) {
      const bounds = container.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObject(plane);

      if (intersects.length > 0) {
        shaderMaterial.uniforms.uDisplacement.value.copy(intersects[0].point);
      }
    }

    // === Resize handling ===
    function onWindowResize() {
      if (!container) return;
      aspect = container.clientWidth / container.clientHeight;
      camera.left = -cameraDistance * aspect;
      camera.right = cameraDistance * aspect;
      camera.top = cameraDistance;
      camera.bottom = -cameraDistance;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("resize", onWindowResize);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      sceneInitialized.current = false;
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onWindowResize);
      if (container?.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      shaderMaterial.dispose();
      renderer.dispose();
    };
  }, [text]);

  return <div ref={containerRef} className="w-full h-full" />;
};
