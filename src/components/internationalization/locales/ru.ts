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
      page: {
        titleT: 'Войдите в свой аккаунт',
        buttonGT: 'Войти через',
        descriptionT: 'или войдите с помощью электронной почты',
        emailT: 'Адрес электронной почты',
        passwordT: 'Пароль',
        forgotT: 'Забыли пароль?',
        buttonSignInT: 'Войти',
        noAccT: 'У вас нет аккаунта?',
        signUpT: 'Зарегистрироваться',
        schema: {
          emailT: 'Поле Email обязательно',
          passwordT: 'Поле Пароль обязательно',
        },
        customErrors:
          'Неправильный пароль, email или имя пользователя. Попробуйте ещё раз, пожалуйста',
        STATUS_ERROR_401_TR: `Этот аккаунт отсутствует в системе, если вы хотите зарегистрироваться, перейдите на страницу "Зарегистрироваться"`,

        STATUS_ERROR_204_TR:
          'Пользователь с таким email уже существует. Проверьте свою почту для получения дальнейших инструкций',
      },
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
    page: {
      title: 'Архив_Мест',
      archive: 'Архив',
      place: '_Мест',
      name: 'ИМЯ',
      country: 'СТРАНА',
      city: 'ГОРОД',
      noData: 'нет страниц',
    },
    place: {
      page: {
        titleLink: 'Архив_Мест',
        archive: 'Архив',
        grave: '_Могил',
        location: 'Место нахождения',
        description: 'Описание',
        map: 'На карте',
        notData: 'нет данных',
      },
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
