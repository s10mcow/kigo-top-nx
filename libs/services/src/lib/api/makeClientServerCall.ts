import {
  ACCESS_TOKEN,
  ANONYMOUS_TOKEN,
  AUTHENTICATION_TYPES,
} from '@kigo-top/constants';
import { getCookie } from '../getCookie';
import createAnonymousSession from './auth/createAnonymousSession';

const makeCoreServerCall = async (
  method: string,
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: Record<string, any> | null = null,
  options?: RequestInit,
  authenticationTypeOverride?: AUTHENTICATION_TYPES
) => {
  let jwt: string | undefined = '';
  if (!authenticationTypeOverride) {
    jwt = getCookie(ACCESS_TOKEN)
      ? getCookie(ACCESS_TOKEN)
      : getCookie(ANONYMOUS_TOKEN);
  } else {
    jwt = getCookie(authenticationTypeOverride);

    if (!jwt && authenticationTypeOverride === AUTHENTICATION_TYPES.ANONYMOUS) {
      const authResponse = await createAnonymousSession();
      jwt = authResponse.anonymous_session_token;
    }
  }
  const params: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${jwt}`,
      ...options?.headers,
    },
    ...options,
  };

  if (body) {
    params.body = JSON.stringify(body);
  }

  const response = await fetch(`/api/internal${url}`, { ...params });

  const data = await response.json();

  if (!response.ok) {
    return Promise.reject(data);
  }

  return data;
};

export const makeClientCoreServerCall = {
  get: (
    url: string,
    options?: RequestInit,
    authenticationTypeOverride?: AUTHENTICATION_TYPES
  ) =>
    makeCoreServerCall('GET', url, null, options, authenticationTypeOverride),
  post: (
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: Record<string, any>,
    options?: RequestInit,
    authenticationTypeOverride?: AUTHENTICATION_TYPES
  ) =>
    makeCoreServerCall('POST', url, body, options, authenticationTypeOverride),
  patch: (
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: Record<string, any>,
    options?: RequestInit,
    authenticationTypeOverride?: AUTHENTICATION_TYPES
  ) =>
    makeCoreServerCall('PATCH', url, body, options, authenticationTypeOverride),
  delete: (
    url: string,
    options?: RequestInit,
    authenticationTypeOverride?: AUTHENTICATION_TYPES
  ) =>
    makeCoreServerCall(
      'DELETE',
      url,
      null,
      options,
      authenticationTypeOverride
    ),
};
