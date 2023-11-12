import { FieldValues, SubmitHandler } from 'react-hook-form';

import { useGlobalForm } from '@/common/hooks/useGlobalForm';
import { Button, Input } from '@/ui';
import { createNewPasswordSchema } from '@/modules/auth-modules/new-password-recovery-module';
import { Spinner } from '@/ui/spinner/Spinner';

interface ICreateNewPasswordFormProps {
  onSubmitHandler: (password: string) => void;
  isLoading: boolean;
}

export const CreateNewPasswordForm = ({
  onSubmitHandler,
  isLoading,
}: ICreateNewPasswordFormProps) => {
  const { errors, register, reset, handleSubmit } = useGlobalForm(
    createNewPasswordSchema
  );

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const { password } = data;
    onSubmitHandler(password);
    reset();
  };

  return (
    <>
      <form
        className="flex flex-col w-full gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="Новы пароль"
          id="password"
          placeholder="6+ персанажаў"
          error={errors?.password?.message}
          {...register('password')}
        />
        <div className="flex justify-center text-sm">
          <span>
            Пароль павінен змяшчаць 1-9, a-z, A-Z і вызначаныя сімвалы{' '}
          </span>
        </div>
        <Button disabled={isLoading} className="mt-1" type="submit">
          {isLoading ? <Spinner /> : 'Стварыце новы пароль'}
        </Button>
      </form>
    </>
  );
};
