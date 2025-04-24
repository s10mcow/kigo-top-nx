import {
  ANONYMOUS_TOKEN,
  SESSION_TOKEN_DURATION_MINUTES,
} from '@kigo-top/constants';
import {
  createAnonymousSession,
  createPartnerApiSession,
  getProgramBrandingInfo,
  getProgramPartnerInfo,
} from '@kigo-top/services/core';
import {
  clearServerCookies,
  getPartnerInfoOnPartnerId,
  serverSetCookie,
} from '@kigo-top/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { external_program_id } = await request.json();

    const anonymousSession = await createAnonymousSession();

    if (!anonymousSession?.anonymous_session_token) {
      return NextResponse.json(
        { status: 'error', message: 'Failed to create anonymous session.' },
        { status: 500 }
      );
    }

    const programPartnerInfo = await getProgramPartnerInfo({
      external_program_id,
      anonymous_session_token: anonymousSession.anonymous_session_token,
    });

    const apiKey = getPartnerInfoOnPartnerId(
      programPartnerInfo.partner_id
    ).partnerApiKey;

    const partnerApiSession = await createPartnerApiSession({
      partner_id: programPartnerInfo.partner_id,
      api_key: apiKey,
    });

    if (!partnerApiSession?.token) {
      return NextResponse.json({
        status: 500,
        message: 'Failed to create partner API session.',
      });
    }

    const programBrandingInfo = await getProgramBrandingInfo({
      external_program_id,
      partner_token: partnerApiSession.token,
    });

    const response = NextResponse.json({
      token: anonymousSession.anonymous_session_token,
      programBrandingInfo,
      partnerInfo: programPartnerInfo,
    });

    clearServerCookies(response);

    serverSetCookie({
      response,
      httpOnly: false,
      name: ANONYMOUS_TOKEN,
      value: anonymousSession.anonymous_session_token,
      isDevelopment: true,
      maxAge: SESSION_TOKEN_DURATION_MINUTES, // 30 minutes
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'An unexpected error occurred creating anonymous session.',
        details: error instanceof Error ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
