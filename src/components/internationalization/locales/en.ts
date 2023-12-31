import { LocaleType } from '@/components/internationalization';

export const en: LocaleType = {
  404: {
    description: 'This page could not be found',
  },
  common: {
    notFound: 'NOTHING FOUND',
    noData: 'NO DATA',
    loading: 'Loading...',
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
        titleT: 'Sign in',
        buttonGT: 'Sign in with',
        descriptionT: 'or sign in with your email',
        emailT: 'EMAIL',
        passwordT: 'PASSWORD',
        forgotT: 'Forgot password?',
        buttonSignInT: 'Sign In',
        noAccT: "Don't have an account?",
        signUpT: 'Sign Up',
        successMessage:
          'You have successfully logged in! Redirecting to the home page...',
        schema: {
          email: {
            required: 'Email field is required',
            email: 'Email must be valid',
            max: 'Maximum length: 130 characters',
          },
          password: {
            required: 'Password field is required',
            min: 'Minimum length: 6 characters',
            max: 'Password must not exceed 20 characters',
            matches:
              'Password must contain 0-9, a-z, A-Z, and specified symbols, except: #, \\, \', ", №',
          },
        },
        customErrors:
          'Incorrect password, email, or username. Please try again',
        STATUS_CODE_401_TR: {
          title: 'Login Error',
          description: `Sorry, there was an error attempting to log in. Please ensure the provided credentials are correct and try again.`,
        },
        STATUS_CODE_400_TR: {
          title: 'Registration or Login Error',
          description: `Sorry, there was an error attempting to register. Please ensure the provided data is correct and try again. If the issue persists, register using a different email address.`,
          error: 'Incorrect password, email, or username',
        },
        STATUS_CODE_200_TR: {
          title: 'Successful Registration and Login',
          description: `Congratulations! Your account has been successfully created, and you have been automatically logged in. Welcome!`,
          error:
            'A user with this email already exists. Check your email for further instructions',
        },
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
          'Password must be at least 6 characters, include uppercase and lowercase letters, numbers and special characters',
        buttonSignUpT: 'Sign Up',
        descriptionSignInT: 'Already have an account?',
        signInLinkT: 'Sign In',
        back: 'Back',
        sentEmailT:
          'Registration successfully completed! Please check your email. We have sent you a confirmation email. If you don\'t see the email in your inbox, please check your "Spam" folder.',
        schema: {
          userName: {
            required: 'Username field is required',
            matches: 'Only 0-9, A-Z, a-z, _, - characters allowed',
            min: 'Minimum length: 6 characters',
            max: 'Maximum length: 30 characters',
          },
          email: {
            required: 'Email field is required',
            email: 'Email must be valid',
            max: 'Maximum length: 130 characters',
          },
          password: {
            required: 'Password field is required',
            min: 'Minimum length: 6 characters',
            max: 'Password must not exceed 20 characters',
            matches:
              'Password must contain 0-9, a-z, A-Z, and specified symbols, except: #, \\, \', ", №',
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
        descriptionSecondT: `For security reasons, we do not store your current password. If you do not remember your password, you can reset it.`,
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
        secondDescription: `Don't worry, we can send the link again`,
        forgotPasswordLink: `Resend link for verification`,
      },
      recoveryPage: {
        labelT: 'NEW PASSWORD',
        // placeholderT: '6+ characters',
        descriptionT: `Password must contain 1-9, a-z, A-Z, and certain characters`,
        buttonT: 'Create New Password',
        errorT: {
          passwordT: 'Password is a required field',
        },
        successMessage: 'Password changed successfully! Redirecting...',
      },
    },
    registrationConfirmation: {
      emailSuccessMessage: {
        headTitleT: 'Email Confirmation',
        titleT: 'Congratulations!',
        descriptionT: 'Your email has been confirmed',
        signInT: 'Sign in',
      },
    },
    resendForm: {
      headTitle: 'Resending Password Recovery Confirmation',
      titleT: 'Resend Form',
      resendLinkT: 'Resend verification link',
      emailT: 'Email',
      sendT: 'Send',
      errorT: {
        emailT: 'Email is a required field',
      },
    },
    ResendingVerificationLink: {
      headTitleT: 'Email Verification Link Expired',
      titleT: 'Email verification link expired',
      descriptionT:
        ' Looks like the verification link has expired. Not to worry, we can send the link again',
      resendLinkT: ' Resend verification link',
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
      // noData: 'NO DATA',
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
      // noData: 'NOTHING FOUND',
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
        // notData: 'NO DATA',
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
        name: 'FIRST NAME',
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
        // noData: 'NOTHING FOUND',
      },
    },
    page: {
      title: 'Archive_People',
      archive: 'Archive',
      people: '_People',
      // noData: 'NО DATA',
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
        notData: 'n/a',
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
      search: 'SEARCH',
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
          title: 'Search by first name',
          placeholder: 'Search by first name',
        },
        lastName: {
          title: 'Search by last name',
          placeholder: 'Search by last name',
        },
        birthDate: {
          title: 'Search by birth date',
          placeholder: 'Year of birth',
        },
        deathDate: {
          title: 'Search by death date',
          placeholder: 'Year of death',
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
        birthDay: {
          label: 'Birth Day',
          placeholder: 'Day',
        },
        birthMonth: {
          label: 'Birth Month',
          placeholder: 'Month',
        },
        birthYear: {
          label: 'Birth Year',
          placeholder: 'Year',
        },
        deathDate: {
          label: 'Death Date',
          placeholder: 'Death Date',
          tooltip:
            'You can write up to 120 characters. After writing, you should save the death date.',
          rules: {
            // required: 'Death Date field is required',
            max: 'Maximum length: 120 characters',
          },
        },
        deathDay: {
          label: 'Death Day',
          placeholder: 'Day',
        },
        deathMonth: {
          label: 'Death Month',
          placeholder: 'Month',
        },
        deathYear: {
          label: 'Death Year',
          placeholder: 'Year',
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
        tour: {
          next: 'Next',
          previous: 'Previos',
          finish: 'Finish',
          steps: {
            createPerson: {
              title: 'Create a Person',
              description:
                "Welcome to the person creation page. Let's get started!",
            },
            basicInformation: {
              title: 'Basic Information',
              description: 'Fill in the basic information about the person.',
            },
            firstName: {
              title: 'First Name',
              description: 'Enter the first name of the person.',
            },
            lastName: {
              title: 'Last Name',
              description: 'Enter the last name of the person.',
            },
            patronymic: {
              title: 'Patronymic',
              description: 'Enter the patronymic name of the person.',
            },
            birthDate: {
              title: 'Birth Date',
              description: 'Select the birth date of the person.',
            },
            deathDate: {
              title: 'Death Date',
              description: 'Select the death date of the person.',
            },
            country: {
              title: 'Country',
              description:
                'This field is filled in automatically when you select a location on the map.',
            },
            city: {
              title: 'City',
              description:
                'This field is filled in automatically when you select a location on the map.',
            },
            biography: {
              title: 'Biography',
              description:
                "Share some details about the person's life in the biography section.",
            },
            selectPlace: {
              title: 'Select a Place',
              description:
                'Choose from the published places by name, if you know what the name of the place is. This could be the name of a cemetery or other mass grave of people. This is to link people into clusters.',
            },
            selectedPlaceInformation: {
              title: 'Selected Place Information',
              description: 'Review information about the selected place.',
            },
            clearSelectedPlace: {
              title: 'Clear Selected Place',
              description: 'If needed, you can clear the selected place.',
            },
            selectLocationOnMap: {
              title: 'Select Location on Map',
              description: 'Pinpoint the exact location on the map.',
            },
            selectedLocationInformation: {
              title: 'Selected Location Information',
              description:
                'Review information about the pinpoint the exact location on the map.',
            },
            uploadPhotos: {
              title: 'Upload Photos',
              description:
                'Add photos of the person. You can upload multiple photos.',
            },
            save: {
              title: 'Save',
              description:
                "Once you've filled in the details, click 'Save' to create the person.",
            },
            tourCompleted: {
              title: 'Tour Completed',
              description:
                'Congratulations! You have completed the person creation process.',
            },
          },
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
      tour: {
        next: 'Next',
        previous: 'Previous',
        finish: 'Finish',
        steps: {
          top: {
            title: 'Top',
            description: 'First step, you can add new person.',
          },
          name: {
            title: 'Search by First Name',
            description: 'Enter the first name to search for a person.',
            placeHolder: 'Search by name',
          },
          lastName: {
            title: 'Search by Last Name',
            description: 'Enter the last name to search for a person.',
            placeHolder: 'Search by last name',
          },
          lang: {
            title: 'Select Language for Content',
            description:
              'Select a language to view the content in that language.',
            placeHolder: 'Select Language for Content',
          },
          filter: {
            title: 'Open Filters',
            description: 'Click here to open the filters.',
          },
          dataBirth: {
            title: 'Search by Year of Birth',
            description:
              'Enter the year of birth to search for persons born in that year.',
            placeHolder: 'Year of birth',
          },
          dataDeath: {
            title: 'Search by Year of Death',
            description:
              'Enter the year of death to search for persons who died in that year.',
            placeHolder: 'Year of death',
          },
          country: {
            title: 'Search by Country',
            description:
              'Enter the country to search for persons in that country.',
            placeHolder: 'Search by country',
          },
          city: {
            title: 'Search by City',
            description: 'Enter the city to search for persons in that city.',
            placeHolder: 'Search by city',
          },
          table: {
            title: 'Table',
            description:
              'This is the table of persons. You can see their details here.',
          },
          next: {
            title: 'Next Page',
            description: 'Click here to navigate to the next page.',
          },
          finish: {
            title: 'Page Size',
            description: 'Choose the number of items per page here.',
          },
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
        avatar: 'Avatar',
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
        city: 'City',
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
            rules: {
              max: 'Maximum length: 120 characters',
              url: 'Link must be valid',
            },
          },
          telegram: {
            label: 'Telegram',
            placeholder: 'Input link',
            tooltip:
              'You need to enter a link to the group or channel in the format "https://t.me/...".',
            rules: {
              max: 'Maximum length: 120 characters',
              url: 'Link must be valid',
            },
          },
          instagram: {
            label: 'Instagram',
            placeholder: 'Input link',
            tooltip:
              'You need to enter a link to the group or page in the format "https://www.instagram.com/...".',
            rules: {
              max: 'Maximum length: 120 characters',
              url: 'Link must be valid',
            },
          },
          partners: {
            label: 'Partners',
            placeholder: 'Input link',
            tooltip: 'You need to enter a link to the group or page.',
            rules: {
              max: 'Maximum length: 120 characters',
            },
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
            pattern: 'The language name must contain only lower case text!',
            max: 'Maximum length: 60 characters',
          },
        },
        native: {
          label: 'Native',
          placeholder: 'Native',
          rules: {
            required: 'Native field is required',
            pattern: 'Language name must contain only text!',
            max: 'Maximum length: 60 characters',
          },
        },
        code: {
          label: 'Code',
          placeholder: 'Code',
          rules: {
            required: 'Code field is required',
            pattern: 'The "Code" field must contain text only!',
            max: 'Code must be 2 characters or less!',
          },
        },
        order: {
          label: 'Order',
          placeholder: 'Order',
          rules: {
            required: 'Order field is required',
            pattern: 'The "Order" field must contain only number!',
            max: 'Order must be 2 characters or less!',
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
    logout: {
      title: 'Logout',
      description: 'Are you sure you want to logout?',
      cancel: 'Cancel',
      logout: 'Logout',
      notifications: {
        success: {
          title: 'Logout successfully',
        },
      },
    },
    rules: {
      required: 'Please enter',
      slug: {
        label: 'Slug',
        placeholder: 'This field is auto generated',
        tooltip: `You can change the slug.
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
        "You need to select a location on the map (enter an address, place in the search field, or simply double-click on the map). After choosing the location, you will see a marker on the map, then press the 'Fill Table' button and click the 'Fill Form' button.",
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
          placeholder: 'State',
        },
        administrativeAreaLevel2: {
          label: 'District',
          placeholder: 'District',
        },
        street: {
          label: 'Street',
          placeholder: 'Street',
        },
        streetNumber: {
          label: 'Street Number',
          placeholder: 'Street Number',
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
      title: 'Select status',
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
      description: 'Are you sure you want to delete?',
      cancel: 'Cancel',
      delete: 'Delete',
    },
    modalInfo: {
      title: 'Account Suspension Notice',
      description: {
        paragraphs: [
          'Dear user, we regret to inform you that your account has been temporarily suspended in our system.',
          'Your access to certain features has been restricted. At the moment, you can only view content, and you do not have the ability to make any changes.',
          'If you have any questions or believe that the suspension was applied in error, please contact our support service.',
          'Thank you for your understanding and cooperation.',
        ],
      },
      cancel: 'Cancel',
      ok: 'OK',
    },
    save: 'Save',
  },
};
