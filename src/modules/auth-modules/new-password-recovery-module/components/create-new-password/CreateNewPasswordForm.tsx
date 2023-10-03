import { FieldValues, SubmitHandler } from 'react-hook-form';

import { useEffect } from 'react';
import { useGlobalForm } from '@/common/hooks/useGlobalForm';
import { Button, Input } from '@/ui';
import { createNewPasswordSchema } from '@/modules/auth-modules/new-password-recovery-module';

interface CreateNewPasswordFormProps {
  onSubmitHandler: (password: string) => void;
}

export const CreateNewPasswordForm = ({
  onSubmitHandler,
}: CreateNewPasswordFormProps) => {
  const { errors, register, reset, handleSubmit, setCustomError } =
    useGlobalForm(createNewPasswordSchema);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const { password } = data;
    onSubmitHandler(password);
    reset();
  };

  return (
    <>
      <form
        className="flex flex-col grow pt-[22px]  pb-[18px] w-full gap-[24px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="New password"
          id="password"
          placeholder="6+ characters"
          error={errors?.password?.message}
          {...register('password')}
        />
        <span>Password must contain 1-9, a-z, A-Z, and specified symbols</span>
        <Button className="mt-1" type="submit">
          Create new password
        </Button>
      </form>
    </>
  );
};
