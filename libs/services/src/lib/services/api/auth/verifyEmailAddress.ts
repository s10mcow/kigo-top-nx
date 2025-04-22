import { AUTHENTICATION_TYPES } from '@kigo-top/constants';
import { makeClientCoreServerCall } from '../makeClientServerCall';

const PATCH_VERIFY_EMAIL_VERIFICATION_REQUEST =
  '/accounts/onboarding/email-verification-requests/verify';

export type OnboardingStage = 'account_created' | 'email_verified';

export type VerifyEmailVerificationCodeRequest = { code: string };

export type VerifyEmailVerificationCodeResponse = {
  account_id: string;
  mobile_onboarding_stage: OnboardingStage;
};

export default async function verifyEmailVerificationCode(
  request: VerifyEmailVerificationCodeRequest,
): Promise<VerifyEmailVerificationCodeResponse> {
  const response = await makeClientCoreServerCall.patch(
    PATCH_VERIFY_EMAIL_VERIFICATION_REQUEST,
    request,
    {},
    AUTHENTICATION_TYPES.ANONYMOUS,
  );

  return response;
}
