import { AUTHENTICATION_TYPES } from '@kigo-top/constants';
import { useMutation } from '@tanstack/react-query';
import { makeClientCoreServerCall } from '../makeClientServerCall';
import type { UpdateCommunicationPreferencesRequest } from './types';

const POST_COMMUNICATION_PREFERENCES_ROUTE =
  '/api/v1/accounts/communication-preferences';

const updateCommunicationPreferences = async (
  request: UpdateCommunicationPreferencesRequest,
): Promise<void> => {
  const response = await makeClientCoreServerCall.post(
    POST_COMMUNICATION_PREFERENCES_ROUTE,
    request,
    {},
    AUTHENTICATION_TYPES.SESSION,
  );

  return response;
};

export const useUpdateCommunicationPreferences = () => {
  return useMutation({
    mutationFn: updateCommunicationPreferences,
    mutationKey: ['updateCommunicationPreferences'],
  });
};
