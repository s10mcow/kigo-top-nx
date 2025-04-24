'use client';

import { ReactNode, Suspense } from 'react';
import SdkWrapper from '../SdkWrapper/SdkWrapper';

export const AppWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Suspense fallback={null}>
        <SdkWrapper />
      </Suspense>
      {children}
    </>
  );
};
