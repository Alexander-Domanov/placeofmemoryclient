import Head from 'next/head';
import { Breadcrumb, Layout } from 'antd';
import React from 'react';
import { getDashboardLayout } from '@/components/layouts/DashboardLayout';
import { AddPlacePage } from '@/modules/places-modules/components/AddPlace';

const { Header, Content } = Layout;
const DashboardGalleryPage = () => {
  return (
    <>
      <Head>
        <title>Add Place</title>
      </Head>
      {/* <Header style={{ display: 'flex', alignItems: 'center' }}> */}
      {/*  <Divider orientation="left">Add Place</Divider> */}
      {/* </Header> */}
      <Content style={{ padding: '0 30px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>DashBoard</Breadcrumb.Item>
          <Breadcrumb.Item>Places</Breadcrumb.Item>
          <Breadcrumb.Item>Add Place</Breadcrumb.Item>
        </Breadcrumb>
      </Content>
      <AddPlacePage />
    </>
  );
};

DashboardGalleryPage.getLayout = getDashboardLayout;

export default DashboardGalleryPage;
