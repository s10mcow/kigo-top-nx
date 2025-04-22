import { AUTHENTICATION_TYPES } from '@kigo-top/constants';
import { makeClientCoreServerCall } from '../makeClientServerCall';
import { GetAccountResponse } from './types';

const getCurrentAccount = async (): Promise<GetAccountResponse> => {
  const URL = '/accounts';

  const response = await makeClientCoreServerCall.get(
    URL,
    {},
    AUTHENTICATION_TYPES.ACCESS,
  );

  return response as GetAccountResponse;
};

export default getCurrentAccount;
