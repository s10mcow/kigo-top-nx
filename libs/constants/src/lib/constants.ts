export const ACCESS_TOKEN = 'ACCESS_TOKEN';
export const ACCESS_TOKEN_DURATION_MINUTES = 30; // 30 minutes

export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const REFRESH_TOKEN_DURATION_MINUTES = 12 * 60 * 90; // 90 days

export const SESSION_TOKEN = 'SESSION_TOKEN';
export const SESSION_TOKEN_DURATION_MINUTES = 60; // 1 hour

export const SESSION_REFRESH_TOKEN = 'SESSION_REFRESH_TOKEN';
export const SESSION_REFRESH_TOKEN_DURATION_MINUTES = 24 * 60 * 90; // 90 days

export const ANONYMOUS_TOKEN = 'ANONYMOUS_TOKEN';
export const ANONYMOUS_TOKEN_DURATION_MINUTES = 30; // 30 minutes

export const LOCAL_STORAGE_PARTNER_INFO = 'partnerInfo';
export const LOCAL_STORAGE_EXTERNAL_PROGRAM_ID = 'externalProgramId';
export const LOCAL_STORAGE_IS_SSO_SESSION = 'is_sso_session';
export const CASH_BACK_PARTNER = 'Mastercard';

export const PRIVACY_POLICY_URL = 'https://kigo.io/privacy/';
export const TERMS_OF_SERVICE_URL = 'https://kigo.io/terms/';
export const HELP_AND_FAQS_URL =
  'https://help.kigo.io/hc/en-us/categories/27937106287003-Kigo-Help-Center';

export const LANDING_PAGE = '/app';
export const OFFER_PAGE = '/app/offers';
export const LOGIN_EMAIL_PAGE = '/login/email';
export const LOGIN_PAGE = '/login';
export const LOGIN_FORGOT_PASSWORD_PAGE = '/login/forgot-password';
export const LOGIN_RESET_PASSWORD_PAGE = '/login/reset-password';
export const LOGIN_RESET_PASSWORD_INVALID_PAGE =
  '/login/reset-password/invalid';
export const LOGIN_RESET_PASSWORD_SUCCESS_PAGE =
  '/login/reset-password/success';
export const LOGIN_RESET_PASSWORD_EXPIRED_PAGE =
  '/login/reset-password/expired';
export const INVALID_RESET_PASSWORD_PAGE = '/login/reset-password/invalid';
export const VERIFY_EMAIL_PAGE = (email: string) =>
  `/signup?step=verifyEmail&email=${encodeURIComponent(email)}`;
export const OAUTH_SIGNUP_PAGE = '/signup?step=ssoLegal';
export const SIGNUP_NOTIFICATION_PERMISSIONS_PAGE =
  '/signup?step=notificationPermissions';
export const WALLET_PAGE = '/wallet';
export const SIGNUP_NAME_PAGE = (email: string) => {
  return `/signup?step=name&email=${encodeURIComponent(email)}`;
};
export enum AuthProvider {
  Google = 'Google',
  Apple = 'Apple',
}

export enum AUTHENTICATION_TYPES {
  ANONYMOUS = `${ANONYMOUS_TOKEN}`,
  ACCESS = `${ACCESS_TOKEN}`,
  SESSION = `${SESSION_TOKEN}`,
}

export const PARTNER_CONFIG: Record<string, { id: string; apiKey: string }> = {
  masterCard: {
    id: process.env['KIGO_EXTERNAL_PARTNER_ID_MASTERCARD'] || '',
    apiKey: process.env['KIGO_EXTERNAL_PARTNER_API_KEY_MASTERCARD'] || '',
  },
  kigo: {
    id: process.env['KIGO_EXTERNAL_PARTNER_ID_KIGO'] || '',
    apiKey: process.env['KIGO_EXTERNAL_PARTNER_API_KEY_KIGO'] || '',
  },
  interval: {
    id: process.env['KIGO_EXTERNAL_PARTNER_ID_INTERVAL'] || '',
    apiKey: process.env['KIGO_EXTERNAL_PARTNER_API_KEY_INTERVAL'] || '',
  },
};

export const SNACKBAR_VARIANTS = {
  KIGO_ERROR: 'kigoError' as const,
  KIGO_INFO: 'kigoInfo' as const,
} as const;

export type SnackbarVariant =
  (typeof SNACKBAR_VARIANTS)[keyof typeof SNACKBAR_VARIANTS];
