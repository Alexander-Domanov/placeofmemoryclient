import React, { FC, useEffect, useMemo, useState } from 'react';
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
  Modal,
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
  ClockCircleOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  InboxOutlined,
  SaveOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { UploadFile } from 'antd/es/upload/interface';
import Link from 'next/link';
import { useArticle } from '@/modules/articles-module/hooks/useArticle';
import { routes } from '@/common/routing/routes';
import { useUpload } from '@/modules/gallery-module/hooks/useUpload';
import { useUpdateArticle } from '@/modules/articles-module/hooks/useUpdateArticle';
import { useUpdateArticleStatus } from '@/modules/articles-module/hooks/useUpdateArticleStatus';
import { convertDateToFormat } from '@/common/helpers/convertDateToFormat';
import { useDeleteArticle } from '@/modules/articles-module/hooks/useDeleteArticle';
import { CreateBreadcrumb } from '@/common-dashboard/helpers/CreateBreadcrumb';

const { Option } = Select;

const { confirm } = Modal;

function breadcrumbs(name: string) {
  return [
    CreateBreadcrumb({ key: routes.main, icon: true }),
    CreateBreadcrumb({ key: routes.dashboard.index, text: 'Dashboard' }),
    CreateBreadcrumb({
      key: routes.dashboard.articles.index,
      text: 'Articles',
    }),
    CreateBreadcrumb({
      key: routes.dashboard.articles.breadcrumbs(name),
      text: name,
      withLink: false,
    }),
  ];
}

export const ArticleEdit: FC = () => {
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );

  const router = useRouter();
  const id = router.query.id as string;

  const { article, isLoading } = useArticle(id);
  const { mutate, isUpdating } = useUpdateArticle(id);
  const { updateStatusArticle, isStatusUpdating } = useUpdateArticleStatus();
  const { deleteArticleMutationAsync } = useDeleteArticle();

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { uploadProps } = useUpload(setFileList, 'article');

  const [form] = Form.useForm();
  const [status, setStatus] = useState('DRAFT');

  const [contentText, setContentText] = useState<string>('');
  const [contentCount, setContentCount] = useState<number>(0);

  const onStatusChange = (status: string) => {
    setStatus(status);

    updateStatusArticle(
      { id: +id, status },
      {
        onSuccess: () => {
          notification.success({
            message: 'Status updated successfully',
            placement: 'bottomLeft',
          });
        },
      }
    );
  };

  const normFile = (e: any) => {
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
      // form.setFieldValue('content', article.content);
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
      setContentText(article.content || '');
      setContentCount(article.content?.length || 0);
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
          placement: 'bottomLeft',
        });
      },
    });
  };

  const onDelete = () => {
    confirm({
      title: 'Do you want to delete these article?',
      okType: 'danger',
      onOk() {
        return deleteArticleMutationAsync(+id, {
          onSuccess: () => {
            notification.success({
              message: 'Article was deleted successfully',
              placement: 'bottomLeft',
            });

            router.push(routes.dashboard.articles.index);
          },
        });
      },
    });
  };

  return (
    <Flex gap="large" vertical>
      <div>
        <Breadcrumb items={breadcrumbs(article?.title || '')} />
      </div>

      <Spin spinning={isLoading}>
        <Form layout="vertical" form={form} onFinish={onSubmit}>
          <Row gutter={[16, 16]}>
            <Col span={24} lg={16}>
              <Card>
                <Form.Item
                  label="Title"
                  name="title"
                  rules={[{ required: true }]}
                  hasFeedback
                >
                  <Input placeholder="Title" />
                </Form.Item>

                <Form.Item
                  label="Short Description"
                  name="description"
                  rules={[{ required: true }]}
                  hasFeedback
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
                    value={contentText}
                    onChange={(value) => {
                      setContentText(value);
                      setContentCount(value.length);
                      form.setFieldValue('content', value);
                    }}
                  />
                  <span className="font-normal text-neutral-400">
                    Characters: {contentCount}
                  </span>
                </Form.Item>
              </Card>
            </Col>

            <Col span={24} md={12} lg={8}>
              <Flex vertical gap={16}>
                <Card>
                  <Form.Item label="Status">
                    <Select
                      value={status}
                      onChange={onStatusChange}
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
                    label="Slug"
                    name="slug"
                    rules={[{ required: true }]}
                    hasFeedback
                    tooltip="This is a field for SEO and should be unique and contain only latin characters for each article"
                  >
                    <Input placeholder="Slug" />
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
                              pathname: routes.articles.getArticle(
                                article?.slug || ''
                              ),
                            }}
                          >
                            <Typography.Text
                              ellipsis
                              style={{ cursor: 'pointer', color: '#1087f6' }}
                            >
                              {article?.slug || ''}
                            </Typography.Text>
                          </Link>
                        </Typography.Text>
                      </List.Item>

                      <List.Item draggable>
                        <Typography.Text>
                          <span className="text-neutral-400">
                            Owner: &nbsp;
                          </span>
                          {article?.owner?.userName}
                        </Typography.Text>
                      </List.Item>

                      <List.Item>
                        <Typography.Text>
                          <span className="font-normal text-neutral-400">
                            Created At: &nbsp;
                          </span>
                          {convertDateToFormat(article?.createdAt)}
                        </Typography.Text>
                      </List.Item>

                      <List.Item>
                        <Typography.Text>
                          <span className="font-normal text-neutral-400">
                            Updated At: &nbsp;
                          </span>
                          {convertDateToFormat(article?.updatedAt)}
                        </Typography.Text>
                      </List.Item>
                    </List>
                  </Form.Item>

                  <Space size="middle" wrap>
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
                      ghost
                      icon={<DeleteOutlined />}
                      onClick={onDelete}
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
                    tooltip="You can upload up to one photo. After uploading, you should save the article."
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
