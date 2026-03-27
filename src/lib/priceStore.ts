export interface Service {
  id: string;
  name: string;
  namePl: string;
  pricePerM2: number;
}

const DEFAULT_SERVICES: Service[] = [
  { id: 'sanding', name: 'Sanding', namePl: 'Cyklinowanie', pricePerM2: 35 },
  { id: 'lacquering', name: 'Lacquering', namePl: 'Lakierowanie', pricePerM2: 25 },
  { id: 'oiling', name: 'Oiling', namePl: 'Olejowanie', pricePerM2: 30 },
  { id: 'filling', name: 'Filling gaps', namePl: 'Uzupełnianie ubytków', pricePerM2: 20 },
  { id: 'skirting', name: 'Skirting board installation', namePl: 'Montaż listew przypodłogowych', pricePerM2: 15 },
];

const STORAGE_KEY = 'renoparkiet_prices';

export function getServices(): Service[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return DEFAULT_SERVICES;
}

export function saveServices(services: Service[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
}
