import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Grid2 as Grid,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { LoginFormValues } from './useLoginForm';

export function PasswordForm({
  onSubmit,
  displayPassword,
  setDisplayPassword,
  handleForgotPasswordClick,
  enterEmailHookForm,
  isLoading,
}: {
  onSubmit: (data: LoginFormValues) => void;
  displayPassword: boolean;
  setDisplayPassword: (value: boolean) => void;
  handleForgotPasswordClick: () => void;
  enterEmailHookForm: UseFormReturn<LoginFormValues>;
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
          label="Password"
          fullWidth
          variant="outlined"
          margin="normal"
          autoFocus
          type={displayPassword ? 'text' : 'password'}
          {...register('password')}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setDisplayPassword(!displayPassword)}
                >
                  {displayPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            mt: -1,
          }}
        >
          <Button
            variant="text"
            sx={{ padding: 0 }}
            onClick={handleForgotPasswordClick}
          >
            Forgot Password?
          </Button>
        </Box>
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
          sx={{
            maxWidth: 300,
          }}
        >
          {isLoading ? <CircularProgress size={20} /> : 'Login'}
        </Button>
      </Grid>
    </Grid>
  );
}
