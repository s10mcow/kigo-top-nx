import {
  ACCESS_TOKEN,
  ANONYMOUS_TOKEN,
  REFRESH_TOKEN,
  SESSION_REFRESH_TOKEN,
  SESSION_TOKEN,
} from '@kigo-top/constants';
import { NextResponse } from 'next/server';

export type serverSetCookieType = {
  httpOnly: boolean;
  name: string;
  value: string;
  maxAge: number;
};

export function serverSetCookie({
  response,
  httpOnly,
  name,
  value,
  isDevelopment,
  maxAge,
}: {
  response: NextResponse;
  httpOnly: boolean;
  name: string;
  value: string;
  isDevelopment: boolean;
  maxAge: number;
}) {
  response.cookies.set(name, value, {
    httpOnly, // Prevents client-side JavaScript from reading the cookie if set to true /// false for client-side access
    secure: !isDevelopment, // Ensures the cookie is only sent over HTTPS for development environments we can set this to false as our local environment is not secure
    path: '/',
    maxAge,
  });
}

export function getCookie(name: string) {
  if (typeof document !== 'undefined') {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
  }

  return '';
}

export function clearAuthTokens() {
  deleteClientCookie(SESSION_TOKEN);
  deleteClientCookie(ANONYMOUS_TOKEN);
  deleteClientCookie(ACCESS_TOKEN);
  deleteClientCookie(REFRESH_TOKEN);
  deleteClientCookie(SESSION_REFRESH_TOKEN);

  sessionStorage.clear();
}

export function setClientCookie(name: string, value: string, minutes: number) {
  const date = new Date();
  date.setMinutes(date.getMinutes() + minutes);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

export function deleteClientCookie(name: string) {
  document.cookie = `${name}=; Max-Age=0; path=/`;
}

export function clearServerCookies(response: NextResponse) {
  response.cookies.delete(ANONYMOUS_TOKEN);
  response.cookies.delete(SESSION_TOKEN);
}
