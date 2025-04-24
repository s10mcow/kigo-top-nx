'use client';
import { useState } from 'react';

import {
  CreatePasswordFormValues,
  LOWERCASE_REGEX,
  NUMBER_REGEX,
  SPECIAL_CHARACTER_REGEX,
  UPPERCASE_REGEX,
  useCreatePassword,
} from '@kigo-top/hooks';
import { useBranding } from '@kigo-top/providers';
import { Check, Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Grid2 as Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { SubmitHandler } from 'react-hook-form';

function TypographyWithConditionalBulletPoint(props: {
  showCheck: boolean;
  children: React.ReactNode;
}) {
  const { showCheck, children } = props;
  const { branding } = useBranding();

  if (!showCheck) {
    return (
      <Typography
        variant="bodyMd"
        sx={{
          fontSize: '16px',
          fontWeight: 400,
          color: (theme) => theme.palette.kigo.charcoal,
          display: 'flex',
          alignItems: 'center',
          minHeight: '24px',
        }}
      >
        <span style={{ marginRight: '8px' }}>&#9679;</span> {children}
      </Typography>
    );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Check sx={{ marginRight: '4px', color: branding?.color_primary }} />
      <Typography
        variant="bodyMd"
        sx={{
          fontSize: '16px',
          fontWeight: 400,
          color: branding?.color_primary,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {children}
      </Typography>
    </Box>
  );
}

export function CreatePasswordForm({
  onSubmitAction,
  loading,
}: {
  onSubmitAction: (data: CreatePasswordFormValues) => void;
  loading: boolean;
}) {
  const { register, handleSubmit, errors } = useCreatePassword();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordRequirementsMet, setPasswordRequirementsMet] = useState({
    eightCharacters: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialCharacter: false,
  });

  if (!executeRecaptcha && !loading) {
    return null;
  }

  const handleFormSubmit: SubmitHandler<CreatePasswordFormValues> = async (
    data
  ) => {
    onSubmitAction(data);
  };

  const updateValidationValues = (password: string) => {
    if (!passwordRequirementsMet.eightCharacters && password.length >= 8) {
      setPasswordRequirementsMet((prev) => ({
        ...prev,
        eightCharacters: true,
      }));
    } else if (password.length < 8) {
      setPasswordRequirementsMet((prev) => ({
        ...prev,
        eightCharacters: false,
      }));
    }
    if (!passwordRequirementsMet.uppercase && UPPERCASE_REGEX.test(password)) {
      setPasswordRequirementsMet((prev) => ({ ...prev, uppercase: true }));
    } else if (!UPPERCASE_REGEX.test(password)) {
      setPasswordRequirementsMet((prev) => ({ ...prev, uppercase: false }));
    }
    if (!passwordRequirementsMet.lowercase && LOWERCASE_REGEX.test(password)) {
      setPasswordRequirementsMet((prev) => ({ ...prev, lowercase: true }));
    } else if (!LOWERCASE_REGEX.test(password)) {
      setPasswordRequirementsMet((prev) => ({ ...prev, lowercase: false }));
    }
    if (!passwordRequirementsMet.number && NUMBER_REGEX.test(password)) {
      setPasswordRequirementsMet((prev) => ({ ...prev, number: true }));
    } else if (!NUMBER_REGEX.test(password)) {
      setPasswordRequirementsMet((prev) => ({ ...prev, number: false }));
    }
    if (
      !passwordRequirementsMet.specialCharacter &&
      SPECIAL_CHARACTER_REGEX.test(password)
    ) {
      setPasswordRequirementsMet((prev) => ({
        ...prev,
        specialCharacter: true,
      }));
    } else if (!SPECIAL_CHARACTER_REGEX.test(password)) {
      setPasswordRequirementsMet((prev) => ({
        ...prev,
        specialCharacter: false,
      }));
    }
  };

  const registeredPassword = register('password');

  return (
    <Grid
      container
      spacing={2}
      component="form"
      mt={0}
      flexDirection="column"
      height="100%"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <Grid
        size={{ xs: 12 }}
        sx={{
          display: 'flex',
          justifyContent: { xs: 'flex-start', md: 'center' },
        }}
      >
        <Typography variant="bodyMd">Password must have at least:</Typography>
      </Grid>

      <Grid
        size={{ xs: 12 }}
        sx={{
          display: 'flex',
          justifyContent: { xs: 'flex-start', md: 'center' },
        }}
      >
        <ul style={{ marginTop: '0', listStyle: 'none', paddingLeft: '0' }}>
          <li>
            <TypographyWithConditionalBulletPoint
              showCheck={passwordRequirementsMet.eightCharacters}
            >
              8 characters
            </TypographyWithConditionalBulletPoint>
          </li>
          <li>
            <TypographyWithConditionalBulletPoint
              showCheck={passwordRequirementsMet.uppercase}
            >
              1 uppercase letter
            </TypographyWithConditionalBulletPoint>
          </li>
          <li>
            <TypographyWithConditionalBulletPoint
              showCheck={passwordRequirementsMet.lowercase}
            >
              1 lowercase letter
            </TypographyWithConditionalBulletPoint>
          </li>
          <li>
            <TypographyWithConditionalBulletPoint
              showCheck={passwordRequirementsMet.number}
            >
              1 number
            </TypographyWithConditionalBulletPoint>
          </li>
          <li>
            <TypographyWithConditionalBulletPoint
              showCheck={passwordRequirementsMet.specialCharacter}
            >
              1 special character
            </TypographyWithConditionalBulletPoint>
          </li>
        </ul>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <TextField
          fullWidth
          label="Password"
          type={showPassword ? 'text' : 'password'}
          {...registeredPassword}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          autoFocus
          InputProps={{
            // <-- This is where the toggle button is added.
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={(e) => {
            registeredPassword.onChange(e);
            updateValidationValues(e.target.value);
          }}
        />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <TextField
          fullWidth
          label="Confirm password"
          type={showConfirmPassword ? 'text' : 'password'}
          {...register('confirmPassword')}
          error={Boolean(errors.confirmPassword)}
          helperText={errors.confirmPassword?.message}
          InputProps={{
            // <-- This is where the toggle button is added.
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirm password visibility"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
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
          type="submit"
          disabled={loading}
          fullWidth
          sx={{ maxWidth: { md: '300px' } }}
        >
          {loading ? <CircularProgress /> : 'Continue'}
        </Button>
      </Grid>
    </Grid>
  );
}
