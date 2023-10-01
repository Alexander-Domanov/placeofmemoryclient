import { FieldValues, SubmitHandler } from 'react-hook-form';
import { createNewPasswordSchema } from '@/modules/auth-modules/recovery-module';
import { useGlobalForm } from '@/common/hooks/useGlobalForm';
import { Button, Input } from '@/ui';

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
        <Button className="mt-1" type="submit">
          Create new password
        </Button>
      </form>
    </>
  );
};
