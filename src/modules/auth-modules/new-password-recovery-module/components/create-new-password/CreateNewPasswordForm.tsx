import { FieldValues, SubmitHandler } from 'react-hook-form';

import { useGlobalForm } from '@/common/hooks/useGlobalForm';
import { Button, Input } from '@/ui';
import { createNewPasswordSchema } from '@/modules/auth-modules/new-password-recovery-module';

interface CreateNewPasswordFormProps {
  onSubmitHandler: (password: string) => void;
}

export const CreateNewPasswordForm = ({
  onSubmitHandler,
}: CreateNewPasswordFormProps) => {
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
        className="flex flex-col w-full gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="New password"
          id="password"
          placeholder="6+ characters"
          error={errors?.password?.message}
          {...register('password')}
        />
        <div className="flex justify-center text-sm">
          <span>
            Password must contain 1-9, a-z, A-Z, and specified symbols
          </span>
        </div>
        <Button className="mt-1" type="submit">
          Create new password
        </Button>
      </form>
    </>
  );
};
