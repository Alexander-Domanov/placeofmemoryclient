import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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
import { validateMessages } from '@/common-dashboard/validations/ValidateMessages';

const { Panel } = Collapse;

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
    <Flex gap="large" vertical>
      <div>
        <Breadcrumb items={breadcrumbs} />
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
            </Row>
          </Card>
          <Card style={{ width: '100%', marginBottom: '32px' }}>
            <ChooseGalleryFiles
              onFilesSelected={setSelectedFiles}
              maxFileLimit={1}
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
