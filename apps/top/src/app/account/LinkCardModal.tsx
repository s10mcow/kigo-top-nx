'use client';

import { CheckboxWithController, Modal } from '@kigo-top/components';
import { useAuthentication } from '@kigo-top/providers';
import { requestAddMemberCard } from '@kigo-top/services/client';
import { Security } from '@mui/icons-material';
import {
  Button,
  CircularProgress,
  FormControlLabel,
  Grid2 as Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useAccount } from './AccountContext';
import { Agreement, useLinkModal } from './useLinkModal';

interface ApiError {
  error_code: string;
  error_message: string;
}

interface KigoUserLocation {
  address: {
    city: string;
    country: string;
    country_code: string;
    county: string;
    postal_code: string;
    state: string;
    state_code: string;
    street: string;
    latitude: number;
    longitude: number;
  };
}

const isApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'error_code' in error &&
    'error_message' in error
  );
};

export const LinkCardModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { control, handleSubmit, formState, reset } = useLinkModal();
  const [submitted, setSubmitted] = useState(false);
  const { handleLinkCard } = useAccount();
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthentication();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data: Agreement) => {
    if (
      !data.card.cardNumber ||
      !data.card.cardType ||
      !data.card.lastFour ||
      !data.agreement ||
      !user?.id
    ) {
      return;
    }

    const kigoUserLocationStr = localStorage.getItem('kigo_user_location');
    if (!kigoUserLocationStr) {
      setError(
        'Location information is required. Please enable location services.'
      );
      return;
    }

    let kigoUserLocation: KigoUserLocation;
    try {
      kigoUserLocation = JSON.parse(kigoUserLocationStr);
      if (!kigoUserLocation?.address?.postal_code) {
        setError('Invalid location data. Please enable location services.');
        return;
      }
    } catch {
      setError(
        'Invalid location data format. Please enable location services.'
      );
      return;
    }

    setSubmitted(true);
    setError(null);
    try {
      await requestAddMemberCard(
        { encrypted_card_number: data.card.cardNumber },
        user?.email && user?.first_name && user?.last_name
          ? {
              email: user.email,
              first_name: user.first_name,
              last_name: user.last_name,
              zip_code: kigoUserLocation.address.postal_code,
            }
          : undefined
      );

      handleLinkCard({
        encryptedCardNumber: data.card.cardNumber,
        cardType: data.card.cardType,
        lastFour: data.card.lastFour,
      });
      onClose();
      reset();
      enqueueSnackbar('Card successfully added!', {
        variant: 'success',
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        autoHideDuration: 5000,
      });
    } catch (error) {
      console.error('Failed to add card:', error);
      if (isApiError(error)) {
        if (error.error_code === 'not_found') {
          setError('Unable to find a Reward Network account.');
        } else if (error.error_code === 'already_used') {
          setError('Unable to link card, card is already linked.');
        } else {
          setError('Failed to add card. Please try again.');
        }
      } else {
        setError('Failed to add card. Please try again.');
      }
    } finally {
      setSubmitted(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} anchorOnBottom={isMobile}>
      <Grid
        container
        spacing={2}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <Grid size={12} textAlign={'left'}>
          <Typography variant="titleMd">
            Link your Mastercard to activate cash back offers
          </Typography>
        </Grid>

        <Grid size={12}>
          <Typography variant="bodyMd" sx={{ color: 'text.secondary' }}>
            Registering your Mastercard is required to receive cash back offers.
            Securely provide your card details below, then use your Mastercard
            to redeem cash back offers on participating purchases.
          </Typography>
        </Grid>

        <Grid size={12}>
          <Box
            sx={{
              display: 'flex',
              flex: 1,
              width: '100%',
              height: '195px',
              borderRadius: '8px',
              padding: '16px',
              border: `1px solid ${
                formState.errors.card?.cardNumber
                  ? theme.palette.error.main
                  : theme.palette.kigo.gray100
              }`,
              backgroundColor: 'rgb(239, 239, 239)',
            }}
          >
            <iframe
              id="RN_CRYPTEX"
              data-testid="cyptex_iframe"
              scrolling="no"
              src="https://secure.rnstg.com/?MAST=1"
              sandbox="allow-scripts allow-same-origin"
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          </Box>
        </Grid>

        <Grid size={12} display={'flex'} alignItems={'center'} gap={1}>
          <Security sx={{ color: 'primary.main', fontSize: '32px' }} />
          <Typography variant="bodyMd" sx={{ color: 'text.secondary' }}>
            We take your security and privacy seriously and will not share your
            information without your permission.
          </Typography>
        </Grid>

        {error && (
          <Grid size={12}>
            <Typography variant="bodyMd" color="error">
              {error}
            </Typography>
          </Grid>
        )}

        <Grid size={12}>
          <FormControlLabel
            sx={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}
            control={
              <CheckboxWithController
                control={control}
                name="agreement"
                required={true}
                sx={{ '& .MuiSvgIcon-root': { fontSize: '30px' } }}
              />
            }
            label={
              <Typography variant="bodySm">
                <b>Mastercard services agreement.</b> By checking this box and
                entering my card information, I agree to the following: I
                authorize my payment card network to obtain, monitor and share
                my transaction data made with my registered payment card at
                participating merchants with Mastercard and its third party
                service provider (Kigo, LLC.).
              </Typography>
            }
          />
        </Grid>

        <Grid size={12} display={'flex'} justifyContent={'center'}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ maxWidth: 300 }}
          >
            {submitted ? (
              <CircularProgress size={20} sx={{ color: 'white' }} />
            ) : (
              'Continue'
            )}
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
};
