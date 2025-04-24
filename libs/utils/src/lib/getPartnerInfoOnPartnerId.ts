import { PARTNER_CONFIG } from '@kigo-top/constants';

export type PartnerInfo = { partnerId: string; partnerApiKey: string };

export const getPartnerInfoOnPartnerId = (partnerId: string): PartnerInfo => {
  for (const key in PARTNER_CONFIG) {
    if (PARTNER_CONFIG[key].id === partnerId) {
      return {
        partnerId: PARTNER_CONFIG[key].id,
        partnerApiKey: PARTNER_CONFIG[key].apiKey,
      };
    }
  }

  return { partnerId: '', partnerApiKey: '' };
};
