import { Modal } from '@kigo-top/components';
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

type CloseAccountModalProps = {
  visible: boolean;
  onClose: () => void;
  onButtonClick: () => void;
  isLoading: boolean;
};

export default function CloseAccountModal({
  visible,
  onClose,
  onButtonClick,
  isLoading,
}: CloseAccountModalProps) {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Modal
      open={visible}
      onClose={isLoading ? undefined : onClose}
      anchorOnBottom={isMobile}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Typography variant="titleMd" component="h1" textAlign="center">
            Are you sure? You will no longer have access to your offers.
          </Typography>
          <Typography
            variant="bodyMd"
            color="text.secondary"
            textAlign="center"
          >
            This action cannot be undone. You will lose access to your catalog
            of offers and any offers saved to your Wallet.
          </Typography>
        </Box>

        <Button
          sx={{ maxWidth: '300px' }}
          variant="contained"
          color="error"
          onClick={onButtonClick}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <CircularProgress size={20} sx={{ mr: 1 }} color="inherit" />
              Closing account...
            </>
          ) : (
            'Agree and close account'
          )}
        </Button>
      </Box>
    </Modal>
  );
}
