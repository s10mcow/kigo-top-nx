import { useAuthentication, useBranding } from '@kigo-top/providers';
import {
  deactivateKigoManagedAccount,
  deactivateRewardsNetworkMember,
} from '@kigo-top/services/client';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

export const useAccountDeactivation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { signOut } = useAuthentication();
  const { showCashBackOffers } = useBranding();

  const deactivateAccounts = async () => {
    setIsLoading(true);

    try {
      if (showCashBackOffers) {
        await deactivateRewardsNetworkMember();
      }
      await deactivateKigoManagedAccount();
      await signOut();

      enqueueSnackbar('Accounts successfully deactivated', {
        variant: 'kigoInfo',
      });
      return true;
    } catch {
      enqueueSnackbar('Failed to deactivate accounts. Please try again.', {
        variant: 'kigoError',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { deactivateAccounts, isLoading };
};
