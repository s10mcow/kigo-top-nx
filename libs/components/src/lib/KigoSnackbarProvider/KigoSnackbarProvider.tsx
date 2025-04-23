import {
  SnackbarProvider as NotistackProvider,
  SnackbarProviderProps,
} from 'notistack';
import React from 'react';
import { KigoErrorSnackbar } from './KigoErrorSnackbar';
import { KigoInfoSnackbar } from './KigoInfoSnackbar';

export const CustomSnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
}) => {
  return (
    <NotistackProvider
      maxSnack={3}
      autoHideDuration={3000}
      preventDuplicate={true}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      Components={{
        kigoError: KigoErrorSnackbar,
        kigoInfo: KigoInfoSnackbar,
      }}
      classes={{
        containerRoot: 'kigo-snackbar',
      }}
      style={{
        width: '100%',
        maxWidth: '560px',
      }}
    >
      {children}
    </NotistackProvider>
  );
};
