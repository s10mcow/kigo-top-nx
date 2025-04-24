'use client';
import { PRIVACY_POLICY_URL, TERMS_OF_SERVICE_URL } from '@kigo-top/constants';
import { Button, Grid2 as Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { ButtonItem } from '../utils/ButtonItem';

type LegalStepProps = {
  onSubmitAction: () => void;
  defaultValues?: { agreeToTerms: boolean };
};

export function LegalStep({ onSubmitAction }: LegalStepProps) {
  const { handleSubmit } = useForm();
  return (
    <Grid
      container
      spacing={3}
      mt={0}
      flexDirection="column"
      height="100%"
      component="form"
      onSubmit={handleSubmit(onSubmitAction)}
    >
      <Grid size={{ xs: 12 }}>
        <Typography
          variant="bodyMd"
          component="div"
          sx={{ textAlign: { xs: 'left', md: 'center' } }}
        >
          Please review the Kigo Terms of Service and Privacy Policy.
        </Typography>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <ButtonItem
          label="Terms of Service"
          onClick={() => window.open(TERMS_OF_SERVICE_URL, '_blank')}
        />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <ButtonItem
          label="Privacy Policy"
          onClick={() => window.open(PRIVACY_POLICY_URL, '_blank')}
        />
      </Grid>

      <Grid
        size={{ xs: 12 }}
        display="flex"
        justifyContent="center"
        flex={1}
        alignItems={{ xs: 'flex-end', md: 'flex-start' }}
      >
        <Grid container spacing={2} flexDirection="column">
          <Grid size={{ xs: 12 }} textAlign="center">
            <Typography variant="bodySm">
              I certify that I am 18 years of age or older and agree to the Kigo
              Terms of Service and Privacy Policy.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12 }} display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ maxWidth: { md: 300 } }}
            >
              Agree
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
