import React, { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { Col, Divider, Form, notification, Row } from 'antd';
import { IPlaceResultAfterExtract } from '@/modules/maps/components/types/place-result-after-extract.type';
import PlaceForm from '@/modules/places-module/components/PlaceForm';
import MapDrawer from '@/modules/maps/components/MapDrawer';
import { ICreatePlace, IGalleryFile } from '@/types';
import { CardLocationPreview } from '@/modules/maps/components/CardLocationPreview';
import { useCreatePlace } from '@/modules/places-module/hooks/useCreatePlace';
import { ChooseGalleryFiles } from '@/modules/gallery-module';
import { routes } from '@/common/routing/routes';

export const AddPlacePage: FC = () => {
  const [selectedPlaceFromMap, setSelectedPlaceFromMap] =
    useState<IPlaceResultAfterExtract | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<IGalleryFile[]>([]);

  const { createPlace, isSuccess, isLoading } = useCreatePlace();
  const router = useRouter();

  const onFinish = (values: ICreatePlace) => {
    const place: ICreatePlace = {
      ...values,
      ids: selectedFiles.map((file) => file.uploadId),
    };
    createPlace(place, {
      onSuccess: (data) => {
        notification.success({
          message: 'Place created successfully',
          description: 'You will be redirected to the place page',
          placement: 'bottomLeft',
        });
        router.push(routes.dashboard.places.place(data.data.id));
      },
    });
  };

  return (
    <div>
      <Row gutter={32}>
        <Col span={14} style={{ width: '100%' }}>
          <Divider orientation="left">Place Preview</Divider>
          <PlaceForm
            onPlaceSelectedFromMap={selectedPlaceFromMap}
            onFinish={onFinish}
          />
        </Col>
        <Col span={10}>
          <Form layout="vertical">
            <Divider orientation="center">Image Preview</Divider>
            <ChooseGalleryFiles
              onFilesSelected={setSelectedFiles}
              maxFileLimit={1}
            />
          </Form>
          <Form layout="vertical">
            <Divider orientation="center">Location</Divider>
            <MapDrawer onPlaceSelected={setSelectedPlaceFromMap} />
            <CardLocationPreview onPlaceSelected={selectedPlaceFromMap} />
          </Form>
        </Col>
      </Row>
    </div>
  );
};
