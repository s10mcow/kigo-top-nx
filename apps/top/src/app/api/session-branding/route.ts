import {
  createAnonymousSession,
  createPartnerApiSession,
  getProgramBrandingInfo,
  getProgramPartnerInfo,
} from '@kigo-top/services/core';
import { getPartnerInfoOnPartnerId } from '@kigo-top/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { brand_identifier } = await request.json();

    const anonymousSessionToken = await createAnonymousSession();

    const partnerInfo = await getProgramPartnerInfo({
      external_program_id: brand_identifier,
      anonymous_session_token: anonymousSessionToken.anonymous_session_token,
    });

    // map partner info to partner api key
    const partner_api_key = getPartnerInfoOnPartnerId(
      partnerInfo.partner_id
    ).partnerApiKey;

    if (!partner_api_key) {
      return NextResponse.json(
        { status: 'error', message: 'Partner API key not found.' },
        { status: 500 }
      );
    }

    const partnerApiSessionResponse = await createPartnerApiSession({
      api_key: partner_api_key,
      partner_id: partnerInfo.partner_id,
    });

    if (!partnerApiSessionResponse?.token) {
      return NextResponse.json(
        { status: 'error', message: 'Failed to create external API session.' },
        { status: 500 }
      );
    }

    let branding;

    try {
      branding = await getProgramBrandingInfo({
        external_program_id: brand_identifier,
        partner_token: partnerApiSessionResponse.token,
      });
    } catch {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Failed to retrieve branding information.',
        },
        { status: 500 }
      );
    }

    const response = NextResponse.json(
      { branding, partnerInfo },
      { status: 200 }
    );

    return response;
  } catch {
    return NextResponse.json(
      { status: 'error', message: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
