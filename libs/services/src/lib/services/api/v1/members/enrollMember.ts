import { AUTHENTICATION_TYPES } from '@kigo-top/constants';
import { makeClientCoreServerCall } from '../../makeClientServerCall';
import { EnrollMemberRequest } from './types';

const requestEnrollMember = async (
  request: EnrollMemberRequest,
): Promise<void> => {
  try {
    await makeClientCoreServerCall.post(
      `/api/v1/members/enroll`,
      request,
      {},
      AUTHENTICATION_TYPES.SESSION,
    );
  } catch (error) {
    console.error('Error enrolling member:', error);
    throw error;
  }
};

export default requestEnrollMember;
