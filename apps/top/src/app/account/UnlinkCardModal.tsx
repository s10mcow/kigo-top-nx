import { Modal } from '@kigo-top/components';
import type { Card } from '@kigo-top/services/client';
import {
  Box,
  Button,
  CircularProgress,
  Grid2 as Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { getCardType } from './AccountContext';

export const UnlinkCardModal = ({
  open,
  onClose,
  card,
  onButtonClick,
  isLastCard,
  isLoading,
}: {
  open: boolean;
  onClose: () => void;
  card: Card | null;
  onButtonClick: () => void;
  isLastCard: boolean;
  isLoading: boolean;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Modal open={open} onClose={onClose} anchorOnBottom={isMobile}>
      <Box sx={{ position: 'relative' }}>
        {isLoading && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              zIndex: 1,
            }}
          >
            <CircularProgress />
          </Box>
        )}
        <Grid container spacing={2}>
          <Grid size={12} textAlign={'center'}>
            {isLastCard ? (
              <Typography variant="titleMd">
                Are you sure? You will no longer be enrolled in cash back
                offers.
              </Typography>
            ) : (
              <Typography variant="titleMd">
                Are you sure you want to unlink {getCardType(card)} ending in{' '}
                {card?.number}?
              </Typography>
            )}
          </Grid>
          <Grid size={12} textAlign={'center'}>
            {isLastCard ? (
              <Typography variant="bodyMd">
                Are you sure? You will no longer be enrolled in cash back
                offers.
              </Typography>
            ) : (
              <Typography variant="bodyMd">
                If you unlink this card, you&apos;ll lose access to cash back
                offers. You can always link it again later.
              </Typography>
            )}
          </Grid>
          <Grid size={12} textAlign={'center'} mt={1}>
            <Button
              color="error"
              fullWidth
              variant="contained"
              onClick={onButtonClick}
              disabled={isLoading}
              sx={{ maxWidth: 300 }}
            >
              {isLastCard ? 'Agree and unlink card' : 'Unlink card'}
            </Button>
          </Grid>
          <Grid size={12} textAlign={'center'}>
            <Button variant="link" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};
