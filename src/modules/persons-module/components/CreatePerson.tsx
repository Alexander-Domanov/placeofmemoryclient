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
  notification,
  Row,
  Space,
  Upload,
} from 'antd';
import { SaveOutlined, UploadOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import { UploadFile } from 'antd/es/upload/interface';
import { IPlaceResultAfterExtract } from '@/modules/maps/components/types/place-result-after-extract.type';
import MapDrawer from '@/modules/maps/components/MapDrawer';
import { ICreatePerson, IFieldData, IGalleryFile, ILocation } from '@/types';
import { routes } from '@/common/routing/routes';
import { useCreatePerson } from '@/modules/persons-module/hooks/useCreatePerson';
import { useUpload } from '@/modules/gallery-module/hooks/useUpload';
import { TitlePlaces } from '@/modules/persons-module/components/TitlePlaces';
import {
  CreateBreadcrumb,
  GetCharacterCount,
  MetaInfoLocationForm,
  MetaInfoSelectedPlaceForm,
  QuillCharacterCount,
  SupportedImageFormatsTooltip,
} from '@/components';
import { characterCountUtils } from '@/common-dashboard/utils/characterCountUtils';
import { PersonFormRules } from '@/modules/persons-module/constants/PersonFormRules';
import { ValidationOfRedactorValue } from '@/common-dashboard';

const { isCharacterCountExceeded, getQuillStyle } = characterCountUtils;

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

export const CreatePerson: FC = () => {
  const router = useRouter();

  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );

  const [form] = Form.useForm();
  const [fields, setFields] = useState<IFieldData[]>([]);

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

  const biographyCount = GetCharacterCount(biographyText);

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

  const exceeded = isCharacterCountExceeded(
    biographyCount,
    PersonFormRules.biography.maxCharacters
  );
  const quillStyle = getQuillStyle(exceeded);

  const validateDescription = (
    _: any,
    value: string,
    callback: (message?: string) => void
  ) => {
    return ValidationOfRedactorValue({
      maxCharacters: PersonFormRules.biography.maxCharacters,
      message: PersonFormRules.biography.message,
      value,
      callback,
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
            <Card>
              <Form.Item
                name="firstName"
                label="First Name"
                rules={PersonFormRules.firstName}
                hasFeedback
              >
                <Input
                  placeholder="Input First Name"
                  allowClear
                  count={{
                    show: true,
                    max: PersonFormRules.firstName[1].max,
                  }}
                />
              </Form.Item>

              <Form.Item
                name="lastName"
                label="Last Name"
                rules={PersonFormRules.lastName}
                hasFeedback
              >
                <Input
                  placeholder="Input Last Name"
                  allowClear
                  count={{
                    show: true,
                    max: PersonFormRules.lastName[1].max,
                  }}
                />
              </Form.Item>

              <Form.Item
                name="patronymic"
                label="Patronymic"
                rules={PersonFormRules.patronymic}
                hasFeedback
              >
                <Input
                  placeholder="Input Patronymic"
                  allowClear
                  count={{
                    show: true,
                    max: PersonFormRules.patronymic[1].max,
                  }}
                />
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
                rules={PersonFormRules.country}
                hasFeedback
                tooltip="This field is filled in automatically when you select a location on the map."
              >
                <Input
                  placeholder="n/a"
                  disabled
                  count={{
                    show: true,
                    max: PersonFormRules.country[1].max,
                  }}
                />
              </Form.Item>

              <Form.Item
                name="city"
                label="City"
                rules={PersonFormRules.city}
                hasFeedback
                tooltip="This field is filled in automatically when you select a location on the map."
              >
                <Input
                  placeholder="n/a"
                  disabled
                  count={{
                    show: true,
                    max: PersonFormRules.city[1].max,
                  }}
                />
              </Form.Item>

              <Form.Item
                name="biography"
                label="Biography"
                rules={[
                  { validator: validateDescription },
                  ...PersonFormRules.biography.rules,
                ]}
                tooltip={
                  <span>
                    You can use the rich text editor to format the text. The
                    maximum number of characters is{' '}
                    {PersonFormRules.biography.maxCharacters}.{' '}
                  </span>
                }
              >
                <ReactQuill
                  theme="snow"
                  value={biographyText}
                  onChange={(value) => {
                    setBiographyText(value);
                    form.setFieldValue('biography', value);
                  }}
                  style={quillStyle}
                />
              </Form.Item>

              <QuillCharacterCount
                characterCount={biographyCount}
                maxCount={PersonFormRules.biography.maxCharacters}
              />
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

              <Card>
                <Form.Item
                  label="Place"
                  tooltip="Select a location from the list to link it to a specific location on the map."
                >
                  <TitlePlaces onFinishValue={setSelectedPlace} />

                  <MetaInfoSelectedPlaceForm place={selectedPlace} />

                  <Row justify="end" style={{ marginBottom: -20 }}>
                    <Button type="dashed" onClick={clearSelectedPlace}>
                      Clear
                    </Button>
                  </Row>
                </Form.Item>
              </Card>

              <Card>
                <Form.Item
                  label="Location"
                  name="location"
                  rules={PersonFormRules.location}
                  hasFeedback
                  tooltip="You need to select a location on the map to determine the coordinates of the place."
                >
                  <MetaInfoLocationForm location={selectedLocation} />

                  <Space size={16}>
                    <MapDrawer onPlaceSelected={setSelectedPlaceFromMap} />
                  </Space>
                </Form.Item>
              </Card>

              <Card>
                <Form.Item
                  label="Photos"
                  name="photo"
                  hasFeedback
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  rules={PersonFormRules.photo.rules}
                  shouldUpdate
                  tooltip={
                    <span>
                      You can upload up to {PersonFormRules.photo.maxCount}{' '}
                      photos, the first photo will be the main one. After
                      uploading, you should save the person.{' '}
                      <SupportedImageFormatsTooltip />
                    </span>
                  }
                >
                  <Upload
                    {...uploadProps}
                    maxCount={PersonFormRules.photo.maxCount}
                    multiple
                  >
                    <Button
                      icon={<UploadOutlined />}
                      disabled={fileList.length > 2}
                    >
                      + Upload (Max: {PersonFormRules.photo.maxCount})
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
