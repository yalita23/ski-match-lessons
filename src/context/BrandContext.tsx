import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type Brand = 'selector' | 'ski' | 'bike';

interface BrandCtx {
  brand: Brand;
  setBrand: (b: Brand) => void;
}

const BrandContext = createContext<BrandCtx>({ brand: 'selector', setBrand: () => {} });

export function BrandProvider({ children }: { children: ReactNode }) {
  const [brand, setBrandState] = useState<Brand>(() => {
    const saved = localStorage.getItem('sml-brand') as Brand;
    return saved === 'ski' || saved === 'bike' ? saved : 'selector';
  });

  const setBrand = (b: Brand) => {
    if (b !== 'selector') localStorage.setItem('sml-brand', b);
    else localStorage.removeItem('sml-brand');
    setBrandState(b);
  };

  return (
    <BrandContext.Provider value={{ brand, setBrand }}>
      {children}
    </BrandContext.Provider>
  );
}

export const useBrand = () => useContext(BrandContext);
