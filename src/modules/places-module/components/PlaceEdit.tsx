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
import { ICreatePlace, IGalleryFile, ILocation, IPlace } from '@/types';
import { usePlace } from '@/modules/places-module/hooks/usePlace';
import { useUpdatePlace } from '@/modules/places-module/hooks/useUpdatePlace';
import { routes } from '@/common/routing/routes';
import { useUpload } from '@/modules/gallery-module/hooks/useUpload';
import DeletePlaceModal from '@/modules/places-module/components/DeletePlaceModal';
import MapDrawer from '@/modules/maps/components/MapDrawer';
import { useUpdatePlaceStatus } from '@/modules/places-module/hooks/useUpdatePlaceStatus';
import MapWithMarkersComponent from '@/modules/maps/components/MapWithMarkers';
import {
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

function breadcrumbs(name: string) {
  return [
    CreateBreadcrumb({ key: routes.main, icon: true }),
    CreateBreadcrumb({ key: routes.dashboard.index, text: 'Dashboard' }),
    CreateBreadcrumb({ key: routes.dashboard.places.index, text: 'Places' }),
    CreateBreadcrumb({
      key: routes.dashboard.places.breadcrumbs(name),
      text: `${name}`,
      withLink: false,
    }),
  ];
}

export const PlaceEdit: FC = () => {
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
        nameCemetery: selectedPlaceFromMap.formattedAddress,
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
            message: `Changed status to: ${selectedStatus} for place: ${place?.nameCemetery}`,
            placement: 'bottomLeft',
          });
        },
      }
    );
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
            message: 'Place updated successfully',
            description: 'You will be redirected to the place page',
            placement: 'bottomLeft',
          });
        },
      }
    );
  };

  const updateOptions = GetUpdateOptions(me);

  const exceededDescription = isCharacterCountExceeded(
    GetCharacterCount(descriptionText),
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
    });
  };

  return (
    <Flex gap="large" vertical>
      <div>
        <Breadcrumb items={breadcrumbs(place?.nameCemetery as string)} />
      </div>

      <Spin spinning={isLoading}>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={[16, 16]}>
            <Col span={24} lg={14} md={12}>
              <Card>
                <Form.Item
                  name="country"
                  label="Country"
                  rules={PlaceFormRules.country}
                  hasFeedback
                >
                  <Input
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
                  <Input
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
                      characters. The name of the cemetery should be unique.
                      After writing, you can save the place.
                    </span>
                  }
                >
                  <Input
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
                      {PlaceFormRules.shortDescription.maxCharacters}{' '}
                      characters. This description will be displayed on the main
                      page as a preview of the place.
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
                      {PlaceFormRules.description.maxCharacters} characters.
                      This description will be displayed on the place page.
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

            <Col span={24} lg={10} md={12}>
              <Flex vertical gap="middle">
                <Card>
                  <Form.Item label="Status">
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
                    label="Slug"
                    rules={PlaceFormRules.slug}
                    tooltip="This is a field for SEO and should be unique and contain only latin characters for each place."
                    hasFeedback
                  >
                    <Input.TextArea
                      placeholder="This field is auto generated"
                      count={{
                        show: true,
                        max: PlaceFormRules.slug[1].max,
                      }}
                    />
                  </Form.Item>

                  <Form.Item>
                    <MetaInfoForm
                      slug={place?.slug}
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
                      title="Save"
                      icon={<SaveOutlined />}
                      loading={isUpdating}
                    >
                      Save
                    </Button>

                    <DeletePlaceModal place={selectedPlace} showButton />
                  </Space>
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

                    <MapDrawer onPlaceSelected={setSelectedPlaceFromMap} />
                  </Form.Item>
                </Card>

                <Card>
                  <Form.Item
                    label="Photo"
                    name="photo"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={PlaceFormRules.photo.rules}
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
