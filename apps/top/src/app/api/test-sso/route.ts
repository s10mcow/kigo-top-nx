import {
  createPartnerApiSession,
  createUserSession,
} from '@kigo-top/services/core';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const {
      api_key,
      partner_id,
      user_email,
      external_user_id,
      external_program_id,
    } = await request.json();

    const partnerApiSessionResponse = await createPartnerApiSession({
      api_key,
      partner_id,
    });

    if (!partnerApiSessionResponse?.token) {
      return NextResponse.json(
        { status: 'error', message: 'Failed to create external API session.' },
        { status: 500 }
      );
    }

    const userSessionResponse = await createUserSession({
      user_email,
      external_user_id,
      external_program_id,
      token: partnerApiSessionResponse.token,
    });

    return NextResponse.json(
      {
        status: 'success',
        message: 'Partner API key found.',
        session_id: userSessionResponse.session_id,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { status: 'error', message: 'Partner API key not found.' },
      { status: 500 }
    );
  }
}
