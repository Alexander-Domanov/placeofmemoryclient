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
import { useUpload } from '@/modules/gallery-module/hooks/useUpload';
import { useUpdatePersonStatus } from '@/modules/persons-module/hooks/useUpdatePersonStatus';
import MapDrawer from '@/modules/maps/components/MapDrawer';
import { convertDateToFormat } from '@/common/helpers/convertDateToFormat';
import MapWithMarkersComponent from '@/modules/maps/components/MapWithMarkers';
import { CreateBreadcrumb } from '@/common-dashboard/helpers/CreateBreadcrumb';

const { Option } = Select;

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
  const { updateStatusPerson, isStatusUpdating } = useUpdatePersonStatus();

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
    formattedAddress: string;
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
      setBiographyText(person.biography || '');
      setBiographyCount(person.biography?.length || 0);
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
                  <span className="text-neutral-400">
                    Characters: {biographyCount}
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

                  <Form.Item>
                    <List split={false}>
                      <List.Item>
                        <Typography.Text>
                          <span className="text-neutral-400">
                            Created At: &nbsp;
                          </span>
                          {convertDateToFormat(person?.createdAt)}
                        </Typography.Text>
                      </List.Item>

                      <List.Item>
                        <Typography.Text>
                          <span className="text-neutral-400">
                            Updated At: &nbsp;
                          </span>
                          {convertDateToFormat(person?.updatedAt)}
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
                            <span className="text-neutral-400">
                              Selected place: &nbsp;
                            </span>
                            {selectedPlace?.value}
                          </Typography.Text>
                        </List.Item>

                        <List.Item>
                          <Typography.Text>
                            <span className="text-neutral-400">
                              Formatted address: &nbsp;
                            </span>
                            {selectedPlace?.formattedAddress}
                          </Typography.Text>
                        </List.Item>

                        <Row justify="end">
                          <Button type="dashed" onClick={clearSelectedPlace}>
                            Clear
                          </Button>
                        </Row>
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

                <Flex vertical gap="middle">
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
