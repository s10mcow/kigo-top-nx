import { useBranding } from '@kigo-top/providers';
import AddLinkIcon from '@mui/icons-material/AddLink';
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  Grid2 as Grid,
  Stack,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { getCardType, useAccount } from './AccountContext';
import MasterCardSVG from './images/mastercard-logo.svg';
import { LinkCardModal } from './LinkCardModal';
import { UnlinkCardModal } from './UnlinkCardModal';

const MasterCard = () => (
  <Image src={MasterCardSVG} alt="MasterCard" width={24} height={24} />
);

export const LinkedCards = () => {
  const { showCashBackOffers } = useBranding();
  const { cards, handleUnlinkCard, isLoadingCards, scrollToLocation } =
    useAccount();
  const { enqueueSnackbar } = useSnackbar();
  const [linkCardModalOpen, setLinkCardModalOpen] = useState(false);
  const [unlinkCardModalOpen, setUnlinkCardModalOpen] = useState(false);
  const [isUnlinking, setIsUnlinking] = useState(false);
  const [unlinkCard, setUnlinkCard] = useState<(typeof cards)[number] | null>(
    null
  );

  const handleUnlinkButtonClick = async () => {
    if (unlinkCard) {
      try {
        setIsUnlinking(true);
        await handleUnlinkCard(unlinkCard.id);
        setUnlinkCardModalOpen(false);
      } catch (error) {
        // Error is already handled by AccountContext
        console.error('Error in handleUnlinkButtonClick:', error);
      } finally {
        setIsUnlinking(false);
      }
    }
  };

  const handleLinkCardClick = () => {
    const userLocation = localStorage.getItem('kigo_user_location');
    if (!userLocation) {
      enqueueSnackbar(
        'Please enter a zip code or enable location permissions',
        {
          variant: 'kigoInfo',
          onEntered: () => {
            scrollToLocation();
          },
        }
      );
      return;
    }
    setLinkCardModalOpen(true);
  };

  if (!showCashBackOffers) {
    return null;
  }

  const renderContent = () => {
    if (isLoadingCards) {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <CircularProgress size={20} />
          <Typography>Loading linked cards...</Typography>
        </Box>
      );
    }

    return (
      <Stack spacing={2}>
        {cards && cards.length > 0 ? (
          cards.map((card) => (
            <Card key={card.id} sx={{ p: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <MasterCard />
                  <Typography variant="bodyMd" sx={{ ml: 1 }}>
                    {getCardType(card)} **** {card.number}
                  </Typography>
                </Box>
                <Button
                  variant="text"
                  color="error"
                  onClick={() => {
                    setUnlinkCardModalOpen(true);
                    setUnlinkCard(card);
                  }}
                >
                  <Typography variant="titleSm" color="error">
                    Unlink
                  </Typography>
                </Button>
              </Box>
            </Card>
          ))
        ) : (
          <Typography color="text.secondary">No cards linked yet.</Typography>
        )}
        <Button
          onClick={handleLinkCardClick}
          variant="outlined"
          startIcon={<AddLinkIcon sx={{ width: '24px', height: '24px' }} />}
          sx={{ alignSelf: 'flex-start' }}
        >
          Link a new card
        </Button>
      </Stack>
    );
  };

  return (
    <>
      <Grid>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="titleSm">Linked card(s)</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>{renderContent()}</Grid>
        </Grid>
        <Divider sx={{ my: 4, width: '100%' }} />
      </Grid>
      <LinkCardModal
        open={linkCardModalOpen}
        onClose={() => setLinkCardModalOpen(false)}
      />
      <UnlinkCardModal
        isLastCard={cards?.length === 1}
        open={unlinkCardModalOpen}
        onClose={() => setUnlinkCardModalOpen(false)}
        card={unlinkCard}
        onButtonClick={handleUnlinkButtonClick}
        isLoading={isUnlinking}
      />
    </>
  );
};
