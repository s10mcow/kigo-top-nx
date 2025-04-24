'use client';

import { ANONYMOUS_TOKEN, AuthProvider } from '@kigo-top/constants';
import { useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';

import {
  AccountLogInResponse,
  AppleOAuthResponse,
  createVerificationEmail,
  signInWithApple,
  SignInWithAppleRequest,
  signInWithEmailAndPassword,
  signInWithGoogle,
  signUpWithEmailAndPassword,
} from '@kigo-top/services/client';
import { deleteClientCookie } from '@kigo-top/utils';
import { useSession } from './SessionProvider';

type AuthResponseError = { error_code: string; error_message: string };

type AuthResponseState = {
  isError: boolean;
  error?: AuthResponseError;
  provider?: AuthProvider;
  response?: AccountLogInResponse;
  isNonOAuthError?: boolean;
};

export const useOAuth = ({
  externalProgramId,
}: {
  externalProgramId: string;
}) => {
  const [authResponse, setAuthResponse] = useState<AuthResponseState>({
    isError: false,
    isNonOAuthError: false,
  });
  const {
    setRefreshToken,
    setAccessToken,
    setSessionToken,
    setSessionRefreshToken,
  } = useSession();

  const handleGoogleSignIn = useGoogleLogin({
    onNonOAuthError: () => {
      setAuthResponse((prev) => {
        return { ...prev, isNonOAuthError: true };
      });
    },
    onSuccess: async (response) => {
      try {
        const data = await signInWithGoogle({
          access_token: response.access_token,
        });

        if (!data) {
          throw new Error('Failed to sign in with Google');
        }

        await setAuthCookies(data);
        setAuthResponse((prev) => {
          return {
            ...prev,
            provider: AuthProvider.Google,
            response: data,
            isError: false,
            isNonOAuthError: false,
          };
        });
      } catch (error) {
        console.error(error);
        setAuthResponse((prev) => {
          return { ...prev, provider: AuthProvider.Google, isError: true };
        });
      }
    },
    onError: () => {
      setAuthResponse((prev) => {
        return { ...prev, provider: AuthProvider.Google, isError: true };
      });
    },
  });

  const handleAppleError = (errorFn: () => void) => {
    setAuthResponse((prev) => {
      return { ...prev, provider: AuthProvider.Apple, isError: true };
    });
    errorFn();
  };

  const handleAppleSignIn = async (appleInfo: AppleOAuthResponse) => {
    const request: SignInWithAppleRequest = {
      email: appleInfo.user?.email,
      id_token: appleInfo.authorization.id_token,
      first_name: appleInfo.user?.name?.firstName,
      last_name: appleInfo.user?.name?.lastName,
    };

    try {
      const data = await signInWithApple(request);
      await setAuthCookies(data);
      setAuthResponse((prev) => {
        return {
          ...prev,
          provider: AuthProvider.Apple,
          response: data,
          isError: false,
        };
      });
    } catch (error) {
      console.error(error);
      setAuthResponse((prev) => {
        return { ...prev, provider: AuthProvider.Apple, isError: true };
      });
    }
  };

  const handleEmailAndPasswordSignIn = async (
    email: string,
    password: string
  ) => {
    try {
      const data = await signInWithEmailAndPassword({ email, password });
      await setAuthCookies(data);

      setAuthResponse((prev) => {
        return { ...prev, provider: undefined, isError: false, response: data };
      });
    } catch (error) {
      console.error(error);
      setAuthResponse((prev) => {
        return {
          ...prev,
          provider: undefined,
          isError: true,
          error: error as AuthResponseError,
        };
      });
    }
  };

  const handleEmailAndPasswordSignUp = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    externalProgramId: string
  ) => {
    setAuthResponse((prev) => {
      return { ...prev, provider: undefined, isError: false };
    });
    try {
      const data = await signUpWithEmailAndPassword({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        external_program_id: externalProgramId,
      });
      await setAuthCookies(data);

      await createVerificationEmail();
      setAuthResponse((prev) => {
        return { ...prev, provider: undefined, isError: false, response: data };
      });
    } catch (error) {
      console.error(error);
      setAuthResponse((prev) => {
        return { ...prev, provider: undefined, isError: true };
      });
    }
  };

  const setAuthCookies = async (data: AccountLogInResponse) => {
    setAccessToken(data.access_token);
    setRefreshToken(data.refresh_token);
    // Create session token and set that cookie
    try {
      // what this api do
      // 1. It gets the accounts profile
      // - /accounts
      // 2. Creates an anonymous session to fetch the program partner info
      // - /anonymous-sessions
      // 3. Fetch the program partner info with anonymous session
      // - /api/v1/programs/{external_program_id}/partner
      // 4. Create the partner api session token
      // - /api/v1/auth/sessions
      // 5. Create the Account space api session token with the accounts.id as the external_user_id
      // - /api/v1/auth/sessions/accounts
      const sessionData = await fetch('/api/sessions', {
        headers: { Authorization: `Bearer ${data.access_token}` },
        body: JSON.stringify({ external_program_id: externalProgramId }),
        method: 'POST',
      });
      const sessionDataJson = await sessionData.json();
      // delete the anonymous session token from the cookies so it is not used again after the user auth
      deleteClientCookie(ANONYMOUS_TOKEN);
      window.Kigo.isAnonymousSession = false;
      // set the session token and refresh token in the session provider
      // ** IMPORTANT: SESSION_TOKEN IS created through account space api session which is intended to be used for all of our sdk api calls. /v1/
      setSessionToken(sessionDataJson.token);
      setSessionRefreshToken(sessionDataJson.refresh_token);
      window.Kigo.setAuthorizationToken(sessionDataJson.token);
    } catch (error) {
      console.error(error);
      throw new Error(error as string);
    }
  };

  const resetAuthResponse = () => setAuthResponse({ isError: false });

  return {
    handleGoogleSignIn,
    authResponse,
    handleAppleSignIn,
    handleAppleError,
    handleEmailAndPasswordSignIn,
    handleEmailAndPasswordSignUp,
    resetAuthResponse,
  };
};
