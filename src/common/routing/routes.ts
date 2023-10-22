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
    dashboard: '/dashboard',
  },
  main: '/',
  articles: {
    index: '/articles',
  },
  place: {
    index: '/place',
  },
  people: {
    index: '/people',
  },
  aboutTheProject: {
    index: 'about-the-project',
  },
  map: {
    index: 'map',
  },
  dashboard: {
    index: '/dashboard',
    gallery: '/dashboard/gallery',
    users: '/dashboard/users',
  },
};
