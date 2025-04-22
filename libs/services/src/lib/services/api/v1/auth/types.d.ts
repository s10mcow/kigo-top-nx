export type ExternalApiSessionResponse = {
  token: string;
  refresh_token: string;
};

export type CreateExternalApiSessionRequest = {
  api_key: string;
  partner_id: string;
};

export type CreateAccountSpaceExternalApiSessionRequest = {
  external_program_id: string;
  external_user_id: string;
  user_email?: string;
};
