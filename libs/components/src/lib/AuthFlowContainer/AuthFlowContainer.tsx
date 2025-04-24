import { Box, Container, Grid2 as Grid, Typography } from '@mui/material';
import React, { ReactNode } from 'react';
import BackButton from './BackButton';
export const NAV_OFFSET = 60;

export const AuthFlowContainer = ({
  title,
  children,
  onBack,
  backLabel,
  styleOverrides,
}: {
  title: string;
  children: ReactNode;
  onBack?: () => void;
  backLabel?: string;
  styleOverrides?: {
    backButton?: React.CSSProperties;
  };
}) => {
  return (
    <>
      <Box
        sx={{
          paddingTop: { xs: 1.5, md: 3 },
          paddingLeft: { xs: 0, md: 3 },
        }}
      >
        {onBack && (
          <BackButton
            onClick={onBack}
            text={backLabel}
            styleOverrides={{ button: styleOverrides?.backButton }}
          />
        )}
      </Box>

      <Container
        maxWidth="md"
        sx={{
          py: onBack ? 3 : 10.5,
          minHeight: onBack ? `calc(100% - ${NAV_OFFSET}px)` : '100%',
        }}
      >
        <Grid container spacing={2} flexDirection="column" height="100%">
          <Grid size={{ xs: 12 }}>
            <Typography
              variant="titleLg"
              component="h1"
              sx={{
                textAlign: {
                  xs: 'left',
                  md: 'center',
                },
              }}
            >
              {title}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12 }} flex={1}>
            {children}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
