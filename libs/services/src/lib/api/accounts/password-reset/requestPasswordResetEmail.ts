import { makeClientCoreServerCall } from '../../makeClientServerCall';
import { PasswordResetEmailRequest } from './types';

const requestPasswordResetEmail = async (
  request: PasswordResetEmailRequest,
): Promise<void> => {
  await makeClientCoreServerCall.post(
    '/accounts/password-reset-requests',
    request,
  );
};

export default requestPasswordResetEmail;
