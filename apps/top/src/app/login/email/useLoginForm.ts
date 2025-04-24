import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const loginFormSchema = yup.object().shape({
  password: yup.string().required('Password is required.'),
  email: yup
    .string()
    .email('Must be a valid email address.')
    .required('Email address is required.'),
});

type LoginFormValues = yup.InferType<typeof loginFormSchema>;

export const useLoginForm = () => {
  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginFormSchema),
    reValidateMode: 'onSubmit',
  });

  return {
    ...form,
  };
};

export type { LoginFormValues };
