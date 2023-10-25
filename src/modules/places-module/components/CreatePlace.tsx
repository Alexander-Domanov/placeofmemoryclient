import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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
import {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
} from 'antd/es/breadcrumb/Breadcrumb';
import Link from 'next/link';
import { SaveOutlined } from '@ant-design/icons';
import { IPlaceResultAfterExtract } from '@/modules/maps/components/types/place-result-after-extract.type';
import MapDrawer from '@/modules/maps/components/MapDrawer';
import { ICreatePlace, IGalleryFile, ILocation } from '@/types';
import { useCreatePlace } from '@/modules/places-module/hooks/useCreatePlace';
import { ChooseGalleryFiles } from '@/modules/gallery-module';
import { routes } from '@/common/routing/routes';
import PlaceForm from '@/modules/places-module/components/PlaceForm';
import LocationPreview from '@/modules/maps/components/CardLocationPreview';

const breadcrumbs: Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[] = [
  {
    key: routes.dashboard.index,
    title: <Link href={routes.dashboard.index}>Dashboard</Link>,
  },
  {
    key: routes.dashboard.places.index,
    title: <Link href={routes.dashboard.places.index}>Places</Link>,
  },
  {
    key: routes.dashboard.places.create,
    title: 'Create Place',
  },
];

export const CreatePlace: FC = () => {
  const router = useRouter();

  const [form] = Form.useForm();

  const [selectedLocation, setSelectedLocation] = useState<ILocation | null>(
    null
  );
  const [selectedPlaceFromMap, setSelectedPlaceFromMap] =
    useState<IPlaceResultAfterExtract | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<IGalleryFile[]>([]);

  const { createPlace } = useCreatePlace();

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
    const place: ICreatePlace = {
      ...values,
      location: selectedLocation as ILocation,
      ids: selectedFiles.map((file) => file.uploadId),
    };
    if (place.ids.length === 0) {
      notification.error({
        message: 'Gallery is empty',
        description: 'Please, upload at least one image',
        placement: 'bottomLeft',
      });
    } else {
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
    }
  };

  return (
    <Flex gap="large" vertical>
      <div>
        <Breadcrumb items={breadcrumbs} />
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
              message="Status: n/a"
              description={
                <div>
                  <div>
                    <Typography.Text>{`Persons:  0 `}</Typography.Text>
                  </div>
                  <div>
                    <Typography.Text>Created at: n/a</Typography.Text>
                  </div>
                  <div>
                    <Typography.Text>Updated at: n/a</Typography.Text>
                  </div>
                </div>
              }
              type="warning"
              style={{ width: '100%', marginBottom: '16px' }}
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
            </Space>
          </Card>
          <Card style={{ width: '100%', marginBottom: '32px' }}>
            <ChooseGalleryFiles
              onFilesSelected={setSelectedFiles}
              maxFileLimit={1}
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
