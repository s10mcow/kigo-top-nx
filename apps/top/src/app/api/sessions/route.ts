import { NextResponse } from 'next/server';
import * as yup from 'yup';

import {
  createAccountSpaceExternalApiSession,
  CreateAccountSpaceExternalApiSessionRequest,
  createAnonymousSession,
  createExternalApiSession,
  CreateExternalApiSessionRequest,
  GetAccountResponse,
  getProgramPartnerInfo,
  makeServersideCoreServerCall,
} from '@kigo-top/services/core';
import { getPartnerInfoOnPartnerId } from '@kigo-top/utils';
interface CreateApiSessionBody {
  external_program_id: string;
}

const requestBodySchema = yup.object({
  external_program_id: yup.string().required(),
});

export async function POST(request: Request) {
  const authHeader = request.headers.get('Authorization');
  const token = (authHeader && authHeader.split(' ')[1]) || '';

  try {
    const rawBody = await request.json();
    const body: CreateApiSessionBody = await requestBodySchema.validate(
      rawBody,
      { abortEarly: false }
    );

    const getAccountResponse: GetAccountResponse =
      await makeServersideCoreServerCall.get('/accounts', {
        headers: { authorization: `Bearer ${token}` },
      });

    if (!getAccountResponse) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'API call to is not authorized by an account access token.',
        },
        { status: 401 }
      );
    }

    const anonymousSession = await createAnonymousSession();

    const programPartnerInfo = await getProgramPartnerInfo({
      external_program_id: body.external_program_id,
      anonymous_session_token: anonymousSession.anonymous_session_token,
    });

    const api_key = getPartnerInfoOnPartnerId(
      programPartnerInfo.partner_id
    ).partnerApiKey;
    const partner_id = programPartnerInfo.partner_id;
    const external_program_id = body.external_program_id;

    if (!api_key || !partner_id || !external_program_id) {
      const missingString = `Missing: ${!api_key && 'API key'} ${
        !partner_id && 'partner ID'
      } ${!external_program_id && 'external program id'}`;
      throw new Error(missingString);
    }
    // Create External API Session
    const externalApiSessionRequest: CreateExternalApiSessionRequest = {
      api_key,
      partner_id,
    };
    const apiSessionResponse = await createExternalApiSession(
      externalApiSessionRequest
    );

    const { token: apiSessionToken } = apiSessionResponse;

    // Create Account Session
    const accountSpaceSessionRequest: CreateAccountSpaceExternalApiSessionRequest =
      {
        external_program_id,
        external_user_id: getAccountResponse.id,
        user_email: getAccountResponse.email,
      };
    const accountSpaceSessionResponse =
      await createAccountSpaceExternalApiSession(
        accountSpaceSessionRequest,
        apiSessionToken
      );

    const { token: accountSpaceSessionToken, refresh_token } =
      accountSpaceSessionResponse;

    return NextResponse.json(
      { token: accountSpaceSessionToken, refresh_token },
      { status: 201 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        status: 'error',
        message:
          error instanceof Error ? error.message : 'An unknown error occurred',
      },
      { status: 500 }
    );
  }
}
