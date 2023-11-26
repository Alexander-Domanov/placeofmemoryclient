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
    gallery: {
      title: 'Галерея',
      image: {
        title: 'Информация о файле',
        alt: 'Альт',
        status: 'Статус',
        type: 'Тип',
        mime: 'Mime',
        fileSize: 'Размер файла',
        demensions: 'Размеры',
        owner: 'Владелец',
        createdAt: 'Создано',
        relations: {
          article: {
            id: 'ID статьи',
            title: 'Статья',
          },
          place: {
            id: 'ID места',
            title: 'Место',
          },
          person: {
            id: 'ID личности',
            title: 'Личность',
          },
        },
        notifications: {
          success: {
            title: 'Изображение успешно создано',
            description: 'Вы будете перенаправлены на страницу галереи',
          },
          upload: {
            success: {
              title: 'Файл успешно загружен',
              description: 'Все файлы успешно загружены',
            },
            errorType: {
              title: 'Ошибка загрузки файла',
              description: 'Тип файла не поддерживается',
            },
            errorSize: {
              title: 'Ошибка загрузки файла',
              description: `Размер файла больше, чем 10МБ`,
            },
            remove: {
              title: 'Файл удален',
              description: 'Файл успешно удален',
            },
            failed: {
              title: 'Ошибка загрузки файла',
              description: 'Файл не загружен',
            },
          },
          update: {
            title: 'Изображение успешно обновлено',
            description: 'Вы будете перенаправлены на страницу галереи',
          },
          delete: {
            title: 'Изображение успешно удалено',
            description: 'Вы будете перенаправлены на страницу галереи',
          },
          error: 'Ошибка создания изображения',
        },
      },
    },
    articles: {
      index: 'Статьи',
      add: {
        label: '+ Добавить',
        title: 'Добавить статью',
      },
      search: {
        title: 'Поиск по заголовку',
        placeholder: 'Поиск по заголовку',
      },
      table: {
        id: 'ID',
        owner: 'Владелец',
        title: 'Заголовок',
        createdAt: 'Создано',
        updatedAt: 'Обновлено',
        status: 'Статус',
        photos: 'Фотографии',
        actions: 'Действия',
      },
      notifications: {
        success: {
          title: 'Статья успешно создана',
          description: 'Вы будете перенаправлены на страницу статьи',
        },
        delete: {
          title: 'Статья успешно удалена',
          description: 'Вы будете перенаправлены на страницу статьи',
        },
      },
      delete: {
        title: 'Удалить',
        titleConfirm: 'Подтвердите удаление',
        description: 'Вы уверены, что хотите удалить статью?',
        cancel: 'Отмена',
        delete: 'Удалить',
      },
      updateModal: {
        title: 'Изменить статус статьи или отредактировать',
        buttonTitle: 'Изменить статус статьи',
        form: {
          label: 'Текущий статус',
        },
        edit: 'Редактировать',
        notification: {
          success: 'Статус успешно обновлен',
          error: 'Ошибка обновления статуса',
        },
      },
      form: {
        title: {
          label: 'Заголовок',
          placeholder: 'Заголовок',
          tooltip:
            'Вы можете написать до 155 символов. После написания вы должны сохранить статью.',
          rules: {
            required: 'Поле "Заголовок" обязательно',
            max: 'Максимальная длина: 155 символов',
          },
        },
        description: {
          label: 'Краткое описание',
          placeholder: 'Краткое описание',
          tooltip:
            'Вы можете написать до 355 символов. После написания вы должны сохранить статью.',
          rules: {
            required: 'Поле "Краткое описание" обязательно',
            max: 'Максимальная длина: 355 символов',
          },
        },
        content: {
          label: 'Содержание',
          tooltip:
            'Вы можете написать до 10 000 символов. После написания вы должны сохранить статью.',
          rules: {
            required: 'Поле "Содержание" обязательно',
            max: 'Максимальная длина: 10 000 символов',
          },
        },
        photo: {
          label: 'Фото',
          tooltip:
            'Вы можете загрузить до 1 фото. После загрузки вы должны сохранить статью.',
          rules: {
            required: 'Поле "Фото" обязательно',
            max: 'Максимальное количество: 1 фото',
          },
        },
      },
      create: {
        index: 'Создать статью',
        notification: {
          success: {
            title: 'Статья успешно создана',
            description: 'Вы будете перенаправлены на страницу статьи',
          },
          error: 'Ошибка создания статьи',
        },
        button: {
          save: 'Сохранить',
          photo: '+ Загрузить',
        },
      },
      edit: {
        index: 'Редактировать статью',
        notification: {
          success: {
            title: 'Статья успешно обновлена',
            description: 'Вы будете перенаправлены на страницу статьи',
          },
          update: {
            title: 'Статья успешно обновлена',
          },
          delete: {
            title: 'Статья успешно удалена',
          },
          error: 'Ошибка при обновлении статьи',
        },
        button: {
          save: 'Сохранить',
          photo: '+ Загрузить',
        },
      },
    },
    places: {
      index: 'Места',
      add: {
        label: '+ Добавить',
        title: 'Добавить место',
      },
      search: {
        name: {
          title: 'Поиск по имени',
          placeholder: 'Поиск по имени',
        },
        country: {
          title: 'Поиск по стране',
          placeholder: 'Поиск по стране',
        },
        city: {
          title: 'Поиск по городу',
          placeholder: 'Поиск по городу',
        },
      },
      table: {
        id: 'ID',
        owner: 'Владелец',
        name: 'Имя',
        country: 'Страна',
        city: 'Город',
        createdAt: 'Создано',
        updatedAt: 'Обновлено',
        status: 'Статус',
        photos: 'Фотографии',
        persons: 'Личности',
        actions: 'Действия',
      },
      notifications: {
        success: {
          title: 'Место успешно создано',
          description: 'Вы будете перенаправлены на страницу места',
        },
        delete: {
          title: 'Место успешно удалено',
          description: 'Вы будете перенаправлены на страницу мест',
        },
      },
      form: {
        country: {
          label: 'Страна',
          placeholder: 'Страна',
          tooltip:
            'Вы можете написать до 120 символов. После записи вы должны сохранить место.',
          rules: {
            required: 'Поле "Страна" обязательно для заполнения',
            max: 'Максимальная длина: 120 символов',
          },
        },
        city: {
          label: 'Город',
          placeholder: 'Город',
          tooltip:
            'Вы можете написать до 120 символов. После записи вы должны сохранить город.',
          rules: {
            required: 'Поле "Город" обязательно для заполнения',
            max: 'Максимальная длина: 120 символов',
          },
        },
        nameCemetery: {
          label: 'Название кладбища',
          placeholder: 'Название кладбища',
          tooltip:
            'Вы можете написать до 120 символов. После записи вы должны сохранить название кладбища.',
          rules: {
            required: 'Поле "Название кладбища" обязательно для заполнения',
            max: 'Максимальная длина: 120 символов',
          },
        },
        shortDescription: {
          label: 'Краткое описание',
          placeholder: 'Краткое описание',
          tooltip:
            'Вы можете написать до 300 символов. После записи вы должны сохранить место.',
          rules: {
            required: 'Поле "Краткое описание" обязательно для заполнения',
            max: 'Максимальная длина: 300 символов',
          },
        },
        description: {
          label: 'Описание',
          placeholder: 'Описание',
          tooltip:
            'Вы можете написать до 5 000 символов. После записи вы должны сохранить место.',
          rules: {
            required: 'Поле "Описание" обязательно для заполнения',
            max: 'Максимальная длина: 5 000 символов',
          },
        },
        photo: {
          label: 'Фото',
          tooltip:
            'Вы можете загрузить до 1 фото. После загрузки вы должны сохранить место.',
          rules: {
            required: 'Поле "Фото" обязательно для заполнения',
            max: 'Максимальная длина: 1 фото',
          },
        },
      },
      create: {
        index: 'Создать место',
        notification: {
          success: {
            title: 'Место успешно создано',
            description: 'Вы будете перенаправлены на страницу места',
          },
          error: 'Ошибка при создании места',
        },
        button: {
          save: 'Сохранить',
          photo: '+ Загрузить',
        },
      },
      edit: {
        index: 'Редактировать место',
        notification: {
          success: {
            title: 'Место успешно обновлено',
            description: 'Вы будете перенаправлены на страницу места',
          },
          update: {
            title: 'Место успешно обновлено',
          },
          delete: {
            title: 'Место успешно удалено',
          },
          error: 'Ошибка при обновлении места',
        },
        button: {
          save: 'Сохранить',
          photo: '+ Загрузить',
        },
      },
      delete: {
        title: 'Удалить',
        titleConfirm: 'Подтвердить удаление',
        description: 'Вы уверены, что хотите удалить место?',
        cancel: 'Отмена',
        delete: 'Удалить',
      },
      updateModal: {
        title: 'Изменение статуса места или редактирование',
        buttonTitle: 'Изменить статус места',
        form: {
          label: 'Текущий статус',
        },
        edit: 'Редактировать',
        notification: {
          success: 'Статус успешно обновлен',
          error: 'Ошибка обновления статуса',
        },
      },
    },
    contacts: {
      index: 'Контакты',
      form: {
        about: {
          label: 'О нас',
          placeholder: 'О нас',
          tooltip:
            'Вы можете написать до 10 000 символов. После написания вы должны сохранить контакты.',
          rules: {
            required: 'Поле "О нас" обязательно',
            max: 'Максимальная длина: 10 000 символов',
          },
        },
        socialNetworks: {
          facebook: {
            label: 'Facebook',
            placeholder: 'Введите ссылку',
            tooltip:
              'Необходимо ввести ссылку на группу или страницу в формате "https://www.facebook.com/...".',
          },
          telegram: {
            label: 'Telegram',
            placeholder: 'Введите ссылку',
            tooltip:
              'Необходимо ввести ссылку на группу или канал в формате "https://t.me/...".',
          },
          instagram: {
            label: 'Instagram',
            placeholder: 'Введите ссылку',
            tooltip:
              'Необходимо ввести ссылку на группу или страницу в формате "https://www.instagram.com/...".',
          },
          partners: {
            label: 'Партнеры',
            placeholder: 'Введите ссылку',
            tooltip: 'Необходимо ввести ссылку на группу или страницу.',
          },
        },
        address: {
          label: 'Адрес',
          placeholder: 'Введите адрес',
          rules: {
            required: 'Поле "Адрес" обязательно',
          },
        },
        email: {
          label: 'Email',
          placeholder: 'Введите email',
          rules: {
            required: 'Поле "Email" обязательно',
            email: 'Email должен быть валидным',
          },
        },
        updatedAt: 'Обновлено',
        save: 'Сохранить',
      },
      notification: {
        update: {
          title: 'Контакты успешно обновлены',
        },
        error: 'Ошибка при обновлении контактов',
      },
    },
    languages: {
      index: 'Языки',
      add: {
        label: '+ Добавить',
        title: 'Добавить язык',
      },
      edit: {
        title: 'Редактировать язык',
      },
      table: {
        id: 'ID',
        name: 'Название',
        native: 'Родной',
        code: 'Код',
        order: 'Порядок',
        createdAt: 'Создано в',
        updatedAt: 'Обновлено в',
        actions: 'Действия',
      },
      form: {
        title: 'Добавить язык',
        titleUpdate: 'Редактировать язык',
        name: {
          label: 'Название',
          placeholder: 'Название',
          rules: {
            required: 'Поле "Название" обязательно для заполнения',
            pattern: 'Название языка должно содержать только текст!',
          },
        },
        native: {
          label: 'Родной',
          placeholder: 'Родной',
          rules: {
            required: 'Поле "Родной" обязательно для заполнения',
            pattern: 'Название языка должно содержать только текст!',
          },
        },
        code: {
          label: 'Код',
          placeholder: 'Код',
          rules: {
            required: 'Поле "Код" обязательно для заполнения',
            pattern: 'Название языка должно содержать только текст!',
            max: 'Код должен быть не более 2 символов!',
          },
        },
        order: {
          label: 'Порядок',
          placeholder: 'Порядок',
          rules: {
            required: 'Поле "Порядок" обязательно для заполнения',
            pattern: 'Название языка должно содержать только цифры!',
          },
        },
        save: 'Сохранить',
      },
      notifications: {
        success: {
          title: 'Язык успешно создан',
          description: 'Вы будете перенаправлены на страницу языка',
        },
        update: {
          title: 'Язык успешно обновлен',
          description: 'Вы будете перенаправлены на страницу языка',
        },
        delete: {
          title: 'Язык успешно удален',
          description: 'Вы будете перенаправлены на страницу языков',
        },
        error: 'Ошибка при создании языка',
      },
      delete: {
        title: 'Удалить',
        titleConfirm: 'Подтвердить удаление',
        description: 'Вы уверены, что хотите удалить язык?',
        cancel: 'Отмена',
        delete: 'Удалить',
      },
    },
    rules: {
      required: 'Пожалуйста, введите',
      slug: {
        label: 'Слаг',
        placeholder: 'Это поле генерируется автоматически',
        tooltip: `Вы можете изменить слаг статьи.
      Это поле для SEO, он должен быть уникальным и содержать только буквы, цифры и дефисы.
      Не может начинаться или заканчиваться дефисом.`,
        rules: {
          required: 'Поле Slug обязательно для заполнения',
          max: 'Максимальная длина: 120 символов',
          pattern: `Slug может содержать только буквы, цифры и дефисы.
  Не может начинаться или заканчиваться дефисом.`,
        },
      },
    },
    metaInfo: {
      publicLink: {
        label: 'Общая ссылка',
        no: 'Не опубликовано',
      },
      owner: 'Владелец',
      createdAt: 'Создано',
      updatedAt: 'Обновлено',
    },
    locationInfo: {
      label: 'Местоположение',
      formattedAddress: 'Форматированный адрес',
      longitude: 'Долгота',
      latitude: 'Широта',
      tooltip:
        'Необходимо выбрать место на карте, чтобы определить координаты этого места.',
      rules: {
        required: 'Поле "Местоположение" обязательно для заполнения',
      },
      search: 'Показать ваше местоположение или найти местоположение',
      buttons: {
        openMap: 'Открыть карту',
        clearTable: 'Очистить таблицу',
        fillTable: 'Заполнить таблицу',
        define: 'Определить местоположение',
        removeMarker: 'Удалить маркер',
        disable: 'Отключить клик по карте',
        enable: 'Включить клик по карте',
        panTo: 'Переместить на местоположение',
      },
      form: {
        country: {
          label: 'Страна',
          placeholder: 'Страна',
          rules: {
            required: 'Поле Страна обязательно для заполнения',
          },
        },
        city: {
          label: 'Город',
          placeholder: 'Город',
          rules: {
            required: 'Поле Город обязательно для заполнения',
          },
        },
        address: {
          label: 'Адрес',
          placeholder: 'Адрес',
          rules: {
            required: 'Поле Адрес обязательно для заполнения',
          },
        },
        longitude: {
          label: 'Долгота',
          placeholder: 'Долгота',
          rules: {
            required: 'Поле Долгота обязательно для заполнения',
            type: 'Долгота должна быть числом',
            min: 'Минимальное значение: -180',
            max: 'Максимальное значение: 180',
          },
        },
        latitude: {
          label: 'Широта',
          placeholder: 'Широта',
          rules: {
            required: 'Поле Широта обязательно для заполнения',
            type: 'Широта должна быть числом',
            min: 'Минимальное значение: -90',
            max: 'Максимальное значение: 90',
          },
        },
        administrativeAreaLevel1: {
          label: 'Штат',
          placeholder: 'Введите штат',
        },
        administrativeAreaLevel2: {
          label: 'Район',
          placeholder: 'Введите район',
        },
        street: {
          label: 'Улица',
          placeholder: 'Введите улицу',
        },
        streetNumber: {
          label: 'Номер улицы',
          placeholder: 'Введите номер улицы',
        },
        buttons: {
          fillForm: 'Заполнить форму',
          details: {
            title: 'Показать больше деталей',
            open: 'Детали',
          },
        },
      },
    },
    updateStatus: {
      label: 'Cтатус',
      draft: 'Черновик',
      pending: 'Отправить на рецензирование',
      published: 'Опубликовать',
      archived: 'Архив',
    },
    selectStatus: {
      all: 'Все',
      draft: 'Черновики',
      pending: 'Отправлено на рассмотрение',
      published: 'Опубликовано',
      archived: 'Архив',
    },
    selectFileType: {
      all: 'Все',
      articles: 'Статьи',
      places: 'Места',
      people: 'Люди',
    },
    delete: {
      title: 'Удалить',
      titleConfirm: 'Подтвердите удаление',
      description: 'Вы уверены, что хотите удалить?',
      cancel: 'Отмена',
      delete: 'Удалить',
    },
    save: 'Сохранить',
  },
};
