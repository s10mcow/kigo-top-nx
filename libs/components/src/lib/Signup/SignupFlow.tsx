'use client';

import { LANDING_PAGE } from '@kigo-top/constants';
import { CreatePasswordFormValues, useCustomRouter } from '@kigo-top/hooks';
import { useBranding, useOAuth } from '@kigo-top/providers';
import { usePathname, useSearchParams } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useMemo, useState } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { AuthFlowContainer } from '../AuthFlowContainer/AuthFlowContainer';
import { LegalStep } from './LegalStep/LegalStep';
import { NameStep } from './NameStep/NameStep';
import { EnterNameFormValues } from './NameStep/useEnterName';
import { NotificationPermissions } from './NotificationPermissions/NotificationPermissions';
import { CreatePasswordForm } from './PasswordStep/PasswordStep';
import { VerifyEmailStep } from './VerifyEmailStep/VerifyEmailStep';
type SignUpSteps =
  | 'name'
  | 'legal'
  | 'password'
  | 'verifyEmail'
  | 'ssoLegal'
  | 'notificationPermissions';

export type SignupInfo = {
  email: string | null;
  phoneNumber: string | null;
  firstName: string | null;
  lastName: string | null;
  agreeToTerms: boolean;
  password: string | null;
};

const updateQueryParams = (keyValuePairs: { key: string; value: string }[]) => {
  const url = new URL(window.location.href);
  keyValuePairs.forEach(({ key, value }) => {
    url.searchParams.set(key, value);
  });
  window.history.pushState(null, '', url.toString());
};

export function SignupFlow() {
  const router = useCustomRouter();
  const [passwordSubmissionLoading, setPasswordSubmissionLoading] =
    useState(false);
  const pathname = usePathname();
  const { branding } = useBranding();
  const { handleEmailAndPasswordSignUp } = useOAuth({
    externalProgramId: branding?.external_program_id ?? '',
  });
  const searchParams = useSearchParams();
  const defaultStep = searchParams.get('step') ?? 'name';
  const defaultEmail = searchParams.get('email');
  const defaultFirstName = decodeURIComponent(
    searchParams.get('first_name') ?? ''
  );
  const defaultLastName = decodeURIComponent(
    searchParams.get('last_name') ?? ''
  );
  const defaultPhoneNumber = decodeURIComponent(
    searchParams.get('phone_number') ?? ''
  );
  const [step, setStep] = useState<SignUpSteps>(defaultStep as SignUpSteps);
  const [signupInfo, setSignupInfo] = useState<SignupInfo>({
    email: defaultEmail,
    phoneNumber: defaultPhoneNumber,
    firstName: defaultFirstName,
    lastName: defaultLastName,
    agreeToTerms: false,
    password: null,
  });

  const { Component, handleBack, title } = useMemo(() => {
    const signUpSteps = {
      name: {
        title: 'Enter your information',
        Component: () => (
          <NameStep
            onSubmitAction={(data: EnterNameFormValues) => {
              setSignupInfo({
                ...signupInfo,
                firstName: data.first_name,
                lastName: data.last_name,
              });

              updateQueryParams([
                { key: 'first_name', value: encodeURI(data.first_name) },
                { key: 'last_name', value: encodeURI(data.last_name) },
                { key: 'step', value: 'legal' },
              ]);

              setStep('legal');
            }}
            defaultValues={{
              first_name: defaultFirstName ?? '',
              last_name: defaultLastName ?? '',
            }}
          />
        ),
        handleBack: undefined,
      },

      legal: {
        title: 'Legal',
        Component: () => (
          <LegalStep
            onSubmitAction={() => {
              setSignupInfo((prev) => ({ ...prev, agreeToTerms: true }));
              updateQueryParams([{ key: 'step', value: 'password' }]);
              setStep('password');
            }}
            defaultValues={{ agreeToTerms: signupInfo.agreeToTerms }}
          />
        ),
        handleBack: () => {
          updateQueryParams([{ key: 'step', value: 'name' }]);
          setStep('name');
        },
      },
      password: {
        Component: () => (
          <GoogleReCaptchaProvider
            useRecaptchaNet={true}
            reCaptchaKey={process.env['NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY'] ?? ''}
          >
            <CreatePasswordForm
              onSubmitAction={async (data: CreatePasswordFormValues) => {
                setPasswordSubmissionLoading(true);
                try {
                  await handleEmailAndPasswordSignUp(
                    signupInfo.email ?? '',
                    data.password ?? '',
                    signupInfo.firstName ?? '',
                    signupInfo.lastName ?? '',
                    signupInfo.phoneNumber ?? '',
                    branding?.external_program_id ?? ''
                  );
                  setStep('verifyEmail');
                  router.push(pathname, {
                    queryParams: {
                      step: 'verifyEmail',
                      email: signupInfo.email ?? '',
                    },
                    preserveQuery: false,
                  });
                } catch (error) {
                  console.error(error);
                  enqueueSnackbar(
                    'Error creating account, please try again later.',
                    { variant: 'kigoError' }
                  );
                } finally {
                  setPasswordSubmissionLoading(false);
                }
              }}
              loading={passwordSubmissionLoading}
            />
          </GoogleReCaptchaProvider>
        ),
        handleBack: () => setStep('legal'),
        title: 'Create a password',
      },
      verifyEmail: {
        Component: () => (
          <VerifyEmailStep
            email={signupInfo.email ?? ''}
            onNext={() => router.push(LANDING_PAGE, { preserveQuery: false })}
          />
        ),
        handleBack: undefined,
        title: '',
      },
      ssoLegal: {
        title: 'Legal',
        Component: () => (
          <LegalStep
            onSubmitAction={() => {
              setSignupInfo((prev) => ({ ...prev, agreeToTerms: true }));
              updateQueryParams([
                { key: 'step', value: 'notificationPermissions' },
              ]);
              setStep('notificationPermissions');
            }}
            defaultValues={{ agreeToTerms: signupInfo.agreeToTerms }}
          />
        ),
        handleBack: undefined,
      },
      notificationPermissions: {
        title: '',
        Component: () => (
          <NotificationPermissions
            onNext={() => {
              router.push(LANDING_PAGE, { preserveQuery: false });
            }}
          />
        ),
        handleBack: () => {
          updateQueryParams([{ key: 'step', value: 'ssoLegal' }]);
          setStep('ssoLegal');
        },
      },
    };

    return signUpSteps[step];
  }, [
    step,
    signupInfo,
    defaultFirstName,
    defaultLastName,
    router,
    pathname,
    handleEmailAndPasswordSignUp,
    passwordSubmissionLoading,
    branding?.external_program_id,
  ]);

  return (
    <AuthFlowContainer title={title} onBack={handleBack}>
      <Component />
    </AuthFlowContainer>
  );
}
