import { Button, Grid2 as Grid, Typography } from '@mui/material';

export function EmailPermissionStep({
  onSubmitAction,
}: {
  onSubmitAction: () => void;
}) {
  return (
    <Grid container spacing={2} display="flex" justifyContent="center">
      <Grid size={{ xs: 12 }} display="flex" justifyContent="center">
        <Typography variant="bodySm">
          We will use your email to send you important information about your
          account.
        </Typography>
      </Grid>
      <Grid size={{ xs: 12 }} display="flex" justifyContent="center">
        <Button variant="contained" onClick={onSubmitAction}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}
