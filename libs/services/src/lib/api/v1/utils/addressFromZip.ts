import { makeClientCoreServerCall } from '../../makeClientServerCall';
import { LocationFromZipRequest, LocationFromZipResponse } from './types';

export const requestLocationFromZip = async (
  request: LocationFromZipRequest,
): Promise<LocationFromZipResponse> => {
  try {
    if (!request?.zip_code && !request?.address) {
      throw new Error('Zip code or address is required');
    }

    const response = await makeClientCoreServerCall.post(
      '/api/v1/utils/locations/lat-long',
      {
        zip_code: request?.zip_code || null,
        address: request?.address || null,
      },
    );

    return response;
  } catch (error) {
    console.error('Error fetching location autocomplete:', error);
    return {
      address: {
        city: '',
        country: '',
        country_code: '',
        county: '',
        postal_code: '',
        state: '',
        state_code: '',
        street: '',
      },
      latitude: 0,
      longitude: 0,
    };
  }
};
