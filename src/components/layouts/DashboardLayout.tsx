import { NextPage } from 'next';
import React, {
  PropsWithChildren,
  ReactElement,
  useEffect,
  useState,
} from 'react';
import { Layout, List, Modal } from 'antd';
import dynamic from 'next/dynamic';
import { DashboardModals } from '@/components';
import styles from './DashboardLayout.module.scss';
import { DashboardHeader } from '@/components/layouts/components/DashboardHeader';
import { useMeQuery } from '@/services';
import { StatusUser } from '@/types';
import { useTranslation } from '@/components/internationalization';

const DynamicDashboardSidebar = dynamic(
  () => import('./components/DashboardSidebar'),
  {
    ssr: false,
  }
);

const { Content } = Layout;

const DashboardLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation();
  const { data: me } = useMeQuery();
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (me?.status === StatusUser.BANNED) {
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  }, [me?.status]);

  return (
    <>
      <Layout>
        <DashboardHeader />

        <Layout>
          <DynamicDashboardSidebar />

          <Layout>
            <Content className={styles.content}>{children}</Content>
          </Layout>
        </Layout>
      </Layout>

      <Modal
        title={t.dashboard.modalInfo.title}
        centered
        open={isModalVisible}
        footer={[]}
        // okText={t.dashboard.modalInfo.ok}
        // cancelText={t.dashboard.modalInfo.cancel}
        // onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
      >
        <List split={false}>
          <List.Item>
            {t.dashboard.modalInfo.description.paragraphs[0]}
          </List.Item>

          <List.Item>
            {t.dashboard.modalInfo.description.paragraphs[1]}
          </List.Item>

          <List.Item>
            {t.dashboard.modalInfo.description.paragraphs[2]}
          </List.Item>

          <List.Item>
            {t.dashboard.modalInfo.description.paragraphs[3]}
          </List.Item>
        </List>
      </Modal>

      <DashboardModals />
    </>
  );
};

export const getDashboardLayout = (page: ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
