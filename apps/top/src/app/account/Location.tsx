import { useAuthentication } from '@kigo-top/providers';
import {
  LocationFromZipResponse,
  editProfile,
  requestAddressFromLatLong,
  requestLocationFromZip,
} from '@kigo-top/services/client';
import CheckIcon from '@mui/icons-material/Check';
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid2 as Grid,
  Grow,
  InputAdornment,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useLocalStorage } from 'usehooks-ts';

import { useAccount } from './AccountContext';
import { useLocation } from './hooks/useLocation';
// Extract mutation logic into a custom hook
const useProfileMutation = () => {
  const queryClient = useQueryClient();
  const [locationError, setLocationError] = useState<string | null>(null);
  const [, setLocation] = useLocalStorage<LocationFromZipResponse | null>(
    'kigo_user_location',
    null
  );

  const mutation = useMutation({
    mutationFn: editProfile,
    onSuccess: async (response) => {
      setLocationError(null);
      queryClient.invalidateQueries({ queryKey: ['account'] });
      if (response.zip_code) {
        const res = await requestLocationFromZip({
          zip_code: response.zip_code,
          address: '',
        });
        if (res.address.postal_code) {
          setLocation(res);
        }
      }
    },
    onError: () => {
      setLocationError(
        'Unable to update your location. Please try again or enter your zip code manually.'
      );
    },
  });

  return { ...mutation, locationError, setLocationError };
};

export const Location = () => {
  const { user } = useAuthentication();
  const { locationEnabled, setLocationEnabled, locationSectionRef } =
    useAccount();
  const [, setLocation] = useLocalStorage<LocationFromZipResponse | null>(
    'kigo_user_location',
    null
  );
  const locationForm = useForm({
    defaultValues: { zipCode: user?.zip_code || '' },
  });

  const {
    formState: { isDirty },
  } = locationForm;

  // Update form values when user data becomes available
  useEffect(() => {
    if (user?.zip_code) {
      locationForm.reset({ zipCode: user.zip_code.split('-')[0].slice(0, 5) });
    }
  }, [user, locationForm]);

  const {
    mutate: updateProfile,
    isSuccess: updateSuccess,
    isError: updateError,
    status,
    reset: resetMutation,
    locationError,
    setLocationError,
  } = useProfileMutation();

  const isUpdating = status === 'pending';

  // Memoize the geolocation promise creator
  const createGeolocationPromise = useCallback(() => {
    return new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }, []);

  const handleLocationError = useCallback(
    (error: unknown) => {
      setLocationEnabled(false);
      if (error instanceof GeolocationPositionError) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError(
              'Location permission was denied. Please enable location access in your browser settings.'
            );
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError(
              'Unable to determine your current location. Please try again or enter your zip code manually.'
            );
            break;
          case error.TIMEOUT:
            setLocationError(
              'Location request timed out. Please try again or enter your zip code manually.'
            );
            break;
          default:
            setLocationError(
              'Unable to determine your location. Please try again or enter your zip code manually.'
            );
        }
      } else if (
        error instanceof Error &&
        error.message.includes('CoreLocation')
      ) {
        setLocationError(
          'Location services are currently unavailable. Please try again later or enter your zip code manually.'
        );
      } else {
        setLocationError(
          'Unable to update your location. Please try again or enter your zip code manually.'
        );
      }
    },
    [setLocationEnabled, setLocationError]
  );

  const handleLocationToggle = useCallback(async () => {
    const newLocationEnabled = !locationEnabled;
    setLocationEnabled(newLocationEnabled);
    setLocationError(null);
    resetMutation();

    if (newLocationEnabled) {
      try {
        const position = await createGeolocationPromise();
        const { latitude, longitude } = position.coords;

        const response = await requestAddressFromLatLong({
          latitude,
          longitude,
        });

        if (response.address?.postal_code) {
          await new Promise((resolve, reject) => {
            updateProfile(
              { zip_code: response.address.postal_code.split('-')[0] },
              {
                onSuccess: (res) => {
                  setLocation(response);
                  resolve(res);
                },
                onError: reject,
              }
            );
          });
        } else {
          throw new Error('Unable to determine zip code from your location');
        }
      } catch (error) {
        handleLocationError(error);
      }
    }
  }, [
    locationEnabled,
    setLocationEnabled,
    setLocationError,
    resetMutation,
    createGeolocationPromise,
    updateProfile,
    handleLocationError,
    setLocation,
  ]);

  const {
    zipError,
    suggestions,
    loading,
    validateAndUpdateZip,
    handleAutocomplete,
    isValidZip,
  } = useLocation({
    zipCode: locationForm.watch('zipCode'),
    onZipCodeChange: useCallback(
      (zipCode) => {
        if (zipCode !== user?.zip_code) {
          if (updateSuccess || updateError) {
            resetMutation();
          }
        }
      },
      [user, updateSuccess, updateError, resetMutation]
    ),
  });

  const handleUpdate = useCallback(() => {
    const zipCode = locationForm.getValues('zipCode');
    if (isValidZip && zipCode) {
      updateProfile({ zip_code: zipCode });
    }
  }, [isValidZip, locationForm, updateProfile]);

  const warningStyle = useMemo(
    () =>
      isDirty && locationForm.watch('zipCode')
        ? {
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: zipError ? 'error.main' : 'warning.main',
              },
            },
          }
        : undefined,
    [isDirty, locationForm, zipError]
  );

  return (
    <Grid ref={locationSectionRef}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="titleSm">Location</Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Grid container direction="column" spacing={3}>
            <Grid>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="bodyMdBold" component="div" mb={1}>
                    Current location permission
                  </Typography>
                  <Typography
                    variant="bodyMd"
                    component="div"
                    color="text.secondary"
                  >
                    By enabling, we can make automatically determine your
                    location and give you the most relevant offers in your area.
                  </Typography>
                  {locationError && (
                    <Typography
                      variant="bodyMd"
                      component="div"
                      color="error"
                      sx={{ mt: 1 }}
                    >
                      {locationError}
                    </Typography>
                  )}
                </Box>
                <Switch
                  checked={locationEnabled}
                  onChange={handleLocationToggle}
                />
              </Box>
            </Grid>
            <Grow in={!locationEnabled} timeout={300} unmountOnExit>
              <Box>
                <Grid>
                  <Box sx={{ display: 'flex', flexDirection: 'column', mt: 3 }}>
                    <Typography variant="bodyMdBold" component="div" mb={1}>
                      Zip code
                    </Typography>
                    <Typography
                      variant="bodyMd"
                      component="div"
                      color="text.secondary"
                    >
                      Enter your zip code to ensure we can provide relevant
                      offers in your area if location permissions are disabled.
                    </Typography>
                  </Box>

                  <Controller
                    name="zipCode"
                    control={locationForm.control}
                    defaultValue={user?.zip_code || ''}
                    render={({ field }) => (
                      <Autocomplete
                        freeSolo
                        options={suggestions}
                        loading={loading}
                        value={field.value || ''}
                        onChange={(_, newValue) => {
                          field.onChange(newValue);
                          if (newValue) {
                            validateAndUpdateZip(newValue);
                          }
                        }}
                        onInputChange={(_, newValue) => {
                          validateAndUpdateZip(newValue);
                          handleAutocomplete(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            {...field}
                            inputProps={{ ...params.inputProps, maxLength: 5 }}
                            sx={{
                              mt: 3,
                              '& .MuiInputBase-input': {
                                height: '39px',
                                borderRadius: '20px',
                                '&:-webkit-autofill': {
                                  WebkitBoxShadow: '0 0 0 100px #fff inset',
                                  WebkitTextFillColor: 'inherit',
                                },
                                ...warningStyle,
                              },
                            }}
                            fullWidth
                            label="Zip code"
                            error={zipError}
                            helperText={
                              zipError
                                ? 'Please enter a valid zip code'
                                : isDirty && locationForm.watch('zipCode')
                                ? 'Click "Update account" below to save'
                                : ''
                            }
                            slotProps={{
                              input: {
                                ...params.InputProps,
                                startAdornment:
                                  isValidZip && !updateSuccess ? (
                                    <InputAdornment position="start">
                                      <CheckIcon
                                        sx={{ color: 'primary.main' }}
                                      />
                                    </InputAdornment>
                                  ) : null,
                              },
                            }}
                          />
                        )}
                      />
                    )}
                  />
                  {isDirty && isValidZip && !updateSuccess && !updateError && (
                    <Button
                      onClick={handleUpdate}
                      variant="outlined"
                      sx={{ mt: 2, alignSelf: 'flex-start' }}
                      disabled={isUpdating}
                      startIcon={
                        isUpdating ? <CircularProgress size={20} /> : null
                      }
                    >
                      {isUpdating ? 'Updating...' : 'Update account'}
                    </Button>
                  )}
                  {!isDirty && updateSuccess && locationEnabled && (
                    <Grid container alignItems="center" gap={1} sx={{ mt: 2 }}>
                      <CheckIcon color="success" />
                      <Typography color="success.main">Success</Typography>
                    </Grid>
                  )}
                  {updateError && (
                    <Grid container direction="column" gap={2} sx={{ mt: 2 }}>
                      <Typography color="error" variant="bodyMd">
                        We are unable to update your account at this time.
                        Please try again later.
                      </Typography>
                      <Button
                        onClick={handleUpdate}
                        variant="outlined"
                        sx={{ alignSelf: 'flex-start' }}
                        disabled={isUpdating}
                        startIcon={
                          isUpdating ? <CircularProgress size={20} /> : null
                        }
                      >
                        Retry update
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </Box>
            </Grow>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4, width: '100%' }} />
      </Grid>
    </Grid>
  );
};
