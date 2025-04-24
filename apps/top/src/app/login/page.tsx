'use client';
import { LANDING_PAGE } from '@kigo-top/constants';
import { useCustomRouter } from '@kigo-top/hooks';
import { useEffect } from 'react';

function LoginPage() {
  const router = useCustomRouter();

  // We can navigate away from login since we already have an access token present
  useEffect(() => {
    router.push(LANDING_PAGE);
  }, [router]);

  return null;
}

export default LoginPage;
