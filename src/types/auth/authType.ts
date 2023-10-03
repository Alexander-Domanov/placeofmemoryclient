export interface NewPasswordRequest {
  newPassword: string;
  recoveryCode: string;
}

export interface PasswordRecoveryRequestWithRecaptcha {
  email: string;
  recaptcha: string;
}

export interface LoginResponse {
  accessToken: string;
}
