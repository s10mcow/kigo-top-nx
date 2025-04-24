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
