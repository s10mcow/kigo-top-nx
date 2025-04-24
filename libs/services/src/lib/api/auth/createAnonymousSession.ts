import { ANONYMOUS_TOKEN } from '@kigo-top/constants';
import { makeClientCoreServerCall } from '../makeClientServerCall';

const CREATE_ANONYMOUS_SESSION_ROUTE = '/anonymous-sessions';

export type AnonymousSessionTokenResponse = { anonymous_session_token: string };

function setClientCookie(name: string, value: string, minutes: number) {
  const date = new Date();
  date.setMinutes(date.getMinutes() + minutes);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

async function createAnonymousSession(): Promise<AnonymousSessionTokenResponse> {
  try {
    const response = await makeClientCoreServerCall.post(
      CREATE_ANONYMOUS_SESSION_ROUTE
    );

    if (response) {
      setClientCookie(ANONYMOUS_TOKEN, response.anonymous_session_token, 30);
    }

    return response;
  } catch (e) {
    console.error('Error creating anonymous session', e);
    throw e;
  }
}

export default createAnonymousSession;
