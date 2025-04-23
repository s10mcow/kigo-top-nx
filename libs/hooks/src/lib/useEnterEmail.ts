'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const enterEmailFormSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('Email address is required.')
    .email('Please enter a valid email address.')
    .max(100, 'Email must be at most 100 characters.')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Please enter a valid email address.',
    ),
});

type EnterEmailFormValues = yup.InferType<typeof enterEmailFormSchema>;

export const useEnterEmail = ({ email }: { email: string }) => {
  const form = useForm<EnterEmailFormValues>({
    defaultValues: {
      email,
    },
    resolver: yupResolver(enterEmailFormSchema),
    reValidateMode: 'onChange',
  });

  return {
    ...form,
  };
};

export type { EnterEmailFormValues };
