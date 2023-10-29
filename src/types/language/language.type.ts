interface ILanguageSwitcher {
  lang: string;
}
interface ILanguageID {
  languageID: string;
}
interface ILanguage {
  name: string;
  code: string;
  native: string;
  order: number;
}

interface ILanguageList {
  totalCount: number;
  pagesCount: number;
  page: number;
  pageSize: number;
  items: ILanguageListItem[];
}

interface ILanguageListItem extends ILanguage {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export type {
  ILanguage,
  ILanguageListItem,
  ILanguageList,
  ILanguageID,
  ILanguageSwitcher,
};
