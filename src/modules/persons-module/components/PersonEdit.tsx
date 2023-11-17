import React, { FC, useEffect, useMemo, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
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
  Select,
  Space,
  Spin,
  Upload,
} from 'antd';
import { useRouter } from 'next/router';
import { SaveOutlined, UploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import { UploadFile } from 'antd/es/upload/interface';
import { IPlaceResultAfterExtract } from '@/modules/maps/components/types/place-result-after-extract.type';
import { ICreatePerson, IGalleryFile, ILocation, IPerson, Role } from '@/types';
import { routes } from '@/common/routing/routes';
import { usePerson } from '@/modules/persons-module/hooks/usePerson';
import { useUpdatePerson } from '@/modules/persons-module/hooks/useUpdatePerson';
import DeletePersonModal from '@/modules/persons-module/components/DeletePersonModal';
import { TitlePlaces } from '@/modules/persons-module/components/TitlePlaces';
import { useUpload } from '@/modules/gallery-module/hooks/useUpload';
import { useUpdatePersonStatus } from '@/modules/persons-module/hooks/useUpdatePersonStatus';
import MapDrawer from '@/modules/maps/components/MapDrawer';
import MapWithMarkersComponent from '@/modules/maps/components/MapWithMarkers';
import {
  CreateBreadcrumb,
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

const { isCharacterCountExceeded, getQuillStyle } = characterCountUtils;

function breadcrumbs(name: string) {
  return [
    CreateBreadcrumb({ key: routes.main, icon: true }),
    CreateBreadcrumb({ key: routes.dashboard.index, text: 'Dashboard' }),
    CreateBreadcrumb({ key: routes.dashboard.persons.index, text: 'Persons' }),
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
  birthDate: Date;
  deathDate: Date;
  slug: string;
  photo: UploadFile<IGalleryFile>[];
}

export const PersonEdit: FC = () => {
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );
  const router = useRouter();
  const { personId } = router.query as { personId: string };

  const { person, isLoading, me } = usePerson(personId);
  const { updatePersonMutation, isUpdating } = useUpdatePerson();
  const { updateStatusPerson, isStatusUpdating } = useUpdatePersonStatus();

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { uploadProps } = useUpload(setFileList, 'person');

  const [form] = Form.useForm();

  const [selectedPlaceFromMap, setSelectedPlaceFromMap] =
    useState<IPlaceResultAfterExtract | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<IPerson | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<ILocation | null>(
    null
  );
  const [selectedPlace, setSelectedPlace] = useState<{
    value: string;
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
        ...(person.birthDate && {
          birthDate: dayjs(person.birthDate),
        }),
        country: person.country,
        city: person.city,
        ...(person.deathDate && {
          deathDate: dayjs(person.deathDate),
        }),
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
      setBiographyText(person.biography || '');
      setSelectedLocation(person.location);
      setSelectedPlace({
        value: person.place.name,
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
            message: `Changed status to: ${selectedStatus} for person: ${person?.firstName} ${person?.lastName}`,
            placement: 'bottomLeft',
          });
        },
      }
    );
  };

  const clearSelectedPlace = () => {
    setSelectedPlace(null);
  };

  const onFinish = (values: IPersonEditForm) => {
    const newPerson: ICreatePerson = {
      firstName: values.firstName,
      lastName: values.lastName,
      patronymic: values.patronymic,
      biography: values.biography,
      country: values.country,
      city: values.city,
      birthDate: values.birthDate,
      deathDate: values.deathDate,
      placeId: selectedPlace?.id as number,
      slug: values.slug,
      location: {
        place: selectedPlace?.value as string,
        ...selectedLocation,
      } as ILocation,
      ids: values.photo.map((file) => file.response?.uploadId || ''),
    };
    updatePersonMutation(
      { id: personId, person: newPerson },
      {
        onSuccess: () => {
          notification.success({
            message: 'Place updated successfully',
            description: 'You will be redirected to the place page',
            placement: 'bottomLeft',
          });
        },
      }
    );
  };

  const updateOptions = GetUpdateOptions(me);

  const isDisabled = GetDisabledStatus(status, me?.role as Role);

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
        <Breadcrumb
          items={breadcrumbs(`${person?.firstName} ${person?.lastName}`)}
        />
      </div>

      <Spin spinning={isLoading}>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={[16, 16]}>
            <Col span={24} lg={14} md={12}>
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
                    disabled={isDisabled}
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
                    disabled={isDisabled}
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
                    disabled={isDisabled}
                  />
                </Form.Item>

                <Flex gap="large">
                  <Form.Item name="birthDate" label="Birth Date">
                    <DatePicker
                      placeholder="Input Date"
                      format="DD.MM.YYYY"
                      disabled={isDisabled}
                    />
                  </Form.Item>

                  <Form.Item name="deathDate" label="Death Date">
                    <DatePicker
                      placeholder="Input Date"
                      format="DD.MM.YYYY"
                      disabled={isDisabled}
                    />
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

            <Col span={24} lg={10} md={12}>
              <Flex vertical gap="middle">
                <Card>
                  <Form.Item label="Status">
                    <Select
                      value={status}
                      onChange={handleStatusChange}
                      loading={isStatusUpdating}
                      disabled={isStatusUpdating || isDisabled}
                    >
                      {updateOptions}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="slug"
                    label="Slug"
                    rules={PersonFormRules.slug}
                    hasFeedback
                    tooltip="This is a field for SEO and should be unique and contain only latin characters for each person"
                  >
                    <Input.TextArea
                      placeholder="This field is auto generated"
                      count={{
                        show: true,
                        max: PersonFormRules.slug[1].max,
                      }}
                      disabled={isDisabled}
                    />
                  </Form.Item>

                  <Form.Item>
                    <MetaInfoForm
                      slug={person?.slug}
                      path={routes.people.person(person?.slug || '')}
                      owner={person?.owner}
                      createdAt={person?.createdAt}
                      updatedAt={person?.updatedAt}
                    />
                  </Form.Item>

                  <Space size={16}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      title="Save"
                      icon={<SaveOutlined />}
                      loading={isUpdating}
                      disabled={isDisabled}
                    >
                      Save
                    </Button>
                    <DeletePersonModal person={selectedPerson} showButton />
                  </Space>
                </Card>

                <Card>
                  <Form.Item
                    label="Place"
                    tooltip="Select a location from the list to link it to a specific location on the map."
                  >
                    <TitlePlaces
                      onFinishValue={setSelectedPlace}
                      disabled={isDisabled}
                    />

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

                    <MapDrawer
                      onPlaceSelected={setSelectedPlaceFromMap}
                      disabled={isDisabled}
                    />
                  </Form.Item>
                </Card>

                <Flex vertical gap="middle">
                  <Card>
                    <Form.Item
                      label="Photos"
                      name="photo"
                      hasFeedback
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                      rules={PersonFormRules.photo.rules}
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
                        disabled={isDisabled}
                      >
                        <Button
                          icon={<UploadOutlined />}
                          disabled={fileList.length > 2 || isDisabled}
                        >
                          + Upload (Max: {PersonFormRules.photo.maxCount})
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
