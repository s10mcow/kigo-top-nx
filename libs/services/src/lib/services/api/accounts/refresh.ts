import { makeClientCoreServerCall } from '../makeClientServerCall';
import { RefreshAccessTokenRequest, RefreshAccessTokenResponse } from './types';

const REFRESH_ACCOUNT_ACCESS_TOKEN_ROUTE = '/accounts/access-tokens/refresh';
const REFRESH_ACCESS_TOKEN_ROUTE = '/api/v1/auth/sessions/accounts/refresh';

export const refreshAccountAccessToken = async (
  request: RefreshAccessTokenRequest,
): Promise<string> => {
  const response = await makeClientCoreServerCall.post(
    REFRESH_ACCOUNT_ACCESS_TOKEN_ROUTE,
    request,
  );

  return response.access_token;
};

export const refreshAccessToken = async (
  request: RefreshAccessTokenRequest,
): Promise<RefreshAccessTokenResponse> => {
  const response = await makeClientCoreServerCall.post(
    REFRESH_ACCESS_TOKEN_ROUTE,
    request,
  );
  return response;
};
