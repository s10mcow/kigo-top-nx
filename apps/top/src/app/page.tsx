'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      (process.env.NEXT_PUBLIC_ENV === 'DEVELOPMENT' ||
        process.env.NEXT_PUBLIC_ENV === 'TEST')
    ) {
      router.push('/test-login');
    }
  }, [router]);

  return null;
}
