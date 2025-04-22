import checkAccountValidity, {
  AccountCredentialType,
} from './checkAccountValidity';
import createAnonymousSession from './createAnonymousSession';
import createVerificationEmail from './createVerificationEmail';
import getAccount from './getAccount';
import { useUnsubscribeEmailAddress } from './unsubscribeEmailAddress';
import verifyEmailVerificationCode from './verifyEmailAddress';

import type { CheckAccountValidityResponse } from './checkAccountValidity';
import type { CreateVerificationEmailResponse } from './createVerificationEmail';

export {
  AccountCredentialType,
  checkAccountValidity,
  createAnonymousSession,
  createVerificationEmail,
  getAccount,
  useUnsubscribeEmailAddress,
  verifyEmailVerificationCode,
};

export type { CheckAccountValidityResponse, CreateVerificationEmailResponse };

export * from './types';
