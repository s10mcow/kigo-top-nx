'use client';

import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

import { CircleIcon } from '@kigo-top/components';
import { useBranding } from '@kigo-top/providers';

export default function ResetPasswordInvalid() {
  const { branding } = useBranding();
  const logo = branding?.secondary_logo ?? '';

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const title = 'The link is no longer valid or has expired';
  const testId = 'verify-error';

  return (
    <Box
      sx={{
        background: 'linear-gradient(148.69deg, #4B55FD 15.78%, #FF3858 100%)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '100vh',
        '@supports(height: 100svh)': { height: '100svh' },
        width: '100vw',
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflowY: 'scroll',
      }}
    >
      <Box display="flex" justifyContent="center" marginTop="50px">
        <Image
          src={logo}
          alt="Logo"
          width={196}
          height={55}
          style={{ height: 'auto', width: '100%', maxWidth: '196px' }}
        />
      </Box>
      <Box
        sx={[
          {
            width: '100%',
            maxWidth: '560px',
            backgroundColor: 'white',
            borderRadius: '20px',
            margin: '0px auto',
            marginTop: '40px',
            padding: '30px 50px',
            height: { sm: '90vh', md: 'unset' },
          },
          isMobile && {
            height: '90vh',
            borderBottomLeftRadius: '0px',
            borderBottomRightRadius: '0px',
            padding: '30px 20px',
            display: 'absolute',
            top: 'auto',
          },
        ]}
      >
        <Box>
          <Box mb="30px" mt="20px" display="flex" justifyContent="center">
            <CircleIcon InnerIcon={PriorityHighIcon} />
          </Box>
          <Box
            mb={3}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
          >
            {title && (
              <Typography
                variant="titleLg"
                fontSize={32}
                component="h1"
                data-testid={`${testId}-title`}
                mb={2}
              >
                <span>{title}</span>
              </Typography>
            )}
            <Typography
              variant="bodyMd"
              component="p"
              data-testid={`${testId}-body`}
              mb={2}
            >
              <span>
                Please submit a new reset password request. If this problem
                persists, please contact support.
                <Link
                  href="https://help.kigo.io/hc/en-us/requests/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: 'none',
                    color: theme.palette.primary.main,
                    fontWeight: 'bold',
                  }}
                >
                  contact support
                </Link>
              </span>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
