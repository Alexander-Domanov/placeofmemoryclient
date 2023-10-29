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
import { ICreatePerson, IGalleryFile, ILocation } from '@/types';
import { ChooseGalleryFiles } from '@/modules/gallery-module';
import { routes } from '@/common/routing/routes';
import LocationPreview from '@/modules/maps/components/CardLocationPreview';
import { useCreatePerson } from '@/modules/persons-module/hooks/useCreatePerson';
import PersonForm from '@/modules/persons-module/components/PersonForm';
import { TitlePlaces } from '@/modules/persons-module/components/TitlePlaces';

const breadcrumbs: Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[] = [
  {
    key: routes.dashboard.index,
    title: <Link href={routes.dashboard.index}>Dashboard</Link>,
  },
  {
    key: routes.dashboard.places.index,
    title: <Link href={routes.dashboard.persons.index}>Persons</Link>,
  },
  {
    key: routes.dashboard.persons.create,
    title: 'Create Person',
  },
];

export const CreatePerson: FC = () => {
  const router = useRouter();

  const [form] = Form.useForm();

  const [selectedLocation, setSelectedLocation] = useState<ILocation | null>(
    null
  );
  const [selectedPlaceFromMap, setSelectedPlaceFromMap] =
    useState<IPlaceResultAfterExtract | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<IGalleryFile[]>([]);
  const [selectedPlaceId, setSelectedPlace] = useState<{
    value: string;
    id: number;
  } | null>(null);

  const { createPerson } = useCreatePerson();

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

  const onFinish = (values: any) => {
    const person: ICreatePerson = {
      ...values,
      birthDate: values.birthDate.format('YYYY-MM-DD'),
      deathDate: values.deathDate.format('YYYY-MM-DD'),
      placeId: selectedPlaceId?.id as number,
      location: selectedLocation as ILocation,
      ids: selectedFiles.map((file) => file.uploadId),
    };
    if (person.ids.length === 0) {
      notification.error({
        message: 'Gallery is empty',
        description: 'Please, upload at least one image',
        placement: 'bottomLeft',
      });
    } else {
      createPerson(person, {
        onSuccess: (data) => {
          notification.success({
            message: 'Person created successfully',
            description: 'You will be redirected to the person page',
            placement: 'bottomLeft',
          });
          router.push(routes.dashboard.persons.person(data.data.id));
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
        <Col span={10} style={{ width: '100%' }}>
          <Card>
            <PersonForm form={form} onFinish={onFinish} />
          </Card>
        </Col>
        <Col span={8} style={{ width: '100%' }}>
          <Card style={{ width: '100%', marginBottom: '16px' }}>
            <Row justify="start" style={{ width: '100%' }}>
              <TitlePlaces onFinishValue={setSelectedPlace} />
            </Row>
          </Card>
          <Card style={{ width: '100%', marginBottom: '16px' }}>
            <Alert
              message="Status: n/a"
              description={
                <div>
                  <div>
                    <Typography.Text>
                      Relate to: {selectedPlaceId?.value}
                    </Typography.Text>
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
              maxFileLimit={3}
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
