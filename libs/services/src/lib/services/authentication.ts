import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ProgramBrandingInfo, ProgramPartnerInfo } from './types/Programs';

type SessionBrandingResponse = {
  branding: ProgramBrandingInfo;
  partnerInfo: ProgramPartnerInfo;
  accountId: string;
  searchCriteria?: string;
};

export const fetchSessionBranding = async (
  brandIdentifier: string
): Promise<SessionBrandingResponse> => {
  const response = await axios.post('/api/session-branding', {
    brand_identifier: brandIdentifier,
  });

  if (response.status !== 200) {
    throw new Error('Failed to fetch session');
  }

  return response.data;
};

export const useSessionBranding = (brandIdentifier: string) =>
  useQuery({
    queryKey: ['session-branding'],
    queryFn: () => fetchSessionBranding(brandIdentifier),
    refetchOnWindowFocus: false, // prevent refetching on window focus to avoid making unnecessary requests
  });
