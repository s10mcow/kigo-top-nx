import { Button } from '@mui/material';
import { Box, Grid2 as Grid, Typography } from '@mui/material';
import { useState } from 'react';
import CloseAccountModal from './CloseAccountModal';
import { useAccountDeactivation } from './hooks/useCloseAccount';

export const CloseAccount = () => {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const { deactivateAccounts, isLoading } = useAccountDeactivation();

  const handleCloseAccount = async () => {
    const success = await deactivateAccounts();
    if (success) {
      setConfirmDialogOpen(false);
    }
  };

  return (
    <>
      <Grid>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="titleSm">Close account</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Box>
              <Typography variant="bodyMdBold" sx={{ mb: 2 }} component="div">
                Delete your account and all of your data.
              </Typography>
              <Typography
                variant="bodyMd"
                color="text.secondary"
                sx={{ mb: 2 }}
                component="div"
              >
                This action cannot be undone.
              </Typography>
              <Button
                variant="outlined"
                color="error"
                onClick={() => setConfirmDialogOpen(true)}
              >
                Close account
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <CloseAccountModal
        visible={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        onButtonClick={handleCloseAccount}
        isLoading={isLoading}
      />
    </>
  );
};
