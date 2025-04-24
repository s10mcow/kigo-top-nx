import { Box } from '@mui/material';
import Popover, { PopoverOrigin } from '@mui/material/Popover';
import * as React from 'react';

export type BasicPopoverProps = {
  children?: React.ReactNode;
  PopoverButton: React.ReactNode;
  popoverButtonContainerOptions?: {
    styleOverrides?: React.CSSProperties;
  };
  onOpen?: () => void;
  onClose?: () => void;
  anchorOrigin?: PopoverOrigin;
  transformOrigin?: PopoverOrigin;
  slotProps?: {
    paper: {
      sx: React.CSSProperties;
    };
  };
};

export default function BasicPopover({
  children,
  PopoverButton,
  popoverButtonContainerOptions,
  onOpen,
  onClose,
  anchorOrigin,
  transformOrigin,
  slotProps,
}: BasicPopoverProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
    onOpen?.();
  };

  const handleClose = () => {
    setAnchorEl(null);
    onClose?.();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const anchorOriginValue = React.useMemo(
    () =>
      anchorOrigin ??
      ({
        vertical: 'bottom',
        horizontal: 'left',
      } as PopoverOrigin),
    [anchorOrigin],
  );

  const transformOriginValue = React.useMemo(
    () =>
      transformOrigin ??
      ({
        vertical: 'top',
        horizontal: 'left',
      } as PopoverOrigin),
    [transformOrigin],
  );

  return (
    <div>
      <Box
        onClick={handleClick}
        sx={{ ...popoverButtonContainerOptions?.styleOverrides }}
      >
        {PopoverButton}
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={anchorOriginValue}
        transformOrigin={transformOriginValue}
        slotProps={slotProps || {}}
      >
        {children}
      </Popover>
    </div>
  );
}
