import { EnterEmailFormValues } from '@kigo-top/hooks';
import {
  Button,
  CircularProgress,
  Grid2 as Grid,
  TextField,
} from '@mui/material';
import { UseFormReturn } from 'react-hook-form';

export function EmailForm({
  enterEmailHookForm,
  onSubmit,
  isLoading,
}: {
  enterEmailHookForm: UseFormReturn<EnterEmailFormValues>;
  onSubmit: (data: EnterEmailFormValues) => void;
  isLoading: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = enterEmailHookForm;

  return (
    <Grid
      container
      spacing={2}
      component="form"
      mt={0}
      flexDirection="column"
      height="100%"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid size={{ xs: 12 }}>
        <TextField
          label="Email"
          fullWidth
          variant="outlined"
          margin="normal"
          autoFocus
          {...register('email')}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
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
          variant="contained"
          color="primary"
          type="submit"
          disabled={isLoading}
          fullWidth
          sx={{ maxWidth: 300 }}
        >
          {isLoading ? <CircularProgress size={20} /> : 'Continue'}
        </Button>
      </Grid>
    </Grid>
  );
}
