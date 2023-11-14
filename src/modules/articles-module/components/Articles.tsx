import { FC, ReactNode, useState } from 'react';
import { Breadcrumb, Button, Flex, Input, Table } from 'antd';
import { useDebounce } from 'usehooks-ts';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import { TablePaginationConfig } from 'antd/lib';
import { useRouter } from 'next/router';
import { FileStatuses, IPlace, Role } from '@/types';
import SelectInput from '@/common-dashboard/helpers/SelectInput';
import { useArticles } from '@/modules/articles-module/hooks/useArticles';
import { columnsTableArticles } from '@/modules/articles-module/components/ColumnsTableArticles';
import { routes } from '@/common/routing/routes';
import { CreateBreadcrumb } from '@/common-dashboard/helpers/CreateBreadcrumb';
import { fileStatusOptions } from '@/common-dashboard/options-file-statuses-select-input';

const breadcrumbs = [
  CreateBreadcrumb({ key: routes.main, icon: true }),
  CreateBreadcrumb({ key: routes.dashboard.index, text: 'Dashboard' }),
  CreateBreadcrumb({
    key: routes.dashboard.articles.index,
    text: 'Articles',
    withLink: false,
  }),
];

const defaultPageSize = 10;

export const Articles: FC = () => {
  const router = useRouter();

  const [pagination, setPagination] = useState({
    searchTerm: '',
  });
  const [sorting, setSorting] = useState<{
    field: string | null | number | bigint;
    order: string | null;
  }>({ field: null, order: null });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [status, setStatus] = useState(FileStatuses.ALL.toLowerCase());

  const title = useDebounce(pagination.searchTerm, 500);

  const { articles, isFetching, me } = useArticles({
    pageNumber: page,
    pageSize,
    status,
    title,
    sorting,
  });

  const onPageChange = (_page: number) => {
    setPage(_page);
    setPagination({ ...pagination });
  };

  const onPageSizeChange = (_page: number, size: number) => {
    setPage(1);
    setPageSize(size);
    setPagination({ ...pagination });
  };

  const onStatusChange = (value: { value: string; label: ReactNode }) => {
    setPagination({ ...pagination });
    setPage(1);
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

  const selectInputOptions =
    me?.role === Role.ADMIN
      ? [
          ...fileStatusOptions,
          {
            label: 'Archived',
            value: FileStatuses.ARCHIVED,
          },
        ]
      : fileStatusOptions;

  return (
    <Flex gap="large" vertical>
      <div>
        <Breadcrumb items={breadcrumbs} />
      </div>

      <Flex justify="space-between" align="center" gap="middle" wrap="wrap">
        <div>
          <Button
            type="primary"
            title="Add new article"
            onClick={() => router.push(routes.dashboard.articles.create)}
          >
            + Add
          </Button>
        </div>

        <Flex align="center" gap="middle" wrap="wrap">
          <Input
            placeholder="Search by Title"
            title="Search by title lowercase"
            allowClear
            onChange={(e) =>
              setPagination({ ...pagination, searchTerm: e.target.value })
            }
            style={{ width: 200 }}
          />

          <SelectInput
            defaultValue={{
              value: FileStatuses.ALL,
              label: 'All',
            }}
            options={selectInputOptions}
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
          total: articles?.totalCount || 1,
          current: page,
          onChange: onPageChange,
          defaultCurrent: 1,
          defaultPageSize,
          pageSizeOptions: [10, 20, 30, 50, 100],
          onShowSizeChange: onPageSizeChange,
          simple: true,
          showSizeChanger: true,
          position: ['bottomCenter'],
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
        }}
        scroll={{ x: 1000 }}
        onChange={handleTableChange}
      />
    </Flex>
  );
};
