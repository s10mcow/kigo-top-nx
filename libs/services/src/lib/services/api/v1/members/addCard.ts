import { AUTHENTICATION_TYPES } from '@kigo-top/constants';
import { makeClientCoreServerCall } from '../../makeClientServerCall';
import requestEnrollMember from './enrollMember';
import { getMemberId } from './getMemberId';
import { AddMemberCardRequest } from './types';

interface ApiError {
  error_code: string;
  error_message: string;
}

interface UserInfo {
  email: string;
  first_name: string;
  last_name: string;
  zip_code: string;
}

export const requestAddMemberCard = async (
  request: AddMemberCardRequest,
  userInfo?: UserInfo,
): Promise<void> => {
  let member_id;
  let is_enrolled = false;

  try {
    const result = await getMemberId();
    member_id = result.member_id;
    is_enrolled = true;
  } catch (error) {
    const apiError = error as ApiError;
    if (
      apiError.error_code === 'not_found' &&
      apiError.error_message === 'Member not found in rewards network.'
    ) {
      is_enrolled = false;
    } else {
      throw error;
    }
  }

  if (!is_enrolled) {
    if (!userInfo) {
      throw new Error('User information required for member enrollment');
    }

    try {
      // Enroll the member (which will also add the card)
      await requestEnrollMember({
        encrypted_card_number: request.encrypted_card_number,
        email: userInfo.email,
        email_opt_in: false,
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        zip_code: userInfo.zip_code,
      });
    } catch (error) {
      console.error('Error enrolling member:', error);
      throw error;
    }

    return;
  }

  if (member_id) {
    try {
      await makeClientCoreServerCall.post(
        `/api/v1/members/${member_id}/cards`,
        request,
        {},
        AUTHENTICATION_TYPES.SESSION,
      );
    } catch (error) {
      console.error('Error adding member card:', error);
      throw error;
    }
  }

  return;
};
