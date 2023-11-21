import { FC } from 'react';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import { ConfigProvider, Pagination } from 'antd';
import { useWindowSize } from '@/common/hooks/useWindowResize';

interface IPaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (newPage: number) => void;
}

export const AntPagination: FC<IPaginationProps> = ({
  page,
  pageSize,
  total,
  onPageChange,
}) => {
  const { width } = useWindowSize();
  const isMobile = width && width < 640;

  return (
    <div className="flex justify-center items-center">
      <ConfigProvider
        theme={{
          components: {
            Pagination: {
              itemSizeSM: isMobile ? 28 : 40,
              itemInputBg: '#565656',
              colorText: '#fafafa',
              // colorPrimary: '#565656',
              // colorBorder: '#565656',
              colorPrimaryHover: '#fafafa',
              fontSize: isMobile ? 10 : 22,
              lineType: 'round',
            },
          },
        }}
      >
        <Pagination
          pageSize={pageSize}
          current={page}
          total={total}
          showSizeChanger={false}
          onChange={onPageChange}
          simple
          prevIcon={
            <button className="mr-48 md:mr-32 sm:mr-6 text-5xl sm:text-3xl text-dark-500 rounded-full shadow-icon hover:bg-dark-200">
              <BsArrowLeftCircleFill className="text-dark-300" />
              <span className="sr-only">Previous</span>
            </button>
          }
          nextIcon={
            <button
              type="button"
              className="ml-48 md:ml-32 sm:ml-6 text-5xl sm:text-3xl text-dark-500 rounded-full shadow-icon hover:bg-dark-200"
            >
              <BsArrowRightCircleFill className="text-dark-300" />
              <span className="sr-only">Next</span>
            </button>
          }
        />
      </ConfigProvider>
    </div>
  );
};
export default AntPagination;
