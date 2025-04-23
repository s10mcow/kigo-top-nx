import { AUTHENTICATION_TYPES } from '@kigo-top/constants';
import { makeClientCoreServerCall } from '../../makeClientServerCall';

export const deactivateKigoManagedAccount = async (): Promise<void> => {
  try {
    const URL = '/accounts/deactivate';

    await makeClientCoreServerCall.patch(
      URL,
      {},
      {},
      AUTHENTICATION_TYPES.ACCESS,
    );
  } catch (error) {
    console.error('Error deactivating Kigo account:', error);
    throw error;
  }
};
