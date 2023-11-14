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
  List,
  notification,
  Row,
  Select,
  Space,
  Spin,
  Typography,
  Upload,
} from 'antd';
import dynamic from 'next/dynamic';
import { UploadFile } from 'antd/es/upload/interface';
import { SaveOutlined, UploadOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { IPlaceResultAfterExtract } from '@/modules/maps/components/types/place-result-after-extract.type';
import { ICreatePlace, IGalleryFile, ILocation, IPlace } from '@/types';
import { usePlace } from '@/modules/places-module/hooks/usePlace';
import { useUpdatePlace } from '@/modules/places-module/hooks/useUpdatePlace';
import { routes } from '@/common/routing/routes';
import { useUpload } from '@/modules/gallery-module/hooks/useUpload';
import DeletePlaceModal from '@/modules/places-module/components/DeletePlaceModal';
import MapDrawer from '@/modules/maps/components/MapDrawer';
import { useUpdatePlaceStatus } from '@/modules/places-module/hooks/useUpdatePlaceStatus';
import { convertDateToFormat } from '@/common/helpers/convertDateToFormat';
import MapWithMarkersComponent from '@/modules/maps/components/MapWithMarkers';
import { CreateBreadcrumb } from '@/common-dashboard/helpers/CreateBreadcrumb';
import { GetUpdateOptions } from '@/common-dashboard/GetUpdateOptions';

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
  // const MapWithNoSSR = dynamic(
  //   () => import('@/modules/leaflet-maps-module/components/LeafletMap'),
  //   {
  //     ssr: false,
  //     // loading: () => <div>loading...</div>,
  //   }
  // );
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
  const [shortDescriptionText, setShortDescriptionText] = useState('');
  const [descriptionText, setDescriptionText] = useState('');
  const [shortDescriptionCount, setShortDescriptionCount] = useState(0);
  const [descriptionCount, setDescriptionCount] = useState(0);
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
      setShortDescriptionText(place.shortDescription || '');
      setShortDescriptionCount(place.shortDescription?.length || 0);
      setDescriptionText(place.description || '');
      setDescriptionCount(place.description?.length || 0);
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

  return (
    <Flex gap="large" vertical>
      <div>
        <Breadcrumb items={breadcrumbs(place?.nameCemetery as string)} />
      </div>

      <Spin spinning={isLoading}>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={[16, 16]}>
            <Col span={24} lg={14} md={12}>
              <Card bodyStyle={{ marginBottom: -30 }}>
                <Form.Item
                  name="country"
                  label="Country"
                  rules={[{ required: true, whitespace: true }]}
                  hasFeedback
                >
                  <Input placeholder="Input Country" allowClear />
                </Form.Item>

                <Form.Item
                  name="city"
                  label="City"
                  rules={[{ required: true, whitespace: true }]}
                  hasFeedback
                >
                  <Input placeholder="Input City" allowClear />
                </Form.Item>

                <Form.Item
                  name="nameCemetery"
                  label="Name Cemetery"
                  validateDebounce={500}
                  rules={[{ required: true, min: 2, max: 200 }]}
                  hasFeedback
                >
                  <Input placeholder="Input Name Cemetery" allowClear />
                </Form.Item>

                <Form.Item
                  name="shortDescription"
                  label="Short Description"
                  rules={[{ required: true }]}
                >
                  <ReactQuill
                    theme="snow"
                    value={shortDescriptionText}
                    onChange={(value) => {
                      setShortDescriptionText(value);
                      setShortDescriptionCount(value.length);
                      form.setFieldValue('shortDescription', value);
                    }}
                  />
                  <span className="text-neutral-400">
                    Characters: {shortDescriptionCount}
                  </span>
                </Form.Item>

                <Form.Item
                  name="description"
                  label="Description"
                  rules={[{ required: true }]}
                >
                  <ReactQuill
                    theme="snow"
                    value={descriptionText}
                    onChange={(value) => {
                      setDescriptionText(value);
                      setDescriptionCount(value.length);
                      form.setFieldValue('description', value);
                    }}
                  />
                  <span className="text-neutral-400">
                    Characters: {descriptionCount}
                  </span>
                </Form.Item>
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
                    rules={[{ required: true, whitespace: true }]}
                    tooltip="This is a field for SEO and should be unique and contain only latin characters for each place."
                    hasFeedback
                  >
                    <Input
                      placeholder="This field is auto generated"
                      allowClear
                    />
                  </Form.Item>

                  <Form.Item>
                    <List split={false}>
                      <List.Item draggable>
                        <Typography.Text>
                          <span className="text-neutral-400">
                            Public link: &nbsp;
                          </span>
                          <Link
                            href={{
                              pathname: routes.places.place(
                                selectedPlace?.slug || ''
                              ),
                            }}
                          >
                            <Typography.Text
                              ellipsis
                              style={{ cursor: 'pointer', color: '#1087f6' }}
                            >
                              {selectedPlace?.slug || ''}
                            </Typography.Text>
                          </Link>
                        </Typography.Text>
                      </List.Item>

                      <List.Item draggable>
                        <Typography.Text>
                          <span className="text-neutral-400">
                            Owner: &nbsp;
                          </span>
                          {selectedPlace?.owner?.userName}
                        </Typography.Text>
                      </List.Item>

                      <List.Item>
                        <Typography.Text>
                          <span className="text-neutral-400">
                            Created At: &nbsp;
                          </span>
                          {convertDateToFormat(place?.createdAt)}
                        </Typography.Text>
                      </List.Item>

                      <List.Item>
                        <Typography.Text>
                          <span className="text-neutral-400">
                            Updated At: &nbsp;
                          </span>
                          {convertDateToFormat(place?.updatedAt)}
                        </Typography.Text>
                      </List.Item>
                    </List>
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

                <Card bodyStyle={{ marginBottom: -20 }}>
                  <Form.Item
                    label="Location"
                    name="location"
                    rules={[{ required: true }]}
                    hasFeedback
                    tooltip="You need to select a location on the map to determine the coordinates of the place."
                  >
                    <Form.Item>
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
                    </Form.Item>

                    <MapDrawer onPlaceSelected={setSelectedPlaceFromMap} />
                  </Form.Item>
                </Card>

                <Card bodyStyle={{ marginBottom: -20 }}>
                  <Form.Item
                    label="Photo"
                    name="photo"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={[{ required: true }]}
                    tooltip="You can upload up to one photo. After uploading, you should save the place."
                  >
                    <Upload {...uploadProps}>
                      <Button
                        icon={<UploadOutlined />}
                        disabled={fileList.length > 0}
                      >
                        Click to upload
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
