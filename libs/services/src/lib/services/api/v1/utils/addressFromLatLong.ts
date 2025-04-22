import { makeClientCoreServerCall } from '../../makeClientServerCall';
import { AddressFromLatLongRequest, AddressFromLatLongResponse } from './types';

export const requestAddressFromLatLong = async (
  request: AddressFromLatLongRequest,
): Promise<AddressFromLatLongResponse> => {
  try {
    const response = await makeClientCoreServerCall.post(
      '/api/v1/utils/locations/address',
      {
        latitude: request.latitude,
        longitude: request.longitude,
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
