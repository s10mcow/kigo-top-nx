import SSOTestLoginContainer from './SSOTestLoginContainer';

export default function page() {
  const isDevelopment =
    process.env.NEXT_PUBLIC_ENV === 'DEVELOPMENT' ||
    process.env.NEXT_PUBLIC_ENV === 'TEST';

  if (!isDevelopment) {
    return <div>Unauthorize access</div>;
  }

  const intervalPartnerId = process.env.KIGO_EXTERNAL_PARTNER_ID_INTERVAL;
  const intervalApiKey = process.env.KIGO_EXTERNAL_PARTNER_API_KEY_INTERVAL;

  return (
    <SSOTestLoginContainer
      intervalPartnerId={intervalPartnerId || ''}
      intervalApiKey={intervalApiKey || ''}
    />
  );
}
