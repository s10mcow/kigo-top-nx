'use client';
import { LANDING_PAGE } from '@kigo-top/constants';
import { useCustomRouter } from '@kigo-top/hooks';
import {
  getAccount,
  GetAccountResponse,
  logOut,
  refreshAccountAccessToken,
} from '@kigo-top/services/client';
import { kigoQueryClient } from '@kigo-top/utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createContext, useContext, useEffect, useState } from 'react';
import { useSession } from './SessionProvider';

const AuthenticationContext = createContext<{
  showLogin: boolean;
  setShowLogin: (showLogin: boolean) => void;
  user: GetAccountResponse | null;
  signOut: () => Promise<void>;
  isLoading: boolean;
  refetch: () => void;
  error: Error | null;
}>({
  showLogin: false,
  setShowLogin: () => {},
  user: null,
  signOut: () => Promise.resolve(),
  isLoading: false,
  refetch: () => {},
  error: null,
});

export const AuthenticationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { accessToken, refreshToken, setAccessToken, clearSession } =
    useSession();

  const router = useCustomRouter();
  const [showLogin, setShowLogin] = useState(false);
  const {
    data: user,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ['account'],
    queryFn: getAccount,
    enabled: Boolean(accessToken),
  });

  useEffect(() => {
    async function refreshAccessToken() {
      if (refreshToken && !accessToken) {
        const token = await refreshAccountAccessToken({
          refresh_token: refreshToken,
        });
        setAccessToken(token);
      }
    }
    refreshAccessToken();
  }, [refreshToken, setAccessToken, accessToken]);

  const { mutateAsync: signOut } = useMutation({
    mutationFn: async () => {
      if (refreshToken) {
        try {
          await logOut({ refresh_token: refreshToken });
        } catch (error) {
          console.error('Error logging out:', error);
        }
      }

      clearSession();
      kigoQueryClient.clear();
      router.replace(LANDING_PAGE);
    },
  });

  return (
    <AuthenticationContext.Provider
      value={{
        showLogin,
        setShowLogin,
        user: user ?? null,
        isLoading,
        refetch,
        error,
        signOut,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = () => {
  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error(
      'useAuthentication must be used within a AuthenticationProvider'
    );
  }
  return context;
};
