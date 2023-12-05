import React, { FC } from 'react';
import { useTranslation } from '@/components/internationalization';
import { Button, Input } from '@/ui';
import { Captcha } from '@/modules/auth-modules/forgot-password-module';
import { Spinner } from '@/ui/spinner/Spinner';

interface PropsType {
  isLoading: boolean;
  handleSubmit: any;
  submitData: any;
  error: string | any;
  register: any;
  isCaptcha?: boolean;
  disabled?: boolean;
  onRecaptchaChange?: (token: string) => void;
}

export const ResendVerificationForm: FC<PropsType> = ({
  isLoading,
  handleSubmit,
  submitData,
  error,
  register,
  disabled = false,
  isCaptcha = false,
  onRecaptchaChange,
}) => {
  const { t } = useTranslation();
  const onRecaptchaChangeHandler = (token: string) => {
    if (onRecaptchaChange) {
      onRecaptchaChange(token);
    }
  };
  const { resendLinkT, sendT, emailT } = t.auth.resendForm;
  return (
    <div className="flex justify-center h-[calc(100vh-65px)]  bg-dark-700 items-center">
      <div className="flex flex-col gap-5 align-middle sm:w-[320px] ms:w-[360px] w-[416px]">
        <h2 className="text-2xl font-bold text-center">{resendLinkT}</h2>

        <form
          className="flex gap-3 mt-8 flex-col"
          onSubmit={handleSubmit(submitData)}
        >
          <Input
            type="email"
            id="email"
            label={emailT}
            error={error}
            {...register('email')}
          />
          {isCaptcha && (
            <Captcha onRecaptchaChangeHandler={onRecaptchaChangeHandler} />
          )}
          <Button type="submit" variant="default" disabled={disabled}>
            {isLoading ? <Spinner /> : sendT}
          </Button>
        </form>
      </div>
    </div>
  );
};
