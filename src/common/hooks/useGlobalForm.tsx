import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export const useGlobalForm = (schema: any) => {
  const {
    register,
    reset,
    handleSubmit,
    setError,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const setCustomError = (name: string, message: string) => {
    setError(name, {
      type: 'custom',
      message,
    });
  };

  return {
    register,
    reset,
    handleSubmit,
    errors,
    setCustomError,
    trigger,
  };
};
