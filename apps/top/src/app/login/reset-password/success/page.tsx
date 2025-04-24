'use client';
import { IconTitleWithCta } from '@kigo-top/components';
import { LANDING_PAGE } from '@kigo-top/constants';
import CheckIcon from '@mui/icons-material/Check';
import { Box, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function ResetPasswordSuccessPage() {
  const router = useRouter();

  const onSignInPressed = () => {
    router.push(LANDING_PAGE);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '90px',
      }}
    >
      <IconTitleWithCta
        typography={{
          contents: {
            title: 'Success!',
            body: 'Your password has been successfully reset.',
          },
        }}
        icon={{ variant: 'circle-icon', innerIcon: CheckIcon }}
        cta={
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: '24px', width: '300px' }}
            onClick={onSignInPressed}
          >
            Sign in
          </Button>
        }
      />
    </Box>
  );
}
