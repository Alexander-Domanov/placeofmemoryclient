import { LocaleType } from '@/components/internationalization';

export const ru: LocaleType = {
  404: {
    description: 'Эту страницу не удалось найти',
  },
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
    partners: 'Партнеры',
    socialNetworks: 'Социальные сети',
  },
  auth: {
    signIn: {
      page: {
        titleT: 'Войдите в свой аккаунт',
        buttonGT: 'Войти через',
        descriptionT: 'или войдите с помощью электронной почты',
        emailT: 'АДРЕС ЭЛЕКТРОННОЙ ПОЧТЫ',
        passwordT: 'ПАРОЛЬ',
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
      page: {
        titleT: 'Регистрация',
        buttonGoogleT: 'Войти через',
        descriptionT: 'или',
        buttonShowFormT: 'Регистрация',
        buttonHiddenFormT: 'Скрыть форму',
        nameT: 'ИМЯ ПОЛЬЗОВАТЕЛЯ',
        emailT: 'АДРЕС ЭЛЕКТРОННОЙ ПОЧТЫ',
        passwordT: 'ПАРОЛЬ',
        // passwordPlaceholderT: '6+ символов',
        descriptionFormT:
          'Пароль должен быть не менее 6 символов, включать большие и маленькие латинские буквы, а также цифры.',
        buttonSignUpT: 'Зарегистрироваться',
        descriptionSignInT: 'У вас уже есть аккаунт?',
        signInLinkT: 'Войти',
        schema: {
          userName: {
            required: 'Поле "Имя пользователя" обязательно для заполнения',
            min: 'Минимальное количество символов: 6',
            max: 'Максимальное количество символов: 30',
          },
          email: {
            required: 'Поле "Email" обязательно для заполнения',
            email: 'Email должен быть валидным',
          },
          password: {
            required: 'Поле "Пароль" обязательно для заполнения',
            min: 'Минимальное количество символов: 6',
            max: 'Пароль должен содержать не более 20 символов',
            matches:
              'Пароль должен содержать хотя бы одну цифру, одну заглавную букву, одну строчную букву и один специальный символ.',
          },
        },
      },
    },
    forgotPassword: {
      indexTitle: 'Забыли пароль',
      page: {
        showMessageT: `Если этот адрес электронной почты использовался для создания учетной записи, инструкции для сброса пароля будут отправлены вам. Проверьте свою электронную почту.`,
        signInLink: 'Перейти к входу',
        titleT: 'Забыли пароль?',
        descriptionFirstT: `Введите адрес электронной почты, который вы использовали при регистрации, и мы отправим вам инструкции по сбросу пароля.`,
        descriptionSecondT: `В целях безопасности мы НЕ храним ваш пароль. Так что отдохните, уверены, что мы никогда не отправим ваш пароль по электронной почте.`,
        emailT: 'АДРЕС ЭЛЕКТРОННОЙ ПОЧТЫ',
        captchaT: {
          titleT: 'Этот сайт защищен reCAPTCHA Enterprise и Google',
          private: 'Политика конфиденциальности',
          rules: 'Условия использования',
        },
        buttonT: 'Отправить инструкции',
      },
    },
    recovery: {
      indexTile: 'Восстановление',
      resendPage: {
        firstDescription: `Срок действия ссылки для проверки электронной почты истек`,
        secondDescription: `Видимо, срок действия ссылки для проверки истек. Не беспокойтесь, мы можем отправить ссылку еще раз`,
        forgotPasswordLink: `Повторно отправить ссылку для проверки`,
      },
      recoveryPage: {
        labelT: 'НОВЫЙ ПАРОЛЬ',
        placeholderT: '6+ символов',
        descriptionT: `Пароль должен содержать 1-9, a-z, A-Z и определенные символы`,
        buttonT: 'Создать новый пароль',
      },
    },
  },
  home: {
    page: {
      homeHero: {
        graveTitle: 'МОГИЛКИ',
        archiveTitle: 'АРХИВ',
        description: `Могилки - это специальный портал для людей, которые интересуются 
              историей и архивными данными. На сайте есть интерактивная карта, 
              где вы найдете захоронения белорусов на территории Республики 
              Польша.`,
        linkButton: 'подробнее',
      },
      homeArticles: {
        titleT: 'Статьи',
        buttonT: 'читать все',
      },
      homeMap: {
        titleFirstT: 'Интерактивная',
        titleSecondT: 'Карта',
        descriptionFirstT: `Координаты могилок`,
        descriptionSecondT: `Можно отметить могилку самостоятельно`,
        linkT: 'читать все',
        descriptionEnd: 'работает на всех устройствах',
      },
    },
    indexTitle: 'Главная страница',
  },
  articles: {
    indexTitle: 'Статьи',
    page: {
      title: 'Статьи',
      article: 'Статьи',
      noData: 'Нет данных',
      search: 'НАЙТИ ПО ЗАГОЛОВКУ',
    },
    article: {
      prev: 'Предыдущий',
    },
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
        map: {
          show: 'Показать карту',
          hide: 'Скрыть карту',
        },
        notData: 'нет данных',
      },
      indexTitle: 'Место',
    },
  },
  people: {
    indexTitle: 'Люди',
    search: {
      indexTitle: 'Поиск',
      page: {
        title: 'Поиск',
        placeholder: 'Поиск',
        name: 'ИМЯ',
        lastName: 'ФАМИЛИЯ',
        // patronymic: 'ОТЧЕСТВО',
        birthDate: 'ГОД РОЖДЕНИЯ',
        error: 'Неправильный формат даты',
        deathDate: 'ГОД СМЕРТИ',
        country: 'СТРАНА',
        city: 'ГОРОД',
        gte: 'БОЛЬШЕ ЧЕМ',
        lte: 'МЕНЬШЕ ЧЕМ',
        search: 'ПОИСК',
        clear: 'ОЧИСТИТЬ',
        noData: 'НИЧЕГО НЕ НАЙДЕНО',
      },
    },
    page: {
      title: 'Архив_Людей',
      archive: 'Архив',
      people: '_Людей',
      noData: 'НИЧЕГО НЕ НАЙДЕНО',
    },
    person: {
      indexTitle: 'Человек',
      page: {
        titleLink: 'Архив_Людей',
        archive: 'Архив',
        grave: '_Личность',
        location: 'Место нахождения',
        biography: 'Биография',
        map: {
          show: 'Показать карту',
          hide: 'Скрыть карту',
        },
        notData: 'нет данных',
        prev: 'Предыдущий',
      },
    },
  },
  aboutTheProject: {
    indexTitle: 'О проекте',
    page: {
      title: 'О_проекте',
      description: `Могилки - это специальный портал для людей, которые интересуются 
        историей и архивными данными. На сайте есть интерактивная карта,
        где вы найдете захоронения белорусов на территории Республики Польша.`,
    },
  },
  map: {
    indexTitle: 'Карта',
    page: {
      title: 'Интерактивная_Карта',
      header: 'Интерактивная Карта',
      search: 'НАЙТИ',
      loading: 'Загрузка',
    },
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
  dashboard: {
    indexTitle: 'Приборная панель',
    menu: {
      dashboard: 'Приборная панель',
      map: 'Карта',
      gallery: 'Галерея',
      content: 'Контент',
      articles: 'Статьи',
      places: 'Места',
      people: 'Люди',
      settings: 'Настройки',
      users: 'Пользователи',
      contacts: 'Контакты',
      languages: 'Языки',
    },
    map: {
      titleLink: 'Приборная панель',
      search: 'Поиск',
      button: 'Приблизить к Польше',
    },
  },
};
