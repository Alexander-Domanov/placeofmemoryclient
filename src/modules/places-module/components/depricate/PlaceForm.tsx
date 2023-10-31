// import React, { FC } from 'react';
// import { Form, Input } from 'antd';
// import { ICreatePlace } from '@/types';
// import { validateMessages } from '@/common-dashboard/validations/ValidateMessages';
//
// interface PlaceFormProps {
//   form: any;
//   onFinish: (values: ICreatePlace) => void;
// }
//
// const PlaceForm: FC<PlaceFormProps> = ({ form, onFinish }) => {
//   return (
//     <Form
//       layout="vertical"
//       form={form}
//       name="nest-messages"
//       onFinish={onFinish}
//       validateMessages={validateMessages}
//     >
//       <Form.Item
//         name={['country']}
//         label="Country"
//         rules={[{ required: true, whitespace: true }]}
//         hasFeedback
//       >
//         <Input placeholder="Input Country" allowClear />
//       </Form.Item>
//       <Form.Item
//         name={['city']}
//         label="City"
//         rules={[{ required: true, whitespace: true }]}
//         hasFeedback
//       >
//         <Input placeholder="Input City" allowClear />
//       </Form.Item>
//       <Form.Item
//         name={['nameCemetery']}
//         label="Name Cemetery"
//         validateDebounce={500}
//         rules={[{ required: true, min: 2, max: 100 }]}
//         hasFeedback
//       >
//         <Input placeholder="Input Name Cemetery" allowClear />
//       </Form.Item>
//       <Form.Item
//         name={['shortDescription']}
//         label="Short Description"
//         rules={[{ required: true }]}
//       >
//         <Input.TextArea showCount maxLength={300} autoSize={{ minRows: 6 }} />
//       </Form.Item>
//       <Form.Item
//         name={['description']}
//         label="Description"
//         rules={[{ required: true }]}
//       >
//         <Input.TextArea showCount maxLength={4000} autoSize={{ minRows: 17 }} />
//       </Form.Item>
//       <Form.Item
//         name={['slug']}
//         label="Slug"
//         rules={[{ required: true, whitespace: true }]}
//       >
//         <Input placeholder="This field is auto generated" allowClear />
//       </Form.Item>
//     </Form>
//   );
// };
//
// export default PlaceForm;
