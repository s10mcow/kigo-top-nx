import { SNACKBAR_VARIANTS } from '@kigo-top/constants';
import { useBranding } from '@kigo-top/providers';
import type { Card } from '@kigo-top/services/client';
import { requestGetCards, requestRemoveCard } from '@kigo-top/services/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import {
  ReactNode,
  RefObject,
  createContext,
  useContext,
  useRef,
  useState,
} from 'react';

type AccountContextType = {
  cards: Card[];
  isLoadingCards: boolean;
  handleUnlinkCard: (id: string) => void;
  handleLinkCard: (data: {
    encryptedCardNumber?: string;
    cardType?: string;
    lastFour?: string;
  }) => void;
  emailNotifications: boolean;
  setEmailNotifications: (emailNotifications: boolean) => void;
  locationEnabled: boolean;
  setLocationEnabled: (locationEnabled: boolean) => void;
  locationSectionRef: RefObject<HTMLDivElement>;
  scrollToLocation: () => void;
};

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const getCardType = (card: Card | null) => {
  if (!card) {
    return null;
  }
  switch (card.type) {
    case 'MAST':
      return 'Mastercard';
    case 'VISA':
      return 'Visa';
    default:
      return 'Unknown';
  }
};

interface ApiError extends Error {
  error_code: string;
  error_message: string;
}

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const { showCashBackOffers } = useBranding();
  const locationSectionRef = useRef<HTMLDivElement>(
    null
  ) as RefObject<HTMLDivElement>;

  const scrollToLocation = () => {
    locationSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  const { data: cards = [], isLoading: isLoadingCards } = useQuery({
    queryKey: ['cards'],
    queryFn: async () => {
      try {
        return await requestGetCards();
      } catch (error) {
        console.error('Error fetching cards:', error);
        const err = error as ApiError | Error;
        if (
          'error_code' in err &&
          err.error_message === 'Member not found in rewards network.'
        ) {
          return [];
        }

        const message =
          'error_code' in err
            ? 'No Rewards Network account found.'
            : (err as ApiError).error_message ||
              'Unable to load cards. Please refresh the page.';

        enqueueSnackbar(message, {
          variant: SNACKBAR_VARIANTS.KIGO_ERROR,
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
          autoHideDuration: 5000,
        });
        throw error;
      }
    },
    enabled: !!showCashBackOffers,
  });

  const unlinkCardMutation = useMutation({
    mutationFn: requestRemoveCard,
    onSuccess: (_, id) => {
      queryClient.setQueryData(['cards'], (oldData: Card[] = []) =>
        oldData.filter((card) => card.id !== id)
      );
      enqueueSnackbar('Card successfully unlinked!', {
        variant: SNACKBAR_VARIANTS.KIGO_INFO,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        autoHideDuration: 5000,
      });
    },
    onError: () => {
      enqueueSnackbar('Unable to unlink card from account. Please try again.', {
        variant: SNACKBAR_VARIANTS.KIGO_ERROR,
        preventDuplicate: true,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        autoHideDuration: 5000,
        style: { zIndex: 9999 },
      });
    },
  });

  const handleUnlinkCard = (id: string) => {
    unlinkCardMutation.mutate(id);
  };

  const handleLinkCard = ({
    encryptedCardNumber,
    cardType,
    lastFour,
  }: {
    encryptedCardNumber?: string;
    cardType?: string;
    lastFour?: string;
  }) => {
    if (!encryptedCardNumber || !cardType || !lastFour) {
      return;
    }

    queryClient.setQueryData(['cards'], (oldData: Card[] = []) => [
      ...oldData,
      { id: `${cardType}-${lastFour}`, type: cardType, number: lastFour },
    ]);
  };

  const value = {
    cards,
    isLoadingCards,
    handleUnlinkCard,
    handleLinkCard,
    emailNotifications,
    setEmailNotifications,
    locationEnabled,
    setLocationEnabled,
    locationSectionRef,
    scrollToLocation,
  };

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
};

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccount must be used within an AccountProvider');
  }
  return context;
};
