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
  DashboardSelectLanguage,
  GetCharacterCount,
  MetaInfoLocationForm,
  QuillCharacterCount,
  SupportedImageFormatsTooltip,
} from '@/components';
import { PlaceFormRules } from '@/modules/places-module/constants/PlaceFormRules';
import { ValidationOfRedactorValue } from '@/common-dashboard';
import { characterCountUtils } from '@/common-dashboard/utils/characterCountUtils';
import { useTranslation } from '@/components/internationalization';
import { CreateBreadcrumb } from '@/components/dashboard/helpers/CreateBreadcrumb';

const { isCharacterCountExceeded, getQuillStyle } = characterCountUtils;

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
          message: t.dashboard.places.create.notification.success.title,
          description:
            t.dashboard.places.create.notification.success.description,
          placement: 'bottomLeft',
        });
        router.push(routes.dashboard.places.place(data.data.id));
      },
    });
  };

  const placeFormRules = PlaceFormRules(t);

  const exceededDescription = isCharacterCountExceeded(
    descriptionCount,
    placeFormRules.description.maxCharacters
  );
  const quillStyle = getQuillStyle(exceededDescription);

  const validateDescription = (
    _: any,
    value: string,
    callback: (message?: string) => void
  ) => {
    return ValidationOfRedactorValue({
      maxCharacters: placeFormRules.description.maxCharacters,
      message: t.dashboard.places.form.description.label,
      value,
      callback,
      t,
    });
  };

  const breadcrumbs = [
    CreateBreadcrumb({ key: routes.main, icon: true }),
    CreateBreadcrumb({
      key: routes.dashboard.index,
      text: t.dashboard.indexTitle,
    }),
    CreateBreadcrumb({
      key: routes.dashboard.places.index,
      text: t.dashboard.places.index,
    }),
    CreateBreadcrumb({
      key: routes.dashboard.places.create,
      text: t.dashboard.places.create.index,
      withLink: false,
    }),
  ];

  return (
    <Flex gap="large" vertical>
      <Flex justify="space-between">
        <Breadcrumb items={breadcrumbs} />

        <DashboardSelectLanguage />
      </Flex>

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
                label={t.dashboard.places.form.country.label}
                rules={placeFormRules.country}
                hasFeedback
              >
                <Input.TextArea
                  placeholder={t.dashboard.places.form.country.placeholder}
                  count={{
                    show: true,
                    max: placeFormRules.country[1].max,
                  }}
                />
              </Form.Item>

              <Form.Item
                name="city"
                label={t.dashboard.places.form.city.label}
                rules={placeFormRules.city}
                hasFeedback
              >
                <Input.TextArea
                  placeholder={t.dashboard.places.form.city.placeholder}
                  count={{
                    show: true,
                    max: placeFormRules.city[1].max,
                  }}
                />
              </Form.Item>

              <Form.Item
                name="nameCemetery"
                label={t.dashboard.places.form.nameCemetery.label}
                rules={placeFormRules.nameCemetery}
                hasFeedback
                tooltip={
                  <span>{t.dashboard.places.form.nameCemetery.tooltip}</span>
                }
              >
                <Input.TextArea
                  placeholder={t.dashboard.places.form.nameCemetery.placeholder}
                  count={{
                    show: true,
                    max: placeFormRules.nameCemetery[1].max,
                  }}
                />
              </Form.Item>

              <Form.Item
                name="shortDescription"
                label={t.dashboard.places.form.shortDescription.label}
                rules={placeFormRules.shortDescription.rules}
                hasFeedback
                tooltip={
                  <span>
                    {t.dashboard.places.form.shortDescription.tooltip}
                  </span>
                }
              >
                <Input.TextArea
                  placeholder={
                    t.dashboard.places.form.shortDescription.placeholder
                  }
                  count={{
                    show: true,
                    max: placeFormRules.shortDescription.maxCharacters,
                  }}
                />
              </Form.Item>

              <Form.Item
                name="description"
                label={t.dashboard.places.form.description.label}
                rules={[
                  { validator: validateDescription },
                  ...placeFormRules.description.rules,
                ]}
                tooltip={
                  <span>{t.dashboard.places.form.description.tooltip}</span>
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
                maxCount={placeFormRules.description.maxCharacters}
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
                  {t.dashboard.places.create.button.save}
                </Button>
              </Card>

              <Card>
                <Form.Item
                  label={t.dashboard.locationInfo.label}
                  name="location"
                  rules={placeFormRules.location}
                  hasFeedback
                  tooltip={<span>{t.dashboard.locationInfo.tooltip}</span>}
                >
                  <MetaInfoLocationForm location={selectedLocation} />
                </Form.Item>

                <Space size={16}>
                  <MapDrawer onPlaceSelected={setSelectedPlaceFromMap} />
                </Space>
              </Card>

              <Card>
                <Form.Item
                  label={t.dashboard.places.form.photo.label}
                  name="photo"
                  hasFeedback
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  rules={placeFormRules.photo.rules}
                  shouldUpdate
                  tooltip={
                    <span>
                      {t.dashboard.places.form.photo.tooltip}
                      <SupportedImageFormatsTooltip />
                    </span>
                  }
                >
                  <Upload {...uploadProps}>
                    <Button
                      icon={<UploadOutlined />}
                      disabled={fileList.length > 0}
                    >
                      {t.dashboard.places.create.button.photo} (Max:{' '}
                      {placeFormRules.photo.maxCount})
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
