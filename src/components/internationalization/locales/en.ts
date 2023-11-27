import { LocaleType } from '@/components/internationalization';

export const en: LocaleType = {
  404: {
    description: 'This page could not be found',
  },
  header: {
    articles: 'Articles',
    places: 'Places',
    people: 'People',
    aboutProject: 'About Project',
    map: 'Map',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    dashboard: 'Dashboard',
    settings: 'Settings',
    logout: 'Logout',
  },
  footer: {
    pages: 'Pages',
    contacts: 'Contacts',
    partners: 'Partners',
    socialNetworks: 'Social Networks',
  },
  auth: {
    signIn: {
      page: {
        titleT: 'Sign in to your account',
        buttonGT: 'Sign in with',
        descriptionT: 'or sign in with your email',
        emailT: 'EMAIL',
        passwordT: 'PASSWORD',
        forgotT: 'Forgot password?',
        buttonSignInT: 'Sign In',
        noAccT: "Don't have an account?",
        signUpT: 'Sign Up',
        schema: {
          emailT: 'Email field is required',
          passwordT: 'Password field is required',
        },
        customErrors:
          'Incorrect password, email, or username. Please try again',
        STATUS_ERROR_401_TR: `This account is not present in the system. If you want to register, go to the "Register" page`,

        STATUS_ERROR_204_TR:
          'A user with this email already exists. Check your email for further instructions',
      },
      indexTitle: 'Sign In',
    },
    signUp: {
      indexTitle: 'Sign Up',
      page: {
        titleT: 'Sign Up',
        buttonGoogleT: 'Sign up with',
        descriptionT: 'or',
        buttonShowFormT: 'Sign Up',
        buttonHiddenFormT: 'Hide Form',
        nameT: 'USERNAME',
        emailT: 'EMAIL',
        passwordT: 'PASSWORD',
        descriptionFormT:
          'Password must be at least 6 characters, include uppercase and lowercase letters, and numbers.',
        buttonSignUpT: 'Sign Up',
        descriptionSignInT: 'Already have an account?',
        signInLinkT: 'Sign In',
        schema: {
          userName: {
            required: 'Username field is required',
            min: 'Minimum length: 6 characters',
            max: 'Maximum length: 30 characters',
          },
          email: {
            required: 'Email field is required',
            email: 'Email must be valid',
          },
          password: {
            required: 'Password field is required',
            min: 'Minimum length: 6 characters',
            max: 'Password must not exceed 20 characters',
            matches:
              'Password must contain at least one digit, one uppercase letter, one lowercase letter, and one special character.',
          },
        },
      },
    },
    forgotPassword: {
      indexTitle: 'Forgot Password',
      page: {
        showMessageT: `If this email address was used to create an account, password reset instructions will be sent to you. Check your email.`,
        signInLink: 'Go to Sign In',
        titleT: 'Forgot Password?',
        descriptionFirstT: `Enter the email address you used to register, and we will send you instructions to reset your password.`,
        descriptionSecondT: `For security reasons, we do NOT store your password. So relax, we assure you that we will never send your password by email.`,
        emailT: 'EMAIL',
        captchaT: {
          titleT: 'This site is protected by reCAPTCHA Enterprise and Google',
          private: 'Privacy Policy',
          rules: 'Terms of Service',
        },
        buttonT: 'Send Instructions',
      },
    },
    recovery: {
      indexTile: 'Recovery',
      resendPage: {
        firstDescription: `The link to check the email has expired`,
        secondDescription: `Apparently, the link to check has expired. Don't worry, we can send the link again`,
        forgotPasswordLink: `Resend link for verification`,
      },
      recoveryPage: {
        labelT: 'NEW PASSWORD',
        placeholderT: '6+ characters',
        descriptionT: `Password must contain 1-9, a-z, A-Z, and certain characters`,
        buttonT: 'Create New Password',
      },
    },
  },
  home: {
    page: {
      homeHero: {
        graveTitle: 'GRAVES',
        archiveTitle: 'ARCHIVE',
        description: `Graves is a special portal for people interested in history and archival data. The site has an interactive map where you can find the graves of Belarusians in the territory of the Republic of Poland.`,
        linkButton: 'Learn More',
      },
      homeArticles: {
        titleT: 'Articles',
        buttonT: 'Read All',
      },
      homeMap: {
        titleFirstT: 'Interactive',
        titleSecondT: 'Map',
        descriptionFirstT: `Coordinates of graves`,
        descriptionSecondT: `You can mark the grave yourself`,
        linkT: 'Read All',
        descriptionEnd: 'works on all devices',
      },
    },
    indexTitle: 'Home Page',
  },
  articles: {
    indexTitle: 'Articles',
    page: {
      title: 'Articles',
      article: 'Articles',
      noData: 'NO DATA',
      search: 'SEARCH BY TITLE',
    },
    article: {
      prev: 'Previous',
    },
  },
  places: {
    indexTitle: 'Places',
    page: {
      title: 'Archive_Places',
      archive: 'Archive',
      place: '_Places',
      name: 'NAME',
      country: 'COUNTRY',
      city: 'CITY',
      noData: 'NOTHING FOUND',
    },
    place: {
      page: {
        titleLink: 'Archive_Places',
        archive: 'Archive',
        grave: '_Graves',
        location: 'Location',
        description: 'Description',
        map: {
          show: 'Show Map',
          hide: 'Hide Map',
        },
        notData: 'NO DATA',
      },
      indexTitle: 'Place',
    },
  },
  people: {
    indexTitle: 'People',
    search: {
      indexTitle: 'Search',
      page: {
        title: 'Search',
        placeholder: 'Search',
        name: 'NAME',
        lastName: 'LAST NAME',
        birthDate: 'BIRTH YEAR',
        error: 'Incorrect date format',
        deathDate: 'DEATH YEAR',
        country: 'COUNTRY',
        city: 'CITY',
        gte: 'MORE THAN',
        lte: 'LESS THAN',
        search: 'SEARCH',
        clear: 'CLEAR',
        noData: 'NOTHING FOUND',
      },
    },
    page: {
      title: 'Archive_People',
      archive: 'Archive',
      people: '_People',
      noData: 'NО DATA',
    },
    person: {
      indexTitle: 'Person',
      page: {
        titleLink: 'Archive_People',
        archive: 'Archive',
        grave: '_Person',
        location: 'Location',
        biography: 'Biography',
        map: {
          show: 'Show Map',
          hide: 'Hide Map',
        },
        notData: 'NO DATA',
        prev: 'Previous',
      },
    },
  },
  aboutTheProject: {
    indexTitle: 'About the Project',
    page: {
      title: 'About_The_Project',
      description: `Graves is a special portal for people interested in history and archival data. The site has an interactive map where you can find the graves of Belarusians in the territory of the Republic of Poland.`,
    },
  },
  map: {
    indexTitle: 'Map',
    page: {
      title: 'Interactive_Map',
      header: 'Interactive Map',
      search: 'FIND',
      loading: 'Loading',
    },
  },
  account: {
    indexTitle: 'Edit Profile',
    page: {
      title: 'Edit Account',
      name: 'USERNAME',
      descriptionImage: 'JPG, GIF, or PNG. Maximum size 2 MB',
      city: 'CITY',
      buttonSave: 'Save',
      errorMessage: 'File size exceeds 2 megabytes',
      schema: {
        userName: {
          min: 'Minimum length - 6',
          max: 'Maximum length - 30',
          matches: 'Only 0-9, A-Z, a-z, _, - characters allowed',
          required: 'Username is required',
        },
      },
    },
  },
  dashboard: {
    indexTitle: 'Dashboard',
    menu: {
      menu: 'Menu',
      dashboard: 'Dashboard',
      map: 'Map',
      gallery: 'Gallery',
      content: 'Content',
      articles: 'Articles',
      places: 'Places',
      people: 'People',
      settings: 'Settings',
      users: 'Users',
      contacts: 'Contacts',
      languages: 'Languages',
      logout: 'Logout',
    },
    map: {
      titleLink: 'Dashboard',
      search: 'Search',
      button: 'Zoom to Poland',
    },
    gallery: {
      title: 'Gallery',
      // button: 'Add Image',
      // search: 'Search',
      // noData: 'No data',
      support: 'Supported formats',
      maxFileSize: 'Max allowed file size',
      image: {
        title: 'File Information',
        alt: 'Alt',
        status: 'Status',
        type: 'Type',
        mime: 'Mime',
        fileSize: 'File Size',
        demensions: 'Demensions',
        owner: 'Owner',
        createdAt: 'Created At',
        relations: {
          article: {
            id: 'ArticleID',
            title: 'Article',
          },
          place: {
            id: 'PlaceID',
            title: 'Place',
          },
          person: {
            id: 'PersonID',
            title: 'Person',
          },
        },
        notifications: {
          success: {
            title: 'Image created successfully',
            description: 'You will be redirected to the image page',
          },
          upload: {
            success: {
              title: 'File uploaded successfully',
              description: 'All files uploaded successfully',
            },
            errorType: {
              title: 'File upload error',
              description: 'File type is not supported',
            },
            errorSize: {
              title: 'File upload error',
              description: `File is greater then 10MB`,
            },
            remove: {
              title: 'File removed',
              description: 'File removed successfully',
            },
            failed: {
              title: 'File upload error',
              description: 'File upload failed',
            },
          },
          update: {
            title: 'Image updated successfully',
            description: 'You will be redirected to the image page',
          },
          delete: {
            title: 'Image deleted successfully',
            description: 'You will be redirected to the gallery page',
          },
          error: 'Error creating image',
        },
      },
    },
    articles: {
      index: 'Articles',
      add: {
        label: '+ Add',
        title: 'Add article',
      },
      search: {
        title: 'Search by title',
        placeholder: 'Search by title',
      },
      table: {
        id: 'ID',
        owner: 'Owner',
        title: 'Title',
        createdAt: 'Created At',
        updatedAt: 'Updated At',
        status: 'Status',
        photos: 'Photos',
        actions: 'Actions',
      },
      notifications: {
        success: {
          title: 'Article created successfully',
          description: 'You will be redirected to the article page',
        },
        delete: {
          title: 'Article deleted successfully',
          description: 'You will be redirected to the articles page',
        },
      },
      delete: {
        title: 'Delete',
        titleConfirm: 'Confirm deletion',
        description: 'Are you sure you want to delete the article?',
        cancel: 'Cancel',
        delete: 'Delete',
      },
      updateModal: {
        title: 'Change status of article or edit',
        buttonTitle: 'Change status of article',
        form: {
          label: 'Current status',
        },
        edit: 'Edit',
        notification: {
          success: 'Status updated successfully',
          error: 'Error updating status',
        },
      },
      form: {
        title: {
          label: 'Title',
          placeholder: 'Title',
          tooltip:
            'You can write up to 155 characters. After writing, you should save the article.',
          rules: {
            required: 'Title field is required',
            max: 'Maximum length: 155 characters',
          },
        },
        description: {
          label: 'Short description',
          placeholder: 'Short description',
          tooltip:
            'You can write up to 355 characters. After writing, you should save the article.',
          rules: {
            required: 'Short description field is required',
            max: 'Maximum length: 355 characters',
          },
        },
        content: {
          label: 'Content',
          tooltip:
            'You can write up to 10 000 characters. After writing, you should save the article.',
          rules: {
            required: 'Content field is required',
            max: 'Maximum length: 10 000 characters',
          },
        },
        photo: {
          label: 'Photo',
          tooltip:
            'You can upload up to 1 photo. After uploading, you should save the article.',
          rules: {
            required: 'Photo field is required',
            max: 'Maximum length: 1 photo',
          },
        },
      },
      create: {
        index: 'Create article',
        notification: {
          success: {
            title: 'Article created successfully',
            description: 'You will be redirected to the article page',
          },
          error: 'Error creating article',
        },
        button: {
          save: 'Save',
          photo: '+ Upload',
        },
      },
      edit: {
        index: 'Edit article',
        notification: {
          success: {
            title: 'Article updated successfully',
            description: 'You will be redirected to the article page',
          },
          update: {
            title: 'Article updated successfully',
          },
          delete: {
            title: 'Article deleted successfully',
          },
          error: 'Error updating article',
        },
        button: {
          save: 'Save',
          photo: '+ Upload',
        },
      },
    },
    places: {
      index: 'Places',
      add: {
        label: '+ Add',
        title: 'Add place',
      },
      search: {
        name: {
          title: 'Search by name',
          placeholder: 'Search by name',
        },
        country: {
          title: 'Search by country',
          placeholder: 'Search by country',
        },
        city: {
          title: 'Search by city',
          placeholder: 'Search by city',
        },
      },
      table: {
        id: 'ID',
        owner: 'Owner',
        name: 'Name',
        country: 'Country',
        city: 'City',
        createdAt: 'Created At',
        updatedAt: 'Updated At',
        status: 'Status',
        photos: 'Photos',
        persons: 'Persons',
        actions: 'Actions',
      },
      notifications: {
        success: {
          title: 'Place created successfully',
          description: 'You will be redirected to the place page',
        },
        delete: {
          title: 'Place deleted successfully',
          description: 'You will be redirected to the places page',
        },
      },
      form: {
        country: {
          label: 'Country',
          placeholder: 'Country',
          tooltip:
            'You can write up to 120 characters. After writing, you should save the place.',
          rules: {
            required: 'Country field is required',
            max: 'Maximum length: 120 characters',
          },
        },
        city: {
          label: 'City',
          placeholder: 'City',
          tooltip:
            'You can write up to 120 characters. After writing, you should save the city.',
          rules: {
            required: 'City field is required',
            max: 'Maximum length: 120 characters',
          },
        },
        nameCemetery: {
          label: 'Name of cemetery',
          placeholder: 'Name of cemetery',
          tooltip:
            'You can write up to 120 characters. After writing, you should save the name of cemetery.',
          rules: {
            required: 'Name of cemetery field is required',
            max: 'Maximum length: 120 characters',
          },
        },
        shortDescription: {
          label: 'Short description',
          placeholder: 'Short description',
          tooltip:
            'You can write up to 300 characters. After writing, you should save the article.',
          rules: {
            required: 'Short description field is required',
            max: 'Maximum length: 300 characters',
          },
        },
        description: {
          label: 'Description',
          placeholder: 'Description',
          tooltip:
            'You can write up to 5 000 characters. After writing, you should save the article.',
          rules: {
            required: 'Description field is required',
            max: 'Maximum length: 5 000 characters',
          },
        },
        photo: {
          label: 'Photo',
          tooltip:
            'You can upload up to 1 photo. After uploading, you should save the article.',
          rules: {
            required: 'Photo field is required',
            max: 'Maximum length: 1 photo',
          },
        },
      },
      create: {
        index: 'Create place',
        notification: {
          success: {
            title: 'Place created successfully',
            description: 'You will be redirected to the place page',
          },
          error: 'Error creating place',
        },
        button: {
          save: 'Save',
          photo: '+ Upload',
        },
      },
      edit: {
        index: 'Edit place',
        notification: {
          success: {
            title: 'Place updated successfully',
            description: 'You will be redirected to the place page',
          },
          update: {
            title: 'Place updated successfully',
          },
          delete: {
            title: 'Place deleted successfully',
          },
          error: 'Error updating place',
        },
        button: {
          save: 'Save',
          photo: '+ Upload',
        },
      },
      delete: {
        title: 'Delete',
        titleConfirm: 'Confirm deletion',
        description: 'Are you sure you want to delete the place?',
        cancel: 'Cancel',
        delete: 'Delete',
      },
      updateModal: {
        title: 'Change status of place or edit',
        buttonTitle: 'Change status of place',
        form: {
          label: 'Current status',
        },
        edit: 'Edit',
        notification: {
          success: 'Status updated successfully',
          error: 'Error updating status',
        },
      },
    },
    persons: {
      index: 'Persons',
      add: {
        label: '+ Add',
        title: 'Add person',
      },
      filters: {
        title: 'Filters',
        placeholder: 'Show more filters',
      },
      search: {
        more: 'More',
        less: 'Less',
        name: {
          title: 'Search by name',
          placeholder: 'Search by name',
        },
        lastName: {
          title: 'Search by last name',
          placeholder: 'Search by last name',
        },
        birthDate: {
          title: 'Birth date',
          placeholder: 'Search by birth date',
        },
        deathDate: {
          title: 'Death date',
          placeholder: 'Search by death date',
        },
        country: {
          title: 'Search by country',
          placeholder: 'Search by country',
        },
        city: {
          title: 'Search by city',
          placeholder: 'Search by city',
        },
      },
      form: {
        name: {
          label: 'First Name',
          placeholder: 'First Name',
          tooltip:
            'You can write up to 120 characters. After writing, you should save the first name.',
          rules: {
            required: 'First Name field is required',
            max: 'Maximum length: 120 characters',
          },
        },
        lastName: {
          label: 'Last Name',
          placeholder: 'Last Name',
          tooltip:
            'You can write up to 120 characters. After writing, you should save the last name.',
          rules: {
            required: 'Last Name field is required',
            max: 'Maximum length: 120 characters',
          },
        },
        patronymic: {
          label: 'Patronymic',
          placeholder: 'Patronymic',
          tooltip:
            'You can write up to 120 characters. After writing, you should save the patronymic.',
          rules: {
            max: 'Maximum length: 120 characters',
          },
        },
        biography: {
          label: 'Biography',
          placeholder: 'Biography',
          tooltip:
            'You can write up to 500 characters. After writing, you should save the article.',
          rules: {
            max: 'Maximum length: 500 characters',
          },
        },
        birthDate: {
          label: 'Birth Date',
          placeholder: 'Birth Date',
          tooltip:
            'You can write up to 120 characters. After writing, you should save the birth date.',
          rules: {
            required: 'Birth Date field is required',
            max: 'Maximum length: 120 characters',
          },
        },
        deathDate: {
          label: 'Death Date',
          placeholder: 'Death Date',
          tooltip:
            'You can write up to 120 characters. After writing, you should save the death date.',
          rules: {
            required: 'Death Date field is required',
            max: 'Maximum length: 120 characters',
          },
        },
        country: {
          label: 'Country',
          placeholder: 'Country',
          na: 'N/A',
          tooltip:
            'This field is filled in automatically when you select a location on the map.',
          rules: {
            required: 'Country field is required',
            max: 'Maximum length: 120 characters',
          },
        },
        city: {
          label: 'City',
          placeholder: 'City',
          na: 'N/A',
          tooltip:
            'This field is filled in automatically when you select a location on the map.',
          rules: {
            required: 'City field is required',
            max: 'Maximum length: 120 characters',
          },
        },
        photo: {
          label: 'Photo',
          tooltip:
            'You can upload up to 3 photos, the first photo will be the main one. After uploading, you should save the person.',
          rules: {
            required: 'Photo field is required',
            max: 'Maximum length: 3 photos',
          },
        },
      },
      place: {
        label: 'Place',
        placeholder: 'Place',
        name: 'Name',
        country: 'Country',
        city: 'City',
        searchPlaceholder: 'Search for a place',
        selectedPlace: 'Selected place',
        address: 'Formatted address',
        tooltip:
          'Select a location from the list to link it to a specific location on the map.',
        clear: 'Clear',
      },
      create: {
        index: 'Create person',
        notification: {
          success: {
            title: 'Person created successfully',
            description: 'You will be redirected to the person page',
          },
          error: 'Error creating place',
        },
        button: {
          save: 'Save',
          photo: '+ Upload',
        },
      },
      edit: {
        index: 'Edit person',
        notification: {
          success: {
            title: 'Person updated successfully',
            description: 'You will be redirected to the person page',
          },
          update: {
            title: 'Person updated successfully',
          },
          delete: {
            title: 'Person deleted successfully',
          },
          error: 'Error updating person',
        },
        button: {
          save: 'Save',
          photo: '+ Upload',
        },
      },
      table: {
        id: 'ID',
        owner: 'Owner',
        name: 'First Name',
        lastName: 'Last Name',
        birthDate: 'Birth Date',
        deathDate: 'Death Date',
        country: 'Country',
        city: 'City',
        createdAt: 'Created At',
        updatedAt: 'Updated At',
        placeId: 'Place ID',
        status: 'Status',
        photos: 'Photos',
        actions: 'Actions',
      },
      notifications: {
        success: {
          title: 'Person created successfully',
          description: 'You will be redirected to the person page',
        },
        delete: {
          title: 'Person deleted successfully',
          description: 'You will be redirected to the persons page',
        },
      },
      delete: {
        title: 'Delete',
        titleConfirm: 'Confirm deletion',
        description: 'Are you sure you want to delete the person?',
        cancel: 'Cancel',
        delete: 'Delete',
      },
      updateModal: {
        title: 'Change status of person or edit',
        buttonTitle: 'Change status of person',
        form: {
          label: 'Current status',
        },
        edit: 'Edit',
        notification: {
          success: 'Status updated successfully',
          error: 'Error updating status',
        },
      },
    },
    users: {
      index: 'Users',
      indexH: 'User',
      search: {
        title: 'Search by name',
        placeholder: 'Search by name',
      },
      selectStatus: {
        all: 'All',
        active: 'Active',
        banned: 'Banned',
        pending: 'Pending',
      },
      selectRole: {
        all: 'All',
        admin: 'Admin',
        editor: 'Editor',
        author: 'Author',
        user: 'User',
      },
      table: {
        id: 'ID',
        name: 'Name',
        email: 'Email',
        status: 'Status',
        role: 'Role',
        createdAt: 'Created At',
        updatedAt: 'Updated At',
        view: 'View Profile',
        actions: 'Actions',
      },
      notifications: {
        delete: {
          title: 'User deleted successfully',
          description: 'You will be redirected to the users page',
        },
      },
      list: {
        name: 'Name',
        email: 'Email',
        role: 'Role',
        status: 'Status',
        createdAt: 'Created At',
        updatedAt: 'Updated At',
        items: {
          info: 'Info',
          places: 'Places',
          persons: 'Persons',
          articles: 'Articles',
        },
      },
      drawer: {
        title: 'User Profile',
        more: 'more…',
        name: 'User Name',
        lastName: 'Last Name',
        na: 'N/A',
        email: 'Email',
        userInformation: 'User Information',
        status: 'Status',
        role: 'Role',
        places: 'Places',
        articles: 'Articles',
        persons: 'Persons',
        drafts: 'Drafts',
        pending: 'Pending to review',
        published: 'Published',
        otherInformation: 'Other Information',
        added: 'Added',
        updated: 'Last updated',
      },
      delete: {
        title: 'Delete',
        titleConfirm: 'Confirm deletion',
        description: 'Are you sure you want to delete the user?',
        cancel: 'Cancel',
        delete: 'Delete',
      },
      updateModal: {
        title: 'Change role, status of user or edit',
        button: {
          title: 'Update user status and role',
          update: 'Update',
        },
        form: {
          label: 'Current role',
          label2: 'Current status',
        },
        edit: 'Edit',
        notification: {
          updateRole: {
            success: 'Role updated successfully',
          },
          updateStatus: {
            success: 'Status updated successfully',
          },
        },
      },
    },
    contacts: {
      index: 'Contacts',
      form: {
        about: {
          label: 'About',
          placeholder: 'About',
          tooltip:
            'You can write up to 10 000 characters. After writing, you should save the contacts.',
          rules: {
            required: 'About field is required',
            max: 'Maximum length: 10 000 characters',
          },
        },
        socialNetworks: {
          facebook: {
            label: 'Facebook',
            placeholder: 'Input link',
            tooltip:
              'You need to enter a link to the group or page in the format "https://www.facebook.com/...".',
          },
          telegram: {
            label: 'Telegram',
            placeholder: 'Input link',
            tooltip:
              'You need to enter a link to the group or channel in the format "https://t.me/...".',
          },
          instagram: {
            label: 'Instagram',
            placeholder: 'Input link',
            tooltip:
              'You need to enter a link to the group or page in the format "https://www.instagram.com/...".',
          },
          partners: {
            label: 'Partners',
            placeholder: 'Input link',
            tooltip: 'You need to enter a link to the group or page.',
          },
        },
        address: {
          label: 'Address',
          placeholder: 'Input address',
          rules: {
            required: 'Address field is required',
          },
        },
        email: {
          label: 'Email',
          placeholder: 'Input email',
          rules: {
            required: 'Email field is required',
            email: 'Email must be valid',
          },
        },
        updatedAt: 'Updated At',
        save: 'Save',
      },
      notification: {
        update: {
          title: 'Contacts updated successfully',
        },
        error: 'Error updating contacts',
      },
    },
    languages: {
      index: 'Languages',
      add: {
        label: '+ Add',
        title: 'Add language',
      },
      edit: {
        title: 'Edit language',
      },
      table: {
        id: 'ID',
        name: 'Name',
        native: 'Native',
        code: 'Code',
        order: 'Order',
        createdAt: 'Created At',
        updatedAt: 'Updated At',
        actions: 'Actions',
      },
      form: {
        title: 'Add language',
        titleUpdate: 'Edit language',
        name: {
          label: 'Name',
          placeholder: 'Name',
          rules: {
            required: 'Name field is required',
            pattern: 'Language name must contain only text!',
          },
        },
        native: {
          label: 'Native',
          placeholder: 'Native',
          rules: {
            required: 'Native field is required',
            pattern: 'Language name must contain only text!',
          },
        },
        code: {
          label: 'Code',
          placeholder: 'Code',
          rules: {
            required: 'Code field is required',
            pattern: 'Language name must contain only text!',
            max: 'Code must be 2 characters or less!',
          },
        },
        order: {
          label: 'Order',
          placeholder: 'Order',
          rules: {
            required: 'Order field is required',
            pattern: 'Language name must contain only number!',
          },
        },
        save: 'Save',
      },
      notifications: {
        success: {
          title: 'Language created successfully',
          description: 'You will be redirected to the language page',
        },
        update: {
          title: 'Language updated successfully',
          description: 'You will be redirected to the language page',
        },
        delete: {
          title: 'Language deleted successfully',
          description: 'You will be redirected to the languages page',
        },
        error: 'Error creating language',
      },
      delete: {
        title: 'Delete',
        titleConfirm: 'Confirm deletion',
        description: 'Are you sure you want to delete the language?',
        cancel: 'Cancel',
        delete: 'Delete',
      },
    },
    rules: {
      required: 'Please enter',
      slug: {
        label: 'Slug',
        placeholder: 'This field is auto generated',
        tooltip: `You can change the slug of the article.
            This field is for SEO, it must be unique and contain only letters, numbers and dashes.
            Can't start or end with a dash.`,
        rules: {
          required: 'Slug field is required',
          max: 'Maximum length: 120 characters',
          pattern: `Slug must contain only letters, numbers and dashes.
                Can't start or end with a dash.`,
        },
      },
    },
    metaInfo: {
      publicLink: {
        label: 'Public link',
        no: 'Not published',
      },
      owner: 'Owner',
      createdAt: 'Created At',
      updatedAt: 'Updated At',
    },
    locationInfo: {
      label: 'Location',
      formattedAddress: 'Formatted Address',
      longitude: 'Longitude',
      latitude: 'Latitude',
      tooltip:
        'You need to select a location on the map to determine the coordinates of the place.',
      rules: {
        required: 'Location field is required',
      },
      search: 'Show your location or Search location',
      buttons: {
        openMap: 'Open map',
        clearTable: 'Clear Table',
        fillTable: 'Fill Table',
        define: 'Define Location',
        removeMarker: 'Remove Marker',
        disable: 'Disable Map Click',
        enable: 'Enable Map Click',
        panTo: 'Pan to Current Location',
      },
      form: {
        country: {
          label: 'Country',
          placeholder: 'Country',
          rules: {
            required: 'Country field is required',
            max: 'Maximum length: 120 characters',
          },
        },
        city: {
          label: 'City',
          placeholder: 'City',
          rules: {
            required: 'City field is required',
            max: 'Maximum length: 120 characters',
          },
        },
        address: {
          label: 'Address',
          placeholder: 'Address',
          rules: {
            required: 'Address field is required',
            max: 'Maximum length: 180 characters',
          },
        },
        longitude: {
          label: 'Longitude',
          placeholder: 'Longitude',
          rules: {
            required: 'Longitude field is required',
            type: 'Longitude must be a number',
            range: 'Longitude must be between -180 and 180',
            // min: 'Longitude must be greater than or equal to -180',
            // max: 'Longitude must be less than or equal to 180',
            maxLength: 'Maximum length: 10 characters',
          },
        },
        latitude: {
          label: 'Latitude',
          placeholder: 'Latitude',
          rules: {
            required: 'Latitude field is required',
            type: 'Latitude must be a number',
            range: 'Longitude must be between -90 and 90',
            // min: 'Latitude must be greater than or equal to -90',
            // max: 'Latitude must be less than or equal to 90',
            maxLength: 'Maximum length: 10 characters',
          },
        },
        administrativeAreaLevel1: {
          label: 'State',
          placeholder: 'Input State',
        },
        administrativeAreaLevel2: {
          label: 'District',
          placeholder: 'Input District',
        },
        street: {
          label: 'Street',
          placeholder: 'Input Street',
        },
        streetNumber: {
          label: 'Street Number',
          placeholder: 'Input Street Number',
        },
        buttons: {
          fillForm: 'Fill Form',
          details: {
            title: 'Show more details',
            open: 'Details',
          },
        },
      },
    },
    updateStatus: {
      label: 'Status',
      draft: 'Draft',
      pending: 'Send for review',
      published: 'Publish',
      archived: 'Archive',
    },
    selectStatus: {
      all: 'All',
      draft: 'Draft',
      pending: 'Send for review',
      published: 'Publish',
      archived: 'Archive',
    },
    selectFileType: {
      all: 'All',
      articles: 'Articles',
      places: 'Places',
      people: 'People',
    },
    delete: {
      title: 'Delete',
      titleConfirm: 'Confirm deletion',
      description: 'Are you sure you want to delete this item?',
      cancel: 'Cancel',
      delete: 'Delete',
    },
    save: 'Save',
  },
};
