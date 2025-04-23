import { useBranding } from '@kigo-top/providers';
import {
  Box,
  Button,
  Container,
  Grid2 as Grid,
  Stack,
  Typography,
} from '@mui/material';

export const Footer = () => {
  const { branding } = useBranding();
  const logoUrl = branding?.logo;
  return (
    <Box
      component="footer"
      sx={{
        pt: { xs: 4, lg: 5 },
        pb: { xs: 4, lg: 5 },
        backgroundColor: (theme) => theme.palette.kigo.stone,
      }}
    >
      <Container
        sx={{
          '@media (min-width: 1280px)': { maxWidth: 1280 },
          '@media (max-width: 1280px)': { maxWidth: 1280 },
        }}
      >
        <Stack
          direction={{ xs: 'column', lg: 'row' }}
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          textAlign="center"
        >
          {logoUrl && (
            <Box display="flex" alignItems="center">
              <Box
                component="img"
                src={logoUrl}
                alt="Partner logo"
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxWidth: '230px',
                  mt: { xs: 0, lg: 2 },
                  mb: 2,
                  mr: { xs: 0, lg: 5 },
                }}
              />
            </Box>
          )}

          <Grid
            container
            rowSpacing={1.5}
            columnSpacing={3}
            sx={{ justifyContent: { xs: 'center', lg: 'flex-end' } }}
          >
            <Grid>
              <Button
                href="https://help.kigo.io/hc/en-us/categories/27937094143771-Entertainment-Help-Center"
                variant="link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Typography
                  variant="bodyMdBold"
                  sx={{
                    textDecoration: 'underline',
                    textTransform: 'none',
                    color: 'black',
                  }}
                >
                  Help & FAQs
                </Typography>
              </Button>
            </Grid>
            <Grid>
              <Button
                href="https://help.kigo.io/hc/en-us/articles/28139046798235-ENTERTAINMENT-MEMBERSHIPS-PRODUCTS-AND-WEBSITE-Rules-Terms-and-Conditions-of-Use"
                variant="link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Typography
                  variant="bodyMdBold"
                  sx={{
                    textDecoration: 'underline',
                    textTransform: 'none',
                    color: 'black',
                  }}
                >
                  Terms of Service
                </Typography>
              </Button>
            </Grid>
            <Grid>
              <Button
                href="https://help.kigo.io/hc/en-us/requests/new"
                variant="link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Typography
                  variant="bodyMdBold"
                  sx={{
                    textDecoration: 'underline',
                    textTransform: 'none',
                    color: 'black',
                  }}
                >
                  Contact Us
                </Typography>
              </Button>
            </Grid>
            <Grid>
              <Button
                href="https://help.kigo.io/hc/en-us/articles/29354140980891-Privacy-Policy"
                variant="link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Typography
                  variant="bodyMdBold"
                  sx={{
                    textDecoration: 'underline',
                    textTransform: 'none',
                    color: 'black',
                  }}
                >
                  Privacy Policy
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};
