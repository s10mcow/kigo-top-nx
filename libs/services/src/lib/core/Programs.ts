import axios from 'axios';
import {
  GetProgramBrandingInfoRequest,
  GetProgramPartnerInfoRequest,
  ProgramBrandingInfo,
  ProgramPartnerInfo,
} from '../types/Programs';

const BASE_URL = process.env['NEXT_PUBLIC_CORE_URL'];

export async function getProgramBrandingInfo({
  external_program_id,
  partner_token,
}: GetProgramBrandingInfoRequest): Promise<ProgramBrandingInfo> {
  const response = await axios.get(
    `${BASE_URL}/api/v1/programs/${external_program_id}`,
    {
      headers: {
        Authorization: `Bearer ${partner_token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (response.status !== 200) {
    throw new Error(
      `Failed to fetch program branding info: ${response.statusText}`
    );
  }

  return response.data;
}

export async function getProgramPartnerInfo({
  external_program_id,
  anonymous_session_token,
}: GetProgramPartnerInfoRequest): Promise<ProgramPartnerInfo> {
  const response = await axios.get(
    `${BASE_URL}/api/v1/programs/${external_program_id}/partner`,
    {
      headers: {
        Authorization: `Bearer ${anonymous_session_token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (response.status !== 200) {
    throw new Error(
      `Failed to fetch program partner info: ${response.statusText}`
    );
  }

  return response.data;
}
