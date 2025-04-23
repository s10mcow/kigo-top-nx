import { useBranding, useSession } from '@kigo-top/providers';
import { Box, Container, Grid2 as Grid } from '@mui/material';
import AccountDropdown from './AccountDropdown';

export const Header = () => {
  const { branding } = useBranding();
  const { isSsoSession } = useSession();
  const logoUrl = branding?.logo;

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        borderBottomWidth: 1.5,
        borderBottomStyle: 'solid',
        borderBottomColor: (theme) => theme.palette.kigo.black_grey,
      }}
    >
      <Container
        sx={{
          '@media (min-width: 1280px)': { maxWidth: 1280 },
          '@media (max-width: 1280px)': { maxWidth: 1280 },
        }}
      >
        <Grid container>
          <Grid
            size={12}
            display="flex"
            justifyContent="space-between"
            height={96}
            alignItems="center"
            flex={1}
          >
            {logoUrl && (
              <Box
                component="img"
                src={logoUrl ?? ''}
                alt="logo"
                sx={{ width: { xs: 230, md: 'auto' }, maxWidth: 230 }}
              />
            )}

            {!isSsoSession && (
              <Box ml={'auto'}>
                <AccountDropdown />
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
