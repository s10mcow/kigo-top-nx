'use client';

// import { ProgramBrandingInfo } from '@kigo-top/services/server';
import { ThemeProvider } from '@mui/material';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { createAppTheme } from '../theme/theme';
type ProgramBrandingInfo = {
  color_primary: string;
  color_secondary: string;
  program_name: string;
};
// Define context type
interface BrandingContextType {
  branding?: ProgramBrandingInfo | null;
  setBranding: (branding: ProgramBrandingInfo) => void;
  showCashBackOffers?: boolean;
  setShowCashBackOffers: (showCashBackOffers: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const DEFAULT_BRANDING = {
  color_primary: '#4B55FD',
  color_secondary: '#CCFFFE',
  program_name: 'Default branding',
};

const BrandingContext = createContext<BrandingContextType>({
  branding: DEFAULT_BRANDING as ProgramBrandingInfo,
  setBranding: () => console.warn('BrandingProvider not initialized'),
  showCashBackOffers: false,
  setShowCashBackOffers: () => console.warn('BrandingProvider not initialized'),
  isLoading: true,
  setIsLoading: () => console.warn('BrandingProvider not initialized'),
});

export const BrandingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [branding, setBranding] = useState<ProgramBrandingInfo>(
    DEFAULT_BRANDING as ProgramBrandingInfo
  );
  const [showCashBackOffers, setShowCashBackOffers] = useState(false);

  const theme = useMemo(() => {
    return createAppTheme({
      palette: {
        primary: { main: branding?.color_primary || '#4B55FD' },
        secondary: { main: branding?.color_secondary || '#CCFFFE' },
      },
      typography: { fontFamily: 'Inter, sans-serif' },
    });
  }, [branding]);

  return (
    <BrandingContext.Provider
      value={{
        branding,
        setBranding: (brandingData: ProgramBrandingInfo) => {
          setBranding(brandingData);
        },
        showCashBackOffers,
        setShowCashBackOffers,
        isLoading,
        setIsLoading: (isLoading: boolean) => {
          setIsLoading(isLoading);
        },
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </BrandingContext.Provider>
  );
};

export const useBranding = () => {
  const context = useContext(BrandingContext);
  if (!context) {
    throw new Error(
      'useBrandingContext must be used within a BrandingContextProvider'
    );
  }
  return context;
};
