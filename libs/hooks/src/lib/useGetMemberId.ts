// import { getMemberId } from '@kigo-top/services';
// import { useSnackbar } from 'notistack';
// import { useCallback, useState } from 'react';

// interface UseGetMemberIdReturn {
//   memberId: string | null;
//   isLoading: boolean;
//   error: Error | null;
//   fetchMemberId: () => Promise<void>;
// }

// interface ApiError {
//   error_code: string;
//   error_message: string;
// }

// const isApiError = (error: unknown): error is ApiError => {
//   return (
//     typeof error === 'object' &&
//     error !== null &&
//     'error_code' in error &&
//     'error_message' in error
//   );
// };

// export const useGetMemberId = (): UseGetMemberIdReturn => {
//   const [memberId, setMemberId] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<Error | null>(null);
//   const { enqueueSnackbar } = useSnackbar();

//   const fetchMemberId = useCallback(async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await getMemberId();
//       setMemberId(response.member_id);
//     } catch (err) {
//       if (isApiError(err) && err.error_code === 'not_found') {
//         setError(new Error(err.error_message));
//         enqueueSnackbar('No reward network exists', { variant: 'error' });
//       } else {
//         const error =
//           err instanceof Error ? err : new Error('Failed to fetch member ID');
//         setError(error);
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   }, [enqueueSnackbar]);

//   return { memberId, isLoading, error, fetchMemberId };
// };
