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
        emailT: 'EMAIL ADDRESS',
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
        emailT: 'EMAIL ADDRESS',
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
        emailT: 'EMAIL ADDRESS',
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
      noData: 'No data',
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
      noData: 'no pages',
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
        notData: 'no data',
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
        gte: 'GREATER THAN',
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
      noData: 'NOTHING FOUND',
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
        notData: 'no data',
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
    },
  },
};
