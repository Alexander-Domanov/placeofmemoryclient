import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ReCAPTCHA from 'react-google-recaptcha-enterprise';
import Link from 'next/link';

type PropsType = {
  onRecaptchaChangeHandler: (token: string) => void;
};
export const Captcha = ({ onRecaptchaChangeHandler }: PropsType) => {
  const onRecaptchaChange = (token: string) => {
    onRecaptchaChangeHandler(token);
  };

  return (
    <div className="flex flex-col justify-center my-5">
      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        onChange={onRecaptchaChange}
        theme="light"
        style={{ display: 'block', margin: '0 auto' }}
      />
      <div className="pt-4 items-center pb-3 text-center text-xs leading-6 text-light-900 font-normal">
        <span>Гэты сайт абаронены reCAPTCHA Enterprise і Google </span>
        <Link href="https://policies.google.com/privacy" className="underline">
          Палітыка прыватнасці
        </Link>
        <span> і </span>
        <Link href="https://policies.google.com/terms" className="underline">
          Умовы выкарыстання
        </Link>
      </div>
    </div>
  );
};
