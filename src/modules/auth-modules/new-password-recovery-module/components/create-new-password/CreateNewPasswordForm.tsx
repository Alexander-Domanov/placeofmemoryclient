import { FieldValues, SubmitHandler } from 'react-hook-form';

import { useGlobalForm } from '@/common/hooks/useGlobalForm';
import { Button, Input } from '@/ui';
import { createNewPasswordSchema } from '@/modules/auth-modules/new-password-recovery-module';
import { Spinner } from '@/ui/spinner/Spinner';
import { useTranslation } from '@/components/internationalization';
import { useChangingLanguageError } from '@/common/hooks/useChangingLanguageError';

interface ICreateNewPasswordFormProps {
  onSubmitHandler: (password: string) => void;
  isLoading: boolean;
}

export const CreateNewPasswordForm = ({
  onSubmitHandler,
  isLoading,
}: ICreateNewPasswordFormProps) => {
  const { errors, trigger, register, reset, handleSubmit } = useGlobalForm(
    createNewPasswordSchema()
  );
  useChangingLanguageError({ errors, trigger });
  const { t } = useTranslation();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const { password } = data;
    onSubmitHandler(password);
    reset();
  };
  const { descriptionT, labelT, buttonT } = t.auth.recovery.recoveryPage;
  return (
    <>
      <form
        className="flex flex-col w-full gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label={labelT}
          id="password"
          // placeholder={placeholderT}
          error={errors?.password?.message}
          {...register('password')}
          onBlur={() => trigger('password')}
        />

        <div className="flex justify-center text-sm">
          <span>{descriptionT}</span>
        </div>

        <Button disabled={isLoading} className="mt-1" type="submit">
          {isLoading ? <Spinner /> : buttonT}
        </Button>
      </form>
    </>
  );
};
