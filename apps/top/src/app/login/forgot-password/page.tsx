'use client';
import { AuthFlowContainer, Nav } from '@kigo-top/components';
import { HELP_AND_FAQS_URL, LOGIN_EMAIL_PAGE } from '@kigo-top/constants';
import { EnterEmailFormValues, useCustomRouter } from '@kigo-top/hooks';
import { requestPasswordResetEmail } from '@kigo-top/services/client';
import EditIcon from '@mui/icons-material/Edit';
import HelpIcon from '@mui/icons-material/Help';
import { useSearchParams } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import EmailSent from './EmailSent';
import EnterEmail from './EnterEmail';

export default function ForgotPassword() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(searchParams.get('email') ?? '');

  const { enqueueSnackbar } = useSnackbar();
  const router = useCustomRouter();
  const [emailSent, setEmailSent] = useState(false);

  const onBackEnterEmail = () => {
    if (!emailSent) {
      router.push(LOGIN_EMAIL_PAGE, {
        queryParams: { email, showPasswordField: 'true' },
        preserveQuery: true,
      });
    } else {
      setEmailSent(false);
    }
  };
  const handleSubmitEnterEmail = async (data: EnterEmailFormValues) => {
    try {
      await requestPasswordResetEmail({ email: data.email });
    } catch (error) {
      console.error(error);
    } finally {
      setEmail(data.email);
      setEmailSent(true);
    }
  };
  const handleResendEmailClick = async () => {
    try {
      await requestPasswordResetEmail({ email });
      enqueueSnackbar('Reset email sent', { variant: 'kigoInfo' });
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Error sending reset email', { variant: 'kigoError' });
    }
  };
  const onClickHelpAndFaqs = () => {
    window.open(HELP_AND_FAQS_URL, '_blank');
  };

  return (
    <>
      <Nav
        showPopover={emailSent}
        popoverLinks={[
          {
            title: 'Enter different email',
            icon: <EditIcon />,
            onClick: () => setEmailSent(false),
          },
          {
            title: 'Help and FAQs',
            icon: <HelpIcon />,
            onClick: onClickHelpAndFaqs,
          },
        ]}
      />
      <AuthFlowContainer title="Forgot Password" onBack={onBackEnterEmail}>
        {!emailSent ? (
          <EnterEmail
            email={email}
            handleFormSubmitAction={handleSubmitEnterEmail}
          />
        ) : (
          <EmailSent
            email={email}
            handleFormSubmitAction={handleResendEmailClick}
          />
        )}
      </AuthFlowContainer>
    </>
  );
}
