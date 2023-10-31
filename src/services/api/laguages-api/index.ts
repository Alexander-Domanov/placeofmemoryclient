import { AxiosResponse } from 'axios';
import { authInstance } from '@/services';
import {
  ILanguage,
  ILanguageID,
  ILanguageList,
  ILanguageListItem,
  ILanguageSwitcher,
} from '@/types';

interface ILanguageSwitcherResponse {
  accessToken: 'string';
}

export const languageApi = {
  async createLanguage({ name, order, native, code }: ILanguage) {
    const res: AxiosResponse<ILanguageListItem> = await authInstance.post(
      'languages',
      {
        name,
        order,
        native,
        code,
      }
    );
    return res.data;
  },
  async updateLanguage({
    languageID,
    name,
    order,
    native,
    code,
  }: ILanguageID & ILanguage): Promise<ILanguage> {
    const res = await authInstance.put(`languages/${languageID}`, {
      name,
      order,
      native,
      code,
    });

    return res.data;
  },
  async deleteLanguage({ languageID }: ILanguageID) {
    return await authInstance.delete(`languages/${languageID}`);
  },

  async getListLanguages() {
    const res: AxiosResponse<ILanguageList> = await authInstance.get(
      'languages'
    );

    return res.data;
  },
  async getLanguage({ languageID }: ILanguageID) {
    const res: AxiosResponse<ILanguageListItem> = await authInstance.get(
      `languagess/${languageID}`
    );

    return res.data;
  },

  async languageSwitcher({ lang }: ILanguageSwitcher) {
    const res: AxiosResponse<ILanguageSwitcherResponse> =
      await authInstance.post('switcher-lang', {
        lang,
      });

    return res.data;
  },
};
