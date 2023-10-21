import { ConfigProvider, Divider, Flex, Modal, Space, Typography } from 'antd';
import { FC, useState } from 'react';
import PlaceForm from '@/modules/places-modules/components/PlaceForm';
import { IPlaceResultAfterExtract } from '@/modules/maps/components/types/place-result-after-extract.type';
import MapDrawer from '@/modules/maps/components/MapDrawer';

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  refetch: () => void;
}

export const AddPlaceModal: FC<Props> = ({ isOpen, setIsOpen, refetch }) => {
  const [selectedPlace, setSelectedPlace] =
    useState<IPlaceResultAfterExtract | null>(null);
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Form: { itemMarginBottom: 20 },
            Image: {
              previewOperationHoverColor: 'dark',
            },
          },
        }}
      >
        <Modal
          open={isOpen}
          onCancel={() => setIsOpen(false)}
          footer={null}
          destroyOnClose
          width={1000}
        >
          <Divider orientation="left">Add Place</Divider>
          <Space
            direction="horizontal"
            size="large"
            style={{ display: 'flex' }}
          >
            <Flex
              justify="space-between"
              align="start"
              gap="large"
              style={{ marginBottom: '15px' }}
            >
              <Space direction="vertical">
                <Divider orientation="center">Select Place</Divider>
                <PlaceForm onPlaceSelected={selectedPlace} />
              </Space>
              <Space direction="vertical">
                <Divider orientation="center">Preview Image</Divider>
                <Typography.Text>'Preview Image'</Typography.Text>
              </Space>
              <Space direction="vertical">
                <Divider orientation="center">Select Location</Divider>
                <MapDrawer onPlaceSelected={setSelectedPlace} />
              </Space>
            </Flex>
          </Space>
        </Modal>
      </ConfigProvider>
    </>
  );
};
