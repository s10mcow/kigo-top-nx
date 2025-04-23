import logOut from './auth';
import { useUpdateCommunicationPreferences } from './communication-preferences';
import { updateNotifications } from './notifications/updateNotifications';
import requestPasswordResetEmail from './password-reset/requestPasswordResetEmail';
import resetPassword from './password-reset/resetPassword';
import verifyPasswordResetCode from './password-reset/verifyResetCode';
import editProfile from './profile/editProfile';
import { refreshAccessToken, refreshAccountAccessToken } from './refresh';

export type * from './types';

export {
  editProfile,
  logOut,
  refreshAccessToken,
  refreshAccountAccessToken,
  requestPasswordResetEmail,
  resetPassword,
  updateNotifications,
  useUpdateCommunicationPreferences,
  verifyPasswordResetCode,
};
