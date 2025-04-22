import { AUTHENTICATION_TYPES } from '@kigo-top/constants';
import { makeClientCoreServerCall } from '../../makeClientServerCall';
import { EditProfileRequest, EditProfileResponse } from '../types';

const editProfile = async (
  request: EditProfileRequest,
): Promise<EditProfileResponse> => {
  const URL = '/accounts/profiles';

  const response = await makeClientCoreServerCall.patch(
    URL,
    {
      first_name: request.first_name,
      last_name: request.last_name,
      zip_code: request.zip_code,
    },
    {},
    AUTHENTICATION_TYPES.ACCESS,
  );

  return response as EditProfileResponse;
};

export default editProfile;
