import Link from 'next/link';
import { useState } from 'react';
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

  return (
    <AuthLayout videoSrc={videoForLayout}>
      <h1 className="font-semibold text-center sm:text-2xl text-4xl">
        Рэгістрацыя акаўнта
      </h1>
      <hr className="w-full mt-8 mb-8 transform bg-light-900" />
      {!showOrHiddenForm && (
        <>
          <Button
            className="font-fontHeader"
            onClick={OAUTH_AUTHORIZATION.registrationGoogle}
          >
            Зарэгістравацца праз Google
          </Button>

          <div className="flex justify-center text-sm mb-7 mt-7">
            <span>або</span>
          </div>
        </>
      )}
      <Button onClick={() => setShowOrHiddenForm(!showOrHiddenForm)}>
        {!showOrHiddenForm ? `Працягнуць з электроннай поштай` : 'Вяртацца'}
      </Button>
      {showOrHiddenForm && (
        <form
          className="flex flex-col gap-3"
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
            label="Электронная пошта"
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
          <div className="text-sm flex justify-center">
            <span>
              Пароль павінен змяшчаць 1-9, a-z, A-Z і вызначаныя сімвалы{' '}
            </span>
          </div>
          <Button disabled={isLoading} className="mt-1" type="submit">
            {isLoading ? <Spinner /> : 'Зарэгістравацца'}
          </Button>
        </form>
      )}
      <div className="flex gap-1 text-sm justify-center">
        <span> У вас ужо ёсць уліковы запіс?</span>
        <Link className="underline" href={routes.auth.signIn}>
          Увайсці
        </Link>
      </div>
    </AuthLayout>
  );
};
