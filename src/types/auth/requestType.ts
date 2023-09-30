export type ReqNewPassword = {
  newPassword: string;
  recoveryCode: string;
};

export type RegConfirmation = {
  confirmationCode: string;
};

export type ReqPasswordRecoveryWithRecaptcha = {
  email: string;
  recaptcha: string;
};
