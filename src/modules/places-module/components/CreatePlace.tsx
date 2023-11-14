import React, { FC, useEffect, useMemo, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useRouter } from 'next/router';
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Flex,
  Form,
  Input,
  List,
  notification,
  Row,
  Space,
  Typography,
  Upload,
} from 'antd';
import { SaveOutlined, UploadOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import { UploadFile } from 'antd/es/upload/interface';
import { IPlaceResultAfterExtract } from '@/modules/maps/components/types/place-result-after-extract.type';
import MapDrawer from '@/modules/maps/components/MapDrawer';
import { ICreatePlace, IGalleryFile, ILocation } from '@/types';
import { useCreatePlace } from '@/modules/places-module/hooks/useCreatePlace';
import { routes } from '@/common/routing/routes';
import { useUpload } from '@/modules/gallery-module/hooks/useUpload';
import { CreateBreadcrumb } from '@/common-dashboard/helpers/CreateBreadcrumb';

const breadcrumbs = [
  CreateBreadcrumb({ key: routes.main, icon: true }),
  CreateBreadcrumb({ key: routes.dashboard.index, text: 'Dashboard' }),
  CreateBreadcrumb({ key: routes.dashboard.places.index, text: 'Places' }),
  CreateBreadcrumb({
    key: routes.dashboard.places.create,
    text: 'Create Place',
    withLink: false,
  }),
];

interface IPlaceForm {
  country: string;
  city: string;
  nameCemetery: string;
  shortDescription: string;
  description: string;
  photo: UploadFile<IGalleryFile>[];
}

interface FieldData {
  name: string | number | (string | number)[];
  value?: any;
  touched?: boolean;
  validating?: boolean;
  errors?: string[];
}

export const CreatePlace: FC = () => {
  const router = useRouter();

  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );
  const [form] = Form.useForm();
  const [fields, setFields] = useState<FieldData[]>([]);

  const [selectedLocation, setSelectedLocation] = useState<ILocation | null>(
    null
  );
  const [selectedPlaceFromMap, setSelectedPlaceFromMap] =
    useState<IPlaceResultAfterExtract | null>(null);
  const [shortDescriptionText, setShortDescriptionText] = useState('');
  const [descriptionText, setDescriptionText] = useState('');
  const [shortDescriptionCount, setShortDescriptionCount] = useState(0);
  const [descriptionCount, setDescriptionCount] = useState(0);

  const { createPlaceMutate, isCreating } = useCreatePlace();

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { uploadProps } = useUpload(setFileList, 'place');

  useEffect(() => {
    if (selectedPlaceFromMap) {
      form.setFieldsValue({
        country: selectedPlaceFromMap.country,
        city: selectedPlaceFromMap.city,
        nameCemetery: selectedPlaceFromMap.formattedAddress,
        location: selectedPlaceFromMap.location.place,
      });
      setSelectedLocation(selectedPlaceFromMap.location as ILocation);
    }
  }, [selectedPlaceFromMap]);

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFinish = (values: IPlaceForm) => {
    const form: ICreatePlace = {
      country: values.country,
      city: values.city,
      nameCemetery: values.nameCemetery,
      shortDescription: values.shortDescription,
      description: values.description,
      location: selectedLocation as ILocation,
      ids: values.photo.map((file) => file.response?.uploadId || ''),
    };

    createPlaceMutate(form, {
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

      <Form
        layout="vertical"
        fields={fields}
        form={form}
        onFieldsChange={(_, allFields) => {
          setFields(allFields);
        }}
        onFinish={onFinish}
      >
        <Row gutter={[16, 16]}>
          <Col span={24} lg={16}>
            <Card bodyStyle={{ marginBottom: -30 }}>
              <Form.Item
                name="country"
                label="Country"
                rules={[{ required: true, whitespace: true }]}
                hasFeedback
              >
                <Input placeholder="Input Country" allowClear />
              </Form.Item>
              <Form.Item
                name="city"
                label="City"
                rules={[{ required: true, whitespace: true }]}
                hasFeedback
              >
                <Input placeholder="Input City" allowClear />
              </Form.Item>
              <Form.Item
                name="nameCemetery"
                label="Name Cemetery"
                validateDebounce={500}
                rules={[{ required: true, min: 2, max: 100 }]}
                hasFeedback
              >
                <Input placeholder="Input Name Cemetery" allowClear />
              </Form.Item>
              <Form.Item
                name="shortDescription"
                label="Short Description"
                rules={[{ required: true }]}
              >
                <ReactQuill
                  theme="snow"
                  value={shortDescriptionText}
                  onChange={(value) => {
                    setShortDescriptionText(value);
                    setShortDescriptionCount(value.length);
                    form.setFieldValue('shortDescription', value);
                  }}
                />
                <span className="text-neutral-400">
                  Characters: {shortDescriptionCount}
                </span>
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true }]}
              >
                <ReactQuill
                  theme="snow"
                  value={descriptionText}
                  onChange={(value) => {
                    setDescriptionText(value);
                    setDescriptionCount(value.length);
                    form.setFieldValue('description', value);
                  }}
                />
                <span className="text-neutral-400">
                  Characters: {descriptionCount}
                </span>
              </Form.Item>
            </Card>
          </Col>

          <Col span={24} lg={8}>
            <Flex vertical gap="middle">
              <Card>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isCreating}
                  icon={<SaveOutlined />}
                >
                  Save
                </Button>
              </Card>

              <Card bodyStyle={{ marginBottom: -20 }}>
                <Form.Item
                  label="Location"
                  name="location"
                  rules={[{ required: true }]}
                  hasFeedback
                  tooltip="You need to select a location on the map to determine the coordinates of the place."
                >
                  <List split={false}>
                    <List.Item>
                      <Typography.Text>
                        <span className="text-neutral-400">
                          Formatted Address: &nbsp;
                        </span>
                        {selectedLocation?.place}
                      </Typography.Text>
                    </List.Item>

                    <List.Item>
                      <Typography.Text>
                        <span className="text-neutral-400">
                          Longitude: &nbsp;
                        </span>
                        {selectedLocation?.lng}
                      </Typography.Text>
                    </List.Item>

                    <List.Item>
                      <Typography.Text>
                        <span className="text-neutral-400">
                          Latitude: &nbsp;
                        </span>
                        {selectedLocation?.lat}
                      </Typography.Text>
                    </List.Item>
                  </List>

                  <Space size={16}>
                    <MapDrawer onPlaceSelected={setSelectedPlaceFromMap} />
                  </Space>
                </Form.Item>
              </Card>

              <Card bodyStyle={{ marginBottom: -20 }}>
                <Form.Item
                  label="Photo"
                  name="photo"
                  hasFeedback
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  rules={[{ required: true }]}
                  shouldUpdate
                  tooltip="You can upload up to one photo. After uploading, you should save the place."
                >
                  <Upload {...uploadProps}>
                    <Button
                      icon={<UploadOutlined />}
                      disabled={fileList.length > 0}
                    >
                      Click to upload
                    </Button>
                  </Upload>
                </Form.Item>
              </Card>
            </Flex>
          </Col>
        </Row>
      </Form>
    </Flex>
  );
};
