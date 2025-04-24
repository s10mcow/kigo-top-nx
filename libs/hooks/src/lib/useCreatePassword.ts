'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export const UPPERCASE_REGEX = /[A-Z]/;
export const LOWERCASE_REGEX = /[a-z]/;
export const NUMBER_REGEX = /\d/;
export const SPECIAL_CHARACTER_REGEX = /[!@#$%^&*()_+=[\]{};':"\\|,.<>/?-]+/;

const createPasswordFormSchema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required.')
    .matches(
      UPPERCASE_REGEX,
      'Password must contain at least one uppercase letter.'
    )
    .matches(
      LOWERCASE_REGEX,
      'Password must contain at least one lowercase letter.'
    )
    .matches(NUMBER_REGEX, 'Password must contain at least one number.')
    .matches(
      SPECIAL_CHARACTER_REGEX,
      'Password must contain at least one special character.'
    ),
  confirmPassword: yup
    .string()
    .required('Confirm password is required.')
    .oneOf([yup.ref('password'), ''], 'Passwords must match.'),
});

export type CreatePasswordFormValues = yup.InferType<
  typeof createPasswordFormSchema
>;

export const useCreatePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePasswordFormValues>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(createPasswordFormSchema),
  });

  return { register, handleSubmit, errors };
};

export default useCreatePassword;
