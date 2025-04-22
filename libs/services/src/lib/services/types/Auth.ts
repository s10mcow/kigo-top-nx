export type CreatePartnerApiSessionResponse = { token: string };

export type CreatePartnerApiRequest = { partner_id: string; api_key: string };

export type CreateAccountSpaceApiSessionRequest = {
  brand_identifier: string;
  external_user_id: string;
  user_email?: string | null;
  token?: string;
};

export type CreateAccountSpaceApiSessionResponse = {
  token: string;
  account_id: string;
};

export type AnonymousSessionTokenResponse = { anonymous_session_token: string };

export type CreateUserSessionRequest = {
  user_email: string;
  external_user_id: string;
  external_program_id: string;
  token: string;
};

export type CreateUserSessionResponse = { session_id: string };
