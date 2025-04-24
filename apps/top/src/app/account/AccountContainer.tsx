'use client';

import {
  Footer,
  Header,
  ReturnTo,
  ScreenContainer,
} from '@kigo-top/components';
import { Box, Grid2 as Grid, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

import { AccountProvider } from './AccountContext';
import { BasicDetails } from './BasicDetails';
import { CloseAccount } from './CloseAccount';
import { LinkedCards } from './LinkedCards';
import { Location } from './Location';
import { Notifications } from './Notifications';

export default function AccountContainer() {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100%',
        minHeight: '100vh',
        position: 'relative',
        backgroundColor: 'white',
      }}
    >
      <Header />
      <AccountProvider>
        <ScreenContainer>
          <Grid container direction="column" spacing={2}>
            <Grid>
              <ReturnTo label="Home" onClick={() => router.push('/app')} />
            </Grid>

            <Grid>
              <Typography variant="titleLg">Manage account</Typography>
            </Grid>

            <BasicDetails />
            <LinkedCards />
            <Location />
            <Notifications />
            <CloseAccount />
          </Grid>
        </ScreenContainer>
      </AccountProvider>
      <Footer />
    </Box>
  );
}
