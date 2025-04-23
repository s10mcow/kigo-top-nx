import { Close, Error } from '@mui/icons-material';
import { Box, IconButton, Theme, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { closeSnackbar, CustomContentProps, SnackbarContent } from 'notistack';
import { forwardRef } from 'react';

export interface KigoSnackbarProps extends CustomContentProps {
  title: string;
  actionText: string;
  actionUrl?: string;
  onClose: () => void;
  onActionClick?: () => void;
  message: string;
  backgroundColor: string | ((theme: Theme) => string);
  iconColor: 'primary' | 'error';
}

export const KigoSnackbar = forwardRef<HTMLDivElement, KigoSnackbarProps>(
  (props, ref) => {
    const {
      message,
      title,
      onClose = () => closeSnackbar(props.id),
      backgroundColor,
      iconColor,
    } = props;

    return (
      <SnackbarContent ref={ref} role="alert">
        <Box
          sx={{
            display: 'flex',
            backgroundColor,
            padding: '8px 16px',
            borderRadius: '4px',
            flex: 1,
            alignItems: title ? 'flex-start' : 'center',
          }}
        >
          <Box sx={{ py: '8px' }}>
            <Error color={iconColor} />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '8px 12px',
              flex: 1,
            }}
          >
            <Typography variant="titleSm">{title}</Typography>
            <Typography
              variant="bodyMd"
              sx={{ color: (theme) => theme.palette.kigo.charcoal }}
            >
              {message}
            </Typography>
            {!!props.actionUrl && !!props.actionText && (
              <Button
                component="a"
                variant="link"
                href={props.actionUrl}
                target="_blank"
                sx={{
                  textDecoration: 'none',
                  color: (theme) =>
                    iconColor === 'error'
                      ? theme.palette.kigo.redDarken10
                      : theme.palette.primary.main,
                }}
              >
                <Typography variant="titleSm" sx={{ mt: 1 }}>
                  {props.actionText}
                </Typography>
              </Button>
            )}

            {props?.onActionClick && (
              <Button
                variant="link"
                onClick={() => props.onActionClick?.()}
                sx={{
                  mt: 1,
                  color: (theme) =>
                    iconColor === 'error'
                      ? theme.palette.kigo.redDarken10
                      : theme.palette.primary.main,
                }}
              >
                {props.actionText}
              </Button>
            )}
          </Box>
          <Box sx={{ color: (theme) => theme.palette.common.black }}>
            <IconButton
              sx={{ color: 'black' }}
              onClick={onClose}
              aria-label="Close"
            >
              <Close />
            </IconButton>
          </Box>
        </Box>
      </SnackbarContent>
    );
  },
);

KigoSnackbar.displayName = 'KigoSnackbar';
