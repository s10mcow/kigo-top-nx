export interface LocationRequest {
  query: string;
}

interface Address {
  city: string;
  country: string;
  country_code: string;
  county: string;
  postal_code: string;
  state: string;
  state_code: string;
  street: string;
}

interface LocationResult {
  address: Address;
  latitude: number;
  longitude: number;
}

export interface LocationResponse {
  results: LocationResult[];
}

export interface AddressFromLatLongRequest {
  latitude: number;
  longitude: number;
}

export interface AddressFromLatLongResponse {
  address: Address;
  latitude: number;
  longitude: number;
}

export interface LocationFromZipRequest {
  zip_code?: string | null;
  address?: string | null;
}

export interface LocationFromZipResponse {
  address: Address;
  latitude: number;
  longitude: number;
}
