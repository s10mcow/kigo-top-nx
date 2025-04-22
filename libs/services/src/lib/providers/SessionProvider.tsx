'use client';
import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_DURATION_MINUTES,
  ANONYMOUS_TOKEN,
  ANONYMOUS_TOKEN_DURATION_MINUTES,
  CASH_BACK_PARTNER,
  LOCAL_STORAGE_EXTERNAL_PROGRAM_ID,
  LOCAL_STORAGE_IS_SSO_SESSION,
  REFRESH_TOKEN,
  REFRESH_TOKEN_DURATION_MINUTES,
  SESSION_REFRESH_TOKEN,
  SESSION_REFRESH_TOKEN_DURATION_MINUTES,
  SESSION_TOKEN,
  SESSION_TOKEN_DURATION_MINUTES,
} from '@kigo-top/constants';

import { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import {
  fetchBrandingByExternalProgramId,
  fetchSessionBranding,
} from '../services/client-index';

import { useBranding } from './BrandingProvider';
import { clearAuthTokens, getCookie, setClientCookie } from './cookies';

const SessionContext = createContext<{
  sessionToken: string | undefined;
  anonymousToken: string | undefined;
  sessionRefreshToken: string | undefined;
  accessToken: string | undefined;
  refreshToken: string | undefined;
  isSsoSession: boolean;
  setSessionToken: (sessionToken: string) => void;
  setAnonymousToken: (anonymousToken: string) => void;
  setSessionRefreshToken: (sessionRefreshToken: string) => void;
  setIsSsoSession: (isSsoSession: boolean) => void;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  clearSession: () => void;
}>({
  sessionToken: '',
  anonymousToken: '',
  sessionRefreshToken: '',
  accessToken: '',
  refreshToken: '',
  isSsoSession: false,
  setSessionToken: () => console.warn('SessionProvider not initialized'),
  setAnonymousToken: () => console.warn('SessionProvider not initialized'),
  setSessionRefreshToken: () => console.warn('SessionProvider not initialized'),
  setIsSsoSession: () => console.warn('SessionProvider not initialized'),
  setAccessToken: () => console.warn('SessionProvider not initialized'),
  setRefreshToken: () => console.warn('SessionProvider not initialized'),
  clearSession: () => console.warn('SessionProvider not initialized'),
});

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { branding, setBranding, setIsLoading, setShowCashBackOffers } =
    useBranding();
  const [isSet, setIsSet] = useState(false);
  const [externalProgramId] = useLocalStorage(
    LOCAL_STORAGE_EXTERNAL_PROGRAM_ID,
    ''
  );
  const [isSSOLocalStorageSession] = useLocalStorage(
    LOCAL_STORAGE_IS_SSO_SESSION,
    false
  );
  const [sessionToken, setSessionToken] = useState(getCookie(SESSION_TOKEN));

  const [anonymousToken, setAnonymousToken] = useState(
    getCookie(ANONYMOUS_TOKEN)
  );
  const [sessionRefreshToken, setSessionRefreshToken] = useState(
    getCookie(SESSION_REFRESH_TOKEN)
  );
  const [accessToken, setAccessToken] = useState(getCookie(ACCESS_TOKEN));
  const [refreshToken, setRefreshToken] = useState(getCookie(REFRESH_TOKEN));

  const [isSsoSession, setIsSsoSession] = useState(isSSOLocalStorageSession);

  useEffect(() => {
    const fetchSession = async () => {
      setIsLoading(true);
      if (
        sessionToken &&
        branding?.program_name === 'Default branding' &&
        externalProgramId &&
        !isSet
      ) {
        const res = await fetchSessionBranding(externalProgramId);
        setBranding(res.branding);
        setShowCashBackOffers(
          res.partnerInfo.partner_name === CASH_BACK_PARTNER
        );
        setIsLoading(false);
        setIsSet(true);
      } else if (
        anonymousToken &&
        branding?.program_name === 'Default branding' &&
        externalProgramId &&
        !isSet
      ) {
        const res = await fetchBrandingByExternalProgramId(externalProgramId);
        setShowCashBackOffers(
          res.partnerInfo.partner_name === CASH_BACK_PARTNER
        );
        setBranding(res.programBrandingInfo);
        setIsLoading(false);
        setIsSet(true);
      }
      setIsLoading(false);
    };

    fetchSession();
  }, [
    sessionToken,
    anonymousToken,
    externalProgramId,
    setBranding,
    branding,
    setIsLoading,
    setShowCashBackOffers,
    isSet,
    isSsoSession,
  ]);

  return (
    <SessionContext.Provider
      value={{
        setSessionToken: (sessionToken: string) => {
          setSessionToken(sessionToken);
          setClientCookie(
            SESSION_TOKEN,
            sessionToken,
            SESSION_TOKEN_DURATION_MINUTES
          );
        },
        setAnonymousToken: (anonymousToken: string) => {
          setAnonymousToken(anonymousToken);
          setClientCookie(
            ANONYMOUS_TOKEN,
            anonymousToken,
            ANONYMOUS_TOKEN_DURATION_MINUTES
          );
        },
        setIsSsoSession: (isSsoSession: boolean) => {
          setIsSsoSession(isSsoSession);
        },
        setSessionRefreshToken: (sessionRefreshToken: string) => {
          setSessionRefreshToken(sessionRefreshToken);
          setClientCookie(
            SESSION_REFRESH_TOKEN,
            sessionRefreshToken,
            SESSION_REFRESH_TOKEN_DURATION_MINUTES
          );
        },
        setAccessToken: (accessToken: string) => {
          setAccessToken(accessToken);
          setClientCookie(
            ACCESS_TOKEN,
            accessToken,
            ACCESS_TOKEN_DURATION_MINUTES
          );
        },
        setRefreshToken: (refreshToken: string) => {
          setRefreshToken(refreshToken);
          setClientCookie(
            REFRESH_TOKEN,
            refreshToken,
            REFRESH_TOKEN_DURATION_MINUTES
          );
        },
        clearSession: () => {
          clearAuthTokens();
          setSessionToken('');
          setAnonymousToken('');
          setSessionRefreshToken('');
          setAccessToken('');
          setRefreshToken('');
          setIsSsoSession(false);
        },
        sessionToken,
        anonymousToken,
        sessionRefreshToken,
        accessToken,
        refreshToken,
        isSsoSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
