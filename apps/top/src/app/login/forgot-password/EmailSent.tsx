'use client';
import { EnterEmailFormValues, useEnterEmail } from '@kigo-top/hooks';
import { Button, Grid2 as Grid, Typography } from '@mui/material';

export default function EmailSent({
  email,
  handleFormSubmitAction,
}: {
  email: string;
  handleFormSubmitAction: (data: EnterEmailFormValues) => void;
}) {
  const enterEmailHookForm = useEnterEmail({ email });

  const { handleSubmit } = enterEmailHookForm;
  return (
    <Grid
      container
      spacing={2}
      mt={0}
      component="form"
      onSubmit={handleSubmit(handleFormSubmitAction)}
    >
      <Grid size={{ xs: 12 }}>
        <Typography
          sx={{
            textAlign: 'center',
            color: (theme) => theme.palette.kigo.charcoal,
          }}
          component="p"
          variant="bodyMd"
        >
          If we find an account associated with <strong>{email}</strong>, you
          will receive an email with password reset instructions.
        </Typography>
      </Grid>

      <Grid size={{ xs: 12 }} display="flex" justifyContent="center">
        <Button
          variant="text"
          fullWidth
          type="submit"
          sx={{ maxWidth: { md: '300px' } }}
        >
          Resend reset email
        </Button>
      </Grid>
    </Grid>
  );
}
