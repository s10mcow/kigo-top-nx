import axios from 'axios';
import {
  GenerateSSOAccountSpaceApiSessionTokenRequest,
  GenerateSSOAccountSpaceApiSessionTokenResponse,
} from '../types/SSO';

const BASE_URL = process.env['NEXT_PUBLIC_CORE_URL'];

export async function generateSSOAccountSpaceApiSessionToken({
  session_id,
}: GenerateSSOAccountSpaceApiSessionTokenRequest): Promise<GenerateSSOAccountSpaceApiSessionTokenResponse> {
  const response = await axios.patch(`${BASE_URL}/sso/sessions/api/accounts`, {
    session_id,
  });

  return response.data;
}
