'use client';

import { LANDING_PAGE, LOCAL_STORAGE_PARTNER_INFO } from '@kigo-top/constants';
import {
  DEFAULT_BRANDING,
  useAuthentication,
  useBranding,
  useSession,
} from '@kigo-top/providers';
import {
  refreshAccessToken,
  refreshAccountAccessToken,
} from '@kigo-top/services/client';
import { ProgramPartnerInfo } from '@kigo-top/services/core';
import { Box, CircularProgress } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';

export default function SdkWrapper() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { setShowLogin } = useAuthentication();
  const fullPath = useMemo(() => {
    const cleanPath = pathname.replace('/app', '') || '/home';
    const params = searchParams.toString();
    return params ? `${cleanPath}?${params}` : cleanPath;
  }, [pathname, searchParams]);
  const {
    sessionToken,
    setSessionToken,
    sessionRefreshToken,
    setSessionRefreshToken,
    anonymousToken,
    accessToken,
    refreshToken,
    setAccessToken,
  } = useSession();
  const [refreshingSession, setRefreshingSession] = useState(false);
  const previousFullPath = useRef(fullPath);
  const hasSessionToken = useMemo(
    () => (sessionToken ? true : anonymousToken ? true : false),
    [sessionToken, anonymousToken]
  );
  const [partnerInfo] = useLocalStorage<ProgramPartnerInfo | null>(
    LOCAL_STORAGE_PARTNER_INFO,
    null
  );

  const {
    branding,
    isLoading: isBrandingLoading,
    showCashBackOffers,
  } = useBranding();

  const [isClient, setIsClient] = useState(false);
  const [kigoOnReadyFunctionDefined, setKigoOnReadyFunctionDefined] =
    useState(false);

  const kigoPresentAndWindowDefined =
    typeof window !== 'undefined' && window.Kigo;

  useEffect(() => {
    async function handleSessionExpired() {
      setIsClient(true);
      if (!hasSessionToken && !sessionRefreshToken) {
        router.push('/session-expired');
      }

      if (!sessionToken && sessionRefreshToken) {
        setRefreshingSession(true);
        const response = await refreshAccessToken({
          refresh_token: sessionRefreshToken,
        });
        const { token, refresh_token } = response;
        setSessionToken(token);
        setSessionRefreshToken(refresh_token);

        if (kigoOnReadyFunctionDefined) {
          window.Kigo.setAuthorizationToken(token);
        }
        setRefreshingSession(false);
      }
      if (!accessToken && refreshToken) {
        setRefreshingSession(true);
        const token = await refreshAccountAccessToken({
          refresh_token: refreshToken,
        });
        setAccessToken(token);
        setRefreshingSession(false);
      }
    }

    void handleSessionExpired();
  }, [
    router,
    sessionToken,
    sessionRefreshToken,
    refreshToken,
    accessToken,
    kigoOnReadyFunctionDefined,
    setSessionToken,
    setSessionRefreshToken,
    anonymousToken,
    setAccessToken,
    hasSessionToken,
  ]);

  useEffect(() => {
    if (
      hasSessionToken &&
      kigoPresentAndWindowDefined &&
      kigoOnReadyFunctionDefined &&
      previousFullPath.current !== fullPath
    ) {
      previousFullPath.current = fullPath;

      // notify the sdk of the pathname change
      if (window.Kigo?.onPathnameChange) {
        const pathNameWithoutApp = fullPath.replace(LANDING_PAGE, '');
        window.Kigo.onPathnameChange(pathNameWithoutApp);
      }
    }
  }, [
    fullPath,
    hasSessionToken,
    kigoPresentAndWindowDefined,
    kigoOnReadyFunctionDefined,
  ]);

  useEffect(() => {
    if (
      refreshingSession ||
      !isClient ||
      !hasSessionToken ||
      !kigoPresentAndWindowDefined ||
      isBrandingLoading
    ) {
      return;
    }

    // tslint:disable-next-line
    window.Kigo.onReady = function (kigo: typeof window.Kigo) {
      kigo.initialEntries = [fullPath];
      // Set the authorization token without the extra if check
      kigo.setAuthorizationToken(sessionToken || anonymousToken || '');
      kigo.onAuthorizationError = function (error: unknown) {
        console.error('Authorization error:', error);
      };
      kigo.refreshAuthorizationToken = async () => {
        if (sessionRefreshToken) {
          const response = await refreshAccessToken({
            refresh_token: sessionRefreshToken,
          });
          const { token, refresh_token: newRefreshToken } = response;
          setSessionToken(token);
          setSessionRefreshToken(newRefreshToken);
          window.Kigo.setAuthorizationToken(token);
          return token;
        } else if (!isAuthenticated && anonymousToken) {
          window.Kigo.setAuthorizationToken(anonymousToken);
          return anonymousToken;
        }
        return null;
      };
      // sync the sdk navigation with the next.js router
      kigo.onNavigationChange = function (to: string) {
        if (to && typeof to === 'string') {
          router.push(`${LANDING_PAGE}/${to}`);
        }
      };
      const isAuthenticated = Boolean(sessionToken);
      kigo.isAnonymousSession = !isAuthenticated && Boolean(anonymousToken);
      kigo.openLoginModal = () => setShowLogin(true);
      kigo.showCashBackOffers = showCashBackOffers ?? false;

      kigo.setContext({
        theme: {
          palette: {
            primary: branding?.color_primary ?? DEFAULT_BRANDING.color_primary,
            secondary:
              branding?.color_secondary ?? DEFAULT_BRANDING.color_secondary,
          },
        },
        components: {
          Header: {
            defaultProps: {
              backgroundColor: 'white',
              logo: branding?.logo ?? 'logo',
            },
          },
        },
        provider: {
          externalProgramId: branding?.external_program_id ?? '',
          programId: branding?.program_id ?? '',
          programName: branding?.program_name ?? '',
          partnerId: partnerInfo?.partner_id ?? '',
        },
      });
    };

    setKigoOnReadyFunctionDefined(true);
  }, [
    router,
    isClient,
    kigoPresentAndWindowDefined,
    fullPath,
    sessionToken,
    branding,
    isBrandingLoading,
    setShowLogin,
    showCashBackOffers,
    refreshToken,
    accessToken,
    sessionRefreshToken,
    refreshingSession,
    setSessionToken,
    setSessionRefreshToken,
    anonymousToken,
    hasSessionToken,
    partnerInfo,
  ]);

  const KigoTopSdkElement = useMemo(() => {
    // @ts-expect-error -- Custom element is not recognized
    return <kigo-top-sdk />;
  }, []);

  if (!isClient) {
    return null;
  }

  if (
    !branding ||
    !kigoPresentAndWindowDefined ||
    !kigoOnReadyFunctionDefined
  ) {
    return (
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100vw',
          height: '100%',
          minHeight: '100vh',
          position: 'relative',
          backgroundColor: 'white',
        }}
      >
        <Header />
        <Box sx={{ flex: 1 }}>{KigoTopSdkElement}</Box>
        <Footer />
      </Box>
    );
  }
}
