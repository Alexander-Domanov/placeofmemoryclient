import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useRouter } from 'next/router';
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Flex,
  FloatButton,
  Form,
  Input,
  notification,
  Row,
  Select,
  Space,
  Tour,
  Upload,
} from 'antd';
import {
  QuestionCircleOutlined,
  SaveOutlined,
  UploadOutlined,
} from '@ant-design/icons';
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
  DashboardSelectLanguage,
  GetCharacterCount,
  MetaInfoLocationForm,
  MetaInfoSelectedPlaceForm,
  QuillCharacterCount,
  SupportedImageFormatsTooltip,
} from '@/components';
import { characterCountUtils } from '@/common-dashboard/utils/characterCountUtils';
import { PersonFormRules } from '@/modules/persons-module/constants/PersonFormRules';
import { ValidationOfRedactorValue } from '@/common-dashboard';
import { CreateBreadcrumb } from '@/components/dashboard/helpers/CreateBreadcrumb';
import { CreatePersonStepsTour } from '@/modules/persons-module/components/CreatePersonStepsTour';
import { useTranslation } from '@/components/internationalization';

const { isCharacterCountExceeded, getQuillStyle } = characterCountUtils;

interface IPersonForm {
  firstName: string;
  lastName: string;
  patronymic: string;
  biography: string;
  country: string;
  city: string;
  birthDay: number | null;
  birthMonth: number | null;
  birthYear: number | null;
  deathDay: number | null;
  deathMonth: number | null;
  deathYear: number | null;
  photo: UploadFile<IGalleryFile>[];
}

export const CreatePerson: FC = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const ref = useRef(null);
  const [open, setOpen] = useState<boolean>(false);

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
    namePlace: string;
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
        location: selectedPlaceFromMap.formattedAddress,
        country: selectedPlaceFromMap.country,
        city: selectedPlaceFromMap.city,
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

  const clearSelectedPlace = () => {
    setSelectedPlace(null);
  };

  const onFinish = (values: IPersonForm) => {
    const form: ICreatePerson = {
      firstName: values.firstName,
      lastName: values.lastName,
      patronymic: values.patronymic,
      biography: values.biography,
      birthDay: values.birthDay,
      birthMonth: values.birthMonth,
      birthYear: values.birthYear,
      deathDay: values.deathDay,
      deathMonth: values.deathMonth,
      deathYear: values.deathYear,
      country: values.country,
      city: values.city,
      placeId: selectedPlace?.id as number,
      location: {
        place: selectedPlace?.namePlace as string,
        ...selectedLocation,
      } as ILocation,
      ids: values.photo?.map((file) => file.response?.uploadId || ''),
    };

    createPerson(form, {
      onSuccess: (data) => {
        notification.success({
          message: t.dashboard.persons.create.notification.success.title,
          description:
            t.dashboard.persons.create.notification.success.description,
          placement: 'bottomLeft',
        });
        router.push(routes.dashboard.persons.person(data.data.id));
      },
    });
  };

  const personFormRules = PersonFormRules(t);

  const exceeded = isCharacterCountExceeded(
    biographyCount,
    personFormRules.biography.maxCharacters
  );
  const quillStyle = getQuillStyle(exceeded);

  const validateDescription = (
    _: any,
    value: string,
    callback: (message?: string) => void
  ) => {
    return ValidationOfRedactorValue({
      maxCharacters: personFormRules.biography.maxCharacters,
      message: t.dashboard.persons.form.biography.label,
      value,
      callback,
      t,
      isCanEmpty: true,
    });
  };
  const createPersonStepsTour = CreatePersonStepsTour(ref, t);

  const breadcrumbs = [
    CreateBreadcrumb({ key: routes.main, icon: true }),
    CreateBreadcrumb({
      key: routes.dashboard.index,
      text: t.dashboard.indexTitle,
    }),
    CreateBreadcrumb({
      key: routes.dashboard.persons.index,
      text: t.dashboard.persons.index,
    }),
    CreateBreadcrumb({
      key: routes.dashboard.persons.create,
      text: t.dashboard.persons.create.index,
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
                name="firstName"
                label={t.dashboard.persons.form.name.label}
                rules={personFormRules.firstName}
                hasFeedback
              >
                <Input
                  placeholder={t.dashboard.persons.form.name.placeholder}
                  allowClear
                  count={{
                    show: true,
                    max: personFormRules.firstName[1].max,
                  }}
                />
              </Form.Item>

              <Form.Item
                name="lastName"
                label={t.dashboard.persons.form.lastName.label}
                rules={personFormRules.lastName}
                hasFeedback
              >
                <Input
                  placeholder={t.dashboard.persons.form.lastName.placeholder}
                  allowClear
                  count={{
                    show: true,
                    max: personFormRules.lastName[1].max,
                  }}
                />
              </Form.Item>

              <Form.Item
                name="patronymic"
                label={t.dashboard.persons.form.patronymic.label}
                rules={personFormRules.patronymic}
                hasFeedback
              >
                <Input
                  placeholder={t.dashboard.persons.form.patronymic.placeholder}
                  allowClear
                  count={{
                    show: true,
                    max: personFormRules.patronymic[1].max,
                  }}
                />
              </Form.Item>

              <Form.Item>
                <Flex gap="small">
                  <Form.Item
                    name="birthDay"
                    label={t.dashboard.persons.form.birthDay.label}
                  >
                    <Select
                      showSearch
                      allowClear
                      placeholder={
                        t.dashboard.persons.form.birthDay.placeholder
                      }
                    >
                      {Array.from({ length: 31 }, (_, i) => (
                        <Select.Option key={i + 1} value={i + 1}>
                          {i + 1}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="birthMonth"
                    label={t.dashboard.persons.form.birthMonth.label}
                  >
                    <Select
                      showSearch
                      allowClear
                      placeholder={
                        t.dashboard.persons.form.birthMonth.placeholder
                      }
                    >
                      {Array.from({ length: 12 }, (_, i) => (
                        <Select.Option key={i + 1} value={i + 1}>
                          {i + 1}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="birthYear"
                    label={t.dashboard.persons.form.birthYear.label}
                  >
                    <Select
                      showSearch
                      allowClear
                      placeholder={
                        t.dashboard.persons.form.birthYear.placeholder
                      }
                    >
                      {Array.from(
                        { length: new Date().getFullYear() },
                        (_, i) => {
                          const year = new Date().getFullYear() - i;
                          return (
                            <Select.Option key={year} value={year}>
                              {year}
                            </Select.Option>
                          );
                        }
                      )}
                    </Select>
                  </Form.Item>
                </Flex>

                <Flex gap="small">
                  <Form.Item
                    name="deathDay"
                    label={t.dashboard.persons.form.deathDay.label}
                  >
                    <Select
                      showSearch
                      allowClear
                      placeholder={
                        t.dashboard.persons.form.deathDay.placeholder
                      }
                    >
                      {Array.from({ length: 31 }, (_, i) => (
                        <Select.Option key={i + 1} value={i + 1}>
                          {i + 1}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="deathMonth"
                    label={t.dashboard.persons.form.deathMonth.label}
                  >
                    <Select
                      showSearch
                      allowClear
                      placeholder={
                        t.dashboard.persons.form.deathMonth.placeholder
                      }
                    >
                      {Array.from({ length: 12 }, (_, i) => (
                        <Select.Option key={i + 1} value={i + 1}>
                          {i + 1}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="deathYear"
                    label={t.dashboard.persons.form.deathYear.label}
                  >
                    <Select
                      showSearch
                      allowClear
                      placeholder={
                        t.dashboard.persons.form.deathYear.placeholder
                      }
                    >
                      {Array.from(
                        { length: new Date().getFullYear() },
                        (_, i) => {
                          const year = new Date().getFullYear() - i;
                          return (
                            <Select.Option key={year} value={year}>
                              {year}
                            </Select.Option>
                          );
                        }
                      )}
                    </Select>
                  </Form.Item>
                </Flex>
              </Form.Item>

              <Form.Item
                name="country"
                label={t.dashboard.persons.form.country.label}
                rules={personFormRules.country}
                hasFeedback
                tooltip={t.dashboard.persons.form.country.tooltip}
              >
                <Input
                  placeholder={t.dashboard.persons.form.country.na}
                  disabled
                  count={{
                    show: true,
                    max: personFormRules.country[1].max,
                  }}
                />
              </Form.Item>

              <Form.Item
                name="city"
                label={t.dashboard.persons.form.city.label}
                rules={personFormRules.city}
                hasFeedback
                tooltip={t.dashboard.persons.form.city.tooltip}
              >
                <Input
                  placeholder={t.dashboard.persons.form.city.na}
                  disabled
                  count={{
                    show: true,
                    max: personFormRules.city[1].max,
                  }}
                />
              </Form.Item>

              <Form.Item
                name="biography"
                label={t.dashboard.persons.form.biography.label}
                rules={[
                  { validator: validateDescription },
                  ...personFormRules.biography.rules,
                ]}
                tooltip={
                  <span>{t.dashboard.persons.form.biography.tooltip}</span>
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
                maxCount={personFormRules.biography.maxCharacters}
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
                    {t.dashboard.persons.create.button.save}
                  </Button>
                </Space>
              </Card>

              <Card>
                <Form.Item
                  label={t.dashboard.locationInfo.label}
                  name="location"
                  rules={personFormRules.location}
                  hasFeedback
                  tooltip={<span>{t.dashboard.locationInfo.tooltip}</span>}
                >
                  <MetaInfoLocationForm location={selectedLocation} />
                </Form.Item>

                <Space size={16} ref={ref}>
                  <MapDrawer onPlaceSelected={setSelectedPlaceFromMap} />
                </Space>
              </Card>

              <Card>
                <Form.Item
                  label={t.dashboard.persons.form.photo.label}
                  name="photo"
                  hasFeedback
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  rules={personFormRules.photo.rules}
                  shouldUpdate
                  tooltip={
                    <span>
                      {t.dashboard.persons.form.photo.tooltip}
                      <SupportedImageFormatsTooltip />
                    </span>
                  }
                >
                  <Upload
                    {...uploadProps}
                    maxCount={personFormRules.photo.maxCount}
                    multiple
                  >
                    <Button
                      icon={<UploadOutlined />}
                      disabled={fileList.length > 2}
                    >
                      {t.dashboard.persons.create.button.photo} (Max:{' '}
                      {personFormRules.photo.maxCount})
                    </Button>
                  </Upload>
                </Form.Item>
              </Card>

              <Card>
                <Form.Item
                  label={t.dashboard.persons.place.label}
                  tooltip={t.dashboard.persons.place.tooltip}
                >
                  <TitlePlaces onFinishValue={setSelectedPlace} />
                </Form.Item>

                <MetaInfoSelectedPlaceForm place={selectedPlace} />

                <Row justify="end">
                  <Button type="dashed" onClick={clearSelectedPlace}>
                    {t.dashboard.persons.place.clear}
                  </Button>
                </Row>
              </Card>
            </Flex>
          </Col>
        </Row>
      </Form>

      <FloatButton
        icon={<QuestionCircleOutlined />}
        type="primary"
        style={{ right: 24 }}
        onClick={() => setOpen(true)}
      />

      <Tour
        open={open}
        onClose={() => setOpen(false)}
        steps={createPersonStepsTour}
      />
    </Flex>
  );
};
