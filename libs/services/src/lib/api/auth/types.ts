export enum MobileOnboardingStage {
  AccountCreated = 'account_created',
  EmailVerified = 'email_verified',
}

export type GetAccountResponse = {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  user_name?: string;
  mobile_onboarding_stage?: MobileOnboardingStage;
  zip_code?: string;
};
