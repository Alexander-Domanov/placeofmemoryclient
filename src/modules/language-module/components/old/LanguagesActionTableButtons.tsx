// import React from 'react';
// import { Space, Button, Popconfirm } from 'antd';
// import { QuestionCircleOutlined } from '@ant-design/icons';
// import { IGetColumnsLanguage } from '@/modules/language-module';
//
// interface IActionTableLanguagesButtons extends IGetColumnsLanguage {
//   recordName: string;
//   recordId: number;
// }
// export const ActionTableLanguagesButtons = ({
//   handlerDeleteLanguage,
//   isLoadingDeleteLanguage,
//   recordName,
//   recordId,
//   currentID,
//   handlerUpdateLanguage,
// }: IActionTableLanguagesButtons) => {
//   return (
//     <Space size="middle">
//       <Button
//         className="w-[175px]"
//         onClick={() => handlerUpdateLanguage(recordId)}
//       >
//         Update {recordName}
//       </Button>
//       <Popconfirm
//         title="Delete the language"
//         description={`Are you sure to delete this language ${recordName}?`}
//         icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
//         onConfirm={() => handlerDeleteLanguage(recordId)}
//       >
//         <Button
//           danger
//           disabled={isLoadingDeleteLanguage && currentID === recordId}
//         >
//           Delete
//         </Button>
//       </Popconfirm>
//     </Space>
//   );
// };
