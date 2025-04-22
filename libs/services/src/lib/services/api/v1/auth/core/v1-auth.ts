import { makeServersideCoreServerCall } from '../../../core-index';
import {
  CreateAccountSpaceExternalApiSessionRequest,
  CreateExternalApiSessionRequest,
  ExternalApiSessionResponse,
} from '../types';

const CREATE_EXTERNAL_API_SESSION_ROUTE = '/api/v1/auth/sessions';
const CREATE_ACCOUNT_SPACE_EXTERNAL_API_SESSION_ROUTE =
  '/api/v1/auth/sessions/accounts';

//createPartnerApiSession
export async function createExternalApiSession(
  request: CreateExternalApiSessionRequest
): Promise<ExternalApiSessionResponse> {
  const response = await makeServersideCoreServerCall.post(
    CREATE_EXTERNAL_API_SESSION_ROUTE,
    request
  );

  if (!response.token) {
    throw new Error('No token in response');
  }

  return response;
}
//createAccountSpaceApiSession
export async function createAccountSpaceExternalApiSession(
  request: CreateAccountSpaceExternalApiSessionRequest,
  token: string
): Promise<ExternalApiSessionResponse> {
  const response = await makeServersideCoreServerCall.post(
    CREATE_ACCOUNT_SPACE_EXTERNAL_API_SESSION_ROUTE,
    request,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.token) {
    throw new Error('No token in response');
  }

  return response;
}
