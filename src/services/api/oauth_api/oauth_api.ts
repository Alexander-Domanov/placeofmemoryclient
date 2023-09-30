import { AxiosResponse } from 'axios';
import { authInstance } from '@/services';
import {
  ReqNewPassword,
  ReqPasswordRecoveryWithRecaptcha,
  ResCheckRecoveryCode,
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
  passwordRecoveryWithRecaptcha: (data) => {
    const { email, recaptcha } = data;

    return authInstance.post('auth/password-recovery', { email, recaptcha });
  },
};

interface IAuthAPI {
  createNewPassword: (data: ReqNewPassword) => Promise<AxiosResponse>;
  checkRecoveryCode: (
    data: Omit<ReqNewPassword, 'newPassword'>
  ) => Promise<AxiosResponse<ResCheckRecoveryCode>>;
  passwordRecoveryWithRecaptcha: (
    data: ReqPasswordRecoveryWithRecaptcha
  ) => Promise<AxiosResponse>;
}
