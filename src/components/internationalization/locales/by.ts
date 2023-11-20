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
      page: {
        titleT: 'Увайдзіце ў свой акаўнт',
        buttonGT: 'Увайдзіце праз',
        descriptionT: 'або ўвайдзіце з дапамогай электроннай пошты',
        emailT: 'Адрас электроннай пошты',
        passwordT: 'Пароль',
        forgotT: 'Забыўся?',
        buttonSignInT: 'Увайсці',
        noAccT: 'У вас няма акаўнта?',
        signUpT: 'Зарэгістравацца',
        schema: {
          emailT: 'Поле Email абавязкова',
          passwordT: 'Поле Пароль абавязкова',
        },
        customErrors:
          'Няправільны пароль, email або імя карыстальніка. Паспрабуйце яшчэ раз, калі ласка',
        STATUS_ERROR_401_TR: `Гэты акаўнт адсутнічае ў сістэме, калі вы хочаце зарэгістравацца, перайдзіце на старонку "Зарэгістравацца"`,
        STATUS_ERROR_204_TR:
          'Карыстальнік з гэтым email ужо існуе. Праверце сваю пошту для атрымання далейшых інструкцый',
      },
      indexTitle: 'Уваход',
    },
    signUp: {
      indexTitle: 'Рэгістрацыя',
      page: {
        titleT: 'Рэгістрацыя',
        buttonGoogleT: 'Увайдзіце праз',
        descriptionT: 'abo',
        buttonShowFormT: 'Рэгістрацыя',
        buttonHiddenFormT: 'Схаваць форму',
        nameT: 'Імя карыстальніка',
        emailT: 'Адрас электроннай пошты',
        passwordT: 'Пароль',
        passwordPlaceholderT: '6+ персанажаў',
        descriptionFormT: ` Пароль павінен быць не менш за 6 знакаў, уключаць вялікія і
              маленькія лацінскія літары, а таксама цыфры.`,
        buttonSignUpT: 'Зарэгістравацца',
        descriptionSignInT: 'У вас ўжо ёсць акаўнт?',
        signInLinkT: 'Увайсці',
        schema: {
          userName: {
            required: 'Поле "Імя карыстальніка" абавязковае для запаўнення',
            min: 'Мінімальная колькасць знакаў: 6',
            max: 'Максімальная колькасць знакаў: 30',
          },
          email: {
            required: 'Поле "Email" абавязковае для запаўнення',
            email: 'Email павінен быць сапраўдным',
          },
          password: {
            required: 'Поле "Пароль" абавязковае для запаўнення',
            min: 'Мінімальная колькасць знакаў: 6',
            max: 'Пароль павінен мець не больш за 20 знакаў',
            matches:
              'Пароль павінен ўтрымліваць прынамсі адзін лік, адну вялікую літару, адну малую літару і адзін спецыяльны сімвал.',
          },
        },
      },
    },
    forgotPassword: {
      indexTitle: 'Забыліся пароль',
      page: {
        showMessageT: `    Калі гэты адрас электроннай пошты выкарыстоўваўся для стварэння
            ўліковага запісу, інструкцыі па для скіду пароля будзе адпраўлена
            вам. Праверце сваю электронную пошту.
         `,
        signInLink: 'Перайдзіце да ўваходу',
        titleT: 'Забыліся пароль?',
        descriptionFirstT: `    Увядзіце адрас электроннай пошты, які вы выкарыстоўвалі, калі
              далучыліся, і мы вышлем інструкцыі па скідцы пароля.
          `,
        descriptionSecondT: ` У мэтах бяспекі мы НЕ захоўваем ваш пароль. Так што адпачывайце
              запэўніў, што мы ніколі не адправім ваш пароль па электроннай
              пошце.`,
        emailT: 'АДРАС ЭЛЕКТРОННАЙ ПОШТЫ',
        captchaT: {
          titleT: 'Гэты сайт абаронены reCAPTCHA Enterprise і Google',
          private: 'Палітыка прыватнасці',
          rules: 'Умовы выкарыстання',
        },
        buttonT: 'Адправіць інструкцыі',
      },
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
    page: {
      title: 'Архіў_Месцаў',
      archive: 'Архіў',
      place: '_Месцаў',
      name: 'НАЗВА',
      country: 'КРАІНА',
      city: 'ГОРАД',
      noData: 'няма старонак',
    },
    place: {
      indexTitle: 'Месца',
      page: {
        titleLink: 'Архіў_Месцаў',
        archive: 'Архіў',
        grave: '_Могілка',
        location: 'Месца знаходжання',
        description: 'Апісанне',
        map: 'На мапе',
        notData: 'няма дадзеных',
      },
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
