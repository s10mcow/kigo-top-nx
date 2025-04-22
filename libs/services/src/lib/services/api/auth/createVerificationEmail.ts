import { makeClientCoreServerCall } from '../makeClientServerCall';

export type CreateVerificationEmailResponse = {
  email: string;
};

const createVerificationEmail =
  async (): Promise<CreateVerificationEmailResponse> => {
    const response = await makeClientCoreServerCall.post(
      '/accounts/onboarding/email-verification-requests',
    );

    return response as CreateVerificationEmailResponse;
  };

export default createVerificationEmail;
