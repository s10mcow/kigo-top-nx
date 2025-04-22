import { AUTHENTICATION_TYPES } from '@kigo-top/constants';
import { getCookie } from '../../../../providers/cookies';
import { makeClientCoreServerCall } from '../../makeClientServerCall';

export interface MemberIdResponse {
  member_id: string;
  is_active: boolean;
}

interface ApiError {
  error_code: string;
  error_message: string;
}

export const getMemberId = async (): Promise<MemberIdResponse> => {
  const sessionToken = getCookie(AUTHENTICATION_TYPES.ACCESS);
  if (!sessionToken) {
    throw new Error('No session token found');
  }

  const response = await makeClientCoreServerCall.get(
    '/api/v1/members/id',
    {},
    AUTHENTICATION_TYPES.SESSION
  );

  if (response.error_code === 'not_found') {
    throw {
      error_code: 'not_found',
      error_message: 'Member not found in rewards network.',
    } as ApiError;
  }

  return response;
};
