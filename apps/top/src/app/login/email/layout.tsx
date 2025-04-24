'use client';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export default function LoginEmailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY ?? ''}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
