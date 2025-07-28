// components/global/LoadingOverlay.tsx
'use client';

import { createContext, useContext, useState } from 'react';

const LoadingContext = createContext({
  show: () => {},
  hide: () => {},
  isLoading: false,
});

export const useLoadingOverlay = () => useContext(LoadingContext);

export function LoadingOverlayProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  const show = () => setIsLoading(true);
  const hide = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ show, hide, isLoading }}>
      {children}
      {isLoading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </LoadingContext.Provider>
  );
}
