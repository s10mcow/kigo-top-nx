export type KigoContext = {
  theme?: { palette: { primary: string; secondary: string } };
  locale?: { merchantProductLabel: { singular: string; plural: string } };
  components?: {
    Header: { defaultProps: { backgroundColor: string; logo: string } };
    Landing?: { defaultProps: { backgroundImage: string } };
  };
  user: { name?: string; accountId?: string };
  programCampaign: {
    id?: string;
    programId?: string;
    partnerId?: string;
    startDate?: string;
    endDate?: string;
    campaignName?: string;
  };
  provider: {
    partnerId?: string;
    programId?: string;
    externalProgramId?: string;
    programName?: string;
  };
};

// Augment the global Window interface
declare global {
  interface Window {
    Kigo: {
      isReady: boolean;
      showCashBackOffers: boolean;
      isAnonymousSession: boolean;
      initialEntries: string[];
      setUser: (user: { name: string }) => void;
      setAuthorizationToken: (token: string) => void;
      onAuthorizationError: (error: unknown) => void;
      setContext: (context: Partial<KigoContext>) => void;
      onReady: (kigo: typeof window.Kigo) => void;
      onPathnameChange?: (pathname: string) => void;
      onNavigationChange: (to: string) => void;
      openLoginModal: () => void;
      refreshAuthorizationToken: () => Promise<string | null>;
    };
  }
}
