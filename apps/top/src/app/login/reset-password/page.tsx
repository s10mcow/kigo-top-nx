'use client';
import { AuthFlowContainer, CreatePasswordForm } from '@kigo-top/components';
import {
  INVALID_RESET_PASSWORD_PAGE,
  LOGIN_PAGE,
  LOGIN_RESET_PASSWORD_SUCCESS_PAGE,
} from '@kigo-top/constants';
import { CreatePasswordFormValues } from '@kigo-top/hooks';
import { useAuthentication } from '@kigo-top/providers';
import {
  resetPassword,
  verifyPasswordResetCode,
} from '@kigo-top/services/client';
import { CircularProgress } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

const createAnonymousSession = () => console.log('ere!');

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, signOut } = useAuthentication();
  const { enqueueSnackbar } = useSnackbar();

  const code = searchParams.get('code');

  const handlePasswordReset = async (data: CreatePasswordFormValues) => {
    setLoading(true);
    if (!code) return;
    try {
      await resetPassword({ code, password: data.password });
      router.push(LOGIN_RESET_PASSWORD_SUCCESS_PAGE);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('An error occurred', { variant: 'kigoError' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!code) {
      router.push(LOGIN_PAGE);
      return;
    }
    (async function () {
      try {
        setLoading(true);
        await createAnonymousSession();
        await verifyPasswordResetCode({ code });
        setLoading(false);
      } catch (error) {
        console.error(error);
        router.push(INVALID_RESET_PASSWORD_PAGE);
      }
    })();
  }, [code, router]);

  useEffect(() => {
    if (user) {
      signOut();
      enqueueSnackbar('You have been signed out', { variant: 'kigoInfo' });
    }
  }, [user, signOut, enqueueSnackbar]);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <AuthFlowContainer title="Reset Password">
      <CreatePasswordForm
        loading={loading}
        onSubmitAction={handlePasswordReset}
      />
    </AuthFlowContainer>
  );
}
