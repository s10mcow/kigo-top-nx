'use client';

import {
  LANDING_PAGE,
  SIGNUP_NOTIFICATION_PERMISSIONS_PAGE,
} from '@kigo-top/constants';
import { useCustomRouter } from '@kigo-top/hooks';
import { useAuthentication, useBranding } from '@kigo-top/providers';
import { useUpdateCommunicationPreferences } from '@kigo-top/services/client';
import { StayCurrentPortrait } from '@mui/icons-material';
import EmailIcon from '@mui/icons-material/Email';
import {
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Switch,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import AcceptNotificationsLogo from './accept-notifications.svg';

type NotificationPermissionsProps = { onNext: () => void };

export function NotificationPermissions({
  onNext,
}: NotificationPermissionsProps) {
  const { branding } = useBranding();
  const { user, isLoading, setShowLogin } = useAuthentication();
  const router = useCustomRouter();

  const { mutate: updateNotificationPreferences, isPending } =
    useUpdateCommunicationPreferences();
  const [opt_in_email, setEmailNotificationsEnabled] = useState(true);
  const [opt_in_sms, setSmsNotificationsEnabled] = useState(true);

  const handleNotificationsAccepted = async () => {
    let pushPermission = false;
    if (window.Notification && Notification.permission !== 'granted') {
      const permission = await Notification.requestPermission();
      pushPermission = permission === 'granted';
    }

    updateNotificationPreferences(
      { opt_in_email, opt_in_sms, opt_in_push_notification: pushPermission },
      {
        onSuccess: () => onNext(),
        // //TODO: handle onError
        onError: () => onNext(),
      }
    );
  };

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      setShowLogin(true);
      router.replace(LANDING_PAGE, {
        preserveQuery: false,
        queryParams: { next: SIGNUP_NOTIFICATION_PERMISSIONS_PAGE },
      });
    }
  }, [isLoading, user, router, setShowLogin]);

  if (isLoading || !user)
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Box>
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
        <Image
          src={AcceptNotificationsLogo}
          width={200}
          height={178}
          alt="accept-notifications-logo"
        />
        <Typography
          component="h1"
          variant="titleMd"
          sx={{ fontSize: '22px', fontWeight: '700', fontFamily: 'JDSansPro' }}
        >
          Never miss out with notifications
        </Typography>
        <Typography component="p" variant="bodyMd">
          Receive important alerts, offers, and updates tailored just for you.
        </Typography>

        <Box
          sx={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            mt: '1rem',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FormControlLabel
              sx={{
                border: '1px solid #E5E6E6',
                borderRadius: '20px',
                padding: '16px',
                width: '100%',
                margin: '12px auto',
                display: 'flex',
                justifyContent: 'space-between',
              }}
              control={
                <Switch
                  checked={opt_in_email}
                  onChange={(event) =>
                    setEmailNotificationsEnabled(event.target.checked)
                  }
                  name="emailNotifications"
                  color="primary"
                />
              }
              label={
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: '700',
                    fontSize: '16px',
                    fontFamily: 'Arial',
                  }}
                >
                  <EmailIcon
                    sx={{ marginRight: '12px', color: branding?.color_primary }}
                  />
                  Emails
                </Box>
              }
              labelPlacement="start"
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FormControlLabel
              sx={{
                border: '1px solid #E5E6E6',
                borderRadius: '20px',
                padding: '16px',
                width: '100%',
                margin: '12px auto',
                display: 'flex',
                justifyContent: 'space-between',
              }}
              control={
                <Switch
                  checked={opt_in_sms}
                  onChange={(event) =>
                    setSmsNotificationsEnabled(event.target.checked)
                  }
                  name="smsNotifications"
                  color="primary"
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <StayCurrentPortrait
                    sx={{ marginRight: '12px', color: branding?.color_primary }}
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                    }}
                  >
                    <Typography variant="titleSmBd">Text/SMS</Typography>
                    <Typography variant="bodySm">
                      Messaging and data rates may apply.
                    </Typography>
                  </Box>
                </Box>
              }
              labelPlacement="start"
            />
          </Box>

          {/*TODO: can we consolidate the continue and skip buttons for the entire flow*/}

          <Box>
            <Button
              sx={{ width: '100%', maxWidth: '300px', margin: '20px auto' }}
              variant="contained"
              onClick={handleNotificationsAccepted}
            >
              {isPending ? (
                <CircularProgress size={30} sx={{ color: 'white' }} />
              ) : (
                'Continue'
              )}
            </Button>
          </Box>

          <Box>
            <Typography variant="bodySm" color="kigo.charcoal ">
              You can reconfigure this anytime within your Account. Keep in
              mind, we&apos;ll still send transactional and security-related
              emails.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
