import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaGoogle } from 'react-icons/fa6';
import { AuthLayout } from '@/components';
import { Button, Input, InputWithEye } from '@/ui';
import { OAUTH_AUTHORIZATION } from '@/services';
import {
  registrationSchema,
  useRegister,
} from '@/modules/auth-modules/sign-up-module';
import { useGlobalForm } from '@/common/hooks/useGlobalForm';
import { routes } from '@/common/routing/routes';
import { Spinner } from '@/ui/spinner/Spinner';
import { useWindowSize } from '@/common/hooks/useWindowResize';
import { useChangingLanguageError } from '@/common/hooks/useChangingLanguageError';
import { useTranslation } from '@/components/internationalization';

// const videoForLayout =
//   'https://media.istockphoto.com/id/670852240/video/nature-photographer.mp4?s=mp4-640x640-is&k=20&c=MWW5_lvT4duO8Ztd45Q1Xy6dmDrBaQ0mWGHVITArPJo=';
const videoForLayout = '/videos/sign.mp4';

export const SignUp = () => {
  const { t, localeLanguage } = useTranslation();
  const [showOrHiddenForm, setShowOrHiddenForm] = useState<boolean>(false);
  const {
    errors,
    trigger,
    register,
    reset,
    handleSubmit,
    setCustomError,
    isValid,
  } = useGlobalForm(registrationSchema());
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  const { sendRegisteredData, isLoading, isSuccess } = useRegister(
    () => reset(),
    setCustomError
  );

  useEffect(() => {
    if (isSuccess) {
      setShowSuccessMessage(true);
    }
  }, [isSuccess]);

  const registeredDataSubmit = (data: any) => {
    const { email, password, userName } = data;
    sendRegisteredData({ email, password, userName, lang: localeLanguage });
  };

  useChangingLanguageError({ errors, trigger });

  const { width } = useWindowSize();
  const isMobile = width && width < 640;

  const {
    titleT,
    descriptionSignInT,
    descriptionFormT,
    buttonSignUpT,
    signInLinkT,
    descriptionT,
    buttonHiddenFormT,
    buttonShowFormT,
    buttonGoogleT,
    nameT,
    emailT,
    passwordT,
  } = t.auth.signUp.page;

  return (
    <AuthLayout videoSrc={videoForLayout}>
      <h1 className="font-semibold text-center sm:text-2xl text-4xl">
        {titleT}
      </h1>

      <div className="mt-8 mb-8 h-[1px] transform bg-dark-300" />

      {showSuccessMessage ? (
        <div className="text-center mt-4 text-dark-150">
          <span>{t.auth.signUp.page.sentEmailT} &nbsp;</span>

          <Link
            className="underline text-white"
            href={routes.auth.signUp}
            onClick={() => setShowSuccessMessage(false)}
          >
            {t.auth.signUp.page.back}
          </Link>
        </div>
      ) : (
        <>
          {!showOrHiddenForm && (
            <>
              <Button
                onClick={OAUTH_AUTHORIZATION.registrationGoogle}
                className="gap-1"
              >
                {buttonGoogleT}&nbsp; <FaGoogle size={isMobile ? 22 : 33} />
                oogle
              </Button>

              <div className="mt-8 mb-8 flex items-center text-center text-dark-150 justify-center text-sm">
                <div className="flex-grow  h-[1px] bg-dark-300" />

                <span className="mx-4">{descriptionT}</span>

                <div className="flex-grow h-[1px] bg-dark-300" />
              </div>
            </>
          )}

          <Button onClick={() => setShowOrHiddenForm(!showOrHiddenForm)}>
            {!showOrHiddenForm ? buttonShowFormT : buttonHiddenFormT}
          </Button>

          {showOrHiddenForm && (
            <form
              className="flex flex-col gap-4 mt-8"
              onSubmit={handleSubmit(registeredDataSubmit)}
            >
              <Input
                type="text"
                id="userName"
                label={nameT}
                error={errors?.userName?.message}
                {...register('userName')}
                onBlur={() => trigger('userName')}
              />

              <Input
                type="email"
                id="email"
                label={emailT}
                error={errors?.email?.message}
                {...register('email')}
                onBlur={() => trigger('email')}
              />

              {/* <Input */}
              {/*  // placeholder={passwordPlaceholderT} */}
              {/*  type="password" */}
              {/*  id="password" */}
              {/*  error={errors?.password?.message} */}
              {/*  label={passwordT} */}
              {/*  {...register('password')} */}
              {/* /> */}

              <InputWithEye
                id="password"
                type="password"
                error={errors?.password?.message}
                label={passwordT}
                {...register('password')}
                onBlur={() => trigger('password')}
              />

              <div className="text-xs flex justify-center text-dark-150">
                <span>{descriptionFormT}</span>
              </div>

              <Button
                disabled={isLoading || !isValid}
                className="mt-8"
                type="submit"
              >
                {isLoading ? <Spinner /> : buttonSignUpT}
              </Button>
            </form>
          )}

          <div className="flex gap-1 text-sm justify-center">
            <span> {descriptionSignInT}</span>

            <Link className="underline" href={routes.auth.signIn}>
              {signInLinkT}
            </Link>
          </div>
        </>
      )}
    </AuthLayout>
  );
};
