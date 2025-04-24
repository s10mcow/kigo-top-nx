'use client';

import { Button, Grid2 as Grid, TextField } from '@mui/material';
import { EnterNameFormValues, useEnterName } from './useEnterName';

export function NameStep({
  onSubmitAction,
  defaultValues,
}: {
  onSubmitAction: (data: EnterNameFormValues) => void;
  defaultValues: EnterNameFormValues;
}) {
  const { register, handleSubmit, errors, getValues } = useEnterName({
    signUpData: defaultValues,
  });

  return (
    <Grid
      container
      spacing={2}
      mt={0}
      component="form"
      flexDirection="column"
      height="100%"
      onSubmit={handleSubmit(onSubmitAction)}
    >
      <Grid size={{ xs: 12 }}>
        <TextField
          fullWidth
          label="First name"
          {...register('first_name')}
          error={Boolean(errors.first_name)}
          helperText={errors.first_name?.message}
          autoFocus={!getValues('first_name')}
        />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <TextField
          fullWidth
          label="Last name"
          {...register('last_name')}
          error={Boolean(errors.last_name)}
          helperText={errors.last_name?.message}
        />
      </Grid>

      <Grid
        size={{ xs: 12 }}
        display="flex"
        justifyContent="center"
        flex={1}
        alignItems={{ xs: 'flex-end', md: 'flex-start' }}
      >
        <Button
          fullWidth
          variant="contained"
          type="submit"
          sx={{
            maxWidth: { md: 300 },
          }}
        >
          Continue
        </Button>
      </Grid>
    </Grid>
  );
}
