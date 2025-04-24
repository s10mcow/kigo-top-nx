'use client';

import { clearAuthTokens } from '@kigo-top/utils';
import { useEffect, useState } from 'react';
import { ErrorContainer } from '../Error/ErrorContainer';

export function SessionExpiredContainer() {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
    clearAuthTokens();
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <ErrorContainer
      title="Your session has expired"
      description="Please return to your partner's website to continue."
      buttonLabel="Reload offers"
      isCampaignError={false}
      showButton={false}
    />
  );
}
