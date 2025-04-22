export type EditProfileRequest = {
  first_name?: string;
  last_name?: string;
  zip_code?: string;
  is_account_space_api_session?: boolean;
};

export type EditProfileResponse = {
  account_id: string;
  created_at: Date;
  updated_at: Date;
  first_name?: string;
  last_name?: string;
  user_name?: string;
  zip_code?: string;
};

// Request Account Deletion
type ZendeskTicket = {
  url: string;
  id: number;
  subject?: string;
  description?: string;
};

export type InitiateAccountClosureResponse = {
  ticket: ZendeskTicket;
} | null;

// Log out

export type LogOutRequest = {
  refresh_token: string;
};

export type UpdateCommunicationPreferencesRequestWithFallback = {
  opt_in_email: boolean;
  opt_in_sms: boolean;
  opt_in_push_notification: boolean;
  token_as_email: string;
};

export type UpdateCommunicationPreferencesRequest = {
  opt_in_email: boolean;
  opt_in_sms: boolean;
  opt_in_push_notification: boolean;
};

export type RegisterCommunicationPreferencesRequest = {
  subscriptions: Subscription[];
};

export type Subscription = {
  type: string;
  token: string;
  enabled: boolean;
};

export type RefreshAccessTokenRequest = {
  refresh_token: string;
};

export type RefreshAccessTokenResponse = {
  token: string;
  refresh_token: string;
};
