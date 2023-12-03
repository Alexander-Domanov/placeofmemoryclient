export interface INewPasswordRequest {
  newPassword: string;
  recoveryCode: string;
}

export interface IPasswordRecoveryRequestWithRecaptcha {
  email: string;
  recaptcha: string;
}

export interface ILoginResponse {
  accessToken: string;
}
export type RegConfirmation = {
  confirmationCode: string;
};
