import { HELP_AND_FAQS_URL, LOGIN_EMAIL_PAGE } from '@kigo-top/constants';
import { useCustomRouter } from '@kigo-top/hooks';
import { useAuthentication } from '@kigo-top/providers';
import EditIcon from '@mui/icons-material/Edit';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Box, Button } from '@mui/material';
import BasicPopover from '../../BasicPopover/BasicPopover';

export function VerifyStepPopover() {
  const router = useCustomRouter();
  const { signOut } = useAuthentication();

  const popoverLinks = [
    {
      title: 'Enter a different email address',
      icon: <EditIcon />,
      onClick: () => {
        signOut();
        router.push(LOGIN_EMAIL_PAGE, { preserveQuery: false });
      },
    },
    {
      title: 'Sign out',
      icon: <LogoutIcon />,
      onClick: () => {
        signOut();
        router.push('/test-anon-login', { preserveQuery: false });
      },
    },
    {
      title: 'Help & FAQs',
      icon: <HelpIcon />,
      onClick: () => window.open(HELP_AND_FAQS_URL, '_blank'),
    },
  ];

  return (
    <BasicPopover
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PopoverButton={
        <Box
          sx={{
            backgroundColor: (theme) => theme.palette.kigo.stone,
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <QuestionMarkIcon color="primary" sx={{ width: 19, height: 19 }} />
        </Box>
      }
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        {popoverLinks.map((link) => (
          <Button
            key={link.title.toLocaleLowerCase().replace(' ', '')}
            sx={{ padding: '16px' }}
            startIcon={link.icon}
            onClick={link.onClick}
          >
            {link.title}
          </Button>
        ))}
      </Box>
    </BasicPopover>
  );
}
