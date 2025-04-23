import { makeClientCoreServerCall } from '../../makeClientServerCall';
import { ResetPasswordRequest } from './types';

const resetPassword = async (request: ResetPasswordRequest): Promise<void> => {
  await makeClientCoreServerCall.patch(
    '/accounts/password-reset-requests',
    request,
  );
};

export default resetPassword;
