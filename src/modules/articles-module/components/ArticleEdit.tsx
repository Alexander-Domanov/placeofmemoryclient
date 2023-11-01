import React, { FC, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
} from 'antd/es/breadcrumb/Breadcrumb';
import Link from 'next/link';
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
import {
  DeleteOutlined,
  SaveOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { UploadFile } from 'antd/es/upload/interface';
import { useArticle } from '@/modules/articles-module/hooks/useArticle';
import { routes } from '@/common/routing/routes';
import { useUpload } from '@/modules/gallery-module/hooks/useUpload';
import { useUpdateArticle } from '@/modules/articles-module/hooks/useUpdateArticle';

const { Option } = Select;

const breadcrumbs: Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[] = [
  {
    key: routes.dashboard.index,
    title: <Link href={routes.dashboard.index}>Dashboard</Link>,
  },
  {
    key: routes.dashboard.articles.index,
    title: <Link href={routes.dashboard.articles.index}>Articles</Link>,
  },
  {
    key: routes.dashboard.articles.create,
    title: 'Edit Article',
  },
];

export const ArticleEdit: FC = () => {
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );

  const router = useRouter();
  const id = router.query.id as string;

  const { article, isLoading, isSuccess } = useArticle(id);
  const { mutate, isUpdating } = useUpdateArticle(id);

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { uploadProps } = useUpload(setFileList);

  const [form] = Form.useForm();
  const [status, setStatus] = useState('DRAFT');

  const content = Form.useWatch('content', form);

  const normFile = (e: any) => {
    // console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  useEffect(() => {
    if (article) {
      form.setFieldValue('title', article.title);
      form.setFieldValue('slug', article.slug);
      form.setFieldValue('description', article.description);
      form.setFieldValue('content', article.content);
      form.setFieldValue(
        'photo',
        article.photos.map((f) => ({
          uid: f.uploadId,
          name: 'random.name',
          status: 'done',
          url: f.versions.huge.url,
          response: { ...f },
        }))
      );

      setStatus(article.status);
    }
  }, [article]);

  const onSubmit = (values: any) => {
    const data = {
      title: values.title,
      slug: values.slug,
      description: values.description,
      content: values.content,
      ids: values.photo.map((f: any) => f.response.uploadId),
    };

    mutate(data, {
      onSuccess: () => {
        notification.success({
          message: 'Article updated successfully',
          // description: 'You will be redirected to the place page',
          placement: 'bottomLeft',
        });
      },
    });
  };

  return (
    <Flex gap="large" vertical>
      <div>
        <Breadcrumb items={breadcrumbs} />
      </div>

      <Spin spinning={isLoading}>
        <Form layout="vertical" form={form} onFinish={onSubmit}>
          <Row gutter={[16, 16]}>
            <Col span={18}>
              <Card>
                <Form.Item
                  label="Title"
                  name="title"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Title" />
                </Form.Item>

                <Form.Item
                  label="Slug"
                  name="slug"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Slug" />
                </Form.Item>

                <Form.Item
                  label="Short Description"
                  name="description"
                  rules={[{ required: true }]}
                >
                  <Input.TextArea autoSize placeholder="Short Description" />
                </Form.Item>

                <Form.Item
                  label="Content"
                  name="content"
                  rules={[{ required: true }]}
                >
                  <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={(value) => form.setFieldValue('content', value)}
                  />
                </Form.Item>
              </Card>
            </Col>

            <Col span={6}>
              <Flex vertical gap={16}>
                <Card>
                  <Form.Item label="Status">
                    <Select
                      value={status}
                      onChange={setStatus}
                      loading
                      disabled
                    >
                      <Option value="DRAFT">Draft</Option>
                      <Option value="PENDING_REVIEW">Pending Review</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item>
                    <List split={false}>
                      <List.Item>
                        <Typography.Text>
                          Created At: {article?.createdAt}
                        </Typography.Text>
                      </List.Item>

                      <List.Item>
                        <Typography.Text>
                          Updated At: {article?.updatedAt}
                        </Typography.Text>
                      </List.Item>
                    </List>
                  </Form.Item>

                  <Space size="middle">
                    <Button
                      type="primary"
                      htmlType="submit"
                      title="Save"
                      icon={<SaveOutlined />}
                      loading={isUpdating}
                    >
                      Save
                    </Button>

                    <Button
                      type="primary"
                      title="Delete"
                      danger
                      icon={<DeleteOutlined />}
                    >
                      Delete
                    </Button>
                  </Space>
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
              </Flex>
            </Col>
          </Row>
        </Form>
      </Spin>
    </Flex>
  );
};
