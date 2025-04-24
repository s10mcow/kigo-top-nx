import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, Typography } from '@mui/material';
import React from 'react';

type BackButtonProps = {
  text?: string;
  onClick: () => void;
  styleOverrides?: {
    button?: React.CSSProperties;
  };
};

export default function BackButton({ text, onClick }: BackButtonProps) {
  return (
    <Button
      onClick={onClick}
      startIcon={<ArrowBackIcon />}
      sx={{ padding: 0, height: '24px' }}
      data-testid="back-button"
    >
      <Typography variant="bodyMdBold" component="span">
        {text}
      </Typography>
    </Button>
  );
}
