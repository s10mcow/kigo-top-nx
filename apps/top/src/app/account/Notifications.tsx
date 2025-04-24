import { useAuthentication } from '@kigo-top/providers';
import { updateNotifications } from '@kigo-top/services/client';
import {
  Alert,
  Box,
  CircularProgress,
  Collapse,
  Divider,
  Grid2 as Grid,
  Switch,
  Typography,
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useAccount } from './AccountContext';

export const Notifications = () => {
  const { emailNotifications, setEmailNotifications } = useAccount();
  const { user } = useAuthentication();
  const queryClient = useQueryClient();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    mutate: updatePreferences,
    status,
    reset: resetMutation,
  } = useMutation({
    mutationFn: updateNotifications,
    onSuccess: () => {
      setShowError(false);
      setErrorMessage('');
      queryClient.invalidateQueries({ queryKey: ['account'] });
    },
    onError: (error) => {
      setEmailNotifications(!emailNotifications);
      setShowError(true);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'We were unable to update your notification preferences. Please try again later.'
      );
    },
  });

  const isLoading = status === 'pending';

  const handleToggle = () => {
    if (!user?.email) return;

    if (showError) {
      setShowError(false);
      setErrorMessage('');
      resetMutation();
    }

    const newValue = !emailNotifications;
    setEmailNotifications(newValue);

    updatePreferences({
      opt_in_email: newValue,
      opt_in_sms: false,
      opt_in_push_notification: false,
      token_as_email: user.email,
    });
  };

  if (!user?.email) {
    return (
      <Grid>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="titleSm">Notifications</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Alert severity="info">
              Please add an email address to your account to manage notification
              preferences.
            </Alert>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4, width: '100%' }} />
      </Grid>
    );
  }

  return (
    <Grid>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="titleSm">Notifications</Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box>
                <Typography variant="bodyMdBold" component="div">
                  Emails
                </Typography>
                <Typography variant="bodyMd" color="text.secondary">
                  Get the latest offers, rewards, and news delivered to your
                  inbox.
                </Typography>
              </Box>
              <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                {isLoading ? (
                  <CircularProgress
                    size={24}
                    sx={{ position: 'relative', marginRight: '24px' }}
                  />
                ) : (
                  <Switch
                    checked={emailNotifications}
                    onChange={handleToggle}
                    disabled={isLoading}
                    aria-label="Toggle email notifications"
                  />
                )}
              </Box>
            </Box>
            <Collapse in={showError}>
              <Alert
                severity="error"
                onClose={() => {
                  setShowError(false);
                  setErrorMessage('');
                  resetMutation();
                }}
              >
                {errorMessage}
              </Alert>
            </Collapse>
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ my: 4, width: '100%' }} />
    </Grid>
  );
};
