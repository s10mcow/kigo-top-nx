import LoginPage from './LoginPage';

export default function page() {
  const isDevelopment =
    process.env.NEXT_PUBLIC_ENV === 'DEVELOPMENT' ||
    process.env.NEXT_PUBLIC_ENV === 'TEST';

  if (!isDevelopment) {
    return <div>Unauthorize access</div>;
  }

  return <LoginPage />;
}
