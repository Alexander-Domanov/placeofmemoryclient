// import { FC } from 'react';
// import { Button, Flex } from 'antd';
// import { useRouter } from 'next/router';
// import { routes } from '@/common/routing/routes';
//
// export const Articles: FC = () => {
//   const router = useRouter();
//
//   return (
//     <div>
//       <Flex justify="space-between" align="center" gap="middle">
//         <div>
//           <Button
//             type="primary"
//             onClick={() => router.push(routes.dashboard.articles.create)}
//           >
//             Add Article
//           </Button>
//         </div>
//       </Flex>
//     </div>
//   );
// };
import React, { FC, useState } from 'react';
import { Button, Flex, Input, Space, Table } from 'antd';
import { useDebounce } from 'usehooks-ts';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import { TablePaginationConfig } from 'antd/lib';
import { useRouter } from 'next/router';
import { IPlace } from '@/types';
import SelectInput from '@/common-dashboard/helpers/SelectInput';
import { useArticles } from '@/modules/articles-module/hooks/useArticles';
import { columnsTableArticles } from '@/modules/articles-module/components/ColumnsTableArticles';
import { routes } from '@/common/routing/routes';

export const Articles: FC = () => {
  const router = useRouter();
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 18,
    searchTerm: '',
  });
  const [sorting, setSorting] = useState<{
    field: string | null | number | bigint;
    order: string | null;
  }>({ field: null, order: null });

  const [status, setStatus] = useState('all');

  const search = useDebounce(pagination.searchTerm, 500);

  const { articles, isLoading, refetch } = useArticles(
    pagination.page,
    pagination.pageSize,
    status,
    search,
    sorting
  );

  const onPageChange = (_page: number) => {
    setPagination({ ...pagination, page: _page });
  };

  const onPageSizeChange = (_page: number, size: number) => {
    setPagination({ ...pagination, page: 1, pageSize: size });
  };

  const onStatusChange = (value: { value: string; label: React.ReactNode }) => {
    setPagination({ ...pagination, page: 1 });
    setStatus(value.value);
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<IPlace> | any
  ) => {
    if (sorter && sorter.columnKey) {
      const orderBy = sorter.order === 'ascend' ? 'asc' : 'desc';
      setSorting({ field: sorter.columnKey, order: orderBy });
    } else {
      setSorting({ field: null, order: null });
    }
  };

  return (
    <div>
      <Space direction="vertical" style={{ display: 'flex' }}>
        <Flex
          justify="space-between"
          align="center"
          gap="middle"
          style={{ marginBottom: '15px' }}
        >
          <div>
            <Button
              type="primary"
              onClick={() => router.push(routes.dashboard.articles.create)}
            >
              Add Article
            </Button>
          </div>
          <Input
            placeholder="Search by title"
            allowClear
            onChange={(e) =>
              setPagination({ ...pagination, searchTerm: e.target.value })
            }
            style={{ width: 200 }}
          />
          <div>
            <SelectInput
              defaultValue={{ value: 'all', label: 'All' }}
              options={[
                { label: 'All', value: 'all' },
                { label: 'Draft', value: 'draft' },
                { label: 'PendingReview', value: 'pendingReview' },
                { label: 'Published', value: 'published' },
                { label: 'Archived', value: 'archived' },
              ]}
              onChange={onStatusChange}
            />
          </div>
        </Flex>
        <Table
          bordered
          size="small"
          columns={columnsTableArticles}
          dataSource={articles?.items}
          loading={isLoading}
          pagination={{
            position: ['bottomCenter'],
            total: articles?.totalCount || 1,
            current: pagination.page,
            onChange: onPageChange,
            defaultCurrent: 1,
            defaultPageSize: 18,
            pageSizeOptions: [10, 20, 30, 50, 100],
            onShowSizeChange: onPageSizeChange,
          }}
          scroll={{ x: 1200 }}
          onChange={handleTableChange}
        />
      </Space>
    </div>
  );
};
