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
    '/auth/login',
    '/auth/recovery',
    '/auth/registration',
    '/map',
    '/persons',
    '/persons/person',
    '/persons/[page]',
    '/about-the-project',
    '/articles',
    '/articles/page/[page]',
    '/articles/person',
    '/places/[page]',
    '/places/place/person',
    '/_error',
    '/404',
  ],
  dropdownMenuHeader: {
    settings: '/account',
    dashboard: '/dashboard',
  },
  main: '/',
  articles: {
    index: '/articles',
    getArticle: (slug: string) => `${routes.articles.index}/${slug}`,
    getArticleWithLang: (slug: string, lang: string) => {
      let link = '';

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
  },
  persons: {
    index: '/persons',
    page: (page: number) => `${routes.persons.index}/${page}`,
    person: (slug: string) => `${routes.persons.index}/person/${slug}`,
    // search: () => `${routes.persons.index}/search`,
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
