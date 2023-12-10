import Link from 'next/link';
import { FieldValues } from 'react-hook-form';
import { useRouter } from 'next/router';
import { FaGoogle } from 'react-icons/fa6';
import React, { useEffect, useState } from 'react';
import { AuthLayout, ModalInfo } from '@/components';
import { Button, Input, InputWithEye } from '@/ui';
import { AUTH2_STATUS, OAUTH_AUTHORIZATION } from '@/services';
import { useGlobalForm } from '@/common/hooks/useGlobalForm';
import { schemaLogin, useLogin } from '@/modules/auth-modules/sign-in-module';
import { routes } from '@/common/routing/routes';
import { Spinner } from '@/ui/spinner/Spinner';
import { useWindowSize } from '@/common/hooks/useWindowResize';
import { useTranslation } from '@/components/internationalization';
import { useChangingLanguageError } from '@/common/hooks/useChangingLanguageError';

export const SignIn = () => {
  const { t, localeLanguage } = useTranslation();
  const {
    emailT,
    buttonSignInT,
    signUpT,
    buttonGT,
    descriptionT,
    passwordT,
    titleT,
    noAccT,
    // customErrors,
    successMessage,
    forgotT,
    // STATUS_CODE_200_TR,
    STATUS_CODE_401_TR,
    STATUS_CODE_400_TR,
  } = t.auth.signIn.page;
  const { errors, trigger, register, reset, handleSubmit, setCustomError } =
    useGlobalForm(schemaLogin());
  const { push, query } = useRouter();
  const { sendLoginData, isLoading, isSuccess, isError } = useLogin(
    () => {
      push(routes.main);
    },
    () => setCustomError('password', STATUS_CODE_400_TR.error),
    () => setCustomError('email', STATUS_CODE_400_TR.error),
    () => reset()
  );
  useChangingLanguageError({ trigger, errors });

  const handleFormSubmit = ({ email, password }: FieldValues) => {
    sendLoginData({
      email,
      password,
      lang: localeLanguage,
    });
  };

  const [showMessage, setShowMessage] = useState<string | null>(null);
  const [showTitle, setShowTitle] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [successStatus, setSuccessStatus] = useState<boolean>(false);

  const queryStatus = query.status_code as string;

  useEffect(() => {
    if (isError) {
      setCustomError('password', STATUS_CODE_400_TR.error);
      setCustomError('email', STATUS_CODE_400_TR.error);
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      setSuccessStatus(true);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (!queryStatus) return;

    if (queryStatus === AUTH2_STATUS['401']) {
      setShowTitle(STATUS_CODE_401_TR.title);
      setShowMessage(STATUS_CODE_401_TR.description);
      setShowModal(true);
    }
    if (queryStatus === AUTH2_STATUS['400']) {
      setShowTitle(STATUS_CODE_400_TR.title);
      setShowMessage(STATUS_CODE_400_TR.description);
      setShowModal(true);
    }

    if (queryStatus === AUTH2_STATUS['200']) {
      // setShowTitle(STATUS_CODE_200_TR.title);
      // setShowMessage(STATUS_CODE_200_TR.description);
      setSuccessStatus(true);
      push(routes.main);
    }
  }, [queryStatus]);

  const closeModal = () => {
    setShowModal(false);
  };

  const { width } = useWindowSize();
  const isMobile = width && width < 640;

  return (
    <AuthLayout>
      {showModal && (
        <ModalInfo
          onClose={closeModal}
          title={showTitle as string}
          message={showMessage as string}
        />
      )}

      {successStatus && (
        <div className="text-center mb-4">{successMessage}</div>
      )}

      {!successStatus && !showModal && (
        <>
          <h1 className="font-semibold text-center sm:text-2xl text-4xl">
            {titleT}
          </h1>

          <div className="mt-8 mb-8 h-[1px] transform bg-dark-300" />

          <Button
            onClick={OAUTH_AUTHORIZATION.registrationGoogle}
            className="gap-1"
          >
            {buttonGT} &nbsp; <FaGoogle size={isMobile ? 22 : 33} />
            oogle
          </Button>

          <div>
            <div className="mt-8 mb-8 flex items-center text-center text-dark-150 justify-center text-sm">
              <div className="flex-grow  h-[1px] bg-dark-300" />

              <span className="mx-4">{descriptionT} </span>

              <div className="flex-grow h-[1px] bg-dark-300" />
            </div>

            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(handleFormSubmit)}
            >
              <Input
                type="email"
                id="email"
                label={emailT}
                error={errors?.email?.message}
                {...register('email')}
              />

              <InputWithEye
                id="password"
                type="password"
                error={errors?.password?.message}
                label={passwordT}
                {...register('password')}
              />

              <div className="flex text-sm justify-end">
                <Link
                  className="text-xs underline"
                  href={routes.auth.forgotPassword}
                >
                  {forgotT}
                </Link>
              </div>

              <Button disabled={isLoading} className="mt-1 " type="submit">
                {isLoading ? <Spinner /> : buttonSignInT}
              </Button>
            </form>
          </div>

          <div className="flex gap-1 text-sm justify-center ">
            <span> {noAccT}</span>

            <Link className="underline" href={routes.auth.signUp}>
              {signUpT}
            </Link>
          </div>
        </>
      )}
    </AuthLayout>
  );
};
