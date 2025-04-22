import { AUTHENTICATION_TYPES } from '@kigo-top/constants';
import { makeClientCoreServerCall } from '../makeClientServerCall';
import {
  AccountLogInResponse,
  SignInWithAppleRequest,
  SignInWithEmailAndPasswordRequest,
  SignInWithGoogleRequest,
  SignUpWithEmailAndPasswordRequest,
} from './types';

export async function signInWithGoogle(
  request: SignInWithGoogleRequest,
): Promise<AccountLogInResponse> {
  const data = await makeClientCoreServerCall.post(
    '/accounts/log-in/sso/google',
    request,
    {},
    AUTHENTICATION_TYPES.ANONYMOUS,
  );

  return data;
}

export async function signInWithApple(
  request: SignInWithAppleRequest,
): Promise<AccountLogInResponse> {
  const data = await makeClientCoreServerCall.post(
    '/accounts/log-in/sso/apple',
    request,
    {},
    AUTHENTICATION_TYPES.ANONYMOUS,
  );

  return data as AccountLogInResponse;
}

export async function signInWithEmailAndPassword(
  request: SignInWithEmailAndPasswordRequest,
): Promise<AccountLogInResponse> {
  const data = await makeClientCoreServerCall.post(
    '/accounts/log-in/email-and-password',
    request,
    {},
    AUTHENTICATION_TYPES.ANONYMOUS,
  );

  return data as AccountLogInResponse;
}

export async function signUpWithEmailAndPassword(
  request: SignUpWithEmailAndPasswordRequest,
): Promise<AccountLogInResponse> {
  const data = await makeClientCoreServerCall.post(
    '/accounts/sign-up/email-and-password',
    request,
    {},
    AUTHENTICATION_TYPES.ANONYMOUS,
  );

  return data as AccountLogInResponse;
}
