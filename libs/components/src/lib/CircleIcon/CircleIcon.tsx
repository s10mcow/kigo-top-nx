import { SvgIconComponent } from '@mui/icons-material';
import { Box } from '@mui/material';

export function CircleIcon({ InnerIcon }: { InnerIcon: SvgIconComponent }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 100,
        borderRadius: '50%',
        background: (theme) =>
          theme.palette.primary.main ?? theme.palette.kigo.blue,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'white',
        }}
      >
        <InnerIcon sx={{ height: '32px', width: '32px' }} />
      </Box>
    </Box>
  );
}
