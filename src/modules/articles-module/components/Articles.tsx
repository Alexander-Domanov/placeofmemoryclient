import React, { FC, useState } from 'react';
import { Breadcrumb, Button, Flex, Input, Table } from 'antd';
import { useDebounce } from 'usehooks-ts';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import { TablePaginationConfig } from 'antd/lib';
import { useRouter } from 'next/router';
import {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
} from 'antd/es/breadcrumb/Breadcrumb';
import Link from 'next/link';
import { IPlace } from '@/types';
import SelectInput from '@/common-dashboard/helpers/SelectInput';
import { useArticles } from '@/modules/articles-module/hooks/useArticles';
import { columnsTableArticles } from '@/modules/articles-module/components/ColumnsTableArticles';
import { routes } from '@/common/routing/routes';

const breadcrumbs: Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[] = [
  {
    key: routes.dashboard.index,
    title: <Link href={routes.dashboard.index}>Dashboard</Link>,
  },
  {
    key: routes.dashboard.articles.index,
    title: 'Articles',
  },
];

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

  const { articles, isFetching } = useArticles(
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
    <Flex gap="large" vertical>
      <div>
        <Breadcrumb items={breadcrumbs} />
      </div>

      <Flex justify="space-between" align="center" gap="middle">
        <div>
          <Button
            type="primary"
            onClick={() => router.push(routes.dashboard.articles.create)}
          >
            Add Article
          </Button>
        </div>

        <Flex align="center">
          <Input
            placeholder="Search by title"
            allowClear
            onChange={(e) =>
              setPagination({ ...pagination, searchTerm: e.target.value })
            }
            style={{ width: 200 }}
          />

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
        </Flex>
      </Flex>

      <Table
        bordered
        size="small"
        rowKey={(record) => record.id}
        columns={columnsTableArticles}
        dataSource={articles?.items}
        loading={isFetching}
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
        scroll={{ x: 1000 }}
        onChange={handleTableChange}
      />
    </Flex>
  );
};
