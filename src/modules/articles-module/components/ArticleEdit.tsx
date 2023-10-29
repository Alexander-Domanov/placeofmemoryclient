import { FC, useEffect, useMemo, useState } from 'react';
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
  Row,
  Spin,
  Upload,
} from 'antd';
import dynamic from 'next/dynamic';
import { UploadOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/es/upload/interface';
import { useArticle } from '@/modules/articles-module/hooks/useArticle';
import { routes } from '@/common/routing/routes';
import { ChooseGalleryFiles } from '@/modules/gallery-module';
import { IGalleryFile } from '@/types';
import { useDraggerProps } from '@/modules/gallery-module/hooks/useDraggerProps';

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
  const router = useRouter();
  const id = router.query.id as string;

  const { article, isLoading, isSuccess } = useArticle(id);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { draggerProps } = useDraggerProps(setFileList);
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );
  const [form] = Form.useForm();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // const [content, setContent] = useState('');
  const [photos, setPhotos] = useState<IGalleryFile[]>([]);

  const content = Form.useWatch('content', form);

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  useEffect(() => {
    if (article) {
      console.log('use effect', article);

      // setTitle(article.title);
      form.setFieldValue('title', article.title);
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
      // form.setFieldValue('photo', [
      //   {
      //     uid: '-1',
      //     name: 'image.png',
      //     status: 'done',
      //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      //   },
      //   {
      //     uid: '-2',
      //     name: 'image.png',
      //     status: 'done',
      //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      //   },
      //   {
      //     uid: '-3',
      //     name: 'image.png',
      //     status: 'done',
      //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      //   },
      //   {
      //     uid: '-4',
      //     name: 'image.png',
      //     status: 'done',
      //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      //   },
      // ]);
      // setContent(article.content);
      // setDescription(article.description);
      // setContent(article.content);
      // setPhotos(article.photos);
    }
  }, [article]);

  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Flex gap="large" vertical>
      <div>
        <Breadcrumb items={breadcrumbs} />
      </div>

      <Row gutter={[16, 16]}>
        <Col span={18}>
          <Spin spinning={isLoading}>
            <Card>
              <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>

              <Form layout="vertical" form={form} onFinish={onSubmit}>
                <Form.Item
                  label="Title"
                  name="title"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Title" />
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
                    onChange={(value) => {
                      form.setFieldValue('content', value);
                      // form.
                    }}
                  />
                </Form.Item>

                <Form.Item
                  label="Photo"
                  name="photo"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  rules={[{ required: true }]}
                  shouldUpdate
                >
                  <Upload {...draggerProps}>
                    <Button
                      icon={<UploadOutlined />}
                      disabled={fileList.length > 0}
                    >
                      Click to upload
                    </Button>
                  </Upload>
                </Form.Item>

                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form>
            </Card>
          </Spin>
        </Col>

        <Col span={6}>
          <Card />
        </Col>
      </Row>
    </Flex>
  );
};
