import { AUTHENTICATION_TYPES } from '@kigo-top/constants';
import { makeClientCoreServerCall } from '../../makeClientServerCall';
import { VerifyPasswordResetCodeRequest } from './types';

const verifyPasswordResetCode = async (
  request: VerifyPasswordResetCodeRequest,
): Promise<void> => {
  await makeClientCoreServerCall.get(
    `/accounts/password-reset-requests/verify?code=${request.code}`,
    {},
    AUTHENTICATION_TYPES.ANONYMOUS,
  );
};

export default verifyPasswordResetCode;
