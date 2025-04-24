import { OpenInNew } from '@mui/icons-material';
import { ButtonBase, Grid2 as Grid, Typography, useTheme } from '@mui/material';

export const ButtonItem = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => {
  const theme = useTheme();
  return (
    <Grid
      onClick={onClick}
      component={ButtonBase}
      container
      size={{ xs: 12 }}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textDecoration: 'none',
        color: 'black',
        p: 2,
        border: `1px solid ${theme.palette.kigo.gray200}`,
        borderRadius: 4,
      }}
    >
      <Grid
        size={{ xs: 11 }}
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >
        <Typography variant="titleSm">{label}</Typography>
      </Grid>
      <Grid
        size={{ xs: 1 }}
        sx={{ display: 'flex', justifyContent: 'flex-end' }}
      >
        <OpenInNew sx={{ color: theme.palette.kigo.black }} />
      </Grid>
    </Grid>
  );
};
