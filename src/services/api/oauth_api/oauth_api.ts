import { AxiosResponse } from 'axios';
import { authInstance } from '@/services';
import {
  NewPasswordRequest,
  PasswordRecoveryRequestWithRecaptcha,
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
  createNewPassword: (data: NewPasswordRequest) => Promise<AxiosResponse>;
  checkRecoveryCode: (
    data: Omit<NewPasswordRequest, 'newPassword'>
  ) => Promise<AxiosResponse<PasswordRecoveryRequestWithRecaptcha>>;
  passwordRecoveryWithRecaptcha: (
    data: PasswordRecoveryRequestWithRecaptcha
  ) => Promise<AxiosResponse>;
}
