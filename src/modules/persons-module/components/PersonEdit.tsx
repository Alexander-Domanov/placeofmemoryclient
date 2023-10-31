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
  List,
  notification,
  Row,
  Select,
  Space,
  Spin,
  Typography,
  Upload,
} from 'antd';
import { useRouter } from 'next/router';
import {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
} from 'antd/es/breadcrumb/Breadcrumb';
import Link from 'next/link';
import {
  ClockCircleOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  InboxOutlined,
  SaveOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import { UploadFile } from 'antd/es/upload/interface';
import { IPlaceResultAfterExtract } from '@/modules/maps/components/types/place-result-after-extract.type';
import { ICreatePerson, IGalleryFile, ILocation, IPerson } from '@/types';
import { routes } from '@/common/routing/routes';
import { usePerson } from '@/modules/persons-module/hooks/usePerson';
import { useUpdatePerson } from '@/modules/persons-module/hooks/useUpdatePerson';
import DeletePersonModal from '@/modules/persons-module/components/DeletePersonModal';
import { TitlePlaces } from '@/modules/persons-module/components/TitlePlaces';
import { IResponseError } from '@/types/response-error-message.type';
import { useUpload } from '@/modules/gallery-module/hooks/useUpload';
import { useUpdatePersonStatus } from '@/modules/persons-module/hooks/useUpdatePersonStatus';
import MapDrawer from '@/modules/maps/components/MapDrawer';

const { Option } = Select;

function breadcrumbs(
  fillName: string
): Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[] {
  return [
    {
      key: routes.dashboard.index,
      title: <Link href={routes.dashboard.index}>Dashboard</Link>,
    },
    {
      key: routes.dashboard.persons.index,
      title: <Link href={routes.dashboard.persons.index}>Persons</Link>,
    },
    {
      key: routes.dashboard.persons.breadcrumbs(fillName),
      title: `${fillName}`,
    },
  ];
}

interface IPersonForm {
  firstName: string;
  lastName: string;
  patronymic: string;
  biography: string;
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

  const { person, isLoading } = usePerson(personId);
  const { updatePersonMutation, isUpdating } = useUpdatePerson();
  const { updateStatusPerson } = useUpdatePersonStatus();

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { uploadProps } = useUpload(setFileList);

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
  } | null>(null);
  const [biographyText, setBiographyText] = useState('');
  const [biographyCount, setBiographyCount] = useState(0);

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
      form.setFieldsValue({
        firstName: person.firstName,
        lastName: person.lastName,
        patronymic: person.patronymic,
        ...(person.birthDate && {
          birthDate: dayjs(person.birthDate),
        }),
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
      setBiographyText(person.biography);
      setSelectedLocation(person.location);
      setSelectedPlace({ value: person.place.name, id: person.place.id });
    }
  }, [person]);

  useEffect(() => {
    if (selectedPlaceFromMap) {
      form.setFieldsValue({
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

  const onFinish = (values: IPersonForm) => {
    const newPerson: ICreatePerson = {
      firstName: values.firstName,
      lastName: values.lastName,
      patronymic: values.patronymic,
      biography: values.biography,
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
    if (newPerson.ids.length === 0) {
      notification.error({
        message: 'Gallery is empty',
        description: 'Please, upload at least one image',
        placement: 'bottomLeft',
      });
    } else if (
      newPerson.location === null ||
      newPerson.location === undefined
    ) {
      notification.error({
        message: 'Location is empty',
        description: 'Please, select location',
        placement: 'bottomLeft',
      });
    } else {
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
          onError: (error: IResponseError) => {
            const messages = error?.response?.data?.messages;
            messages?.forEach(({ message }) => {
              notification.error({
                message: `Error: ${message}`,
                placement: 'bottomLeft',
              });
            });
          },
        }
      );
    }
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
            <Col span={16}>
              <Card>
                <Form.Item
                  name="firstName"
                  label="First Name"
                  rules={[{ required: true, whitespace: true }]}
                  hasFeedback
                >
                  <Input placeholder="Input First Name" allowClear />
                </Form.Item>

                <Form.Item
                  name="lastName"
                  label="Last Name"
                  rules={[{ required: true, whitespace: true }]}
                  hasFeedback
                >
                  <Input placeholder="Input Last Name" allowClear />
                </Form.Item>

                <Form.Item
                  name="patronymic"
                  label="Patronymic"
                  rules={[{ whitespace: true }]}
                  hasFeedback
                >
                  <Input placeholder="Input Patronymic" allowClear />
                </Form.Item>

                <Flex gap="large">
                  <Form.Item name="birthDate" label="Birth Date">
                    <DatePicker placeholder="Input Date" format="YYYY-MM-DD" />
                  </Form.Item>

                  <Form.Item name="deathDate" label="Death Date">
                    <DatePicker placeholder="Input Date" format="YYYY-MM-DD" />
                  </Form.Item>
                </Flex>

                <Form.Item name="biography" label="Biography">
                  <ReactQuill
                    theme="snow"
                    value={biographyText}
                    onChange={(value) => {
                      setBiographyText(value);
                      setBiographyCount(value.length);
                      form.setFieldValue('biography', value);
                    }}
                  />
                  <span className="font-normal text-neutral-400">
                    Characters: {biographyCount}
                  </span>
                </Form.Item>
              </Card>
            </Col>

            <Col span={8}>
              <Flex vertical gap={16}>
                <Card>
                  <Form.Item label="Status">
                    <Select value={status} onChange={handleStatusChange}>
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
                  >
                    <Input
                      placeholder="This field is auto generated"
                      allowClear
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
                    <DeletePersonModal person={selectedPerson} showButton />
                  </Space>
                </Card>

                <Card>
                  <Form.Item label="Place">
                    <TitlePlaces onFinishValue={setSelectedPlace} />

                    <Form.Item style={{ marginBottom: 0 }}>
                      <List split={false}>
                        <List.Item>
                          <Typography.Text>
                            <span className="font-normal text-neutral-400">
                              Selected place: &nbsp;
                            </span>
                            {selectedPlace?.value}
                          </Typography.Text>
                          <Button type="dashed" onClick={clearSelectedPlace}>
                            Clear
                          </Button>
                        </List.Item>
                      </List>
                    </Form.Item>
                  </Form.Item>
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
                            <span className="font-normal text-neutral-400">
                              Longitude: &nbsp;
                            </span>
                            {selectedLocation?.lng}
                          </Typography.Text>
                        </List.Item>

                        <List.Item>
                          <Typography.Text>
                            <span className="font-normal text-neutral-400">
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
                    hasFeedback
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={[{ required: true }]}
                  >
                    <Upload {...uploadProps} maxCount={3} multiple>
                      <Button
                        icon={<UploadOutlined />}
                        disabled={fileList.length > 2}
                      >
                        Click to upload
                      </Button>
                    </Upload>
                  </Form.Item>
                </Card>
              </Flex>
            </Col>
          </Row>
        </Form>
      </Spin>
    </Flex>
  );
};
