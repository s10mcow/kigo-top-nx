'use client';
import { LOGIN_PAGE } from '@kigo-top/constants';
import { useCustomRouter } from '@kigo-top/hooks';
import { useSession } from '@kigo-top/providers';
import { createVerificationEmail } from '@kigo-top/services/client';
import MailIcon from '@mui/icons-material/Mail';
import ReplayIcon from '@mui/icons-material/Replay';
import { Box, Button, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { CircleIcon } from '../../CircleIcon/CircleIcon';
import { usePollEmailVerification } from '../utils/utils';
import { VerifyStepPopover } from './VerifyStepPopover';
export type VerifyEmailStepProps = { email: string; onNext: () => void };

export function VerifyEmailStep(props: VerifyEmailStepProps) {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const router = useCustomRouter();
  const { accessToken } = useSession();
  const { needRefresh } = usePollEmailVerification(() => {
    queryClient.invalidateQueries({ queryKey: ['account'] });
    props.onNext();
  });

  if (!accessToken) {
    router.push(LOGIN_PAGE, { preserveQuery: false });
  }

  const { enqueueSnackbar } = useSnackbar();

  const handleResendClick = async () => {
    try {
      await createVerificationEmail();
      enqueueSnackbar('Verification email successfully resent', {
        variant: 'kigoInfo',
      });
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Please try again', { variant: 'kigoError' });
    }
  };

  const handleRefreshClick = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (searchParams.get('sessionExpired') === 'true')
      enqueueSnackbar('Your verification session has expired, please refresh', {
        variant: 'kigoInfo',
      });
  }, [searchParams, enqueueSnackbar]);

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        }}
      >
        <VerifyStepPopover />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          textAlign: 'center',
          marginTop: '92px',
          maxWidth: '560px',
        }}
      >
        <CircleIcon InnerIcon={MailIcon} />
        <Typography component="h1" variant="titleMd">
          Verify email address
        </Typography>

        <Typography component="p" variant="bodyMd">
          A verification email has been sent to <b>{props.email}</b>. Please
          check your inbox to activate your account. If you don&apos;t see it
          there, be sure to check your spam or junk folder.
        </Typography>

        {needRefresh && (
          <Button
            variant="text"
            onClick={handleRefreshClick}
            startIcon={<ReplayIcon />}
          >
            Refresh
          </Button>
        )}

        <Button variant="text" onClick={handleResendClick}>
          Resend email
        </Button>
      </Box>
    </Box>
  );
}
