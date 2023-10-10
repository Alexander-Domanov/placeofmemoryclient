export const routes = {
  auth: {
    signIn: '/auth/login/',
    signUp: '/auth/registration',
    forgotPassword: '/auth/forgot-password',
  },
  unProtectedPaths: [
    '/auth/forgot-password',
    '/auth/login',
    '/auth/recovery',
    '/auth/recovery/resend-form',
    '/auth/registration',
    '/auth/registration/external-account',
    '/auth/registration/resend-form',
    '/auth/registration-confirmation',
    '/',
  ],
  dropdownMenuHeader: {
    settings: '/account',
  },
  main: '/',
};
