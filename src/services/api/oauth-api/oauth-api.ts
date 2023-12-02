import { AxiosResponse } from 'axios';
import { authInstance } from '@/services';
import {
  INewPasswordRequest,
  IPasswordRecoveryRequestWithRecaptcha,
} from '@/types';

export const OAUTH_AUTHORIZATION = {
  registrationGoogle() {
    window.location.assign(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/google`);
  },
  loginGoogle() {
    window.location.assign(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/google/authorization`
    );
  },
};

export const passwordRecoveryAPI: IAuthAPI = {
  createNewPassword: (data) => {
    const { newPassword, recoveryCode } = data;

    return authInstance.post('auth/new-password', {
      newPassword,
      recoveryCode,
    });
  },
  checkRecoveryCode: (data) => {
    const { recoveryCode } = data;

    return authInstance.post('auth/check-recovery-code', { recoveryCode });
  },
  passwordRecoveryWithRecaptcha: async ({ data, lang }) => {
    const { email, recaptcha } = data;

    return await authInstance.post('auth/password-recovery', {
      email,
      recaptcha,
      lang,
    });
  },
};

interface IAuthAPI {
  createNewPassword: (data: INewPasswordRequest) => Promise<AxiosResponse>;
  checkRecoveryCode: (
    data: Omit<INewPasswordRequest, 'newPassword'>
  ) => Promise<AxiosResponse<IPasswordRecoveryRequestWithRecaptcha>>;
  passwordRecoveryWithRecaptcha: ({
    data,
    lang,
  }: {
    data: IPasswordRecoveryRequestWithRecaptcha;
    lang: string;
  }) => Promise<AxiosResponse>;
}
