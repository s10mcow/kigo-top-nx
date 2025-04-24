'use client';
import { EnterEmailFormValues, useEnterEmail } from '@kigo-top/hooks';
import { Button, Grid2 as Grid, TextField } from '@mui/material';

export default function EnterEmail({
  email,
  handleFormSubmitAction,
}: {
  email: string;
  handleFormSubmitAction: (data: EnterEmailFormValues) => void;
}) {
  const enterEmailHookForm = useEnterEmail({ email });

  const {
    register: enterEmailRegister,
    handleSubmit,
    formState: { errors: enterEmailErrors },
  } = enterEmailHookForm;
  return (
    <Grid
      container
      spacing={2}
      component="form"
      mt={0}
      onSubmit={handleSubmit(handleFormSubmitAction)}
      sx={{ height: { xs: '100%', md: 'auto' } }}
    >
      <Grid size={{ xs: 12 }}>
        <TextField
          label="Email"
          fullWidth
          variant="outlined"
          margin="normal"
          autoFocus
          {...enterEmailRegister('email')}
          error={Boolean(enterEmailErrors.email)}
          helperText={enterEmailErrors.email?.message}
        />
      </Grid>

      <Grid
        size={{ xs: 12 }}
        display="flex"
        justifyContent="center"
        alignItems={{ xs: 'flex-end', md: 'flex-start' }}
      >
        <Button variant="contained" color="primary" type="submit">
          Continue
        </Button>
      </Grid>
    </Grid>
  );
}
