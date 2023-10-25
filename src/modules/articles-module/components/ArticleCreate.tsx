import { FC, useMemo, useState } from 'react';
import { Breadcrumb, Button, Card, Col, Flex, Form, Input, Row } from 'antd';
import {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
} from 'antd/es/breadcrumb/Breadcrumb';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { routes } from '@/common/routing/routes';
import 'react-quill/dist/quill.snow.css';
import { ChooseGalleryFiles } from '@/modules/gallery-module';
import { IGalleryFile } from '@/types';
import { useCreateArticle } from '../hooks/useCreateArticle';

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

export const ArticleCreate: FC = () => {
  const router = useRouter();

  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [photos, setPhotos] = useState<IGalleryFile[]>([]);

  const { mutate, isCreating } = useCreateArticle();

  const onSubmit = () => {
    const form = {
      title,
      description,
      content,
      ids: photos.map((file) => file.uploadId),
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
        <Col span={18}>
          <Card>
            <Form layout="vertical" onFinish={onSubmit}>
              <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label="Short Description"
                name="description"
                rules={[{ required: true }]}
              >
                <Input.TextArea
                  autoSize
                  placeholder="Short Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label="Content"
                name="content"
                rules={[{ required: true }]}
              >
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                />
              </Form.Item>

              <Form.Item label="Photos">
                <ChooseGalleryFiles
                  onFilesSelected={setPhotos}
                  maxFileLimit={10}
                />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form>
          </Card>
        </Col>

        <Col span={6}>
          <Card />
        </Col>
      </Row>
    </Flex>
  );
};
