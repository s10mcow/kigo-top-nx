import { Theme } from '@mui/material';
import { forwardRef } from 'react';
import { KigoSnackbar, KigoSnackbarProps } from './KigoSnackbar';

export type KigoInfoSnackbarProps = KigoSnackbarProps;

export const KigoInfoSnackbar = forwardRef<
  HTMLDivElement,
  KigoInfoSnackbarProps
>((props, ref) => (
  <KigoSnackbar
    ref={ref}
    {...props}
    backgroundColor={(theme: Theme) => theme.palette.kigo.skyBlue}
    iconColor="primary"
  />
));
KigoInfoSnackbar.displayName = 'KigoInfoSnackbar';
