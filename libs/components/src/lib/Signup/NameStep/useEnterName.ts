'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

type EnterNameFormValues = {
  first_name: string;
  last_name: string;
};
const enterNameFormSchema = yup.object().shape({
  first_name: yup
    .string()
    .trim()
    .required('First name is required.')
    .min(2, 'First name must be at least 2 characters.')
    .max(50, 'First name must be at most 50 characters.')
    .matches(
      /^[\u2018\u2019a-zA-Z\s-.']*$/,
      'First name must only contain letters, hyphens, apostrophes, and periods.',
    )
    .matches(
      /^(?!.* {2}).*$/,
      'First name must not contain consecutive spaces.',
    )
    .notOneOf(['admin', 'null'], 'First name is invalid.'),
  last_name: yup
    .string()
    .trim()
    .required('Last name is required.')
    .min(2, 'Last name must be at least 2 characters.')
    .max(50, 'Last name must be at most 50 characters.')
    .matches(
      /^[\u2018\u2019a-zA-Z\s-.']*$/,
      'Last name must only contain letters, hyphens, apostrophes, and periods.',
    )
    .matches(/^(?!.* {2}).*$/, 'Last name must not contain consecutive spaces.')
    .notOneOf(['admin', 'null'], 'Last name is invalid.'),
});

type EnterNameFormSchema = yup.InferType<typeof enterNameFormSchema>;

export const useEnterName = ({
  signUpData,
}: {
  signUpData: EnterNameFormValues;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<EnterNameFormSchema>({
    defaultValues: {
      first_name: signUpData?.first_name,
      last_name: signUpData?.last_name,
    },
    resolver: yupResolver(enterNameFormSchema),
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    reset(signUpData);
  }, [signUpData, reset]);

  return {
    register,
    handleSubmit,
    errors,
    getValues,
  };
};

export type { EnterNameFormValues };
