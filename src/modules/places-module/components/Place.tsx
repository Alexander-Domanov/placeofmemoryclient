import React, { FC, useEffect, useState } from 'react';
import {
  Alert,
  Breadcrumb,
  Button,
  Card,
  Col,
  Collapse,
  Flex,
  Form,
  Input,
  notification,
  Row,
  Typography,
} from 'antd';
import { useRouter } from 'next/router';
import {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
} from 'antd/es/breadcrumb/Breadcrumb';
import Link from 'next/link';
import { DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import { IPlaceResultAfterExtract } from '@/modules/maps/components/types/place-result-after-extract.type';
import MapDrawer from '@/modules/maps/components/MapDrawer';
import { ICreatePlace, IGalleryFile, ILocation, IPlace } from '@/types';
import { ChooseGalleryFiles } from '@/modules/gallery-module';
import { usePlace } from '@/modules/places-module/hooks/usePlace';
import { useUpdatePlace } from '@/modules/places-module/hooks/useUpdatePlace';
import { routes } from '@/common/routing/routes';
import { IResponseError } from '@/types/response-error-message.type';
import { validateMessages } from '@/common-dashboard/validations/ValidateMessages';

const { Panel } = Collapse;

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

const panels = [
  {
    key: '1',
    header: 'Longitude',
    content: (selectedLocation: ILocation | null) => (
      <Typography.Text>{selectedLocation?.lng || ''}</Typography.Text>
    ),
  },
  {
    key: '2',
    header: 'Latitude',
    content: (selectedLocation: ILocation | null) => (
      <Typography.Text>{selectedLocation?.lat || ''}</Typography.Text>
    ),
  },
];

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
    updatePlaceById(
      { id: placeId, place: newPlace },
      {
        onSuccess: (data) => {
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
  };

  return (
    <Flex gap="large" vertical>
      <div>
        <Breadcrumb items={breadcrumbs(placeId)} />
      </div>
      <Row gutter={32}>
        <Col span={14} style={{ width: '100%' }}>
          <Card>
            <Form
              layout="vertical"
              form={form}
              name="nest-messages"
              onFinish={onFinish}
              validateMessages={validateMessages}
            >
              <Form.Item
                name={['country']}
                label="Country"
                rules={[{ required: true, whitespace: true }]}
                hasFeedback
              >
                <Input placeholder="Input Country" allowClear />
              </Form.Item>
              <Form.Item
                name={['city']}
                label="City"
                rules={[{ required: true, whitespace: true }]}
                hasFeedback
              >
                <Input placeholder="Input City" allowClear />
              </Form.Item>
              <Form.Item
                name={['nameCemetery']}
                label="Name Cemetery"
                validateDebounce={500}
                rules={[{ required: true, min: 2, max: 100 }]}
                hasFeedback
              >
                <Input placeholder="Input Name Cemetery" allowClear />
              </Form.Item>
              <Form.Item
                name={['shortDescription']}
                label="Short Description"
                rules={[{ required: true }]}
              >
                <Input.TextArea
                  showCount
                  maxLength={300}
                  autoSize={{ minRows: 6 }}
                />
              </Form.Item>
              <Form.Item
                name={['description']}
                label="Description"
                rules={[{ required: true }]}
              >
                <Input.TextArea
                  showCount
                  maxLength={4000}
                  autoSize={{ minRows: 17 }}
                />
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={10} style={{ width: '100%' }}>
          <Card style={{ width: '100%', marginBottom: '32px' }}>
            <Form
              name="trigger"
              style={{ maxWidth: 600 }}
              layout="vertical"
              autoComplete="off"
            >
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
              <Row justify="space-around">
                <Button
                  type="primary"
                  onClick={() => onFinish(form.getFieldsValue())}
                  icon={<SaveOutlined />}
                >
                  Save
                </Button>
                <Button type="primary" danger icon={<DeleteOutlined />}>
                  Delete
                </Button>
              </Row>
            </Form>
          </Card>
          {/* <Card style={{ width: '100%', marginBottom: '32px' }}> */}
          {/*  <CardActionsPreview onPlaceSelected={selectedPlace} /> */}
          {/* </Card> */}
          <Card style={{ width: '100%', marginBottom: '32px' }}>
            <ChooseGalleryFiles
              onFilesSelected={setSelectedFiles}
              maxFileLimit={1}
              inputFiles={selectedFiles}
            />
          </Card>
          <Card>
            <MapDrawer onPlaceSelected={setSelectedPlaceFromMap} />
            <Collapse ghost>
              {panels.map((panel) => (
                <Panel
                  header={panel.header}
                  key={panel.key}
                  className="card-location-preview-panel"
                >
                  {panel.content(selectedLocation)}
                </Panel>
              ))}
            </Collapse>
          </Card>
        </Col>
      </Row>
    </Flex>
  );
};
