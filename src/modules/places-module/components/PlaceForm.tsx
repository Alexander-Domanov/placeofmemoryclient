// import React, { useEffect, useState } from 'react';
// import { Button, Form, Input } from 'antd';
// import { SaveOutlined } from '@ant-design/icons';
// import { IPlaceResultAfterExtract } from '@/modules/maps/components/types/place-result-after-extract.type';
// import { ICreatePlace, IPlace } from '@/types';
//
// const layout = {
//   labelCol: { span: 4 },
//   wrapperCol: { span: 'auto' },
// };
//
// const validateMessages = {
//   required: `$\{label} is required!`,
//   types: {
//     email: `$\{label} is not a valid email!`,
//     number: `$\{label} is not a valid number!`,
//   },
//   number: {
//     range: `$\{label} must be between $\{min} and $\{max}`,
//   },
// };
//
// interface MapDrawerProps {
//   onPlaceSelectedFromMap: IPlaceResultAfterExtract | null;
//   onFinish: (values: ICreatePlace) => void;
//   place?: IPlace;
// }
//
// const PlaceForm: React.FC<MapDrawerProps> = ({
//   onPlaceSelectedFromMap,
//   onFinish,
//   place,
// }) => {
//   const [selectedPlace, setSelectedPlace] = useState<IPlace | null>(
//     place || null
//   );
//   const [selectedPlaceFromMap, setSelectedPlaceFromMap] =
//     useState<IPlaceResultAfterExtract | null>(onPlaceSelectedFromMap);
//
//   useEffect(() => {
//     setSelectedPlaceFromMap(onPlaceSelectedFromMap);
//     setSelectedPlace(place || null);
//   }, [onPlaceSelectedFromMap]);
//
//   const [form] = Form.useForm();
//
//   form.setFieldValue(['country'], selectedPlaceFromMap?.country);
//   form.setFieldValue(['city'], selectedPlaceFromMap?.city);
//   form.setFieldValue(['nameCemetery'], selectedPlaceFromMap?.formattedAddress);
//   form.setFieldValue(
//     ['location', 'place'],
//     selectedPlaceFromMap?.location.place
//   );
//   form.setFieldValue(['location', 'lng'], selectedPlaceFromMap?.location.lng);
//   form.setFieldValue(['location', 'lat'], selectedPlaceFromMap?.location.lat);
//   form.setFieldValue(['shortDescription'], selectedPlace?.shortDescription);
//   form.setFieldValue(['description'], selectedPlace?.description);
//
//   const onSubmit = (values: any) => {
//     onFinish({
//       ...values,
//       location: {
//         place: selectedPlaceFromMap?.location.place || null,
//         lng: selectedPlaceFromMap?.location.lng || null,
//         lat: selectedPlaceFromMap?.location.lat || null,
//       },
//       shortDescription: values.shortDescription || null,
//       description: values.description || null,
//     });
//   };
//
//   return (
//     <Form
//       layout="vertical"
//       form={form}
//       name="nest-messages"
//       onFinish={onSubmit}
//       validateMessages={validateMessages}
//     >
//       <Form.Item
//         name={['country']}
//         label="Country"
//         rules={[{ required: true, whitespace: true }]}
//       >
//         <Input placeholder="Input Country" allowClear disabled />
//       </Form.Item>
//       <Form.Item name={['city']} label="City" rules={[{ required: true }]}>
//         <Input placeholder="Input City" allowClear disabled />
//       </Form.Item>
//       <Form.Item
//         name={['nameCemetery']}
//         label="Name Cemetery"
//         rules={[{ required: true }]}
//       >
//         <Input placeholder="Input Name Cemetery" allowClear disabled />
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
//       <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
//         <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
//           Save
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };
//
// export default PlaceForm;
