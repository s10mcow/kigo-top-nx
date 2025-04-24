import { ErrorContainer } from '@kigo-top/components';

export default function Page() {
  return (
    <ErrorContainer
      title="Error"
      description="An error occurred while trying to access this page. Please return to the previous page and try again."
      showButton={false}
      isCampaignError={true}
    />
  );
}
