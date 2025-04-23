import { AUTHENTICATION_TYPES } from '@kigo-top/constants';
import { makeClientCoreServerCall } from '../makeClientServerCall';

export enum AccountCredentialType {
  Google = 'google',
  Apple = 'apple',
  EmailAndPassword = 'email_and_password',
  Partner = 'partner',
}

export type CheckAccountValidityResponse = {
  exists: boolean;
  credential_type?: AccountCredentialType;
};

const checkAccountValidity = async (
  email: string,
  recaptcha_token: string,
): Promise<CheckAccountValidityResponse> => {
  const response = await makeClientCoreServerCall.post(
    '/accounts/checks/email',
    { email, token: recaptcha_token },
    {},
    AUTHENTICATION_TYPES.ANONYMOUS,
  );

  return response as CheckAccountValidityResponse;
};

export default checkAccountValidity;
