import React, { FC, useEffect, useState } from 'react';
import {
  Alert,
  Breadcrumb,
  Button,
  Card,
  Col,
  Flex,
  Form,
  notification,
  Row,
  Space,
  Typography,
} from 'antd';
import { useRouter } from 'next/router';
import {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
} from 'antd/es/breadcrumb/Breadcrumb';
import Link from 'next/link';
import { SaveOutlined } from '@ant-design/icons';
import { IPlaceResultAfterExtract } from '@/modules/maps/components/types/place-result-after-extract.type';
import MapDrawer from '@/modules/maps/components/MapDrawer';
import { ICreatePlace, IGalleryFile, ILocation, IPlace } from '@/types';
import { ChooseGalleryFiles } from '@/modules/gallery-module';
import { usePlace } from '@/modules/places-module/hooks/usePlace';
import { useUpdatePlace } from '@/modules/places-module/hooks/useUpdatePlace';
import { routes } from '@/common/routing/routes';
import PlaceForm from '@/modules/places-module/components/PlaceForm';
import { IResponseError } from '@/types/response-error-message.type';
import LocationPreview from '@/modules/maps/components/CardLocationPreview';
import DeletePlaceModal from '@/modules/places-module/components/DeletePlaceModal';

function breadcrumbs(
  id: string | string[] | undefined
): Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[] {
  return [
    {
      key: routes.dashboard.index,
      title: <Link href={routes.dashboard.index}>Dashboard</Link>,
    },
    {
      key: routes.dashboard.places.index,
      title: <Link href={routes.dashboard.places.index}>Places</Link>,
    },
    {
      key: routes.dashboard.places.place(id as string),
      title: `${id}`,
    },
  ];
}

export const PlacePage: FC = () => {
  const router = useRouter();

  const { placeId } = router.query;

  const [form] = Form.useForm();

  const [selectedPlaceFromMap, setSelectedPlaceFromMap] =
    useState<IPlaceResultAfterExtract | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<IPlace | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<ILocation | null>(
    null
  );
  const [selectedFiles, setSelectedFiles] = useState<IGalleryFile[]>([]);

  const { place } = usePlace(placeId);

  const { updatePlaceById } = useUpdatePlace();

  useEffect(() => {
    if (place) {
      setSelectedPlace(place);
      form.setFieldsValue({
        country: place.country,
        city: place.city,
        nameCemetery: place.nameCemetery,
        shortDescription: place.shortDescription,
        description: place.description,
      });
      setSelectedLocation(place.location);
      setSelectedFiles(place.photos);
    }
  }, [place]);

  useEffect(() => {
    if (selectedPlaceFromMap) {
      form.setFieldsValue({
        country: selectedPlaceFromMap.country,
        city: selectedPlaceFromMap.city,
        nameCemetery: selectedPlaceFromMap.formattedAddress,
      });
      setSelectedLocation(selectedPlaceFromMap.location as ILocation);
    }
  }, [selectedPlaceFromMap]);

  const onFinish = (values: ICreatePlace) => {
    const newPlace: ICreatePlace = {
      ...values,
      location: selectedLocation as ILocation,
      ids: selectedFiles.map((file) => file.uploadId),
    };
    if (newPlace.ids.length === 0) {
      notification.error({
        message: 'Gallery is empty',
        description: 'Please, upload at least one image',
        placement: 'bottomLeft',
      });
    } else if (newPlace.location === null || newPlace.location === undefined) {
      notification.error({
        message: 'Location is empty',
        description: 'Please, select location',
        placement: 'bottomLeft',
      });
    } else {
      updatePlaceById(
        { id: placeId, place: newPlace },
        {
          onSuccess: () => {
            notification.success({
              message: 'Place updated successfully',
              description: 'You will be redirected to the place page',
              placement: 'bottomLeft',
            });
          },
          onError: (error: IResponseError) => {
            const messages = error?.response?.data?.messages;
            messages?.forEach(({ message }) => {
              notification.error({
                message: `Error: ${message}`,
                placement: 'bottomLeft',
              });
            });
          },
        }
      );
    }
  };

  return (
    <Flex gap="large" vertical>
      <div>
        <Breadcrumb items={breadcrumbs(placeId)} />
      </div>
      <Row gutter={[16, 16]}>
        <Col span={16} style={{ width: '100%' }}>
          <Card>
            <PlaceForm form={form} onFinish={onFinish} />
          </Card>
        </Col>
        <Col span={8} style={{ width: '100%' }}>
          <Card style={{ width: '100%', marginBottom: '16px' }}>
            <Alert
              message={`Status: ${selectedPlace?.status}`}
              description={
                <div>
                  <div>
                    <Typography.Text>{`Persons: `}</Typography.Text>
                    <Typography.Text>{`${selectedPlace?.personsLocation.length}`}</Typography.Text>
                  </div>
                  <div>
                    <Typography.Text>{`Created at: `}</Typography.Text>
                    <Typography.Text>{`${selectedPlace?.createdAt}`}</Typography.Text>
                  </div>
                  <div>
                    <Typography.Text>{`Updated at: `}</Typography.Text>
                    <Typography.Text>{`${selectedPlace?.updatedAt}`}</Typography.Text>
                  </div>
                </div>
              }
              type="warning"
              style={{ width: '100%', marginBottom: '32px' }}
            />
            <Space size={16}>
              <Button
                type="primary"
                title="Save"
                onClick={() => onFinish(form.getFieldsValue())}
                icon={<SaveOutlined />}
              >
                Save
              </Button>
              <DeletePlaceModal place={selectedPlace} showButton />
            </Space>
          </Card>
          <Card style={{ width: '100%', marginBottom: '16px' }}>
            <ChooseGalleryFiles
              onFilesSelected={setSelectedFiles}
              maxFileLimit={1}
              inputFiles={selectedFiles}
            />
          </Card>
          <Card>
            <MapDrawer onPlaceSelected={setSelectedPlaceFromMap} />
            <LocationPreview selectedLocation={selectedLocation} />
          </Card>
        </Col>
      </Row>
    </Flex>
  );
};
