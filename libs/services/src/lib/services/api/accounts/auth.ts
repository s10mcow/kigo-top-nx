import { makeClientCoreServerCall } from '../makeClientServerCall';
import type { LogOutRequest } from './types';

const logOut = async (request: LogOutRequest): Promise<void> => {
  await makeClientCoreServerCall.patch('/accounts/log-out', request);
};

export default logOut;
