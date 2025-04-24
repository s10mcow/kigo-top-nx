'use client';
import { useAuthentication, useSession } from '@kigo-top/providers';
import {
  AccountCircle,
  ExpandLess,
  ExpandMore,
  Logout,
} from '@mui/icons-material';
import {
  Avatar,
  Button,
  Menu,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useMemo } from 'react';
import AccountMenuItem from './AccountMenuItem';

export default function AccountDropdown() {
  const theme = useTheme();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md')
  );
  const navigate = useRouter();
  const { sessionToken, accessToken } = useSession();
  const { setShowLogin, user, signOut } = useAuthentication();
  const authorized = useMemo(
    () => !!(sessionToken || accessToken) && !!user,
    [sessionToken, accessToken, user]
  );
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (authorized) {
      setAnchorEl(event.currentTarget);
    } else {
      setShowLogin(true);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const userName = useMemo(() => {
    if (!user) return 'Sign in';

    if (user.first_name) {
      return user.first_name;
    }

    if (user.last_name) {
      return user.last_name;
    }

    return 'User';
  }, [user]);

  const abbreviatedName = useMemo(() => {
    if (!user) return '';
    let initials = '';

    if (user.first_name) {
      initials += user.first_name.charAt(0);
    }
    if (user.last_name) {
      initials += user.last_name.charAt(0);
    }
    return initials;
  }, [user]);

  return (
    <>
      <Button
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '8px',
          px: '12px',
          py: { xs: authorized ? '12px' : '8px', md: '12px' },
          height: { xs: authorized ? 'auto' : '36px', md: 'auto' },
          border: `1px solid ${theme.palette.grey[400]}`,
          borderRadius: '12px',
          color: theme.palette.text.primary,
          '&:hover': { border: `1px solid ${theme.palette.primary.main}` },
        }}
        onClick={handleClick}
        variant="outlined"
        color="primary"
        data-testid="AccountDropdown"
      >
        {!authorized && isMobile ? null : (
          <Avatar
            sx={{
              backgroundColor: 'primary.main',
              width: 32,
              height: 32,
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            {abbreviatedName}
          </Avatar>
        )}

        {authorized && isMobile ? null : (
          <Typography noWrap textOverflow="ellipsis" variant="bodyMdBold">
            {userName}
          </Typography>
        )}

        {authorized && (open ? <ExpandLess /> : <ExpandMore />)}
      </Button>
      <Menu
        sx={{
          mt: '4px',
          boxShadow: '0px 2px 2px -1px rgba(27, 35, 44, 0.04)',
          '& .MuiMenu-paper': {
            border: `1px solid ${theme.palette.grey[400]}`,
            borderRadius: '12px',
            boxShadow: '0px 8px 16px -2px rgba(27, 36, 44, 0.12)',
          },
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={handleClose}
        anchorEl={anchorEl}
        open={open}
      >
        <AccountMenuItem
          icon={<AccountCircle />}
          title="Account"
          onClick={() => navigate.push('/account')}
        />
        <AccountMenuItem
          icon={<Logout />}
          title="Sign out"
          onClick={() => {
            signOut();

            handleClose();
          }}
        />
      </Menu>
    </>
  );
}
