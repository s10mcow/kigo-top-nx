'use client';
import { AuthFlowContainer } from '@kigo-top/components';
import {
  LANDING_PAGE,
  LOGIN_EMAIL_PAGE,
  LOGIN_FORGOT_PASSWORD_PAGE,
  SIGNUP_NAME_PAGE,
} from '@kigo-top/constants';
import {
  EnterEmailFormValues,
  useCustomRouter,
  useEnterEmail,
} from '@kigo-top/hooks';
import { useBranding, useOAuth } from '@kigo-top/providers';
import {
  AccountCredentialType,
  checkAccountValidity,
} from '@kigo-top/services/client';
import { useSearchParams } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { EmailForm } from './EmailForm';
import { PasswordForm } from './PasswordForm';
import { LoginFormValues, useLoginForm } from './useLoginForm';

export default function LoginForm() {
  const { branding } = useBranding();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const router = useCustomRouter();
  const { handleEmailAndPasswordSignIn } = useOAuth({
    externalProgramId: branding?.external_program_id ?? '',
  });
  const { enqueueSnackbar } = useSnackbar();
  const loginHookForm = useLoginForm();
  const searchParams = useSearchParams();
  const defaultEmail = searchParams.get('email');
  const [isLoading, setIsLoading] = useState(false);
  const enterEmailHookForm = useEnterEmail({ email: defaultEmail ?? '' });
  const [showPasswordField, setShowPasswordField] = useState(
    searchParams.get('showPasswordField') === 'true'
  );
  const [displayPassword, setDisplayPassword] = useState(false);

  const handleFormSubmit = async (data: LoginFormValues) => {
    try {
      setIsLoading(true);
      const { email, password } = data;
      await handleEmailAndPasswordSignIn(email, password);
      router.push(LANDING_PAGE, { preserveQuery: false });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailEntered = async (data: EnterEmailFormValues) => {
    setIsLoading(true);
    if (!executeRecaptcha) {
      return;
    }
    const { email } = data;
    try {
      const token = await executeRecaptcha(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''
      );
      const response = await checkAccountValidity(email, token);

      if (response.exists) {
        router.replace(LOGIN_EMAIL_PAGE, {
          preserveQuery: true,
          queryParams: { email, showPasswordField: 'true' },
        });
        // Throw error if account is not email/password
        if (
          response.credential_type !== AccountCredentialType.EmailAndPassword
        ) {
          enterEmailHookForm.setError('email', {
            message:
              "It looks like there's an issue with this email address. Please try a different email or go back and choose a different sign in method.",
          });

          return;
        }
        setShowPasswordField(true);
        loginHookForm.setValue('email', email);
      } else {
        router.push(SIGNUP_NAME_PAGE(email), { preserveQuery: false });
      }
    } catch {
      enqueueSnackbar('tryAgain', { variant: 'kigoError' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPasswordClick = () => {
    const email = enterEmailHookForm.getValues().email;
    router.push(
      LOGIN_FORGOT_PASSWORD_PAGE +
        `${
          email?.length
            ? '?' + new URLSearchParams([['email', email]]).toString()
            : ''
        }`
    );
  };

  const handleBackClick = () => {
    if (showPasswordField) {
      setShowPasswordField(false);
      setDisplayPassword(false);
      loginHookForm.resetField('password');
    } else {
      const email = enterEmailHookForm.getValues().email;
      router.push('/app', { preserveQuery: false, queryParams: { email } });
    }
  };

  useEffect(() => {
    if (defaultEmail) {
      loginHookForm.setValue('email', defaultEmail);
    }
  }, [defaultEmail, loginHookForm]);

  return (
    <AuthFlowContainer
      onBack={handleBackClick}
      title={!showPasswordField ? 'Enter Email' : 'Enter Password'}
    >
      {!showPasswordField ? (
        <EmailForm
          onSubmit={handleEmailEntered}
          enterEmailHookForm={enterEmailHookForm}
          isLoading={isLoading}
        />
      ) : (
        <PasswordForm
          onSubmit={handleFormSubmit}
          isLoading={isLoading}
          enterEmailHookForm={loginHookForm}
          displayPassword={displayPassword}
          setDisplayPassword={setDisplayPassword}
          handleForgotPasswordClick={handleForgotPasswordClick}
        />
      )}
    </AuthFlowContainer>
  );
}
