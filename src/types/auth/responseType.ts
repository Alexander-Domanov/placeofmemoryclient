export type ResLogin = {
  accessToken: string;
};

export type ResCheckRecoveryCode = {
  email: string;
};

export type ResMe = {
  userId: number;
  userName: string | null;
  email: string;
  hasBusinessAccount: boolean;
};
