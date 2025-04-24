'use client';
import { useSwipeToClose } from '@kigo-top/hooks';
import { Close } from '@mui/icons-material';
import {
  Box,
  IconButton,
  Modal as MuiModal,
  Slide,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useCallback } from 'react';

type ModalProps = {
  open: boolean;
  onClose?: () => void;
  children: React.ReactElement;
  anchorOnBottom?: boolean;
};

export function Modal({
  open,
  onClose,
  children,
  anchorOnBottom = false,
}: ModalProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { swipeOffset, handlers: swipeHandlers } = useSwipeToClose(
    onClose,
    anchorOnBottom
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (anchorOnBottom) {
        e.preventDefault();
      }
    },
    [anchorOnBottom]
  );

  return (
    <MuiModal
      sx={
        anchorOnBottom
          ? { margin: '0', display: 'absolute', top: 'auto' }
          : { margin: '32px 8px' }
      }
      closeAfterTransition
      open={open}
      onClose={onClose}
      disableScrollLock
    >
      <Slide in={open} appear={anchorOnBottom} direction="up">
        <Box
          {...swipeHandlers}
          onTouchMove={handleTouchMove}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            margin: 'auto',
            maxWidth: '560px',
            borderRadius: anchorOnBottom ? '12px 12px 0 0' : '12px',
            padding: '24px',
            backgroundColor: theme.palette.background.default,
            transform: swipeOffset ? `translateY(${swipeOffset}px)` : 'none',
            transition: swipeOffset ? 'none' : 'transform 0.2s ease-out',
            touchAction: anchorOnBottom ? 'none' : 'auto',
          }}
        >
          {onClose && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
              }}
            >
              {isMobile && anchorOnBottom && (
                <Box
                  sx={{
                    width: 40,
                    height: 4,
                    backgroundColor: 'grey.300',
                    borderRadius: 2,
                    mb: 2,
                  }}
                />
              )}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  width: '100%',
                  mb: 1,
                }}
              >
                <IconButton onClick={onClose} sx={{ p: 0 }}>
                  <Close sx={{ color: 'kigo.black', fontSize: '30px' }} />
                </IconButton>
              </Box>
            </Box>
          )}
          {children}
        </Box>
      </Slide>
    </MuiModal>
  );
}
