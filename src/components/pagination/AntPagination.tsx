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
    <div className="mt-12 flex justify-center items-center">
      <ConfigProvider
        theme={{
          components: {
            Pagination: {
              itemSizeSM: isMobile ? 32 : 48,
              itemInputBg: '#565656',
              colorText: '#fafafa',
              // colorPrimary: '#565656',
              // colorBorder: '#565656',
              colorPrimaryHover: '#fafafa',
              fontSize: isMobile ? 14 : 22,
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
            <button className="mr-56 md:mr-32 sm:mr-16 text-5xl sm:text-3xl text-dark-500 rounded-full shadow-icon hover:bg-dark-200">
              <BsArrowLeftCircleFill className="text-dark-300" />
              <span className="sr-only">Previous</span>
            </button>
          }
          nextIcon={
            <button
              type="button"
              className="ml-56 md:ml-32 sm:ml-16 text-5xl sm:text-3xl text-dark-500 rounded-full shadow-icon hover:bg-dark-200"
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
