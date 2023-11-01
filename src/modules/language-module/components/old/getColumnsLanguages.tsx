// import { ColumnsType } from 'antd/lib/table';
// import { ILanguageListItem } from '@/types';
// import {
//   ActionTableLanguagesButtons,
//   IGetColumnsLanguage,
// } from '@/modules/language-module';
//
// export const getColumnsLanguages = ({
//   handlerDeleteLanguage,
//   isLoadingDeleteLanguage,
//   currentID,
//   handlerUpdateLanguage,
// }: IGetColumnsLanguage): ColumnsType<ILanguageListItem> => [
//   {
//     title: 'Id',
//     dataIndex: 'id',
//     key: 'id',
//     align: 'center',
//   },
//   {
//     title: 'Name',
//     dataIndex: 'name',
//     key: 'name',
//     align: 'center',
//   },
//   {
//     title: 'Native',
//     dataIndex: 'native',
//     key: 'native',
//     align: 'center',
//   },
//   {
//     title: 'Code',
//     dataIndex: 'code',
//     key: 'code',
//     align: 'center',
//   },
//   {
//     title: 'Order',
//     dataIndex: 'order',
//     key: 'order',
//     align: 'center',
//   },
//   {
//     title: 'Date added',
//     dataIndex: 'createdAt',
//     key: 'createdAt',
//     align: 'center',
//   },
//   {
//     title: 'Date update',
//     dataIndex: 'updatedAt',
//     key: 'updatedAt',
//     align: 'center',
//   },
//   {
//     title: 'Action',
//     key: 'action',
//     align: 'center',
//     render: (_, record) => (
//       <ActionTableLanguagesButtons
//         currentID={currentID}
//         handlerDeleteLanguage={handlerDeleteLanguage}
//         handlerUpdateLanguage={handlerUpdateLanguage}
//         isLoadingDeleteLanguage={isLoadingDeleteLanguage}
//         recordId={record.id}
//         recordName={record.name}
//       />
//     ),
//   },
// ];
