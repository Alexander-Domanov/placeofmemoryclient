import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ReCAPTCHA from 'react-google-recaptcha-enterprise';

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
      <div className="pt-4 items-center pb-3 text-xs leading-6 text-light-900 font-normal">
        <span>
          This site is protected by reCAPTCHA Enterprise and the Google
        </span>
        <a href="https://policies.google.com/privacy" className="underline">
          Privacy Policy
        </a>
        <a href="https://policies.google.com/terms" className="underline">
          Terms of Service
        </a>
      </div>
    </div>
  );
};
