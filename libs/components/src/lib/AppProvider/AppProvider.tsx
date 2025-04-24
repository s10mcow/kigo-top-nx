'use client';

import {
  AuthenticationProvider,
  BrandingProvider,
  SessionProvider,
} from '@kigo-top/providers';
import { kigoQueryClient } from '@kigo-top/utils';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClientProvider } from '@tanstack/react-query';
import { CustomSnackbarProvider } from '../KigoSnackbarProvider/KigoSnackbarProvider';
import { LoginModal } from '../LoginModal/LoginModal';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={kigoQueryClient}>
      <GoogleOAuthProvider
        clientId={process.env['NEXT_PUBLIC_GOOGLE_CLIENT_ID'] ?? ''}
      >
        <BrandingProvider>
          <SessionProvider>
            <AuthenticationProvider>
              <CustomSnackbarProvider>
                <LoginModal />
                {children}
              </CustomSnackbarProvider>
            </AuthenticationProvider>
          </SessionProvider>
        </BrandingProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
};
