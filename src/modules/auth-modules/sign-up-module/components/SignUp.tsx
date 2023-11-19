import Link from 'next/link';
import { useState } from 'react';
import { FaGoogle } from 'react-icons/fa6';
import { AuthLayout } from '@/components';
import { Button, Input } from '@/ui';
import { OAUTH_AUTHORIZATION } from '@/services';
import {
  registrationSchema,
  useRegister,
} from '@/modules/auth-modules/sign-up-module';
import { useGlobalForm } from '@/common/hooks/useGlobalForm';
import { routes } from '@/common/routing/routes';
import { Spinner } from '@/ui/spinner/Spinner';
import { useWindowSize } from '@/common/hooks/useWindowResize';

const videoForLayout =
  'https://media.istockphoto.com/id/670852240/video/nature-photographer.mp4?s=mp4-640x640-is&k=20&c=MWW5_lvT4duO8Ztd45Q1Xy6dmDrBaQ0mWGHVITArPJo=';

export const SignUp = () => {
  const [showOrHiddenForm, setShowOrHiddenForm] = useState<boolean>(false);
  const { errors, register, reset, handleSubmit, setCustomError } =
    useGlobalForm(registrationSchema);

  const { sendRegisteredData, isLoading } = useRegister(
    () => reset(),
    setCustomError
  );
  const registeredDataSubmit = (data: any) => {
    sendRegisteredData(data);
  };

  const { width } = useWindowSize();
  const isMobile = width && width < 640;

  return (
    <AuthLayout videoSrc={videoForLayout}>
      <h1 className="font-semibold text-center sm:text-2xl text-4xl">
        Рэгістрацыя
      </h1>

      <div className="mt-8 mb-8 h-[1px] transform bg-dark-300" />

      {!showOrHiddenForm && (
        <>
          <Button
            onClick={OAUTH_AUTHORIZATION.registrationGoogle}
            className="gap-1"
          >
            Увайдзіце праз &nbsp; <FaGoogle size={isMobile ? 22 : 33} />
            oogle
          </Button>

          <div className="mt-8 mb-8 flex items-center text-center text-dark-150 justify-center text-sm">
            <div className="flex-grow  h-[1px] bg-dark-300" />

            <span className="mx-4">або</span>

            <div className="flex-grow h-[1px] bg-dark-300" />
          </div>
        </>
      )}

      <Button onClick={() => setShowOrHiddenForm(!showOrHiddenForm)}>
        {/* {!showOrHiddenForm ? `Працягнуць з электроннай поштай` : 'Вяртацца'} */}
        {!showOrHiddenForm ? `Рэгістрацыя` : `Схаваць форму`}
      </Button>

      {showOrHiddenForm && (
        <form
          className="flex flex-col gap-3 mt-8"
          onSubmit={handleSubmit(registeredDataSubmit)}
        >
          <Input
            type="text"
            id="userName"
            label="Імя карыстальніка"
            error={errors?.userName?.message}
            {...register('userName')}
          />

          <Input
            type="email"
            id="email"
            label="Адрас электроннай пошты"
            error={errors?.email?.message}
            {...register('email')}
          />

          <Input
            placeholder="6+ персанажаў"
            type="password"
            id="password"
            error={errors?.password?.message}
            label="Пароль"
            {...register('password')}
          />

          <div className="text-xs flex justify-center text-dark-150">
            <span>
              {/* Пароль павінен змяшчаць 1-9, a-z, A-Z і вызначаныя сімвалы{' '} */}
              Пароль павінен быць не менш за 6 знакаў, уключаць вялікія і
              маленькія лацінскія літары, а таксама цыфры.
            </span>
          </div>

          <Button disabled={isLoading} className="mt-8" type="submit">
            {isLoading ? <Spinner /> : 'Зарэгістравацца'}
          </Button>
        </form>
      )}

      <div className="flex gap-1 text-sm justify-center">
        <span> У вас ўжо ёсць акаўнт?</span>

        <Link className="underline" href={routes.auth.signIn}>
          Увайсці
        </Link>
      </div>
    </AuthLayout>
  );
};
