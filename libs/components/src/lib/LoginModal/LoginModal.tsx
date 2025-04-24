'use client';

import {
  LANDING_PAGE,
  LOGIN_EMAIL_PAGE,
  OAUTH_SIGNUP_PAGE,
} from '@kigo-top/constants';
import { Apple, Email } from '@mui/icons-material';
import {
  Button,
  CircularProgress,
  Grid2 as Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import GoogleSVG from './google-logo.svg';

import { useCustomRouter } from '@kigo-top/hooks';
import { useAuthentication, useBranding, useOAuth } from '@kigo-top/providers';
import { Modal } from '../Modal/Modal';
const GoogleIcon = () => (
  <Image src={GoogleSVG} alt="Google" style={{ width: 24, height: 24 }} />
);

export function LoginModal({ showAppleSignIn }: { showAppleSignIn?: boolean }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { branding } = useBranding();
  const { enqueueSnackbar } = useSnackbar();
  const { showLogin, setShowLogin, refetch } = useAuthentication();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const searchParams = useSearchParams();
  const next = searchParams.get('next');
  const { handleGoogleSignIn, authResponse, resetAuthResponse } = useOAuth({
    externalProgramId: branding?.external_program_id ?? '',
  });
  const logoUrl = branding?.logo;
  const router = useCustomRouter();

  const handleEmailSignIn = () => {
    router.push(LOGIN_EMAIL_PAGE);
    setShowLogin(false);
  };

  const onGoogleSignIn = async () => {
    resetAuthResponse();
    setIsGoogleLoading(true);
    handleGoogleSignIn();
  };

  useEffect(() => {
    if (!showLogin) {
      return;
    }

    if (authResponse?.isNonOAuthError) {
      setIsGoogleLoading(false);
      return;
    }

    if (authResponse?.isError) {
      setIsGoogleLoading(false);
      enqueueSnackbar('Something went wrong, please try again.', {
        variant: 'kigoError',
      });
      return;
    }

    if (!authResponse.response) return;

    refetch();

    if (authResponse?.response?.is_new) {
      router.push(`${OAUTH_SIGNUP_PAGE}`, {
        queryParams: {
          ...(authResponse.response?.first_name
            ? { first_name: authResponse.response.first_name }
            : {}),
          ...(authResponse.response?.last_name
            ? { last_name: authResponse.response.last_name }
            : {}),
        },
        preserveQuery: true,
      });

      setShowLogin(false);
      return;
    } else {
      if (next) {
        router.push(next, { preserveQuery: false });

        setShowLogin(false);
      } else {
        router.push(LANDING_PAGE, { preserveQuery: false });

        setShowLogin(false);
      }
    }

    return () => {
      setIsGoogleLoading(false);
      resetAuthResponse();
    };
  }, [
    authResponse,
    router,
    setShowLogin,
    enqueueSnackbar,
    refetch,
    next,
    showLogin,
    resetAuthResponse,
  ]);

  return (
    <Modal
      open={showLogin}
      anchorOnBottom={isMobile}
      onClose={() => setShowLogin(false)}
    >
      <Grid container spacing={1.5} mt={1}>
        <Grid size={12} textAlign="center">
          <Image
            src={logoUrl ?? ''}
            alt="Logo"
            width={230}
            height={230}
            style={{ width: 'auto', height: 'auto', maxWidth: '230px' }}
          />
        </Grid>
        <Grid
          size={12}
          textAlign="center"
          sx={{ margin: 'auto', maxWidth: 380, mb: 1.5 }}
        >
          <Typography variant="titleLg">
            Sign in to view your exclusive offers
          </Typography>
        </Grid>
        {showAppleSignIn && (
          <Grid size={12} textAlign="center">
            <Button
              onClick={() => alert('Apple Sign In')}
              variant="outlinedNeutral"
              startIcon={<Apple />}
              fullWidth
              sx={{ maxWidth: 380 }}
            >
              Continue with Apple
            </Button>
          </Grid>
        )}

        <Grid size={12} textAlign="center">
          <Button
            onClick={onGoogleSignIn}
            variant="outlinedNeutral"
            startIcon={
              isGoogleLoading ? <CircularProgress size={24} /> : <GoogleIcon />
            }
            fullWidth
            sx={{ maxWidth: 380 }}
            disabled={isGoogleLoading}
          >
            Continue with Google
          </Button>
        </Grid>
        <Grid size={12} textAlign="center">
          <Button
            onClick={handleEmailSignIn}
            variant="outlinedNeutral"
            startIcon={<Email sx={{ color: 'primary.main' }} />}
            fullWidth
            sx={{ maxWidth: 380 }}
          >
            Continue with email
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
}
