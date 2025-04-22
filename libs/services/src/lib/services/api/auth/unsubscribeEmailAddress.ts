import { useQuery } from '@tanstack/react-query';

export const unsubscribeEmailAddress = async (
  accountId: string | null,
): Promise<void> => {
  if (!accountId) {
    throw new Error('No account id provided');
  }

  const res = await fetch(`/api/unsubscribe?accountId=${accountId}`);

  if (!res.ok) {
    throw new Error('Failed to unsubscribe email');
  }

  return res.json();
};

export const useUnsubscribeEmailAddress = (accountId: string | null) => {
  return useQuery({
    queryFn: () => unsubscribeEmailAddress(accountId),
    queryKey: ['unsubscribeEmailAddress', accountId],
    enabled: !!accountId,
  });
};
