export const by = {
  header: {
    articles: 'Артыкулы',
    places: 'Месца',
    people: 'Людзі',
    aboutProject: 'Пра праэкт',
    map: 'Мапа',
    signIn: 'Уваход',
    signUp: 'Рэгістрацыя',
    dashboard: 'Прыборная панэль',
    settings: 'Наладжваньне',
    logout: 'Выйсці',
  },
  footer: {
    pages: 'Старонкі',
    contacts: 'Кантакты',
    socialNetworks: 'Сацыяльныя сеткі',
  },
  auth: {
    signIn: {
      indexTitle: 'Уваход',
    },
    signUp: {
      indexTitle: 'Рэгістрацыя',
    },
    forgotPassword: {
      indexTitle: 'Забыліся пароль',
    },
    recovery: {
      indexTile: 'Аднаўленне',
    },
  },
  home: {
    indexTitle: 'Хатняя старонка',
  },
  articles: {
    indexTitle: 'Артыкул',
  },
  places: {
    indexTitle: 'Месца',
    place: {
      indexTitle: 'Месца',
    },
  },
  people: {
    indexTitle: 'Людзі',
  },
  aboutTheProject: {
    indexTitle: 'Аб праекце',
  },
  map: {
    indexTitle: 'Мапа',
  },
  account: {
    indexTitle: 'Рэдагаваць профіль',
    page: {
      title: 'Рэдактаваць акаўнт',
      name: 'НІКНЭЙМ',
      descriptionImage: 'JPG, GIF або PNG. Максімальны памер 2 Мб',
      city: 'ГОРАД',
      buttonSave: 'Захаваць',
      errorMessage: 'Памер файла перавышае 2 мегабайты',
      schema: {
        userName: {
          min: 'Мінімальная колькасць сімвалаў - 6',
          max: 'Максімальная колькасць сімвалаў - 30',
          matches: 'Дазволеныя толькі сімвалы 0-9, A-Z, a-z, _, -',
          required: 'Імя карыстальніка абавязкова',
        },
      },
    },
  },
};

export type LocaleType = typeof by;
