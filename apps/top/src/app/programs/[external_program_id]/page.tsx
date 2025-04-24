'use client';

import {
  CASH_BACK_PARTNER,
  LOCAL_STORAGE_IS_SSO_SESSION,
  LOCAL_STORAGE_PARTNER_INFO,
} from '@kigo-top/constants';
import { useBranding, useSession } from '@kigo-top/providers';
import { useGetBrandingByExternalProgramId } from '@kigo-top/services/client';
import { ProgramPartnerInfo } from '@kigo-top/services/core';
import { Box, CircularProgress } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';

function ProgramContent({ isLoading }: { isLoading: boolean }) {
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      router.push('/app');
    }
  }, [router, isLoading]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default function ProgramsPage() {
  const params = useParams();
  const externalProgramId = params.external_program_id as string;
  const { data, isLoading } =
    useGetBrandingByExternalProgramId(externalProgramId);
  const { setBranding, setShowCashBackOffers, setIsLoading } = useBranding();
  const { setAnonymousToken } = useSession();
  const [, setPartnerInfo] = useLocalStorage<ProgramPartnerInfo | null>(
    LOCAL_STORAGE_PARTNER_INFO,
    null
  );

  useEffect(() => {
    if (data) {
      setBranding(data.programBrandingInfo);
      setPartnerInfo(data.partnerInfo);
      setShowCashBackOffers(
        data?.partnerInfo?.partner_name === CASH_BACK_PARTNER
      );
      window.localStorage.removeItem(LOCAL_STORAGE_IS_SSO_SESSION);
      setAnonymousToken(data.token);
      setIsLoading(false);
    }
  }, [
    data,
    setBranding,
    setShowCashBackOffers,
    setIsLoading,
    setPartnerInfo,
    setAnonymousToken,
  ]);

  return <ProgramContent isLoading={isLoading} />;
}
