export type GenerateSSOAccountSpaceApiSessionTokenRequest = {
  session_id: string;
};

export type GenerateSSOAccountSpaceApiSessionTokenResponse = {
  account_space_api_session_token: string;
  account_space_api_refresh_token: string;
  account_id: string;
};
