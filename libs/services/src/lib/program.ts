import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ProgramBrandingInfo } from './types/Programs';

export type Program = { program_id: string; program_name: string };

export type PartnerInfo = { partner_id: string; partner_name: string };

// Fetch a list of all programs
export const fetchBrandingByExternalProgramId = async (
  external_program_id?: string
): Promise<{
  programBrandingInfo: ProgramBrandingInfo;
  partnerInfo: PartnerInfo;
  token: string;
}> => {
  if (!external_program_id) {
    throw new Error('External program ID is required');
  }

  const response = await axios.post('/api/programs', { external_program_id });

  if (response.status !== 200) {
    throw new Error('Failed to fetch programs');
  }

  return response.data;
};

export const useGetBrandingByExternalProgramId = (
  external_program_id?: string
) => {
  return useQuery({
    queryKey: ['programs', external_program_id],
    queryFn: () => fetchBrandingByExternalProgramId(external_program_id),
    refetchOnWindowFocus: false,
    enabled: Boolean(external_program_id),
  });
};
