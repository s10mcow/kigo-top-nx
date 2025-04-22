import { makeClientCoreServerCall } from '../../makeClientServerCall';
import {
  RegisterCommunicationPreferencesRequest,
  UpdateCommunicationPreferencesRequest,
  UpdateCommunicationPreferencesRequestWithFallback as UpdateCommunicationPreferencesRequestWithCreateFallback,
} from '../types';

// Constants for error handling
const NO_EXISTING_PREFERENCE_ERROR = {
  error_code: 'internal_error',
  error_message: 'Invalid input for account notifications.',
} as const;

type ApiError = {
  error_code: string;
  error_message: string;
};

const isApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'error_code' in error &&
    'error_message' in error
  );
};

const isNoExistingPreferenceError = (error: ApiError): boolean => {
  return (
    error.error_code === NO_EXISTING_PREFERENCE_ERROR.error_code &&
    error.error_message === NO_EXISTING_PREFERENCE_ERROR.error_message
  );
};

/*
  Update or Create a new notification preference

  If the user does not have a notification preference, then onesignal returns a 400 error with the following message:
  {error_code: "internal_error", error_message: "Invalid input for account notifications."}

  We catch this exact message and use it to instead create a new notification preference
*/
export const updateNotifications = async (
  request: UpdateCommunicationPreferencesRequestWithCreateFallback,
): Promise<void> => {
  // Validate required fields
  if (!request.token_as_email) {
    throw new Error('Email token is required for notification preferences');
  }

  // Strip out only the relevant fields for the original update request
  const updateRequest: UpdateCommunicationPreferencesRequest = {
    opt_in_email: request.opt_in_email,
    opt_in_sms: request.opt_in_sms,
    opt_in_push_notification: request.opt_in_push_notification,
  };

  try {
    await makeClientCoreServerCall.patch(
      '/accounts/notifications',
      updateRequest,
    );
  } catch (error: unknown) {
    if (isApiError(error) && isNoExistingPreferenceError(error)) {
      const fallbackRequest: RegisterCommunicationPreferencesRequest = {
        subscriptions: [
          {
            type: 'email',
            token: request.token_as_email,
            enabled: request.opt_in_email,
          },
        ],
      };

      await makeClientCoreServerCall.post(
        '/accounts/notifications',
        fallbackRequest,
      );
      return;
    }

    // not the error we expect for no existing notification preference
    throw error;
  }
};
