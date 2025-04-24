import TestLoginContainer from './TestAnonLoginContainer';

export default function page() {
  const isDevelopment =
    process.env.NEXT_PUBLIC_ENV === 'DEVELOPMENT' ||
    process.env.NEXT_PUBLIC_ENV === 'TEST';

  if (!isDevelopment) {
    return <div>Unauthorize access</div>;
  }

  return <TestLoginContainer />;
}
