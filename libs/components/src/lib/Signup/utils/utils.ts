'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useInterval } from 'usehooks-ts';

import { useCustomRouter } from '@kigo-top/hooks';
import { getAccount } from '@kigo-top/services/client';

export enum MobileOnboardingStage {
  AccountCreated = 'account_created',
  EmailVerified = 'email_verified',
}
export const usePollEmailVerification = (onVerified: () => void) => {
  const [needRefresh, setNeedRefresh] = useState(false);
  const [keepPolling, setKeepPolling] = useState(true);
  const [emailVerified, setEmailVerified] = useState(false);
  const router = useCustomRouter();
  const pathname = usePathname();

  // Poll every 5 seconds if keepPolling is true
  useInterval(
    async () => {
      // Check if email is verified
      try {
        const account = await getAccount();

        if (
          account.mobile_onboarding_stage ===
          MobileOnboardingStage.EmailVerified
        ) {
          setKeepPolling(false);
          setEmailVerified(true);
          onVerified();
        }
        // If email is verified, go to next step
      } catch (error) {
        console.error(error);
        router.push(pathname, {
          queryParams: { sessionExpired: 'true' },
          preserveQuery: true,
        });
      }
    },
    keepPolling ? 5000 : null
  );

  // Stop polling after 5 minutes
  useInterval(
    () => {
      setKeepPolling(false);
      setNeedRefresh(true);
    },
    keepPolling ? 1000 * 60 * 5 : null
  );
  return { needRefresh, emailVerified };
};
