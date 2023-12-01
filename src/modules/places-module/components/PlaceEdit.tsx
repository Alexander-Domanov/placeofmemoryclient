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
  Select,
  Space,
  Spin,
  Upload,
} from 'antd';
import dynamic from 'next/dynamic';
import { UploadFile } from 'antd/es/upload/interface';
import { SaveOutlined, UploadOutlined } from '@ant-design/icons';
import { IPlaceResultAfterExtract } from '@/modules/maps/components/types/place-result-after-extract.type';
import {
  ICreatePlace,
  IGalleryFile,
  ILocation,
  IPlace,
  Statuses,
} from '@/types';
import { usePlace } from '@/modules/places-module/hooks/usePlace';
import { useUpdatePlace } from '@/modules/places-module/hooks/useUpdatePlace';
import { routes } from '@/common/routing/routes';
import { useUpload } from '@/modules/gallery-module/hooks/useUpload';
import MapDrawer from '@/modules/maps/components/MapDrawer';
import { useUpdatePlaceStatus } from '@/modules/places-module/hooks/useUpdatePlaceStatus';
import MapWithMarkersComponent from '@/modules/maps/components/MapWithMarkers';
import {
  DashboardSelectLanguage,
  DeleteConfirmationModal,
  GetCharacterCount,
  GetUpdateOptions,
  MetaInfoForm,
  MetaInfoLocationForm,
  QuillCharacterCount,
  SupportedImageFormatsTooltip,
} from '@/components';
import { PlaceFormRules } from '@/modules/places-module/constants/PlaceFormRules';
import { ValidationOfRedactorValue } from '@/common-dashboard';
import { characterCountUtils } from '@/common-dashboard/utils/characterCountUtils';
import { CreateBreadcrumb } from '@/components/dashboard/helpers/CreateBreadcrumb';
import { useDeletePlace } from '@/modules/places-module/hooks/useDeletePlace';
import { LocaleType, useTranslation } from '@/components/internationalization';

const { isCharacterCountExceeded, getQuillStyle } = characterCountUtils;

interface IPlaceEditForm {
  country: string;
  city: string;
  nameCemetery: string;
  shortDescription: string;
  description: string;
  slug: string;
  photo: UploadFile<IGalleryFile>[];
}

function breadcrumbs(name: string, t: LocaleType) {
  return [
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
      key: routes.dashboard.places.breadcrumbs(name),
      text: `${name}`,
      withLink: false,
    }),
  ];
}

export const PlaceEdit: FC = () => {
  const { t } = useTranslation();
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );
  const router = useRouter();
  const { placeId } = router.query as { placeId: string };

  const { place, isLoading, me } = usePlace(placeId);
  const { updatePlaceMutate, isUpdating } = useUpdatePlace();
  const { updateStatusPlace, isStatusUpdating } = useUpdatePlaceStatus();

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { uploadProps } = useUpload(setFileList, 'place');

  const { deletePlaceMutationAsync } = useDeletePlace();

  const [form] = Form.useForm();

  const [selectedPlaceFromMap, setSelectedPlaceFromMap] =
    useState<IPlaceResultAfterExtract | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<IPlace | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<ILocation | null>(
    null
  );
  const [descriptionText, setDescriptionText] = useState('');
  const descriptionCount = GetCharacterCount(descriptionText);

  const [status, setStatus] = useState('DRAFT');

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  useEffect(() => {
    if (place) {
      setSelectedPlace(place);
      form.setFieldsValue({
        country: place.country,
        city: place.city,
        nameCemetery: place.nameCemetery,
        shortDescription: place.shortDescription,
        description: place.description,
        photo: place.photos.map((f) => ({
          uid: f.uploadId,
          name: f.uploadId,
          status: 'done',
          url: f.versions.huge.url,
          response: { ...f },
        })),
        slug: place.slug,
        location: place.location.place,
      });
      setFileList(
        place.photos.map((f) => ({
          uid: f.uploadId,
          name: f.uploadId,
          status: 'done',
          url: f.versions.medium.url,
          response: { ...f },
        }))
      );
      setDescriptionText(place.description || '');
      setSelectedLocation(place.location);
      setStatus(place.status);
    }
  }, [place]);

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

    updateStatusPlace(
      { id: placeId, status: selectedStatus },
      {
        onSuccess: () => {
          notification.success({
            message: t.dashboard.places.edit.notification.update.title,
            placement: 'bottomLeft',
          });
        },
      }
    );
  };

  const onDeletePlace = () => {
    deletePlaceMutationAsync(selectedPlace?.id || null, {
      onSuccess() {
        notification.success({
          message: t.dashboard.places.edit.notification.delete.title,
          placement: 'bottomLeft',
        });
        router.push(routes.dashboard.places.index);
      },
    });
  };

  const onFinish = (values: IPlaceEditForm) => {
    const newPlace: ICreatePlace = {
      country: values.country,
      city: values.city,
      nameCemetery: values.nameCemetery,
      shortDescription: values.shortDescription,
      description: values.description,
      slug: values.slug,
      location: selectedLocation as ILocation,
      ids: values.photo.map((file) => file.response?.uploadId || ''),
    };

    updatePlaceMutate(
      { id: placeId, place: newPlace },
      {
        onSuccess: () => {
          notification.success({
            message: t.dashboard.places.edit.notification.success.title,
            placement: 'bottomLeft',
          });
        },
      }
    );
  };

  const placeFormRules = PlaceFormRules(t);

  const updateOptions = GetUpdateOptions({ status: status as Statuses, me });

  const exceededDescription = isCharacterCountExceeded(
    GetCharacterCount(descriptionText),
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

  return (
    <Flex gap="large" vertical>
      <Flex justify="space-between">
        <Breadcrumb items={breadcrumbs(place?.nameCemetery as string, t)} />

        <DashboardSelectLanguage />
      </Flex>

      <Spin spinning={isLoading}>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={[16, 16]}>
            <Col span={24} lg={14} md={12}>
              <Card>
                <Form.Item
                  name="country"
                  label={t.dashboard.places.form.country.label}
                  rules={placeFormRules.country}
                  hasFeedback
                >
                  <Input
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
                  <Input
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
                  <Input
                    placeholder={
                      t.dashboard.places.form.nameCemetery.placeholder
                    }
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

            <Col span={24} lg={10} md={12}>
              <Flex vertical gap="middle">
                <Card>
                  <Form.Item label={t.dashboard.updateStatus.label}>
                    <Select
                      value={status}
                      onChange={handleStatusChange}
                      loading={isStatusUpdating}
                      disabled={isStatusUpdating}
                    >
                      {updateOptions}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="slug"
                    label={t.dashboard.rules.slug.label}
                    rules={placeFormRules.slug}
                    tooltip={t.dashboard.rules.slug.tooltip}
                    hasFeedback
                  >
                    <Input.TextArea
                      placeholder={t.dashboard.rules.slug.placeholder}
                      count={{
                        show: true,
                        max: placeFormRules.slug[1].max,
                      }}
                    />
                  </Form.Item>

                  <Form.Item>
                    <MetaInfoForm
                      slug={place?.slug}
                      status={place?.status}
                      path={routes.places.place(place?.slug || '')}
                      owner={place?.owner}
                      createdAt={place?.createdAt}
                      updatedAt={place?.updatedAt}
                    />
                  </Form.Item>

                  <Space size={16}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      title={t.dashboard.places.edit.button.save}
                      icon={<SaveOutlined />}
                      loading={isUpdating}
                    >
                      {t.dashboard.places.edit.button.save}
                    </Button>

                    <DeleteConfirmationModal<IPlace>
                      item={selectedPlace}
                      onDelete={onDeletePlace}
                    />
                  </Space>
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

                  <MapDrawer onPlaceSelected={setSelectedPlaceFromMap} />
                </Card>

                <Card>
                  <Form.Item
                    label={t.dashboard.places.form.photo.label}
                    name="photo"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={placeFormRules.photo.rules}
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

                <Card>
                  <Flex gap="large" vertical>
                    <MapWithMarkersComponent
                      center={{
                        lat: selectedLocation?.lat || 0,
                        lng: selectedLocation?.lng || 0,
                      }}
                      locations={selectedPlace?.personsLocation || []}
                    />
                  </Flex>
                </Card>
              </Flex>
            </Col>
          </Row>
        </Form>
      </Spin>
    </Flex>
  );
};
