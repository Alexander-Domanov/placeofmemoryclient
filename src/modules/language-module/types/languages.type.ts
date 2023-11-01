import { FormInstance } from 'antd/es/form/hooks/useForm';
import React, { ReactNode } from 'react';
import { ILanguage } from '@/types';

// interface IGetColumnsLanguage {
//   handlerDeleteLanguage: (id: number | null) => void;
//   handlerUpdateLanguage: (id: number | null) => void;
//   isLoadingDeleteLanguage: boolean;
//   currentID: number | null;
// }

interface IAddLanguageForm {
  onFinishSubmit: (values: ILanguage) => void;
  isSuccess: boolean;
  useForm: FormInstance;
}

interface IModalLanguage {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
  children: ReactNode;
  title: string;
  showButtonFooter?: boolean;
  handleCancelCallBack: () => void;
}

export type { IAddLanguageForm, IModalLanguage };
