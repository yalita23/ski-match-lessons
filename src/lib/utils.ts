export type Currency = 'USD' | 'ARS' | 'EUR' | 'GBP' | 'CAD' | 'BRL';

const RATES: Record<Currency, number> = {
  USD: 1,
  ARS: 1050,
  EUR: 0.92,
  GBP: 0.79,
  CAD: 1.36,
  BRL: 5.05,
};

const SYMBOLS: Record<Currency, string> = {
  USD: '$',
  ARS: '$',
  EUR: '€',
  GBP: '£',
  CAD: 'CA$',
  BRL: 'R$',
};

export function convertCurrency(usdAmount: number, currency: Currency): string {
  const converted = usdAmount * RATES[currency];
  const symbol = SYMBOLS[currency];
  if (currency === 'ARS') {
    return `${symbol}${Math.round(converted).toLocaleString('es-AR')} ARS`;
  }
  if (currency === 'BRL') {
    return `${symbol} ${converted.toFixed(2).replace('.', ',')}`;
  }
  return `${symbol}${converted.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export const CURRENCY_OPTIONS: { value: Currency; label: string }[] = [
  { value: 'USD', label: 'USD 🇺🇸' },
  { value: 'EUR', label: 'EUR 🇪🇺' },
  { value: 'GBP', label: 'GBP 🇬🇧' },
  { value: 'ARS', label: 'ARS 🇦🇷' },
  { value: 'CAD', label: 'CAD 🇨🇦' },
  { value: 'BRL', label: 'BRL 🇧🇷' },
];

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function savePreference(key: string, value: string) {
  try { localStorage.setItem(`skimatch_${key}`, value); } catch {}
}

export function getPreference(key: string): string | null {
  try { return localStorage.getItem(`skimatch_${key}`); } catch { return null; }
}
