import {
  SESSION_TOKEN,
  SESSION_TOKEN_DURATION_MINUTES,
} from '@kigo-top/constants';
import { generateSSOAccountSpaceApiSessionToken } from '@kigo-top/services/core';
import { clearServerCookies, serverSetCookie } from '@kigo-top/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { session_id } = await request.json();

    const accountResponse = await generateSSOAccountSpaceApiSessionToken({
      session_id,
    });

    const response = NextResponse.json(
      {
        token: accountResponse.account_space_api_session_token,
        refresh_token: accountResponse.account_space_api_refresh_token,
        account_id: accountResponse.account_id,
        message: 'Account space API session token generated successfully.',
      },
      { status: 200 }
    );

    clearServerCookies(response);

    serverSetCookie({
      response,
      httpOnly: false,
      name: SESSION_TOKEN,
      value: accountResponse.account_space_api_session_token,
      isDevelopment: false,
      maxAge: SESSION_TOKEN_DURATION_MINUTES,
    });

    return response;
  } catch {
    return NextResponse.json(
      {
        status: 'error',
        message:
          'An unexpected error occurred when generating the account space API session token.',
      },
      { status: 500 }
    );
  }
}
