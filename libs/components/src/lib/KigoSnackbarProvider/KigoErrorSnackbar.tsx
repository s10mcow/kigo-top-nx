import { forwardRef } from 'react';
import { KigoSnackbar, KigoSnackbarProps } from './KigoSnackbar';

export type KigoErrorSnackbarProps = Omit<
  KigoSnackbarProps,
  'message' | 'title'
> & {
  message?: string;
  title?: string;
};

export type KigoErrorSnackbarContextProps = {
  actionUrl?: string;
  actionText?: string;
};

export const KigoErrorSnackbar = forwardRef<
  HTMLDivElement,
  KigoErrorSnackbarProps
>((props, ref) => {
  const message =
    props?.message || 'Please check your internet connection and try again.';
  const title = props?.title || 'An unexpected error occurred';

  const propsWithDefaults = {
    ...props,
    message,
    title,
  };

  return (
    <KigoSnackbar
      ref={ref}
      {...propsWithDefaults}
      backgroundColor={(theme) => theme.palette.kigo.redLighten50}
      iconColor="error"
    />
  );
});

KigoErrorSnackbar.displayName = 'KigoErrorSnackbar';
