'use client';

import {
  LOCAL_STORAGE_EXTERNAL_PROGRAM_ID,
  LOCAL_STORAGE_IS_SSO_SESSION,
  LOCAL_STORAGE_PARTNER_INFO,
} from '@kigo-top/constants';
import { clearAuthTokens, useSession } from '@kigo-top/services';
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { clearSession } = useSession();
  const handleAnonymousLogin = () => router.push('/test-anon-login');
  const handleSSOLogin = () => router.push('/test-sso-login');

  useEffect(() => {
    setIsClient(true);
    clearAuthTokens();
    clearSession();
    window?.localStorage.removeItem(LOCAL_STORAGE_IS_SSO_SESSION);
    window?.localStorage.removeItem(LOCAL_STORAGE_EXTERNAL_PROGRAM_ID);
    window?.localStorage.removeItem(LOCAL_STORAGE_PARTNER_INFO);
  }, [clearSession]);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <Container
      sx={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: '100%' }}>
        <Typography
          variant="h4"
          component="h1"
          align="center"
          gutterBottom
          fontWeight="bold"
        >
          Choose Login Method
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={handleAnonymousLogin}
          >
            Continue as Guest
          </Button>

          <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
            <Divider sx={{ flexGrow: 1 }} />
            <Typography variant="body2" color="text.secondary" sx={{ px: 2 }}>
              or
            </Typography>
            <Divider sx={{ flexGrow: 1 }} />
          </Box>

          <Button
            variant="contained"
            color="info"
            fullWidth
            size="large"
            onClick={handleSSOLogin}
          >
            Sign in with SSO
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
