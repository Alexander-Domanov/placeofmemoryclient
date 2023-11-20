import { LocaleType } from '@/components/internationalization';

export const ru: LocaleType = {
  header: {
    articles: 'Артикулы',
    places: 'Места',
    people: 'Люди',
    aboutProject: 'О проекте',
    map: 'Карта',
    signIn: 'Вход',
    signUp: 'Регистрация',
    dashboard: 'Приборная панель',
    settings: 'Настройки',
    logout: 'Выход',
  },
  footer: {
    pages: 'Страницы',
    contacts: 'Контакты',
    socialNetworks: 'Социальные сети',
  },
  auth: {
    signIn: {
      indexTitle: 'Вход',
    },
    signUp: {
      indexTitle: 'Регистрация',
    },
    forgotPassword: {
      indexTitle: 'Забыли пароль',
    },
    recovery: {
      indexTile: 'Восстановление',
    },
  },
  home: {
    indexTitle: 'Главная страница',
  },
  articles: {
    indexTitle: 'Статьи',
  },
  places: {
    indexTitle: 'Места',
    place: {
      indexTitle: 'Место',
    },
  },
  people: {
    indexTitle: 'Люди',
  },
  aboutTheProject: {
    indexTitle: 'О проекте',
  },
  map: {
    indexTitle: 'Карта',
  },
  account: {
    indexTitle: 'Редактировать профиль',
    page: {
      title: 'Редактировать аккаунт',
      name: 'НИКНЕЙМ',
      descriptionImage: 'JPG, GIF или PNG. Максимальный размер 2 Мб',
      city: 'ГОРОД',
      buttonSave: 'Сохранить',
      errorMessage: 'Размер файла превышает 2 мегабайта',
      schema: {
        userName: {
          min: 'Минимальное количество символов - 6',
          max: 'Максимальное количество символов - 30',
          matches: 'Разрешены только символы 0-9, A-Z, a-z, _, -',
          required: 'Имя пользователя обязательно',
        },
      },
    },
  },
};
