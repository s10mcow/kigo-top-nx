import { AUTHENTICATION_TYPES } from '@kigo-top/constants';
import { makeClientCoreServerCall } from '../../makeClientServerCall';
import { getMemberId } from './getMemberId';

export const deactivateRewardsNetworkMember = async (): Promise<void> => {
  try {
    const { member_id } = await getMemberId();
    // IF member_id is found then delete the member
    if (member_id) {
      await makeClientCoreServerCall.delete(
        `/api/v1/members/${member_id}`,
        {},
        AUTHENTICATION_TYPES.SESSION,
      );
    }

    return;
  } catch (error) {
    console.error('Error deactivating Rewards Network account:', error);
  }
};
