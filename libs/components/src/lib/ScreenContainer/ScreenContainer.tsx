import { Container, SxProps } from '@mui/material';
import { ReactNode } from 'react';

export function ScreenContainer({
  children,
  sx,
}: {
  children: ReactNode;
  sx?: SxProps;
}) {
  return (
    <Container
      sx={{
        height: '100%',
        position: 'relative',
        padding: { xs: 2.5, sm: 3, lg: 4 },
        '@media (min-width: 1280px)': {
          maxWidth: 1280,
        },
        '@media (max-width: 1280px)': {
          maxWidth: 1280,
        },
        ...sx,
      }}
    >
      {children}
    </Container>
  );
}
