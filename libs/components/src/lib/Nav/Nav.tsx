'use client';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Box, Button } from '@mui/material';
import React from 'react';
import BasicPopover from '../BasicPopover/BasicPopover';

type PopoverLink = {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
};

export function Nav({
  showPopover,
  popoverLinks,
}: {
  showPopover: boolean;
  popoverLinks: PopoverLink[];
}) {
  if (!showPopover) {
    return null;
  }
  return (
    <Box sx={{ position: 'absolute', top: 3, right: 2.5 }}>
      <BasicPopover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        popoverButtonContainerOptions={{
          styleOverrides: {
            padding: '8px',
          },
        }}
        PopoverButton={
          <Box
            sx={{
              backgroundColor: (theme) => theme.palette.kigo.stone,
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <QuestionMarkIcon
              color="primary"
              sx={{
                width: 19,
                height: 19,
              }}
            />
          </Box>
        }
        slotProps={{
          paper: {
            sx: { borderRadius: '12px', padding: '8px 0px' },
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          {popoverLinks.map((link) => (
            <Button
              key={link.title.toLocaleLowerCase().replace(' ', '')}
              sx={{
                padding: '16px',
              }}
              startIcon={link.icon}
              onClick={link.onClick}
            >
              {link.title}
            </Button>
          ))}
        </Box>
      </BasicPopover>
    </Box>
  );
}
