export const by = {
  404: {
    description: 'Гэтую старонку не ўдалося знайсці',
  },
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
    partners: 'Партнёры',
    socialNetworks: 'Сацыяльныя сеткі',
  },
  auth: {
    signIn: {
      page: {
        titleT: 'Увайдзіце ў свой акаўнт',
        buttonGT: 'Увайдзіце праз',
        descriptionT: 'або ўвайдзіце з дапамогай электроннай пошты',
        emailT: 'АДРАС ЭЛЕКТРОННАЙ ПОШТЫ',
        passwordT: 'ПАРОЛЬ',
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
        descriptionT: 'або',
        buttonShowFormT: 'Рэгістрацыя',
        buttonHiddenFormT: 'Схаваць форму',
        nameT: 'ІМЯ КАРЫСТАЛЬНІКА',
        emailT: 'АДРАС ЭЛЕКТРОННАЙ ПОШТЫ',
        passwordT: 'ПАРОЛЬ',
        // passwordPlaceholderT: '6+ знакаў',
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
      resendPage: {
        firstDescription: `Тэрмін дзеяння спасылкі для праверкі электроннай пошты скончыўся
       `,
        secondDescription: `Здаецца, тэрмін дзеяння спасылкі для праверкі скончыўся. Не
          хвалюйцеся, мы можам адправіць спасылку яшчэ раз
       `,
        forgotPasswordLink: `Паўторна адправіць спасылку для праверкі
        `,
      },
      recoveryPage: {
        labelT: 'НОВЫ ПАРОЛЬ',
        placeholderT: '6+ знакаў"',
        descriptionT: `  Пароль павінен змяшчаць 1-9, a-z, A-Z і вызначаныя сімвалы
         `,
        buttonT: 'Стварыце новы пароль',
      },
    },
  },
  home: {
    indexTitle: 'Хатняя старонка',
    page: {
      homeHero: {
        graveTitle: 'МОГІЛКІ',
        archiveTitle: 'Архіў',
        description: `   Могілкі - гэта спецыяльны партал для людзей, якія цікавяцца
              гісторыяй і архіўнымі дадзенымі. На сайце ёсць інтэрактыўная мапа,
              дзе вы знойдзеце пахавання беларусаў на тэрыторыі Рэспублікі
              Польшчы.`,
        linkButton: 'падрабязней',
      },
      homeArticles: {
        titleT: 'Артыкулы',
        buttonT: 'чытаць усе',
      },
      homeMap: {
        titleFirstT: 'Інтэрактыўная',
        titleSecondT: 'Мапа',
        descriptionFirstT: `Каардынаты могілак`,
        descriptionSecondT: `Можна адзначыць могілку самастойна`,
        linkT: 'чытаць усе',
        descriptionEnd: 'працуе на ўсіх дэвайсах',
      },
    },
  },
  articles: {
    indexTitle: 'Артыкулы',
    page: {
      title: 'Артыкулы',
      article: 'Артыкулы',
      noData: 'Няма артыкулаў',
      search: 'ЗНАЙСЦІ ПА ЗАГАЛОЎКУ',
    },
    article: {
      prev: 'Папярэдні',
    },
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
        map: {
          show: 'Паказаць мапу',
          hide: 'Схаваць мапу',
        },
        notData: 'няма дадзеных',
      },
    },
  },
  people: {
    indexTitle: 'Людзі',
    search: {
      indexTitle: 'Пошук',
      page: {
        title: 'Пошук',
        placeholder: 'Пошук',
        name: 'ІMЯ',
        lastName: 'ПРОЗВІШЧА',
        // patronymic: 'ПО БАТЬКУ',
        birthDate: 'ГОД НАРАДЖЭННЯ',
        error: 'Няправільны формат даты',
        deathDate: 'ГОД СМЕРЦІ',
        country: 'КРАІНА',
        city: 'ГОРАД',
        gte: 'БОЛЬШ ЧЫМ',
        lte: 'МЕНШ ЧЫМ',
        search: 'ПОШУК',
        clear: 'АЧЫСЦІЦЬ',
        noData: 'НІЧОГА НЕ ЗНАЙДЗЕНА',
      },
    },
    page: {
      title: 'Архіў_Людзей',
      archive: 'Архіў',
      people: '_Людзей',
      noData: 'НІЧОГА НЕ ЗНАЙДЗЕНА',
    },
    person: {
      indexTitle: 'Чалавек',
      page: {
        titleLink: 'Архіў_Людзей',
        archive: 'Архіў',
        grave: '_Асоба',
        location: 'Месца знаходжання',
        biography: 'Біяграфія',
        map: {
          show: 'Паказаць мапу',
          hide: 'Схаваць мапу',
        },
        notData: 'няма дадзеных',
        prev: 'Папярэдні',
      },
    },
  },
  aboutTheProject: {
    indexTitle: 'Пра_праэкт',
    page: {
      title: 'Пра_праэкт',
      description: `  Могілкі - гэта спецыяльны партал для людзей, якія цікавяцца
                гісторыяй і архіўнымі дадзенымі. На сайце ёсць інтэрактыўная мапа,
                дзе вы знойдзеце пахавання беларусаў на тэрыторыі Рэспублікі
                Польшчы.`,
    },
  },
  map: {
    indexTitle: 'Мапа',
    page: {
      title: 'Інтэрактыўная_Мапа',
      header: 'Інтэрактыўная Мапа',
      search: 'ЗНАЙСЦІ',
      loading: 'Загрузка',
    },
  },
  account: {
    indexTitle: 'Рэдагаваць профіль',
    page: {
      title: 'Рэдактаваць акаўнт',
      name: 'Імя карыстальніка',
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
  dashboard: {
    indexTitle: 'Прыборная панэль',
    menu: {
      dashboard: 'Прыборная панэль',
      map: 'Мапа',
      gallery: 'Галерэя',
      content: 'Кантэнт',
      articles: 'Артыкулы',
      places: 'Месца',
      people: 'Людзі',
      settings: 'Наладжваньне',
      users: 'Карыстальнікі',
      contacts: 'Кантакты',
      languages: 'Мовы',
      logout: 'Выйсці',
    },
    map: {
      titleLink: 'Прыборная панэль',
      search: 'Пошук',
      button: 'Прыблізіць да Польшчы',
    },
    gallery: {
      title: 'Галерэя',
      support: 'Падтрымліваемыя фарматы',
      maxFileSize: 'Максімальны дазволены памер файла',
      image: {
        title: 'Інфармацыя пра файл',
        alt: 'Альт',
        status: 'Статус',
        type: 'Тып',
        mime: 'Mime',
        fileSize: 'Памер файла',
        demensions: 'Размеры',
        owner: 'Уладальнік',
        createdAt: 'Створана',
        relations: {
          article: {
            id: 'ID артыкула',
            title: 'Артыкул',
          },
          place: {
            id: 'ID месца',
            title: 'Месца',
          },
          person: {
            id: 'ID асобы',
            title: 'Асоба',
          },
        },
        notifications: {
          success: {
            title: 'Файл створаны паспяхова',
            description: 'Вы будзеце перанакіраваны на старонку галерэі',
          },
          upload: {
            success: {
              title: 'Файл паспяхова загружаны',
              description: 'Усе файлы паспяхова загружаны',
            },
            errorType: {
              title: 'Памылка загрузкі файла',
              description: 'Тып файла не падтрымліваецца',
            },
            errorSize: {
              title: 'Памылка загрузкі файла',
              description: `Памер файла больш, чым 10МБ`,
            },
            remove: {
              title: 'Файл выдалены',
              description: 'Файл паспяхова выдалены',
            },
            failed: {
              title: 'Памылка загрузкі файла',
              description: 'Файл не загружаны',
            },
          },
          update: {
            title: 'Файл абноўлены паспяхова',
            description: 'Вы будзеце перанакіраваны на старонку галерэі',
          },
          delete: {
            title: 'Файл выдалены паспяхова',
            description: 'Вы будзеце перанакіраваны на старонку галерэі',
          },
          error: 'Памылка стварэння файла',
        },
      },
    },
    articles: {
      index: 'Артыкулы',
      add: {
        label: '+ Дадаць',
        title: 'Дадаць артыкул',
      },
      search: {
        title: 'Пошук па загаловку',
        placeholder: 'Пошук па загаловку',
      },
      table: {
        id: 'ID',
        owner: 'Уладальнік',
        title: 'Загаловак',
        createdAt: 'Створана',
        updatedAt: 'Абноўлена',
        status: 'Статус',
        photos: 'Фатаграфіі',
        actions: 'Дзеянні',
      },
      notifications: {
        success: {
          title: 'Артыкул створаны паспяхова',
          description: 'Вы будзеце перанакіраваны на старонку артыкула',
        },
        delete: {
          title: 'Артыкул выдалены паспяхова',
          description: 'Вы будзеце перанакіраваны на старонку артыкула',
        },
      },
      delete: {
        title: 'Выдаліць',
        titleConfirm: 'Пацвердзіце выдаленьне',
        description: 'Вы ўпэўненыя, што хочаце выдаліць артыкул?',
        cancel: 'Адмена',
        delete: 'Выдаліць',
      },
      updateModal: {
        title: 'Змяніць статус артыкула або рэдагаваць',
        buttonTitle: 'Змяніць статус артыкула',
        form: {
          label: 'Бягучы статус',
        },
        edit: 'Рэдагаваць',
        notification: {
          success: 'Статус паспяхова абноўлены',
          error: 'Памылка пры абнаўленні статуса',
        },
      },
      form: {
        title: {
          label: 'Загаловак',
          placeholder: 'Загаловак',
          tooltip:
            'Вы можаце напісаць да 155 сімвалаў. Пасля напісання вы павінны захаваць артыкул.',
          rules: {
            required: 'Поле "Загаловак" абавязковае',
            max: 'Максімальная даўжыня: 155 сімвалаў',
          },
        },
        description: {
          label: 'Кароткае апісанне',
          placeholder: 'Кароткае апісанне',
          tooltip:
            'Вы можаце напісаць да 355 сімвалаў. Пасля напісання вы павінны захаваць артыкул.',
          rules: {
            required: 'Поле "Кароткае апісанне" абавязковае',
            max: 'Максімальная даўжыня: 355 сімвалаў',
          },
        },
        content: {
          label: 'Змест',
          tooltip:
            'Вы можаце напісаць да 10 000 сімвалаў. Пасля напісання вы павінны захаваць артыкул.',
          rules: {
            required: 'Поле "Змест" абавязковае',
            max: 'Максімальная даўжыня: 10 000 сімвалаў',
          },
        },
        photo: {
          label: 'Фота',
          tooltip:
            'Вы можаце загрузіць 1 фота. Пасля загрузкі вы павінны захаваць артыкул.',
          rules: {
            required: 'Поле "Фота" абавязковае',
            max: 'Максімальная колькасць: 1 фота',
          },
        },
      },
      create: {
        index: 'Стварыць артыкул',
        notification: {
          success: {
            title: 'Артыкул паспяхова створаны',
            description: 'Вы будзеце перанакіраваны на старонку артыкула',
          },
          error: 'Памылка пры стварэнні артыкула',
        },
        button: {
          save: 'Захаваць',
          photo: '+ Загрузіць',
        },
      },
      edit: {
        index: 'Рэдагаваць артыкул',
        notification: {
          success: {
            title: 'Артыкул паспяхова абноўлены',
            description: 'Вы будзеце перанакіраваны на старонку артыкула',
          },
          update: {
            title: 'Артыкул абноўлены паспяхова',
          },
          delete: {
            title: 'Артыкул выдалены паспяхова',
          },
          error: 'Памылка пры абнаўленні артыкула',
        },
        button: {
          save: 'Захаваць',
          photo: '+ Загрузіць',
        },
      },
    },
    places: {
      index: 'Месцы',
      add: {
        label: '+ Дадаць',
        title: 'Дадаць месца',
      },
      search: {
        name: {
          title: 'Пошук па імі',
          placeholder: 'Пошук па імі',
        },
        country: {
          title: 'Пошук па краіне',
          placeholder: 'Пошук па краіне',
        },
        city: {
          title: 'Пошук па горадзе',
          placeholder: 'Пошук па горадзе',
        },
      },
      table: {
        id: 'ID',
        owner: 'Уладальнік',
        name: 'Імя',
        country: 'Краіна',
        city: 'Горад',
        createdAt: 'Створана',
        updatedAt: 'Абноўлена',
        status: 'Статус',
        photos: 'Фатаграфіі',
        persons: 'Асобы',
        actions: 'Дзеянні',
      },
      notifications: {
        success: {
          title: 'Месца створана паспяхова',
          description: 'Вы будзеце перанакіраваны на старонку месца',
        },
        delete: {
          title: 'Месца выдалена паспяхова',
          description: 'Вы будзеце перанакіраваны на старонку месцаў',
        },
      },
      form: {
        country: {
          label: 'Краіна',
          placeholder: 'Краіна',
          tooltip:
            'Вы можаце напісаць да 120 сімвалаў. Пасля запісу вы павінны захаваць месца.',
          rules: {
            required: 'Поле "Краіна" абавязкова для запаўнення',
            max: 'Максімальная даўжыня: 120 сімвалаў',
          },
        },
        city: {
          label: 'Горад',
          placeholder: 'Горад',
          tooltip:
            'Вы можаце напісаць да 120 сімвалаў. Пасля запісу вы павінны захаваць горад.',
          rules: {
            required: 'Поле "Горад" абавязкова для запаўнення',
            max: 'Максімальная даўжыня: 120 сімвалаў',
          },
        },
        nameCemetery: {
          label: 'Назва цвінтара',
          placeholder: 'Назва цвінтара',
          tooltip:
            'Вы можаце напісаць да 120 сімвалаў. Пасля запісу вы павінны захаваць назву цвінтара.',
          rules: {
            required: 'Поле "Назва цвінтара" абавязкова для запаўнення',
            max: 'Максімальная даўжыня: 120 сімвалаў',
          },
        },
        shortDescription: {
          label: 'Кароткае апісанне',
          placeholder: 'Кароткае апісанне',
          tooltip:
            'Вы можаце напісаць да 300 сімвалаў. Пасля запісу вы павінны захаваць месца.',
          rules: {
            required: 'Поле "Кароткае апісанне" абавязкова для запаўнення',
            max: 'Максімальная даўжыня: 300 сімвалаў',
          },
        },
        description: {
          label: 'Апісанне',
          placeholder: 'Апісанне',
          tooltip:
            'Вы можаце напісаць да 5 000 сімвалаў. Пасля запісу вы павінны захаваць месца.',
          rules: {
            required: 'Поле "Апісанне" абавязкова для запаўнення',
            max: 'Максімальная даўжыня: 5 000 сімвалаў',
          },
        },
        photo: {
          label: 'Фота',
          tooltip:
            'Вы можаце загрузіць да 1 фота. Пасля загрузкі вы павінны захаваць месца.',
          rules: {
            required: 'Поле "Фота" абавязкова для запаўнення',
            max: 'Максімальная даўжыня: 1 фота',
          },
        },
      },
      create: {
        index: 'Стварыць месца',
        notification: {
          success: {
            title: 'Месца паспяхова створана',
            description: 'Вы будзеце перанакіраваны на старонку месца',
          },
          error: 'Памылка пры стварэнні месца',
        },
        button: {
          save: 'Захаваць',
          photo: '+ Загрузіць',
        },
      },
      edit: {
        index: 'Рэдагаваць месца',
        notification: {
          success: {
            title: 'Месца паспяхова абноўлена',
            description: 'Вы будзеце перанакіраваны на старонку месца',
          },
          update: {
            title: 'Месца паспяхова абноўлена',
          },
          delete: {
            title: 'Месца паспяхова выдалена',
          },
          error: 'Памылка пры абнаўленні месца',
        },
        button: {
          save: 'Захаваць',
          photo: '+ Загрузіць',
        },
      },
      delete: {
        title: 'Выдаліць',
        titleConfirm: 'Пацвердзіць выдаленне',
        description: 'Вы ўпэўненыя, што хочаце выдаліць месца?',
        cancel: 'Адмяніць',
        delete: 'Выдаліць',
      },
      updateModal: {
        title: 'Змена статусу месца або рэдагаванне',
        buttonTitle: 'Змяніць статус месца',
        form: {
          label: 'Бягучы статус',
        },
        edit: 'Рэдагаваць',
        notification: {
          success: 'Статус паспяхова абноўлены',
          error: 'Памылка пры абнаўленні статусу',
        },
      },
    },
    persons: {
      index: 'Асобы',
      add: {
        label: '+ Дадаць',
        title: 'Дадаць асобу',
      },
      filters: {
        title: 'Фільтры',
        placeholder: 'Паказаць больш фільтраў',
      },
      search: {
        more: 'Больш',
        less: 'Менш',
        name: {
          title: 'Пошук па імі',
          placeholder: 'Пошук па імі',
        },
        lastName: {
          title: 'Пошук па прозвішчу',
          placeholder: 'Пошук па прозвішчу',
        },
        birthDate: {
          title: 'Дата нараджэння',
          placeholder: 'Пошук па дате нараджэння',
        },
        deathDate: {
          title: 'Дата смерці',
          placeholder: 'Пошук па дате смерці',
        },
        country: {
          title: 'Пошук па краіне',
          placeholder: 'Пошук па краіне',
        },
        city: {
          title: 'Пошук па горадзе',
          placeholder: 'Пошук па горадзе',
        },
      },
      form: {
        name: {
          label: 'Імя',
          placeholder: 'Імя',
          tooltip:
            'Вы можаце напісаць да 120 знакаў. Пасля напісання вы павінны захаваць імя.',
          rules: {
            required: 'Поле Імя абавязкова для запаўнення',
            max: 'Максімальная даўжыня: 120 знакаў',
          },
        },
        lastName: {
          label: 'Прозвішча',
          placeholder: 'Прозвішча',
          tooltip:
            'Вы можаце напісаць да 120 знакаў. Пасля напісання вы павінны захаваць прозвішча.',
          rules: {
            required: 'Поле Прозвішча абавязкова для запаўнення',
            max: 'Максімальная даўжыня: 120 знакаў',
          },
        },
        patronymic: {
          label: 'Імя па бацьку',
          placeholder: 'Імя па бацьку',
          tooltip:
            'Вы можаце напісаць да 120 знакаў. Пасля напісання вы павінны захаваць імя па бацьку.',
          rules: {
            max: 'Максімальная даўжыня: 120 знакаў',
          },
        },
        biography: {
          label: 'Біяграфія',
          placeholder: 'Біяграфія',
          tooltip:
            'Вы можаце напісаць да 500 знакаў. Пасля напісання вы павінны захаваць артыкул.',
          rules: {
            max: 'Максімальная даўжыня: 500 знакаў',
          },
        },
        birthDate: {
          label: 'Дата нараджэння',
          placeholder: 'Дата нараджэння',
          tooltip:
            'Вы можаце напісаць да 120 знакаў. Пасля напісання вы павінны захаваць дату нараджэння.',
          rules: {
            required: 'Поле Дата нараджэння абавязкова для запаўнення',
            max: 'Максімальная даўжыня: 120 знакаў',
          },
        },
        deathDate: {
          label: 'Дата смерці',
          placeholder: 'Дата смерці',
          tooltip:
            'Вы можаце напісаць да 120 знакаў. Пасля напісання вы павінны захаваць дату смерці.',
          rules: {
            required: 'Поле Дата смерці абавязкова для запаўнення',
            max: 'Максімальная даўжыня: 120 знакаў',
          },
        },
        country: {
          label: 'Краіна',
          placeholder: 'Краіна',
          na: 'Няма дадзеных',
          tooltip:
            'Гэта поле запаўняецца аўтаматычна, калі вы выбіраеце месцазнаходжанне на мапе.',
          rules: {
            required: 'Поле Краіна абавязкова для запаўнення',
            max: 'Максімальная даўжыня: 120 знакаў',
          },
        },
        city: {
          label: 'Горад',
          placeholder: 'Горад',
          na: 'Няма дадзеных',
          tooltip:
            'Гэта поле запаўняецца аўтаматычна, калі вы выбіраеце месцазнаходжанне на мапе.',
          rules: {
            required: 'Поле Горад абавязкова для запаўнення',
            max: 'Максімальная даўжыня: 120 знакаў',
          },
        },
        photo: {
          label: 'Фота',
          tooltip:
            'Вы можаце загружаць да 3 фота, але адна фота абавязкова. Першая загружаная фота будзе асноўнай. Пасля загрузкі вы павінны захаваць асобу.',
          rules: {
            required: 'Поле Фота абавязкова для запаўнення',
            max: 'Максімальная колькасць: 3 фота',
          },
        },
      },
      place: {
        label: 'Месца',
        placeholder: 'Месца',
        name: 'Імя',
        country: 'Краіна',
        city: 'Горад',
        searchPlaceholder: 'Пошук месца',
        selectedPlace: 'Выбранае месца',
        address: 'Фарматаваны адрас',
        tooltip:
          'Выберыце месцазнаходжанне з спісу, каб звязаць яго з канкрэтным месцам на мапе.',
        clear: 'Ачысціць',
      },
      create: {
        index: 'Стварыць асобу',
        notification: {
          success: {
            title: 'Асоба паспяхова створана',
            description: 'Вы будзеце перанакіраваны на старонку асобы',
          },
          error: 'Памылка пры стварэнні месца',
        },
        button: {
          save: 'Захаваць',
          photo: '+ Загрузіць',
        },
      },
      edit: {
        index: 'Рэдагаваць асобу',
        notification: {
          success: {
            title: 'Асоба паспяхова абноўлена',
            description: 'Вы будзеце перанакіраваныя на старонку асобы',
          },
          update: {
            title: 'Асоба паспяхова абноўлена',
          },
          delete: {
            title: 'Асоба паспяхова выдаленая',
          },
          error: 'Памылка пры абнаўленні асобы',
        },
        button: {
          save: 'Захаваць',
          photo: '+ Загрузіць',
        },
      },
      table: {
        id: 'ID',
        owner: 'Уладальнік',
        name: 'Імя',
        lastName: 'Прозвішча',
        birthDate: 'Дата нараджэння',
        deathDate: 'Дата смерці',
        country: 'Краіна',
        city: 'Горад',
        createdAt: 'Створана',
        updatedAt: 'Абноўлена',
        placeId: 'ID месца',
        status: 'Статус',
        photos: 'Фатаграфіі',
        actions: 'Дзеянні',
      },
      notifications: {
        success: {
          title: 'Асоба паспяхова створана',
          description: 'Вы будзеце перанакіраваны на старонку асобы',
        },
        delete: {
          title: 'Асоба паспяхова выдалена',
          description: 'Вы будзеце перанакіраваны на старонку асоў',
        },
      },
      delete: {
        title: 'Выдаліць',
        titleConfirm: 'Пацвердзіць выдаленне',
        description: 'Вы ўпэўненыя, што хочаце выдаліць асобу?',
        cancel: 'Адмяніць',
        delete: 'Выдаліць',
      },
      updateModal: {
        title: 'Змяніць статус асобы або рэдагаваць',
        buttonTitle: 'Змяніць статус асобы',
        form: {
          label: 'Бягучы статус',
        },
        edit: 'Рэдагаваць',
        notification: {
          success: 'Статус паспяхова абноўлены',
          error: 'Памылка пры абнаўленні статусу',
        },
      },
    },
    contacts: {
      index: 'Кантакты',
      form: {
        about: {
          label: 'Аб нас',
          placeholder: 'Аб',
          tooltip:
            'Вы можаце напісаць да 10 000 знакаў. Пасля напісання вы павінны захаваць кантакты.',
          rules: {
            required: 'Поле "Аб нас" абавязковае',
            max: 'Максімальная даўжыня: 10 000 знакаў',
          },
        },
        socialNetworks: {
          facebook: {
            label: 'Facebook',
            placeholder: 'Увядзіце спасылку',
            tooltip:
              'Вы павінны ўвесці спасылку на групу або старонку ў фармаце "https://www.facebook.com/...".',
          },
          telegram: {
            label: 'Telegram',
            placeholder: 'Увядзіце спасылку',
            tooltip:
              'Вы павінны ўвесці спасылку на групу або канал у фармаце "https://t.me/...".',
          },
          instagram: {
            label: 'Instagram',
            placeholder: 'Увядзіце спасылку',
            tooltip:
              'Вы павінны ўвесці спасылку на групу або старонку ў фармаце "https://www.instagram.com/...".',
          },
          partners: {
            label: 'Партнёры',
            placeholder: 'Увядзіце спасылку',
            tooltip: 'Вы павінны ўвесці спасылку на групу або старонку.',
          },
        },
        address: {
          label: 'Адрас',
          placeholder: 'Увядзіце адрас',
          rules: {
            required: 'Поле "Адрас" абавязковае',
          },
        },
        email: {
          label: 'Email',
          placeholder: 'Увядзіце email',
          rules: {
            required: 'Поле "Email" абавязковае',
            email: 'Email павінен быць сапраўдным',
          },
        },
        updatedAt: 'Абноўлена',
        save: 'Захаваць',
      },
      notification: {
        update: {
          title: 'Кантакты паспяхова абноўлены',
        },
        error: 'Памылка пры абнаўленні кантактаў',
      },
    },
    users: {
      index: 'Карыстальнікі',
      indexH: 'Карыстальнік',
      search: {
        title: 'Пошук па імі',
        placeholder: 'Пошук па імі',
      },
      selectStatus: {
        all: 'Усе',
        active: 'Актыўны',
        banned: 'Забанены',
        pending: 'Чакаецца',
      },
      selectRole: {
        all: 'Усе',
        admin: 'Адміністратар',
        editor: 'Рэдактар',
        author: 'Аўтар',
        user: 'Карыстальнік',
      },
      table: {
        id: 'ID',
        name: 'Імя',
        email: 'Email',
        status: 'Статус',
        role: 'Роля',
        createdAt: 'Створана',
        updatedAt: 'Абноўлена',
        view: 'Праглядзець профіль',
        actions: 'Дзеянні',
      },
      notifications: {
        delete: {
          title: 'Карыстальнік выдалены паспяхова',
          description: 'Вы будзеце перанакіраваныя на старонку карыстальнікаў',
        },
      },
      list: {
        name: 'Імя',
        email: 'Email',
        role: 'Роля',
        status: 'Статус',
        createdAt: 'Створана',
        updatedAt: 'Абноўлена',
        items: {
          info: 'Інфармацыя',
          places: 'Месцы',
          persons: 'Асобы',
          articles: 'Артыкулы',
        },
      },
      drawer: {
        title: 'Профіль карыстальніка',
        more: 'больш…',
        name: 'Імя карыстальніка',
        lastName: 'Прозвішча карыстальніка',
        na: 'Няма дадзеных',
        email: 'Email',
        userInformation: 'Інфармацыя пра карыстальніка',
        status: 'Статус',
        role: 'Роля',
        places: 'Месцы',
        articles: 'Артыкулы',
        persons: 'Асобы',
        drafts: 'Чарнавікі',
        pending: 'Чакаецца разгляду',
        published: 'Апублікавана',
        otherInformation: 'Іншая інфармацыя',
        added: 'Дададзена',
        updated: 'Апошні абнаўленне',
      },
      delete: {
        title: 'Выдаліць',
        titleConfirm: 'Пацвердзіць выдаленне',
        description: 'Вы ўпэўненыя, што хочаце выдаліць карыстальніка?',
        cancel: 'Адмяніць',
        delete: 'Выдаліць',
      },
      updateModal: {
        title: 'Змяніць ролю, статус карыстальніка або рэдагаваць',
        button: {
          title: 'Абнавіць статус і ролю карыстальніка',
          update: 'Абнавіць',
        },
        form: {
          label: 'Бягучая роля',
          label2: 'Бягучы статус',
        },
        edit: 'Рэдагаваць',
        notification: {
          updateRole: {
            success: 'Роля паспяхова абноўлена',
          },
          updateStatus: {
            success: 'Статус паспяхова абноўлены',
          },
        },
      },
    },
    languages: {
      index: 'Мовы',
      add: {
        label: '+ Дадаць',
        title: 'Дадаць мову',
      },
      edit: {
        title: 'Рэдагаваць мову',
      },
      table: {
        id: 'ID',
        name: 'Назва',
        native: 'Родная',
        code: 'Код',
        order: 'Парадак',
        createdAt: 'Створана',
        updatedAt: 'Абноўлена',
        actions: 'Дзеянні',
      },
      form: {
        title: 'Дадаць мову',
        titleUpdate: 'Рэдагаваць мову',
        name: {
          label: 'Назва',
          placeholder: 'Назва',
          rules: {
            required: 'Поле "Назва" абавязкова для запаўнення',
            pattern: 'Назва мовы можа ўтрымліваць толькі тэкст!',
          },
        },
        native: {
          label: 'Родная',
          placeholder: 'Родная',
          rules: {
            required: 'Поле "Родная" абавязкова для запаўнення',
            pattern: 'Назва мовы можа ўтрымліваць толькі тэкст!',
          },
        },
        code: {
          label: 'Код',
          placeholder: 'Код',
          rules: {
            required: 'Поле "Код" абавязкова для запаўнення',
            pattern: 'Назва мовы можа ўтрымліваць толькі тэкст!',
            max: 'Код павінен быць не больш за 2 сімвалы!',
          },
        },
        order: {
          label: 'Парадак',
          placeholder: 'Парадак',
          rules: {
            required: 'Поле "Парадак" абавязкова для запаўнення',
            pattern: 'Назва мовы можа ўтрымліваць толькі лічбы!',
          },
        },
        save: 'Захаваць',
      },
      notifications: {
        success: {
          title: 'Мова паспяхова створана',
          description: 'Вы будзеце перанакіраваны на старонку мовы',
        },
        update: {
          title: 'Мова паспяхова абноўлена',
          description: 'Вы будзеце перанакіраваны на старонку мовы',
        },
        delete: {
          title: 'Мова паспяхова выдаленая',
          description: 'Вы будзеце перанакіраваны на старонку моў',
        },
        error: 'Памылка пры стварэнні мовы',
      },
      delete: {
        title: 'Выдаліць',
        titleConfirm: 'Пацвердзіць выдаленне',
        description: 'Вы ўпэўнены, што хочаце выдаліць мову?',
        cancel: 'Адмяніць',
        delete: 'Выдаліць',
      },
    },
    rules: {
      required: 'Калі ласка, увядзіце',
      slug: {
        label: 'Слаг',
        placeholder: 'Генеруецца аўтаматычна',
        tooltip: `Вы можаце змяніць слуг артыкула.
      Гэта поле для SEO, яно павінна быць унікальнай і ўтрымліваць толькі літары, лічбы і дэфісы.
      Не можа пачынацца або заканчвацца дэфісам.`,
        rules: {
          required: 'Поле Slug абавязкова для запаўнення',
          max: 'Максімальная даўжыня: 120 сімвалаў',
          pattern: `Slug можа ўтрымліваць толькі літары, лічбы і дэфісы.
  Не можа пачынацца або заканчвацца дэфісам.`,
        },
      },
    },
    metaInfo: {
      publicLink: {
        label: 'Агульная спасылка',
        no: 'Не апублікавана',
      },
      owner: 'Уладальнік',
      createdAt: 'Створана',
      updatedAt: 'Абноўлена',
    },
    locationInfo: {
      label: 'Месцазнаходжанне',
      formattedAddress: 'Фарматаваны адрас',
      longitude: 'Даўгатата',
      latitude: 'Шырата',
      tooltip:
        'Вы павінны выбраць месцазнаходжанне на мапе, каб вызначыць каардынаты месца.',
      rules: {
        required: 'Поле "Месцазнаходжанне" абавязкова для запаўнення',
      },
      search: 'Паказаць ваша месцазнаходжанне або шукаць месцазнаходжанне',
      buttons: {
        openMap: 'Адкрыць карту',
        clearTable: 'Ачысціць табліцу',
        fillTable: 'Запоўніць табліцу',
        define: 'Апісаць месцазнаходжанне',
        removeMarker: 'Выдаліць маркер',
        disable: 'Адключыць клік па картцы',
        enable: 'Уключыць клік па картцы',
        panTo: 'Панарыраваць да месца',
      },
      form: {
        country: {
          label: 'Краіна',
          placeholder: 'Краіна',
          rules: {
            required: 'Поле "Краіна" абавязкова для запаўнення',
          },
        },
        city: {
          label: 'Горад',
          placeholder: 'Горад',
          rules: {
            required: 'Поле "Горад" абавязкова для запаўнення',
          },
        },
        address: {
          label: 'Адрас',
          placeholder: 'Адрас',
          rules: {
            required: 'Поле "Адрас" абавязкова для запаўнення',
          },
        },
        longitude: {
          label: 'Даўгата',
          placeholder: 'Даўгата',
          rules: {
            required: 'Поле "Даўгата" абавязкова для запаўнення',
            type: 'Поле "Даўгата" павінна быць лічбай',
            range: 'Даўгата павінна быць у межах -180 і 180',
            min: 'Мінімальная даўжыня: -180',
            max: 'Максімальная даўжыня: 180',
          },
        },
        latitude: {
          label: 'Шырата',
          placeholder: 'Шырата',
          rules: {
            required: 'Поле "Шырата" абавязкова для запаўнення',
            type: 'Поле "Шырата" павінна быць лічбай',
            range: 'Даўгата павінна быць у межах -90 і 90',
            min: 'Мінімальная даўжыня: -90',
            max: 'Максімальная даўжыня: 90',
          },
        },
        administrativeAreaLevel1: {
          label: 'Штат',
          placeholder: 'Увядзіце штат',
        },
        administrativeAreaLevel2: {
          label: 'Раён',
          placeholder: 'Увядзіце раён',
        },
        street: {
          label: 'Вуліца',
          placeholder: 'Увядзіце вуліцу',
        },
        streetNumber: {
          label: 'Нумар вуліцы',
          placeholder: 'Увядзіце нумар вуліцы',
        },
        buttons: {
          fillForm: 'Запоўніць форму',
          details: {
            title: 'Паказаць больш дэталаў',
            open: 'Дэталі',
          },
        },
      },
    },
    updateStatus: {
      label: 'Статус',
      draft: 'Чарнавік',
      pending: 'Адпраўка на рэцэнзіраванне',
      published: 'Апублікаваць',
      archived: 'Архіў',
    },
    selectStatus: {
      all: 'Усе',
      draft: 'Чарнавікі',
      pending: 'Адпраўлены на праверку',
      published: 'Апублікаваны',
      archived: 'Архіў',
    },
    selectFileType: {
      all: 'Усе',
      articles: 'Артыкулы',
      places: 'Месца',
      people: 'Людзі',
    },
    delete: {
      title: 'Выдаліць',
      titleConfirm: 'Пацвердзіце выдаленьне',
      description: 'Вы ўпэўненыя, што хочаце выдаліць?',
      cancel: 'Адмена',
      delete: 'Выдаліць',
    },
    save: 'Захаваць',
  },
};

export type LocaleType = typeof by;
