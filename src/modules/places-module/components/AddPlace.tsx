// import React, { FC, useState } from 'react';
// import { useRouter } from 'next/router';
// import { Breadcrumb, Card, Col, Flex, notification, Row } from 'antd';
// import {
//   BreadcrumbItemType,
//   BreadcrumbSeparatorType,
// } from 'antd/es/breadcrumb/Breadcrumb';
// import Link from 'next/link';
// import { IPlaceResultAfterExtract } from '@/modules/maps/components/types/place-result-after-extract.type';
// import PlaceForm from '@/modules/places-module/components/PlaceForm';
// import MapDrawer from '@/modules/maps/components/MapDrawer';
// import { ICreatePlace, IGalleryFile } from '@/types';
// import { CardLocationPreview } from '@/modules/maps/components/CardLocationPreview';
// import { useCreatePlace } from '@/modules/places-module/hooks/useCreatePlace';
// import { ChooseGalleryFiles } from '@/modules/gallery-module';
// import { routes } from '@/common/routing/routes';
//
// const breadcrumbs: Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[] = [
//   {
//     key: routes.dashboard.index,
//     title: <Link href={routes.dashboard.index}>Dashboard</Link>,
//   },
//   {
//     key: routes.dashboard.places.index,
//     title: <Link href={routes.dashboard.places.index}>Places</Link>,
//   },
//   {
//     key: routes.dashboard.places.create,
//     title: 'Create Place',
//   },
// ];
//
// export const AddPlacePage: FC = () => {
//   const [selectedPlaceFromMap, setSelectedPlaceFromMap] =
//     useState<IPlaceResultAfterExtract | null>(null);
//   const [selectedFiles, setSelectedFiles] = useState<IGalleryFile[]>([]);
//
//   const { createPlace, isSuccess, isLoading } = useCreatePlace();
//   const router = useRouter();
//
//   const onFinish = (values: ICreatePlace) => {
//     const place: ICreatePlace = {
//       ...values,
//       ids: selectedFiles.map((file) => file.uploadId),
//     };
//     createPlace(place, {
//       onSuccess: (data) => {
//         notification.success({
//           message: 'Place created successfully',
//           description: 'You will be redirected to the place page',
//           placement: 'bottomLeft',
//         });
//         router.push(routes.dashboard.places.place(data.data.id));
//       },
//     });
//   };
//
//   return (
//     <Flex gap="large" vertical>
//       <div>
//         <Breadcrumb items={breadcrumbs} />
//       </div>
//       <Row gutter={32}>
//         <Col span={14} style={{ width: '100%' }}>
//           <Card>
//             <PlaceForm
//               onPlaceSelectedFromMap={selectedPlaceFromMap}
//               onFinish={onFinish}
//             />
//           </Card>
//         </Col>
//         <Col span={10} style={{ width: '100%' }}>
//           <Card style={{ width: '100%', marginBottom: '32px' }}>
//             <ChooseGalleryFiles
//               onFilesSelected={setSelectedFiles}
//               maxFileLimit={1}
//             />
//           </Card>
//           <Card>
//             <MapDrawer onPlaceSelected={setSelectedPlaceFromMap} />
//             <CardLocationPreview onPlaceSelected={selectedPlaceFromMap} />
//           </Card>
//         </Col>
//       </Row>
//     </Flex>
//   );
// };
