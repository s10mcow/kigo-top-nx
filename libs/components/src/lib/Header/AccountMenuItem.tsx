import { MenuItem, Typography } from '@mui/material';
import React from 'react';

type AccountMenuItemProps = {
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
};

export default function AccountMenuItem({
  icon,
  title,
  onClick,
}: AccountMenuItemProps) {
  return (
    <MenuItem
      sx={{
        display: 'flex',
        gap: '8px',
        color: 'primary.main',
        py: '12px',
      }}
      onClick={onClick}
    >
      {icon}
      <Typography
        sx={{
          color: (theme) => theme.palette.primary.main,
        }}
        variant="bodyMdBold"
      >
        {title}
      </Typography>
    </MenuItem>
  );
}
