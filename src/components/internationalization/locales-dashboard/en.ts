import { ArticleFormRules } from '@/modules/articles-module';

export const en = {
  articles: {
    index: 'Articles',
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
    button: {
      add: {
        label: '+ Add',
        title: 'Add article',
      },
    },
    search: {
      title: 'Search by title',
      placeholder: 'Search by title',
    },
    selectStatus: {
      all: 'All',
      draft: 'Draft',
      pending: 'Send for review',
      published: 'Publish',
      archived: 'Archive',
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
      form: {
        title: {
          label: 'Title',
          placeholder: 'Title',
          tooltip: `You can write up to ${ArticleFormRules.title[1].max} characters. After writing, you should save the article.`,
        },
        description: {
          label: 'Short description',
          placeholder: 'Short description',
          tooltip: `You can write up to ${ArticleFormRules.description[1].max} characters. After writing, you should save the article.`,
        },
        content: {
          label: 'Content',
          placeholder: 'Content',
          tooltip: `You can write up to ${ArticleFormRules.content.maxCharacters} characters. After writing, you should save the article.`,
        },
        photo: {
          label: 'Photo',
          tooltip: `You can upload up to ${ArticleFormRules.photo.maxCount} photos. After uploading, you should save the article.`,
        },
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
        error: 'Error updating article',
      },
      form: {
        title: {
          label: 'Title',
          placeholder: 'Title',
          tooltip: `You can write up to ${ArticleFormRules.title[1].max} characters. After writing, you should save the article.`,
        },
        description: {
          label: 'Short description',
          placeholder: 'Short description',
          tooltip: `You can write up to ${ArticleFormRules.description[1].max} characters. After writing, you should save the article.`,
        },
        content: {
          label: 'Content',
          placeholder: 'Content',
          tooltip: `You can write up to ${ArticleFormRules.content.maxCharacters} characters. After writing, you should save the article.`,
        },
        status: {
          label: 'Status',
          tooltip: `You can change the status of the article.`,
          draft: 'Draft',
          pending: 'Send for review',
          published: 'Publish',
          archived: 'Archive',
        },
        slug: {
          label: 'Slug',
          placeholder: 'Slug',
          tooltip: `You can change the slug of the article. This field is for SEO, it must be unique and contain only lowercase letters and hyphens.`,
        },
        photo: {
          label: 'Photo',
          tooltip: `You can upload up to ${ArticleFormRules.photo.maxCount} photos. After uploading, you should save the article.`,
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
      button: {
        save: 'Save',
        photo: '+ Upload',
      },
    },
    updateStatus: {
      title: 'Update status',
      notification: {
        success: 'Status updated successfully',
        error: 'Error updating status',
      },
      form: {
        status: {
          label: 'Current status',
          draft: 'Draft',
          pending: 'Send for review',
          published: 'Publish',
          archived: 'Archive',
        },
      },
      button: {
        save: 'Save',
        update: {
          label: 'Update',
          title: 'Change status of article',
        },
      },
    },
    deleteModal: {
      title: 'Confirm deletion',
      message: 'Are you sure you want to delete this article?',
      notification: {
        success: 'Article deleted successfully',
        error: 'Error deleting article',
      },
      button: {
        delete: 'Delete',
        cancel: 'Cancel',
      },
    },
  },
};

// export type LocaleType = typeof en;
