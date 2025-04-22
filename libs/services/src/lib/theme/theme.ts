'use client';
import { createTheme, PaletteOptions, Theme } from '@mui/material/styles';
import { lighten } from '@mui/system';
import React from 'react';

declare module '@emotion/react' {
  export interface Theme {
    palette: { kigo: KigoColors };
    logoUrl: string;
  }
}

interface CustomTypographyVariants {
  titleXl: React.CSSProperties;
  titleLg: React.CSSProperties;
  titleMd: React.CSSProperties;
  titleSm: React.CSSProperties;
  titleSmBd: React.CSSProperties;
  bodyMdBold: React.CSSProperties;
  bodySmBold: React.CSSProperties;
  bodyXsBold: React.CSSProperties;
  bodyMd: React.CSSProperties;
  bodySm: React.CSSProperties;
  bodyXs: React.CSSProperties;
}

declare module '@mui/material/styles' {
  interface ButtonPropsVariantOverrides {
    link: true;
    outlined: true;
    outlinedNeutral: true;
  }

  interface TypographyVariantsOptions
    extends Partial<CustomTypographyVariants> {
    _dummy?: never;
  }

  interface Palette {
    kigo: KigoColors;
  }

  interface PaletteOptions {
    kigo: KigoColors;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    link: true;
    outlined: true;
    outlinedNeutral: true;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    titleXl: true;
    titleLg: true;
    titleMd: true;
    titleSm: true;
    titleSmBd: true;
    bodyMdBold: true;
    bodySmBold: true;
    bodyXsBold: true;
    bodyMd: true;
    bodySm: true;
    bodyXs: true;
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsVariantOverrides {
    filledLight: true;
    filledLightSelected: true;
  }
}

type KigoColors = {
  white: string;
  black: string;
  blackLighten: string;
  blackLighten20: string;
  black_grey: string;
  charcoal: string;
  stone: string;
  gray100: string;
  gray200: string;
  gray500: string;
  gray900: string;
  redLighten50: string;
  redLighten10: string;
  red: string;
  redDarken10: string;
  redDarken20: string;
  coral: string;
  orange: string;
  blue: string;
  skyBlue: string;
  darkSkyBlue: string;
  green: string;
  green100: string;
  lightGreen: string;
  purple: string;
  lightPurple: string;
};

// Refer to https://www.figma.com/design/kKMk2TgBvZ5ayc7gtYOC3t/Kigo%3A-Library?node-id=906-3129&t=d9rfcmEFNMTqMttT-4 for documentation on colors
const kigoColors: KigoColors = {
  white: '#FFFFFF',
  stone: '#f6f5f1',
  charcoal: '#5A5858',
  black: '#231F20',
  blackLighten: '#111827',
  blackLighten20: '#8E8B8B',
  black_grey: '#E9E9E9',
  gray100: '#E4E5E7',
  gray200: '#E5E7EB',
  gray500: '#717585',
  gray900: '#111827',
  redLighten50: '#FEECED',
  redLighten10: '#C63469',
  red: '#DC1021',
  redDarken10: '#AB0C1A',
  redDarken20: '#8E0916',
  coral: '#FF4F5E',
  orange: '#FF8717',
  blue: '#328FE5',
  skyBlue: '#CCFFFE',
  darkSkyBlue: '#25BDFE',
  green: '#77D898',
  green100: '#6ADFA0',
  lightGreen: '#D1F7DF',
  purple: '#8941EB',
  lightPurple: '#E5D7FA',
};

export type KigoContextTheme = {
  palette: { primary: { main: string }; secondary: { main: string } };
  typography: { fontFamily: string; titleFontFamily?: string };
};

export function createKigoPaletteOptions(
  theme: KigoContextTheme
): PaletteOptions {
  return {
    error: { main: kigoColors.red, dark: kigoColors.redDarken10 },
    common: { black: kigoColors.black, white: kigoColors.white },
    primary: { main: theme?.palette?.primary?.main ?? kigoColors.blue },
    secondary: { main: theme?.palette?.secondary?.main ?? kigoColors.skyBlue },
    text: {
      primary: kigoColors.black,
      secondary: kigoColors.charcoal,
      disabled: kigoColors.charcoal,
    },
    kigo: kigoColors,
  };
}

export const breakpoints = {
  values: { xs: 0, sm: 420, md: 640, lg: 768, xl: 1025 },
};

const createKigoTypography = (theme: KigoContextTheme) => {
  return {
    fontFamily:
      theme.typography?.fontFamily ?? defaultKigoTheme.typography?.fontFamily,
    titleFontFamily:
      theme.typography?.titleFontFamily ??
      defaultKigoTheme.typography?.fontFamily,
  };
};

export const maxWidth = (breakpoint: keyof typeof breakpoints.values) =>
  `@media (max-width: ${breakpoints.values[breakpoint]}px)`;

export const kigoMuiThemeFactory = (theme: KigoContextTheme) => {
  const kigoPaletteOptions = createKigoPaletteOptions(theme);
  const kigoTypography = createKigoTypography(theme);
  return createTheme({
    breakpoints: breakpoints,
    palette: kigoPaletteOptions,
    typography: {
      fontFamily: kigoTypography?.fontFamily,
      titleXl: {
        fontFamily: kigoTypography?.titleFontFamily,
        fontSize: '50px',
        fontWeight: 800,
        letterSpacing: '0px',
        lineHeight: '50px',
      },
      titleLg: {
        fontFamily: kigoTypography?.titleFontFamily,
        fontSize: '32px',
        fontWeight: 800,
        letterSpacing: '0px',
        lineHeight: '40px',
      },
      titleMd: {
        fontFamily: kigoTypography?.titleFontFamily,
        fontSize: '22px',
        fontWeight: 800,
        letterSpacing: '0px',
        lineHeight: '28px',
      },
      titleSmBd: {
        fontFamily: kigoTypography?.fontFamily,
        fontSize: '16px',
        fontWeight: 800,
        letterSpacing: '0px',
        lineHeight: '24px',
      },
      titleSm: {
        fontFamily: kigoTypography?.fontFamily,
        fontSize: '16px',
        fontWeight: 700,
        letterSpacing: '0px',
        lineHeight: '20px',
      },
      bodyMdBold: {
        fontFamily: kigoTypography?.fontFamily,
        fontSize: '14px',
        fontWeight: 600,
        letterSpacing: '0px',
        lineHeight: '20px',
      },
      bodyMd: {
        fontFamily: kigoTypography?.fontFamily,
        fontSize: '14px',
        fontWeight: 400,
        letterSpacing: '0px',
        lineHeight: '20px',
      },
      bodySmBold: {
        fontFamily: kigoTypography?.fontFamily,
        fontSize: '12px',
        fontWeight: 600,
        letterSpacing: '0px',
        lineHeight: '16px',
      },
      bodySm: {
        fontFamily: kigoTypography?.fontFamily,
        fontSize: '12px',
        fontWeight: 400,
        letterSpacing: '0px',
        lineHeight: '16px',
      },
      bodyXsBold: {
        fontFamily: kigoTypography?.fontFamily,
        fontSize: '10px',
        fontWeight: 600,
        letterSpacing: '0px',
        lineHeight: '16px',
      },
      bodyXs: {
        fontFamily: kigoTypography?.fontFamily,
        fontSize: '10px',
        fontWeight: 400,
        letterSpacing: '0px',
        lineHeight: '16px',
      },
    },
    components: {
      MuiAlert: {
        styleOverrides: {
          action: { color: kigoColors.black },
          root: { color: kigoColors.charcoal },
          standardInfo: ({ theme }: { theme: Theme }) => ({
            backgroundColor: lighten(theme.palette.primary.main, 0.9),
          }),
        },
      },
      MuiAlertTitle: {
        styleOverrides: { root: { fontWeight: 700, color: kigoColors.black } },
      },
      MuiDialogContent: { styleOverrides: { root: { padding: 0 } } },
      MuiDialogActions: { styleOverrides: { root: { padding: 0 } } },
      MuiDialog: {
        styleOverrides: {
          paper: {
            [maxWidth('md')]: {
              margin: 0,
              borderRadius: 0,
              width: '100%',
              maxWidth: '100%',
            },
            margin: '10px',
            maxWidth: 560,
            width: 'calc(100% - 20px)',
            maxHeight: 'calc(100% - 20px)',
            borderRadius: 12,
          },
          root: { '& .MuiDialog-container': { alignItems: 'flex-start' } },
        },
      },
      MuiCheckbox: {
        variants: [
          {
            props: { color: 'error' },
            style: ({ theme }) => ({ color: theme.palette.error.main }),
          },
        ],
      },
      MuiSwitch: {
        styleOverrides: {
          root: ({ theme }: { theme: Omit<Theme, 'components'> }) => ({
            '& .MuiSwitch-thumb': { color: theme?.palette?.grey[700] },
            '& .MuiSwitch-track': {
              backgroundColor: kigoColors?.blackLighten20,
            },
            '& .Mui-checked': {
              '& .MuiSwitch-thumb': { color: theme?.palette?.primary?.main },
            },
          }),
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: ({ theme }: { theme: Omit<Theme, 'components'> }) => ({
            color: theme?.palette?.primary?.main,
          }),
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiInputBase-root': {
              borderRadius: 20,
              padding: '0 15px',
              input: {
                paddingLeft: '4px',
                paddingTop: '15px',
                paddingBottom: '16px',
              },
            },
            '& .MuiInputLabel-root': {
              marginLeft: 4,
              color: kigoColors.black,
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '20px',
              fontFamily: kigoTypography?.fontFamily,
              '&.Mui-focused': { marginLeft: 0 },
            },
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            height: 54,
            padding: '13px 32px',
            fontFamily: theme.typography?.fontFamily,
            fontSize: '16px',
            fontWeight: 700,
            lineHeight: '20px',
            textTransform: 'none',
          },
        },
        variants: [
          {
            props: { variant: 'link' },
            style: ({ theme }) => ({
              color: theme.palette.primary.main,
              padding: 0,
              height: 'auto',
              '&:hover': { backgroundColor: 'transparent' },
            }),
          },
          {
            props: { variant: 'outlined' },
            style: ({ theme }) => ({
              color: theme.palette.primary.main,
              borderColor: theme.palette.primary.main,
              borderWidth: 2,
            }),
          },
          {
            props: { variant: 'outlined', color: 'error' },
            style: ({ theme }) => ({
              color: theme.palette.error.main,
              borderColor: theme.palette.error.main,
              borderWidth: 2,
            }),
          },
          {
            props: { variant: 'outlinedNeutral' },
            style: ({ theme }) => ({
              color: theme.palette.kigo.gray900,
              border: `1px solid ${theme.palette.kigo.gray200}`,
              fontWeight: 400,
            }),
          },
        ],
      },
    },
  });
};

const defaultKigoTheme = {
  palette: { primary: { main: '#4B55FD' }, secondary: { main: '#CCFFFE' } },
  typography: { fontFamily: 'Inter, sans-serif' },
};

const isNotThemeDefined = (theme: KigoContextTheme) => {
  const isThemeDefinedButEmpty = theme && Object.keys(theme).length === 0;
  return isThemeDefinedButEmpty || !theme?.palette?.primary?.main;
};

export const createAppTheme = (theme: KigoContextTheme) => {
  if (isNotThemeDefined(theme)) {
    return kigoMuiThemeFactory(defaultKigoTheme);
  }
  return kigoMuiThemeFactory(theme);
};
