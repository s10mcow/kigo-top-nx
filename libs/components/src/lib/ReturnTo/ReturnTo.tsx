import { ArrowBack } from '@mui/icons-material';
import { Grid2 as Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';

export function ReturnTo({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <Grid container direction="row" alignItems="center">
      <Grid>
        <Button
          aria-label={`Return to ${label}`}
          color="primary"
          variant="link"
          sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
          onClick={onClick}
        >
          <ArrowBack sx={{ mr: 1 }} aria-hidden="true" />{' '}
          <Typography variant="bodyMdBold">Return to {label}</Typography>
        </Button>
      </Grid>
    </Grid>
  );
}
