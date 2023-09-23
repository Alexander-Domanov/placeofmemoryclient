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
