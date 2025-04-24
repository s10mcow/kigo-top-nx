import { useAuthentication } from '@kigo-top/providers';
import { editProfile } from '@kigo-top/services/client';
import CheckIcon from '@mui/icons-material/Check';
import {
  Button,
  CircularProgress,
  Divider,
  Grid2 as Grid,
  TextField,
  Typography,
} from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface FormField {
  value: string;
  touched: boolean;
  error: string;
}

interface FormState {
  first_name: FormField;
  last_name: FormField;
}

const NAME_REGEX = /^[A-Za-z\s.'"-]+$/;

const createInitialFormState = (firstName = '', lastName = ''): FormState => ({
  first_name: { value: firstName, touched: false, error: '' },
  last_name: { value: lastName, touched: false, error: '' },
});

export const BasicDetails = () => {
  const { user } = useAuthentication();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState<FormState>(() =>
    createInitialFormState(user?.first_name, user?.last_name)
  );

  // Update form state when user data changes
  useEffect(() => {
    if (user) {
      setFormState(createInitialFormState(user.first_name, user.last_name));
    }
  }, [user]);

  const {
    mutate: updateProfile,
    isSuccess: updateSuccess,
    isError: updateError,
    status,
    reset: resetMutation,
  } = useMutation({
    mutationFn: editProfile,
    onSuccess: () => {
      // Reset touched states but keep values
      setFormState((current) => ({
        first_name: { ...current.first_name, touched: false },
        last_name: { ...current.last_name, touched: false },
      }));
      setTimeout(() => {
        resetMutation();
      }, 1000);
      queryClient.invalidateQueries({ queryKey: ['account'] });
    },
  });

  const isUpdating = status === 'pending';

  const validateField = useCallback((value: string): string => {
    if (!NAME_REGEX.test(value)) {
      return 'Only letters, apostrophes, periods, hyphens, and spaces are allowed';
    }
    return '';
  }, []);

  const isModified = useMemo(() => {
    if (!user) return false;
    return (
      formState.first_name.value !== user.first_name ||
      formState.last_name.value !== user.last_name
    );
  }, [user, formState.first_name.value, formState.last_name.value]);

  const handleInputChange = useCallback(
    (field: keyof FormState) =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        const error = validateField(newValue);

        setFormState((prev) => ({
          ...prev,
          [field]: { value: newValue, touched: true, error },
        }));

        if (updateSuccess || updateError) {
          resetMutation();
        }
      },
    [updateSuccess, updateError, resetMutation, validateField]
  );

  const hasValidationErrors = useMemo(
    () => Object.values(formState).some((field) => field.error !== ''),
    [formState]
  );

  const handleUpdate = useCallback(() => {
    if (!user || hasValidationErrors) return;

    const updateData: { first_name?: string; last_name?: string } = {};

    if (formState.first_name.value !== user.first_name) {
      updateData.first_name = formState.first_name.value;
    }
    if (formState.last_name.value !== user.last_name) {
      updateData.last_name = formState.last_name.value;
    }

    updateProfile(updateData);
  }, [user, hasValidationErrors, formState, updateProfile]);

  const getFieldProps = useCallback(
    (field: keyof FormState) => {
      const warningStyle: SxProps<Theme> = {
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: formState[field].error ? 'error.main' : 'warning.main',
          },
        },
      };

      return {
        value: formState[field].value,
        onChange: handleInputChange(field),
        sx: formState[field].touched ? warningStyle : undefined,
        helperText:
          formState[field].error ||
          (formState[field].touched
            ? 'Click "Update account" below to save'
            : ''),
        error: !!formState[field].error,
      };
    },
    [formState, handleInputChange]
  );

  return (
    <Grid mt={3}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="titleSm">Basic details</Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Grid container spacing={3} direction="column">
            <Grid>
              <TextField
                fullWidth
                label="First name"
                {...getFieldProps('first_name')}
              />
            </Grid>
            <Grid>
              <TextField
                fullWidth
                label="Last name"
                {...getFieldProps('last_name')}
              />
            </Grid>
            <Grid>
              <TextField
                fullWidth
                label="Email"
                value={user?.email || ''}
                disabled
                slotProps={{ input: { sx: { backgroundColor: 'kigo.stone' } } }}
              />
            </Grid>
            <Grid>
              {isModified && !updateSuccess && !updateError && (
                <Button
                  onClick={handleUpdate}
                  variant="outlined"
                  sx={{ alignSelf: 'flex-start' }}
                  disabled={isUpdating || hasValidationErrors}
                  startIcon={isUpdating ? <CircularProgress size={20} /> : null}
                >
                  {isUpdating ? 'Updating...' : 'Update account'}
                </Button>
              )}
              {updateSuccess && (
                <Grid container alignItems="center" gap={1}>
                  <CheckIcon color="success" />
                  <Typography color="success.main">Success</Typography>
                </Grid>
              )}
              {updateError && (
                <Grid container direction="column" gap={2}>
                  <Typography color="error">
                    We are unable to update your account at this time. Please
                    try again later.
                  </Typography>
                  <Button
                    onClick={handleUpdate}
                    variant="outlined"
                    sx={{ alignSelf: 'flex-start' }}
                    disabled={isUpdating || hasValidationErrors}
                    startIcon={
                      isUpdating ? <CircularProgress size={20} /> : null
                    }
                  >
                    Retry update
                  </Button>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4, width: '100%' }} />
      </Grid>
    </Grid>
  );
};
