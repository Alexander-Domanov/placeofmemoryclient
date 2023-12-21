const DEFAULT_LANGUAGE = 'by';

export const routes = {
  auth: {
    signIn: '/auth/login/',
    signUp: '/auth/registration',
    forgotPassword: '/auth/forgot-password',
  },
  unProtectedPaths: [
    '/',
    '/auth/forgot-password',
    '/auth/registration/resend-form',
    '/auth/recovery/resend-form',
    '/auth/login',
    '/auth/recovery',
    '/auth/registration',
    '/map',
    '/persons',
    '/persons/person',
    '/persons/person/[slug]',
    '/persons/[page]',
    '/about-the-project',
    '/articles',
    '/articles/[page]',
    '/articles/article/[slug]',
    '/places/[page]',
    '/places/place/[slug]',
    '/places/place/person',
    '/_error',
    '/auth/registration-confirmation',
    '/404',
  ],
  dropdownMenuHeader: {
    settings: '/account',
    dashboard: '/dashboard',
  },
  main: '/',
  articles: {
    index: '/articles',
    page: (page: number) => `${routes.articles.index}/${page}`,
    article: (slug: string) => `${routes.articles.index}/article/${slug}`,
    articleFullRoute: (slug: string, lang: string) => {
      let link = process.env.SITE_URL || 'https://pf.cygan.lol';

      if (lang !== DEFAULT_LANGUAGE) {
        link += `/${lang}`;
      }

      link += `${routes.articles.index}/${slug}`;

      return link;
    },
  },
  places: {
    index: '/places',
    page: (page: string) => `${routes.places.index}/${page}`,
    place: (slug: string) => `${routes.places.index}/place/${slug}`,
    placeFullRoute: (slug: string, lang: string) => {
      let link = process.env.SITE_URL || 'https://pf.cygan.lol';

      if (lang !== DEFAULT_LANGUAGE) {
        link += `/${lang}`;
      }

      link += `${routes.places.index}/${slug}`;

      return link;
    },
  },
  persons: {
    index: '/persons',
    page: (page: number) => `${routes.persons.index}/${page}`,
    person: (slug: string) => `${routes.persons.index}/person/${slug}`,
    personFullRoute: (slug: string, lang: string) => {
      let link = process.env.SITE_URL || 'https://pf.cygan.lol';

      if (lang !== DEFAULT_LANGUAGE) {
        link += `/${lang}`;
      }

      link += `${routes.persons.index}/${slug}`;

      return link;
    },
  },
  aboutTheProject: {
    index: '/about-the-project',
  },
  map: {
    index: '/map',
  },
  dashboard: {
    index: '/dashboard',
    gallery: {
      index: '/dashboard/gallery',
    },
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
