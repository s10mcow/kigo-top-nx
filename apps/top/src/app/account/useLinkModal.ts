import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const agreementSchema = yup.object().shape({
  card: yup.object().shape({
    cardNumber: yup.string().required(),
    cardType: yup.string().required(),
    lastFour: yup.string().required(),
  }),
  agreement: yup
    .boolean()
    .oneOf([true], 'You must accept the agreement')
    .required(),
});

export type Agreement = yup.InferType<typeof agreementSchema>;

export const useLinkModal = () => {
  const { control, handleSubmit, formState, setValue, reset } =
    useForm<Agreement>({
      defaultValues: {
        card: {
          cardNumber: '',
          cardType: '',
          lastFour: '',
        },
        agreement: undefined,
      },
      resolver: yupResolver(agreementSchema),
    });

  useEffect(() => {
    const addCardListener = (event: MessageEvent) => {
      if (event.origin !== 'https://secure.rnstg.com') return;

      try {
        const content = JSON.parse(event.data);

        if (content?.encryptedCardNumber) {
          setValue('card.cardNumber', content.encryptedCardNumber);
          setValue('card.cardType', content.cardType);
          setValue('card.lastFour', content.lastFour);
        } else {
          setValue('card.cardNumber', '');
          setValue('card.cardType', '');
          setValue('card.lastFour', '');
        }
      } catch (error) {
        console.error('Error parsing message event data:', error);
      }
    };

    window.addEventListener('message', addCardListener);
    return () => {
      window.removeEventListener('message', addCardListener);
    };
  }, [setValue]);

  return { control, handleSubmit, formState, setValue, reset };
};
