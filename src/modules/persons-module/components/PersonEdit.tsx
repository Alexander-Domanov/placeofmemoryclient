import React, { FC, useEffect, useMemo, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
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
  Select,
  Space,
  Spin,
  Upload,
} from 'antd';
import { useRouter } from 'next/router';
import { SaveOutlined, UploadOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import { UploadFile } from 'antd/es/upload/interface';
import { IPlaceResultAfterExtract } from '@/modules/maps/components/types/place-result-after-extract.type';
import {
  ICreatePerson,
  IGalleryFile,
  ILocation,
  IPersonById,
  Role,
} from '@/types';
import { routes } from '@/common/routing/routes';
import { usePerson } from '@/modules/persons-module/hooks/usePerson';
import { useUpdatePerson } from '@/modules/persons-module/hooks/useUpdatePerson';
import { TitlePlaces } from '@/modules/persons-module/components/TitlePlaces';
import { useUpload } from '@/modules/gallery-module/hooks/useUpload';
import { useUpdatePersonStatus } from '@/modules/persons-module/hooks/useUpdatePersonStatus';
import MapDrawer from '@/modules/maps/components/MapDrawer';
import MapWithMarkersComponent from '@/modules/maps/components/MapWithMarkers';
import {
  DashboardSelectLanguage,
  DeleteConfirmationModal,
  GetCharacterCount,
  GetUpdateOptions,
  MetaInfoForm,
  MetaInfoLocationForm,
  MetaInfoSelectedPlaceForm,
  QuillCharacterCount,
  SupportedImageFormatsTooltip,
} from '@/components';
import {
  GetDisabledStatus,
  ValidationOfRedactorValue,
} from '@/common-dashboard';
import { PersonFormRules } from '@/modules/persons-module/constants/PersonFormRules';
import { characterCountUtils } from '@/common-dashboard/utils/characterCountUtils';
import { CreateBreadcrumb } from '@/components/dashboard/helpers/CreateBreadcrumb';
import { useDeletePerson } from '@/modules/persons-module/hooks/useDeletePerson';
import { LocaleType, useTranslation } from '@/components/internationalization';

const { isCharacterCountExceeded, getQuillStyle } = characterCountUtils;

function breadcrumbs(name: string, t: LocaleType) {
  return [
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
      key: routes.dashboard.persons.breadcrumbs(name),
      text: name,
      withLink: false,
    }),
  ];
}

interface IPersonEditForm {
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
  slug: string;
  photo: UploadFile<IGalleryFile>[];
}

export const PersonEdit: FC = () => {
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );
  const router = useRouter();
  const { t } = useTranslation();

  const { personId } = router.query as { personId: string };

  const { person, isLoading, me } = usePerson(personId);
  const { updatePersonMutation, isUpdating } = useUpdatePerson();
  const { updateStatusPerson, isStatusUpdating } = useUpdatePersonStatus();
  const { deletePersonMutationAsync } = useDeletePerson();

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { uploadProps } = useUpload(setFileList, 'person');

  const [form] = Form.useForm();

  const [selectedPlaceFromMap, setSelectedPlaceFromMap] =
    useState<IPlaceResultAfterExtract | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<IPersonById | null>(
    null
  );
  const [selectedLocation, setSelectedLocation] = useState<ILocation | null>(
    null
  );
  const [selectedPlace, setSelectedPlace] = useState<{
    namePlace: string;
    id: number;
    formattedAddress: string;
  } | null>(null);
  const [biographyText, setBiographyText] = useState('');

  const biographyCount = GetCharacterCount(biographyText);

  const [status, setStatus] = useState('DRAFT');

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  useEffect(() => {
    if (person) {
      setSelectedPerson(person);
      setStatus(person.status);
      form.setFieldsValue({
        firstName: person.firstName,
        lastName: person.lastName,
        patronymic: person.patronymic,
        birthDay: person.birthDay,
        birthMonth: person.birthMonth,
        birthYear: person.birthYear,
        deathDay: person.deathDay,
        deathMonth: person.deathMonth,
        deathYear: person.deathYear,
        country: person.country,
        city: person.city,
        biography: person.biography,
        photo: person.photos.map((f) => ({
          uid: f.uploadId,
          name: f.uploadId,
          status: 'done',
          url: f.versions.huge.url,
          response: { ...f },
        })),
        slug: person.slug,
        location: person.location.place,
      });
      setFileList(
        person.photos.map((f) => ({
          uid: f.uploadId,
          name: f.uploadId,
          status: 'done',
          url: f.versions.medium.url,
          response: { ...f },
        }))
      );
      setBiographyText(person.biography || '');
      setSelectedLocation(person.location);
      setSelectedPlace({
        namePlace: person.place.name,
        id: person.place.id,
        formattedAddress: person.place.formattedAddress,
      });
    }
  }, [person]);

  useEffect(() => {
    if (selectedPlaceFromMap) {
      form.setFieldsValue({
        country: selectedPlaceFromMap.country,
        city: selectedPlaceFromMap.city,
        location: selectedPlaceFromMap.location.place,
      });
      setSelectedLocation(selectedPlaceFromMap.location as ILocation);
    }
  }, [selectedPlaceFromMap]);

  const handleStatusChange = (selectedStatus: string) => {
    setStatus(selectedStatus);

    updateStatusPerson(
      { id: personId, status: selectedStatus },
      {
        onSuccess: () => {
          notification.success({
            message: t.dashboard.persons.edit.notification.update.title,
            placement: 'bottomLeft',
          });
        },
      }
    );
  };

  const clearSelectedPlace = () => {
    setSelectedPlace(null);
  };

  const onDeletePerson = () => {
    deletePersonMutationAsync(selectedPerson?.id || null, {
      onSuccess: () => {
        notification.success({
          message: t.dashboard.persons.edit.notification.delete.title,
          placement: 'bottomLeft',
        });
        router.push(routes.dashboard.persons.index);
      },
    });
  };

  const onFinish = (values: IPersonEditForm) => {
    const newPerson: ICreatePerson = {
      firstName: values.firstName,
      lastName: values.lastName,
      patronymic: values.patronymic,
      biography: values.biography,
      country: values.country,
      city: values.city,
      birthDay: values.birthDay || null,
      birthMonth: values.birthMonth || null,
      birthYear: values.birthYear || null,
      deathDay: values.deathDay || null,
      deathMonth: values.deathMonth || null,
      deathYear: values.deathYear || null,
      placeId: selectedPlace?.id as number,
      slug: values.slug || selectedPerson?.slug,
      location: {
        place: selectedPlace?.namePlace as string,
        ...selectedLocation,
      } as ILocation,
      ids: values.photo.map((file) => file.response?.uploadId || ''),
    };

    updatePersonMutation(
      { id: personId, person: newPerson },
      {
        onSuccess: () => {
          notification.success({
            message: t.dashboard.persons.edit.notification.success.title,
            placement: 'bottomLeft',
          });
        },
      }
    );
  };

  const updateOptions = GetUpdateOptions(t, me);

  const isDisabled = GetDisabledStatus(status, me?.role as Role);

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
      message: personFormRules.biography.message,
      value,
      callback,
      t,
    });
  };

  const isShowSlug = me?.role === Role.USER;

  return (
    <Flex gap="large" vertical>
      <Flex justify="space-between">
        <Breadcrumb
          items={breadcrumbs(`${person?.firstName} ${person?.lastName}`, t)}
        />

        <DashboardSelectLanguage />
      </Flex>

      <Spin spinning={isLoading}>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={[16, 16]}>
            <Col span={24} lg={14} md={12}>
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
                    disabled={isDisabled}
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
                    disabled={isDisabled}
                  />
                </Form.Item>

                <Form.Item
                  name="patronymic"
                  label={t.dashboard.persons.form.patronymic.label}
                  rules={personFormRules.patronymic}
                  hasFeedback
                >
                  <Input
                    placeholder={
                      t.dashboard.persons.form.patronymic.placeholder
                    }
                    allowClear
                    count={{
                      show: true,
                      max: personFormRules.patronymic[1].max,
                    }}
                    disabled={isDisabled}
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
                        disabled={isDisabled}
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
                        disabled={isDisabled}
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
                        disabled={isDisabled}
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
                        disabled={isDisabled}
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
                        disabled={isDisabled}
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
                        disabled={isDisabled}
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
                    <span>{t.dashboard.persons.form.biography.tooltip} </span>
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

            <Col span={24} lg={10} md={12}>
              <Flex vertical gap="middle">
                <Card>
                  <Form.Item label={t.dashboard.updateStatus.label}>
                    <Select
                      value={status}
                      onChange={handleStatusChange}
                      loading={isStatusUpdating}
                      disabled={isStatusUpdating || isDisabled}
                    >
                      {updateOptions}
                    </Select>
                  </Form.Item>

                  {!isShowSlug && (
                    <Form.Item
                      name="slug"
                      label={t.dashboard.rules.slug.label}
                      rules={personFormRules.slug}
                      hasFeedback
                      tooltip={t.dashboard.rules.slug.tooltip}
                    >
                      <Input.TextArea
                        placeholder={t.dashboard.rules.slug.placeholder}
                        count={{
                          show: true,
                          max: personFormRules.slug[1].max,
                        }}
                        disabled={isDisabled}
                      />
                    </Form.Item>
                  )}

                  <Form.Item>
                    <MetaInfoForm
                      slug={person?.slug}
                      status={person?.status}
                      path={routes.persons.person(person?.slug || '')}
                      owner={person?.owner}
                      createdAt={person?.createdAt}
                      updatedAt={person?.updatedAt}
                    />
                  </Form.Item>

                  <Space size={16}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      title={t.dashboard.persons.edit.button.save}
                      icon={<SaveOutlined />}
                      loading={isUpdating}
                      disabled={isDisabled}
                    >
                      {t.dashboard.persons.edit.button.save}
                    </Button>

                    <DeleteConfirmationModal<IPersonById>
                      item={selectedPerson}
                      onDelete={onDeletePerson}
                      disabled={isDisabled}
                    />
                  </Space>
                </Card>

                <Card>
                  <Form.Item
                    label={t.dashboard.persons.place.label}
                    tooltip={t.dashboard.persons.place.tooltip}
                  >
                    <TitlePlaces
                      onFinishValue={setSelectedPlace}
                      disabled={isDisabled}
                    />
                  </Form.Item>

                  <MetaInfoSelectedPlaceForm place={selectedPlace} />

                  <Row justify="end">
                    <Button
                      type="dashed"
                      onClick={clearSelectedPlace}
                      disabled={isDisabled}
                    >
                      {t.dashboard.persons.place.clear}
                    </Button>
                  </Row>
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

                  <MapDrawer
                    onPlaceSelected={setSelectedPlaceFromMap}
                    disabled={isDisabled}
                  />
                </Card>

                <Flex vertical gap="middle">
                  <Card>
                    <Form.Item
                      label={t.dashboard.persons.form.photo.label}
                      name="photo"
                      hasFeedback
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                      rules={personFormRules.photo.rules}
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
                        disabled={isDisabled}
                      >
                        <Button
                          icon={<UploadOutlined />}
                          disabled={fileList.length > 2 || isDisabled}
                        >
                          {t.dashboard.persons.create.button.photo} (Max:{' '}
                          {personFormRules.photo.maxCount})
                        </Button>
                      </Upload>
                    </Form.Item>
                  </Card>

                  <Card>
                    <Flex gap="large" vertical>
                      <MapWithMarkersComponent
                        center={{
                          lat: selectedLocation?.lat || 0,
                          lng: selectedLocation?.lng || 0,
                        }}
                        locations={[]}
                      />
                    </Flex>
                  </Card>
                </Flex>
              </Flex>
            </Col>
          </Row>
        </Form>
      </Spin>
    </Flex>
  );
};
