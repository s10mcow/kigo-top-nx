import axios from 'axios';
import { GenerateSSOAccountSpaceApiSessionTokenRequest } from '../types/SSO';

export async function clientGenerateSSOAccountSpaceApiSessionToken({
  session_id,
}: GenerateSSOAccountSpaceApiSessionTokenRequest) {
  const response = await axios.post('/api/sso/generate-token', {
    session_id,
  });

  if (response.status !== 200) {
    throw new Error('Failed to generate SSO account space API session token.');
  }

  return response.data;
}
