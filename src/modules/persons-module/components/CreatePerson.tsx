import React, { FC, useEffect, useMemo, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useRouter } from 'next/router';
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  DatePicker,
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
import { ICreatePerson, IGalleryFile, ILocation } from '@/types';
import { routes } from '@/common/routing/routes';
import { useCreatePerson } from '@/modules/persons-module/hooks/useCreatePerson';
import { useUpload } from '@/modules/gallery-module/hooks/useUpload';
import { TitlePlaces } from '@/modules/persons-module/components/TitlePlaces';
import { CreateBreadcrumb } from '@/common-dashboard/helpers/CreateBreadcrumb';
import { SupportedImageFormatsTooltip } from '@/common-dashboard/helpers/SupportedImageFormatsTooltip';

const breadcrumbs = [
  CreateBreadcrumb({ key: routes.main, icon: true }),
  CreateBreadcrumb({ key: routes.dashboard.index, text: 'Dashboard' }),
  CreateBreadcrumb({ key: routes.dashboard.persons.index, text: 'Persons' }),
  CreateBreadcrumb({
    key: routes.dashboard.persons.create,
    text: 'Create Person',
    withLink: false,
  }),
];

interface IPersonForm {
  firstName: string;
  lastName: string;
  patronymic: string;
  biography: string;
  country: string;
  city: string;
  birthDate: Date;
  deathDate: Date;
  photo: UploadFile<IGalleryFile>[];
}

interface FieldData {
  name: string | number | (string | number)[];
  value?: any;
  touched?: boolean;
  validating?: boolean;
  errors?: string[];
}

export const CreatePerson: FC = () => {
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
  const [selectedPlace, setSelectedPlace] = useState<{
    value: string;
    id: number;
    formattedAddress: string;
  } | null>(null);
  const [biographyText, setBiographyText] = useState('');
  const [biographyCount, setBiographyCount] = useState(0);

  const { createPerson, isCreating } = useCreatePerson();

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { uploadProps } = useUpload(setFileList, 'person');

  useEffect(() => {
    if (selectedPlaceFromMap) {
      form.setFieldsValue({
        location: selectedPlaceFromMap.location.place,
        country: selectedPlaceFromMap.country,
        city: selectedPlaceFromMap.city,
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

  const clearSelectedPlace = () => {
    setSelectedPlace(null);
  };

  const onFinish = (values: IPersonForm) => {
    const form: ICreatePerson = {
      firstName: values.firstName,
      lastName: values.lastName,
      patronymic: values.patronymic,
      biography: values.biography,
      birthDate: values.birthDate,
      deathDate: values.deathDate,
      country: values.country,
      city: values.city,
      placeId: selectedPlace?.id as number,
      location: {
        place: selectedPlace?.value as string,
        ...selectedLocation,
      } as ILocation,
      ids: values.photo?.map((file) => file.response?.uploadId || ''),
    };

    createPerson(form, {
      onSuccess: (data) => {
        notification.success({
          message: 'Person created successfully',
          description: 'You will be redirected to the person page',
          placement: 'bottomLeft',
        });
        router.push(routes.dashboard.persons.person(data.data.id));
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
                name="firstName"
                label="First Name"
                rules={[{ required: true, whitespace: true }]}
                hasFeedback
              >
                <Input placeholder="Input First Name" allowClear />
              </Form.Item>

              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true, whitespace: true }]}
                hasFeedback
              >
                <Input placeholder="Input Last Name" allowClear />
              </Form.Item>

              <Form.Item
                name="patronymic"
                label="Patronymic"
                rules={[{ whitespace: true }]}
                hasFeedback
              >
                <Input placeholder="Input Patronymic" allowClear />
              </Form.Item>

              <Flex gap="large">
                <Form.Item name="birthDate" label="Birth Date">
                  <DatePicker placeholder="Input Date" format="DD.MM.YYYY" />
                </Form.Item>

                <Form.Item name="deathDate" label="Death Date">
                  <DatePicker placeholder="Input Date" format="DD.MM.YYYY" />
                </Form.Item>
              </Flex>

              <Form.Item
                name="country"
                label="Country"
                rules={[{ whitespace: true }]}
                hasFeedback
              >
                <Input placeholder="n/a" disabled />
              </Form.Item>

              <Form.Item
                name="city"
                label="City"
                rules={[{ whitespace: true }]}
                hasFeedback
              >
                <Input placeholder="n/a" disabled />
              </Form.Item>

              <Form.Item name="biography" label="Biography">
                <ReactQuill
                  theme="snow"
                  value={biographyText}
                  onChange={(value) => {
                    setBiographyText(value);
                    setBiographyCount(value.length);
                    form.setFieldValue('biography', value);
                  }}
                />
                <span className="font-normal text-neutral-400">
                  Characters: {biographyCount}
                </span>
              </Form.Item>
            </Card>
          </Col>

          <Col span={24} lg={8}>
            <Flex vertical gap="middle">
              <Card>
                <Space size={16}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isCreating}
                    icon={<SaveOutlined />}
                  >
                    Save
                  </Button>
                </Space>
              </Card>

              <Card bodyStyle={{ marginBottom: -20 }}>
                <Form.Item
                  label="Place"
                  tooltip="Select a location from the list to link it to a specific location on the map."
                >
                  <TitlePlaces onFinishValue={setSelectedPlace} />

                  <Form.Item style={{ marginBottom: 0 }}>
                    <List split={false}>
                      <List.Item>
                        <Typography.Text>
                          <span className="text-neutral-400">
                            Selected place: &nbsp;
                          </span>
                          {selectedPlace?.value}
                        </Typography.Text>
                      </List.Item>

                      <List.Item>
                        <Typography.Text>
                          <span className="text-neutral-400">
                            Formatted address: &nbsp;
                          </span>
                          {selectedPlace?.formattedAddress}
                        </Typography.Text>
                      </List.Item>

                      <Row justify="end">
                        <Button type="dashed" onClick={clearSelectedPlace}>
                          Clear
                        </Button>
                      </Row>
                    </List>
                  </Form.Item>
                </Form.Item>
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
                  label="Photos"
                  name="photo"
                  hasFeedback
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  rules={[{ required: true }]}
                  shouldUpdate
                  tooltip={
                    <span>
                      You can upload up to 3 photos, the first photo will be the
                      main one. After uploading, you should save the person.{' '}
                      <SupportedImageFormatsTooltip />
                    </span>
                  }
                >
                  <Upload {...uploadProps} maxCount={3} multiple>
                    <Button
                      icon={<UploadOutlined />}
                      disabled={fileList.length > 2}
                    >
                      + Upload (Max: 3)
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
