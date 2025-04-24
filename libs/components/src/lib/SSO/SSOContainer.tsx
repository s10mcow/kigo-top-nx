'use client';

import {
  CASH_BACK_PARTNER,
  LOCAL_STORAGE_EXTERNAL_PROGRAM_ID,
  LOCAL_STORAGE_IS_SSO_SESSION,
  LOCAL_STORAGE_PARTNER_INFO,
} from '@kigo-top/constants';
import {
  clientGenerateSSOAccountSpaceApiSessionToken,
  fetchSessionBranding,
} from '@kigo-top/services/client';
import { ProgramPartnerInfo } from '@kigo-top/services/core';

import { useBranding, useSession } from '@kigo-top/providers';
import { Box, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

type Props = { externalProgramId: string; uuid?: string };

export function SSOContainer({ externalProgramId, uuid }: Props) {
  const router = useRouter();
  const { setBranding, setShowCashBackOffers } = useBranding();
  const [isClient, setIsClient] = useState<boolean>(false);
  const [, setLocalExternalProgramId] = useLocalStorage(
    LOCAL_STORAGE_EXTERNAL_PROGRAM_ID,
    ''
  );

  const [, setIsSsoLocalStorageSession] = useLocalStorage<boolean | null>(
    LOCAL_STORAGE_IS_SSO_SESSION,
    null
  );

  const { setSessionRefreshToken, setSessionToken, setIsSsoSession } =
    useSession();
  const [, setPartnerInfo] = useLocalStorage<ProgramPartnerInfo | null>(
    LOCAL_STORAGE_PARTNER_INFO,
    null
  );

  const handleValidateSso = useCallback(async () => {
    try {
      setLocalExternalProgramId(externalProgramId);

      const accountResponse =
        await clientGenerateSSOAccountSpaceApiSessionToken({
          session_id: uuid ?? '',
        });

      setSessionToken(accountResponse.token);

      setSessionRefreshToken(accountResponse.refresh_token);
      // local storage
      setIsSsoLocalStorageSession(true);
      // set at context level
      setIsSsoSession(true);
      const response = await fetchSessionBranding(externalProgramId);

      setBranding(response.branding);
      setPartnerInfo(response.partnerInfo);
      setShowCashBackOffers(
        response.partnerInfo.partner_name === CASH_BACK_PARTNER
      );

      router.push('/app');
    } catch {
      router.push('/sso/error');
    }
  }, [
    externalProgramId,
    uuid,
    router,
    setLocalExternalProgramId,
    setSessionToken,
    setSessionRefreshToken,
    setIsSsoLocalStorageSession,
    setIsSsoSession,
    setBranding,
    setPartnerInfo,
    setShowCashBackOffers,
  ]);

  useEffect(() => {
    setIsClient(true);
    handleValidateSso();
    if (!uuid) {
      router.push('/sso/error');
    }
  }, [uuid, router, handleValidateSso]);

  if (!isClient) {
    return null;
  }

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
