import axios from 'axios';
import {
  CreateAccountSpaceApiSessionRequest,
  CreateAccountSpaceApiSessionResponse,
  CreatePartnerApiRequest,
  CreatePartnerApiSessionResponse,
  CreateUserSessionRequest,
  CreateUserSessionResponse,
} from '../types/Auth';

const BASE_URL = process.env['NEXT_PUBLIC_CORE_URL'];

export async function createPartnerApiSession({
  partner_id,
  api_key,
}: CreatePartnerApiRequest): Promise<CreatePartnerApiSessionResponse> {
  const response = await axios.post(`${BASE_URL}/api/v1/auth/sessions`, {
    api_key,
    partner_id,
  });

  return response.data;
}

export async function createAccountSpaceApiSession({
  brand_identifier,
  external_user_id,
  user_email,
  token,
}: CreateAccountSpaceApiSessionRequest): Promise<CreateAccountSpaceApiSessionResponse> {
  const response = await axios.post(
    `${BASE_URL}/api/v1/auth/sessions/accounts`,
    { brand_identifier, external_user_id, user_email },
    { headers: { authorization: `Bearer ${token}` } }
  );

  return response.data;
}

// export async function createAnonymousSession() {
//   try {
//     const response = await axios.post(`${BASE_URL}/anonymous-sessions`);

//     if (response.status !== 200) {
//       throw new Error(
//         `Failed to create anonymous session: ${response.statusText}`,
//       );
//     }

//     return { token: response.data.anonymous_session_token };
//   } catch (error) {
//     console.error('Error creating anonymous session:', error);
//     throw error;
//   }
// }

export async function createUserSession({
  user_email,
  external_user_id,
  external_program_id,
  token,
}: CreateUserSessionRequest): Promise<CreateUserSessionResponse> {
  const response = await axios.post(
    `${BASE_URL}/api/v1/accounts/sso-sessions`,
    { user_email, external_user_id, brand_identifier: external_program_id },
    { headers: { authorization: `Bearer ${token}` } }
  );

  return response.data;
}
