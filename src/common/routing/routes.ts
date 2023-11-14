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
    '/auth/registration',
    '/map',
    '/people',
    '/about-the-project',
    '/articles',
    '/',
    '/places',
  ],
  dropdownMenuHeader: {
    settings: '/account',
    dashboard: '/dashboard',
  },
  main: '/',
  articles: {
    index: '/articles',
    getArticle: (slug: string) => `${routes.articles.index}/${slug}`,
  },
  places: {
    index: '/places',
    place: (slug: string) => `${routes.places.index}/${slug}`,
  },
  people: {
    index: '/people',
    person: (slug: string) => `${routes.people.index}/${slug}`,
  },
  aboutTheProject: {
    index: '/about-the-project',
  },
  map: {
    index: '/map',
  },
  dashboard: {
    index: '/dashboard',
    gallery: '/dashboard/gallery',
    users: {
      index: '/dashboard/users',
      user: (id: string | number) => `/dashboard/users/${id}`,
      breadcrumbs: (name: string) => `/dashboard/users/${name}`,
    },
    places: {
      index: '/dashboard/places',
      create: '/dashboard/places/create',
      place: (id: string | number) => `/dashboard/places/${id}`,
      breadcrumbs: (name: string) => `/dashboard/places/${name}`,
    },
    persons: {
      index: '/dashboard/persons',
      create: '/dashboard/persons/create',
      person: (id: string | number) => `/dashboard/persons/${id}`,
      breadcrumbs: (fillName: string) => `/dashboard/persons/${fillName}`,
    },
    articles: {
      index: '/dashboard/articles',
      create: '/dashboard/articles/create',
      article: (id: string | number) => `/dashboard/articles/${id}`,
      breadcrumbs: (name: string) => `/dashboard/articles/${name}`,
    },
    languages: {
      index: '/dashboard/language',
    },
    contacts: {
      index: '/dashboard/contacts',
    },
  },
};
