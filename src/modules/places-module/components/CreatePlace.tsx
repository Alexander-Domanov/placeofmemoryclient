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
import { ICreatePlace, IFieldData, IGalleryFile, ILocation } from '@/types';
import { useCreatePlace } from '@/modules/places-module/hooks/useCreatePlace';
import { routes } from '@/common/routing/routes';
import { useUpload } from '@/modules/gallery-module/hooks/useUpload';
import {
  GetCharacterCount,
  MetaInfoLocationForm,
  QuillCharacterCount,
  SupportedImageFormatsTooltip,
} from '@/components';
import { PlaceFormRules } from '@/modules/places-module/constants/PlaceFormRules';
import { ValidationOfRedactorValue } from '@/common-dashboard';
import { characterCountUtils } from '@/common-dashboard/utils/characterCountUtils';
import { CreateBreadcrumb } from '@/components/dashboard/helpers/CreateBreadcrumb';
import { useTranslation } from '@/components/internationalization';

const { isCharacterCountExceeded, getQuillStyle } = characterCountUtils;

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

export const CreatePlace: FC = () => {
  const router = useRouter();
  const { t } = useTranslation();

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
  const [descriptionText, setDescriptionText] = useState<string>('');

  const descriptionCount = GetCharacterCount(descriptionText);

  const { createPlaceMutate, isCreating } = useCreatePlace();

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { uploadProps } = useUpload(setFileList, 'place');

  useEffect(() => {
    if (selectedPlaceFromMap) {
      form.setFieldsValue({
        country: selectedPlaceFromMap.country,
        city: selectedPlaceFromMap.city,
        location: selectedPlaceFromMap.location.place,
      });
      setSelectedLocation({
        place: selectedPlaceFromMap.formattedAddress,
        lat: selectedPlaceFromMap.location.lat,
        lng: selectedPlaceFromMap.location.lng,
      } as ILocation);
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

  const exceededDescription = isCharacterCountExceeded(
    descriptionCount,
    PlaceFormRules.description.maxCharacters
  );
  const quillStyle = getQuillStyle(exceededDescription);

  const validateDescription = (
    _: any,
    value: string,
    callback: (message?: string) => void
  ) => {
    return ValidationOfRedactorValue({
      maxCharacters: PlaceFormRules.description.maxCharacters,
      message: PlaceFormRules.description.message,
      value,
      callback,
      t,
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
                name="country"
                label="Country"
                rules={PlaceFormRules.country}
                hasFeedback
              >
                <Input.TextArea
                  placeholder="Input Country"
                  count={{
                    show: true,
                    max: PlaceFormRules.country[1].max,
                  }}
                />
              </Form.Item>

              <Form.Item
                name="city"
                label="City"
                rules={PlaceFormRules.city}
                hasFeedback
              >
                <Input.TextArea
                  placeholder="Input City"
                  count={{
                    show: true,
                    max: PlaceFormRules.city[1].max,
                  }}
                />
              </Form.Item>

              <Form.Item
                name="nameCemetery"
                label="Name Cemetery"
                rules={PlaceFormRules.nameCemetery}
                hasFeedback
                tooltip={
                  <span>
                    You can write up to {PlaceFormRules.nameCemetery[1].max}{' '}
                    characters. The name of the cemetery should be unique. After
                    writing, you can save the place.
                  </span>
                }
              >
                <Input.TextArea
                  placeholder="Input Name Cemetery"
                  count={{
                    show: true,
                    max: PlaceFormRules.nameCemetery[1].max,
                  }}
                />
              </Form.Item>

              <Form.Item
                name="shortDescription"
                label="Short Description"
                rules={PlaceFormRules.shortDescription.rules}
                hasFeedback
                tooltip={
                  <span>
                    You can write up to{' '}
                    {PlaceFormRules.shortDescription.maxCharacters} characters.
                    This description will be displayed on the main page as a
                    preview of the place.
                  </span>
                }
              >
                <Input.TextArea
                  placeholder="Short Description"
                  count={{
                    show: true,
                    max: PlaceFormRules.shortDescription.maxCharacters,
                  }}
                />
              </Form.Item>

              <Form.Item
                name="description"
                label="Description"
                rules={[
                  { validator: validateDescription },
                  ...PlaceFormRules.description.rules,
                ]}
                tooltip={
                  <span>
                    You can write up to{' '}
                    {PlaceFormRules.description.maxCharacters} characters. This
                    description will be displayed on the place page.
                  </span>
                }
              >
                <ReactQuill
                  theme="snow"
                  value={descriptionText}
                  onChange={(value) => {
                    setDescriptionText(value);
                    form.setFieldValue('description', value);
                  }}
                  style={quillStyle}
                />
              </Form.Item>

              <QuillCharacterCount
                characterCount={descriptionCount}
                maxCount={PlaceFormRules.description.maxCharacters}
              />
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

              <Card>
                <Form.Item
                  label="Location"
                  name="location"
                  rules={PlaceFormRules.location}
                  hasFeedback
                  tooltip="You need to select a location on the map to determine the coordinates of the place."
                >
                  <MetaInfoLocationForm location={selectedLocation} />
                </Form.Item>

                <Space size={16}>
                  <MapDrawer onPlaceSelected={setSelectedPlaceFromMap} />
                </Space>
              </Card>

              <Card>
                <Form.Item
                  label="Photo"
                  name="photo"
                  hasFeedback
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  rules={PlaceFormRules.photo.rules}
                  shouldUpdate
                  tooltip={
                    <span>
                      You can upload up to {PlaceFormRules.photo.maxCount}{' '}
                      photo. After uploading, you should save the place.{' '}
                      <SupportedImageFormatsTooltip />
                    </span>
                  }
                >
                  <Upload {...uploadProps}>
                    <Button
                      icon={<UploadOutlined />}
                      disabled={fileList.length > 0}
                    >
                      + Upload (Max: {PlaceFormRules.photo.maxCount})
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
