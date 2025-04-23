import { AUTHENTICATION_TYPES } from '@kigo-top/constants';
import { makeClientCoreServerCall } from '../../makeClientServerCall';
import { getMemberId } from './getMemberId';

export interface Card {
  id: string;
  type: string;
  number: string;
}

interface ApiResponse {
  bank_cards: Array<{
    card_type: string;
    last_four_digits: string;
    id: string;
    token: string;
  }>;
}

// Add interface for error handling
export interface ApiError {
  error_code: string;
  error_message: string;
}

export const requestGetCards = async (): Promise<Card[]> => {
  try {
    const { member_id } = await getMemberId();
    if (!member_id) {
      throw new Error('Failed to get member ID');
    }

    const response = (await makeClientCoreServerCall.get(
      `/api/v1/members/${member_id}/cards`,
      {},
      AUTHENTICATION_TYPES.SESSION,
    )) as ApiResponse;

    return response.bank_cards.map(
      (card: ApiResponse['bank_cards'][number]) => ({
        id: card.id,
        type: card.card_type,
        number: card.last_four_digits,
      }),
    );
  } catch (error) {
    // Check if it's our specific not_found error
    if ((error as ApiError)?.error_code === 'not_found') {
      throw error; // Pass through the not_found error with its original structure
    }
    // For all other errors, throw a generic error
    console.error('Error getting cards:', error);
    throw new Error('Unable to load cards. Please refresh the page.');
  }
};
