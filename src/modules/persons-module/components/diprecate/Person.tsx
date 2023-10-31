// import React, { FC, useEffect, useState } from 'react';
// import {
//   Alert,
//   Breadcrumb,
//   Button,
//   Card,
//   Col,
//   Flex,
//   Form,
//   message,
//   notification,
//   Row,
//   Space,
//   Typography,
// } from 'antd';
// import { useRouter } from 'next/router';
// import {
//   BreadcrumbItemType,
//   BreadcrumbSeparatorType,
// } from 'antd/es/breadcrumb/Breadcrumb';
// import Link from 'next/link';
// import { SaveOutlined } from '@ant-design/icons';
// import { IPlaceResultAfterExtract } from '@/modules/maps/components/types/place-result-after-extract.type';
// import MapDrawer from '@/modules/maps/components/MapDrawer';
// import { ICreatePerson, IGalleryFile, ILocation, IPerson } from '@/types';
// import { ChooseGalleryFiles } from '@/modules/gallery-module';
// import { routes } from '@/common/routing/routes';
// import LocationPreview from '@/modules/maps/components/CardLocationPreview';
// import { usePerson } from '@/modules/persons-module/hooks/usePerson';
// import { useUpdatePerson } from '@/modules/persons-module/hooks/useUpdatePerson';
// import PersonForm from '@/modules/persons-module/components/PersonForm';
// import DeletePersonModal from '@/modules/persons-module/components/DeletePersonModal';
// import { TitlePlaces } from '@/modules/persons-module/components/TitlePlaces';
// import { IResponseError } from '@/types/response-error-message.type';
//
// function breadcrumbs(
//   id: string | string[] | undefined
// ): Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[] {
//   return [
//     {
//       key: routes.dashboard.index,
//       title: <Link href={routes.dashboard.index}>Dashboard</Link>,
//     },
//     {
//       key: routes.dashboard.persons.index,
//       title: <Link href={routes.dashboard.persons.index}>Persons</Link>,
//     },
//     {
//       key: routes.dashboard.persons.person(id as string),
//       title: `${id}`,
//     },
//   ];
// }
//
// export const PersonPage: FC = () => {
//   const router = useRouter();
//
//   const { personId } = router.query;
//
//   const [form] = Form.useForm();
//
//   const [selectedPlaceFromMap, setSelectedPlaceFromMap] =
//     useState<IPlaceResultAfterExtract | null>(null);
//   const [selectedPerson, setSelectedPerson] = useState<IPerson | null>(null);
//   const [selectedLocation, setSelectedLocation] = useState<ILocation | null>(
//     null
//   );
//   const [selectedFiles, setSelectedFiles] = useState<IGalleryFile[]>([]);
//   const [selectedPlace, setSelectedPlace] = useState<{
//     value: string;
//     id: number;
//   } | null>(null);
//
//   const { person } = usePerson(personId);
//
//   const { updatePersonMutation } = useUpdatePerson();
//
//   useEffect(() => {
//     if (person) {
//       message.success(`Person ${new Date(person.birthDate)} loaded`);
//
//       setSelectedPerson(person);
//       form.setFieldsValue({
//         name: person.firstName,
//         lastName: person.lastName,
//         patronymic: person.patronymic,
//         biography: person.biography,
//         // birthDate: person.birthDate.split('T')[0],
//         // deathDate: person.deathDate.split('T')[0],
//         slug: person.slug,
//       });
//       setSelectedLocation(person.location);
//       setSelectedFiles(person.photos);
//     }
//   }, [person]);
//
//   useEffect(() => {
//     if (selectedPlaceFromMap) {
//       setSelectedLocation(selectedPlaceFromMap.location as ILocation);
//     }
//   }, [selectedPlaceFromMap]);
//
//   const onFinish = (values: ICreatePerson) => {
//     const newPerson: ICreatePerson = {
//       ...values,
//       // location: selectedLocation as ILocation,
//       location: {
//         place: selectedPlace?.value as string,
//         ...selectedLocation,
//       } as ILocation,
//       ids: selectedFiles.map((file) => file.uploadId),
//     };
//     if (newPerson.ids.length === 0) {
//       notification.error({
//         message: 'Gallery is empty',
//         description: 'Please, upload at least one image',
//         placement: 'bottomLeft',
//       });
//     } else if (
//       newPerson.location === null ||
//       newPerson.location === undefined
//     ) {
//       notification.error({
//         message: 'Location is empty',
//         description: 'Please, select location',
//         placement: 'bottomLeft',
//       });
//     } else {
//       updatePersonMutation(
//         { id: personId, person: newPerson },
//         {
//           onSuccess: () => {
//             notification.success({
//               message: 'Place updated successfully',
//               description: 'You will be redirected to the place page',
//               placement: 'bottomLeft',
//             });
//           },
//           onError: (error: IResponseError) => {
//             const messages = error?.response?.data?.messages;
//             messages?.forEach(({ message }) => {
//               notification.error({
//                 message: `Error: ${message}`,
//                 placement: 'bottomLeft',
//               });
//             });
//           },
//         }
//       );
//     }
//   };
//
//   return (
//     <Flex gap="large" vertical>
//       <div>
//         <Breadcrumb items={breadcrumbs(personId)} />
//       </div>
//       <Row gutter={[16, 16]}>
//         <Col span={12} style={{ width: '100%', minWidth: 300 }}>
//           <Card>
//             <PersonForm form={form} onFinish={onFinish} />
//           </Card>
//         </Col>
//         <Col span={8} style={{ width: '100%', minWidth: 300 }}>
//           <Card style={{ width: '100%', marginBottom: '16px' }}>
//             <Row justify="start" style={{ width: '100%' }}>
//               <TitlePlaces onFinishValue={setSelectedPlace} />
//             </Row>
//           </Card>
//           <Card style={{ width: '100%', marginBottom: '16px' }}>
//             <Alert
//               message={`Status: ${selectedPerson?.status}`}
//               description={
//                 <div>
//                   <div>
//                     <Typography.Text>{`Persons: `}</Typography.Text>
//                     <Typography.Text>{`${selectedPerson?.location.place}`}</Typography.Text>
//                   </div>
//                   <div>
//                     <Typography.Text>{`Created at: `}</Typography.Text>
//                     <Typography.Text>{`${selectedPerson?.createdAt}`}</Typography.Text>
//                   </div>
//                   <div>
//                     <Typography.Text>{`Updated at: `}</Typography.Text>
//                     <Typography.Text>{`${selectedPerson?.updatedAt}`}</Typography.Text>
//                   </div>
//                 </div>
//               }
//               type="warning"
//               style={{ width: '100%', marginBottom: '32px' }}
//             />
//             <Space size={16}>
//               <Button
//                 type="primary"
//                 title="Save"
//                 onClick={() => onFinish(form.getFieldsValue())}
//                 icon={<SaveOutlined />}
//               >
//                 Save
//               </Button>
//               <DeletePersonModal person={selectedPerson} showButton />
//             </Space>
//           </Card>
//           <Card style={{ width: '100%', marginBottom: '16px' }}>
//             <ChooseGalleryFiles
//               onFilesSelected={setSelectedFiles}
//               maxFileLimit={1}
//               inputFiles={selectedFiles}
//             />
//           </Card>
//           <Card>
//             <MapDrawer onPlaceSelected={setSelectedPlaceFromMap} />
//             <LocationPreview selectedLocation={selectedLocation} />
//           </Card>
//         </Col>
//       </Row>
//     </Flex>
//   );
// };
