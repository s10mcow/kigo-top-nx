import { requestLocationAutocomplete } from '@kigo-top/services/client';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

interface UseLocationProps {
  zipCode?: string;
  onZipCodeChange: (zipCode: string) => void;
}

export const useLocation = ({ zipCode, onZipCodeChange }: UseLocationProps) => {
  const [zipError, setZipError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isValidZip, setIsValidZip] = useState(false);
  const validateAndUpdateZip = (value: string) => {
    const isValid = /^\d{5}$/.test(value);
    setZipError(!isValid && value.length > 0);
    setIsValidZip(isValid);
    onZipCodeChange(value);
  };
  const { data: suggestions = [], isLoading: loading } = useQuery({
    queryKey: ['locationAutocomplete', searchQuery],
    queryFn: async () => {
      const response = await requestLocationAutocomplete({
        query: searchQuery,
      });

      return response.results
        .map(
          (result: { address: { postal_code: string } }) =>
            result.address.postal_code.split('-')[0],
        )
        .filter(
          (value: string, index: number, self: string[]) =>
            self.indexOf(value) === index,
        )
        .slice(0, 5);
    },
    enabled: searchQuery.length >= 2 && searchQuery.length < 5,
    staleTime: 30 * 1000, // Cache for only 30 seconds (for the autocomplete)
    gcTime: 60 * 1000, // Keep unused data for 1 minute (for the autocomplete)
  });

  const handleAutocomplete = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    if (zipCode) {
      const isValid = /^\d{5}$/.test(zipCode);
      setIsValidZip(isValid);
      setZipError(Boolean(!isValid && zipCode.length > 0));
    }
  }, [zipCode, isValidZip]);

  return {
    zipError,
    suggestions: suggestions || [],
    loading,
    validateAndUpdateZip,
    handleAutocomplete,
    isValidZip,
  };
};
