import React, { FC, useState } from 'react';
import { Col, Divider, Form, message, Row } from 'antd';
import { IPlaceResultAfterExtract } from '@/modules/maps/components/types/place-result-after-extract.type';
import PlaceForm from '@/modules/places-modules/components/PlaceForm';
import { ChooseGalleryFilesTest } from '@/modules/gallery-module/components/ChooseGalleryFilesTets';
import MapDrawer from '@/modules/maps/components/MapDrawer';
import { ICreatePlace, IGalleryFile } from '@/types';
import { CardLocationPreview } from '@/modules/places-modules/components/CardLocationPreview';
import { useCreatePlace } from '@/modules/places-modules/hooks/userCreatePlace';

export const AddPlacePage: FC = () => {
  const [selectedPlaceFromMap, setSelectedPlaceFromMap] =
    useState<IPlaceResultAfterExtract | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<IGalleryFile[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<ICreatePlace | null>(null);

  const { createPlace, isSuccess, isLoading } = useCreatePlace();

  const onFinish = (values: ICreatePlace) => {
    const place: ICreatePlace = {
      ...values,
      ids: selectedFiles.map((file) => file.uploadId),
    };
    message.success(`---- ==== ${JSON.stringify(place)}`);
    createPlace(place);
  };

  return (
    <div>
      <Row gutter={32}>
        <Col span={14} style={{ width: '100%' }}>
          <Divider orientation="left">Select Place</Divider>
          <PlaceForm
            onPlaceSelectedFromMap={selectedPlaceFromMap}
            onFinish={onFinish}
          />
        </Col>
        <Col span={10}>
          <Form layout="vertical">
            <Divider orientation="center">Preview Image</Divider>
            <ChooseGalleryFilesTest
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
