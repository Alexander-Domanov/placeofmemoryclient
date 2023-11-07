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

import {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
} from 'antd/es/breadcrumb/Breadcrumb';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { UploadFile } from 'antd/es/upload/interface';
import {
  ClockCircleOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  InboxOutlined,
  SaveOutlined,
  UploadOutlined,
} from '@ant-design/icons';
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

const { Option } = Select;

interface IPlaceEditForm {
  country: string;
  city: string;
  nameCemetery: string;
  shortDescription: string;
  description: string;
  slug: string;
  photo: UploadFile<IGalleryFile>[];
}

function breadcrumbs(
  name: string
): Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[] {
  return [
    {
      key: routes.dashboard.index,
      title: <Link href={routes.dashboard.index}>Dashboard</Link>,
    },
    {
      key: routes.dashboard.places.index,
      title: <Link href={routes.dashboard.places.index}>Places</Link>,
    },
    {
      key: routes.dashboard.places.breadcrumbs(name as string),
      title: `${name}`,
    },
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

  const { place, isLoading } = usePlace(placeId);
  const { updatePlaceMutate, isUpdating } = useUpdatePlace();
  const { updateStatusPlace, isStatusUpdating } = useUpdatePlaceStatus();

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { uploadProps } = useUpload(setFileList);

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

  return (
    <Flex gap="large" vertical>
      <div>
        <Breadcrumb items={breadcrumbs(place?.nameCemetery as string)} />
      </div>

      <Spin spinning={isLoading}>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={[16, 16]}>
            <Col span={24} lg={16}>
              <Card>
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

            <Col span={24} lg={8}>
              <Flex vertical gap="middle">
                <Card>
                  <Form.Item label="Status">
                    <Select
                      value={status}
                      onChange={handleStatusChange}
                      loading={isStatusUpdating}
                      disabled={isStatusUpdating}
                    >
                      <Option value="DRAFT">
                        <EyeInvisibleOutlined /> Draft
                      </Option>
                      <Option value="PENDING_REVIEW">
                        <ClockCircleOutlined /> Send for review
                      </Option>
                      <Option value="PUBLISHED">
                        <EyeOutlined /> Publish
                      </Option>
                      <Option value="ARCHIVED">
                        <InboxOutlined /> Archive
                      </Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="slug"
                    label="Slug"
                    rules={[{ required: true, whitespace: true }]}
                    hasFeedback
                  >
                    <Input
                      placeholder="This field is auto generated"
                      allowClear
                    />
                  </Form.Item>

                  <Form.Item>
                    <List split={false}>
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

                <Card>
                  <Form.Item
                    label="Location"
                    name="location"
                    rules={[{ required: true }]}
                    hasFeedback
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

                <Card>
                  <Form.Item
                    label="Photo"
                    name="photo"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={[{ required: true }]}
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