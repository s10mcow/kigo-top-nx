import { AUTHENTICATION_TYPES } from '@kigo-top/constants';
import { makeClientCoreServerCall } from '../../makeClientServerCall';
import { LocationRequest, LocationResponse } from './types';

export const requestLocationAutocomplete = async (
  request: LocationRequest,
): Promise<LocationResponse> => {
  try {
    const response = await makeClientCoreServerCall.get(
      `/api/v1/utils/locations/autocomplete?query=${encodeURIComponent(
        request.query,
      )}`,
      {},
      AUTHENTICATION_TYPES.ANONYMOUS,
    );

    return response;
  } catch (error) {
    console.error('Error fetching location autocomplete:', error);
    return { results: [] };
  }
};
