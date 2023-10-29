import { FC, useMemo, useState } from 'react';
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Flex,
  Form,
  Input,
  Row,
  Upload,
} from 'antd';
import {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
} from 'antd/es/breadcrumb/Breadcrumb';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import { routes } from '@/common/routing/routes';
import 'react-quill/dist/quill.snow.css';
import { IGalleryFile } from '@/types';
import { useCreateArticle } from '../hooks/useCreateArticle';
import { useUpload } from '@/modules/gallery-module/hooks/useUpload';

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
    title: 'Create Article',
  },
];

interface ArticleForm {
  title: string;
  description: string;
  content: string;
  photo: UploadFile<IGalleryFile>[];
}

interface FieldData {
  name: string | number | (string | number)[];
  value?: any;
  touched?: boolean;
  validating?: boolean;
  errors?: string[];
}

export const ArticleCreate: FC = () => {
  const router = useRouter();

  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );
  const [form] = Form.useForm();
  const [fields, setFields] = useState<FieldData[]>([]);

  const { mutate, isCreating } = useCreateArticle();
  const content = Form.useWatch('content', form);

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { uploadProps } = useUpload(setFileList);

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onSubmit = (values: ArticleForm) => {
    console.log(values);

    const form = {
      title: values.title,
      description: values.description,
      content: values.content,
      ids: values.photo.map((file) => file.response?.uploadId || ''),
    };

    mutate(form, {
      onSuccess: (data) => {
        if (data.data.id) {
          router.push(routes.dashboard.articles.article(data.data.id));
        }
      },
    });
  };

  return (
    <Flex gap="large" vertical>
      <div>
        <Breadcrumb items={breadcrumbs} />
      </div>

      <Row gutter={[16, 16]}>
        <Col span={16}>
          <Card>
            <Form
              layout="vertical"
              fields={fields}
              form={form}
              onFieldsChange={(_, allFields) => {
                setFields(allFields);
              }}
              onFinish={onSubmit}
              // form={form}
              // initialValues={{
              //   photo: article?.photos.map((f) => ({
              //     response: f,
              //     id: f.uploadId,
              //     status: 'done',
              //     name: '1337.png',
              //     url: f.versions.huge.url,
              //   })),
              // }}
            >
              {/* <Form.Item> */}
              {/*  <pre>{JSON.stringify(fields, null, 2)}</pre> */}
              {/* </Form.Item> */}

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

                {/* <TextEditor content={content} setContent={form.setFieldValue} /> */}
              </Form.Item>

              <Form.Item
                label="Photo"
                name="photo"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[{ required: true }]}
                shouldUpdate
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

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={isCreating}>
                  Save
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col span={8}>
          <Card />
        </Col>
      </Row>
    </Flex>
  );
};
