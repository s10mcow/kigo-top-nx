import { AUTHENTICATION_TYPES } from '@kigo-top/constants';
import { makeClientCoreServerCall } from '../../makeClientServerCall';
import { getMemberId } from './getMemberId';

interface ApiError {
  error_code: string;
  error_message: string;
}

const isApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'error_code' in error &&
    'error_message' in error
  );
};

export const requestRemoveCard = async (cardId: string): Promise<void> => {
  try {
    const { member_id } = await getMemberId();
    if (!member_id) {
      throw new Error('Failed to get member ID');
    }

    const response = await makeClientCoreServerCall.delete(
      `/api/v1/members/${member_id}/cards/${cardId}`,
      {},
      AUTHENTICATION_TYPES.SESSION,
    );

    // Check if the response itself contains an error
    if (response && isApiError(response)) {
      throw response;
    }
  } catch (error) {
    console.error('Error removing card:', error);
    // If it's already an API error, pass it through
    if (isApiError(error)) {
      throw error;
    }
    // Otherwise, wrap it in a generic error
    throw new Error('An unexpected error occurred while removing the card.');
  }
};
