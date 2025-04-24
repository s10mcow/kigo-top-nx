'use client';

import { createAppTheme, KigoContextTheme } from '@kigo-top/constants';
import { HourglassEmpty, PriorityHigh } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Grid,
  ThemeProvider,
  Typography,
} from '@mui/material';

type ErrorContainerProps = {
  title: string;
  description: string;
  buttonLabel?: string;
  isCampaignError?: boolean;
  onClick?: () => void;
  showButton?: boolean;
  disableButton?: boolean;
};

export function ErrorContainer({
  title,
  description,
  buttonLabel,
  isCampaignError,
  onClick,
  showButton = false,
  disableButton = false,
}: ErrorContainerProps) {
  const theme = createAppTheme({} as KigoContextTheme);

  return (
    <ThemeProvider theme={theme}>
      <Container
        sx={{
          height: '100%',
          padding: { xs: 2.5, sm: 3, lg: 4 },
          '@media (min-width: 1280px)': { maxWidth: 1280 },
          '@media (max-width: 1280px)': { maxWidth: 'xl' },
          position: 'relative',
        }}
      >
        <Grid
          container
          direction="column"
          alignContent="center"
          spacing={2}
          sx={{ maxWidth: 560, margin: '0px auto', width: '100%' }}
        >
          <Grid xs={12} justifyContent="center">
            <Grid container justifyContent="center">
              <Grid>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: theme.palette.primary.main,
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    mt: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'white',
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                    }}
                  >
                    {isCampaignError ? (
                      <PriorityHigh sx={{ fontSize: 32, color: 'black' }} />
                    ) : (
                      <HourglassEmpty sx={{ fontSize: 32, color: 'black' }} />
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={12} justifyContent="center">
            <Grid container justifyContent="center">
              <Grid>
                <Typography
                  component="h1"
                  gutterBottom={true}
                  textAlign="center"
                  color="black"
                  fontWeight={800}
                  fontSize={22}
                  mt={2}
                >
                  {title}
                </Typography>
                <Typography
                  component="h2"
                  gutterBottom={true}
                  textAlign="center"
                  color="black"
                  fontWeight={400}
                  fontSize={14}
                >
                  {description}
                </Typography>
                {showButton && (
                  <Box
                    sx={{ width: '100%', maxWidth: 236, margin: '20px auto' }}
                  >
                    <Button
                      type="button"
                      variant="contained"
                      fullWidth
                      onClick={onClick}
                      disabled={disableButton}
                    >
                      {buttonLabel}
                    </Button>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
