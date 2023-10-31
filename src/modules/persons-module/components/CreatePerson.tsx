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
import {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
} from 'antd/es/breadcrumb/Breadcrumb';
import Link from 'next/link';
import { SaveOutlined, UploadOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import { UploadFile } from 'antd/es/upload/interface';
import { IPlaceResultAfterExtract } from '@/modules/maps/components/types/place-result-after-extract.type';
import MapDrawer from '@/modules/maps/components/MapDrawer';
import { ICreatePerson, IGalleryFile, ILocation } from '@/types';
import { routes } from '@/common/routing/routes';
import { useCreatePerson } from '@/modules/persons-module/hooks/useCreatePerson';
import { TitlePlaces } from '@/modules/persons-module/components/TitlePlaces';
import { useUpload } from '@/modules/gallery-module/hooks/useUpload';

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

interface IPersonForm {
  firstName: string;
  lastName: string;
  patronymic: string;
  biography: string;
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
  } | null>(null);
  const [biographyText, setBiographyText] = useState('');
  const [biographyCount, setBiographyCount] = useState(0);

  const { createPerson } = useCreatePerson();

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { uploadProps } = useUpload(setFileList);

  useEffect(() => {
    if (selectedPlaceFromMap) {
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
      placeId: selectedPlace?.id as number,
      location: {
        place: selectedPlace?.value as string,
        ...selectedLocation,
      } as ILocation,
      ids: values.photo.map((file) => file.response?.uploadId || ''),
    };
    if (form.ids.length === 0) {
      notification.error({
        message: 'Gallery is empty',
        description: 'Please, upload at least one image',
        placement: 'bottomLeft',
      });
    } else {
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
    }
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
          <Col span={16}>
            <Card>
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
                rules={[{ required: true, whitespace: true }]}
                hasFeedback
              >
                <Input placeholder="Input Patronymic" allowClear />
              </Form.Item>
              <Form.Item label="Date of birth and death">
                <Form.Item
                  name="birthDate"
                  style={{ display: 'inline-block', width: 'calc(50% - 16px)' }}
                  rules={[
                    { required: true, message: 'Birth Date is required' },
                  ]}
                >
                  <DatePicker
                    placeholder="Select Birth Date"
                    format="YYYY-MM-DD"
                  />
                </Form.Item>
                {/* <span */}
                {/*  style={{ */}
                {/*    display: 'inline-block', */}
                {/*    width: '24px', */}
                {/*    lineHeight: '32px', */}
                {/*    textAlign: 'center', */}
                {/*  }} */}
                {/* > */}
                {/*  -*/}
                {/* </span> */}
                <Form.Item
                  name="deathDate"
                  style={{ display: 'inline-block', width: 'calc(50% - 16px)' }}
                  rules={[
                    { required: true, message: 'Death Date is required' },
                  ]}
                >
                  <DatePicker
                    placeholder="Select Death Date"
                    format="YYYY-MM-DD"
                  />
                </Form.Item>
              </Form.Item>
              <Form.Item
                name="biography"
                label="Biography"
                rules={[{ required: true }]}
              >
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

          <Col span={8}>
            <Flex vertical gap={16}>
              <Card>
                <TitlePlaces onFinishValue={setSelectedPlace} />
                <Form.Item style={{ marginBottom: 0 }}>
                  <List split={false}>
                    <List.Item>
                      <Typography.Text>
                        <span className="font-normal text-neutral-400">
                          Selected place: &nbsp;
                        </span>
                        {selectedPlace?.value}
                      </Typography.Text>
                      <Button type="dashed" onClick={clearSelectedPlace}>
                        Clear
                      </Button>
                    </List.Item>
                  </List>
                </Form.Item>
              </Card>

              <Card>
                <Form.Item>
                  <List split={false}>
                    <List.Item>
                      <Typography.Text>
                        <span className="font-normal text-neutral-400">
                          Longitude: &nbsp;
                        </span>
                        {selectedLocation?.lng}
                      </Typography.Text>
                    </List.Item>

                    <List.Item>
                      <Typography.Text>
                        <span className="font-normal text-neutral-400">
                          Latitude: &nbsp;
                        </span>
                        {selectedLocation?.lat}
                      </Typography.Text>
                    </List.Item>
                  </List>
                </Form.Item>

                <Space size={16}>
                  <Button
                    type="primary"
                    title="Save"
                    onClick={() => onFinish(form.getFieldsValue())}
                    icon={<SaveOutlined />}
                  >
                    Save
                  </Button>
                  <MapDrawer onPlaceSelected={setSelectedPlaceFromMap} />
                </Space>
              </Card>

              <Card>
                <Form.Item
                  label="Photos"
                  name="photo"
                  hasFeedback
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  rules={[{ required: true }]}
                  shouldUpdate
                >
                  <Upload {...uploadProps} maxCount={3} multiple>
                    <Button
                      icon={<UploadOutlined />}
                      disabled={fileList.length > 2}
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
