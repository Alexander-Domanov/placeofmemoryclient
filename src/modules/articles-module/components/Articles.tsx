import { FC, ReactNode, useState } from 'react';
import { Breadcrumb, Button, Flex, Input, Table } from 'antd';
import { useDebounce } from 'usehooks-ts';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import { TablePaginationConfig } from 'antd/lib';
import { useRouter } from 'next/router';
import { FileStatuses, IPlace, Role } from '@/types';
import { useArticles } from '@/modules/articles-module/hooks/useArticles';
import { routes } from '@/common/routing/routes';
import { FileStatusOptions } from '@/common-dashboard/helpers/options-file-statuses-select-input';
import { CustomSelectInput } from '@/components';
import { CreateBreadcrumb } from '@/components/dashboard/helpers/CreateBreadcrumb';
import { useTranslation } from '@/components/internationalization';
import { ColumnsTableArticles } from '@/modules/articles-module/components/ColumnsTableArticles';

const defaultPageSize = 10;

export const Articles: FC = () => {
  const router = useRouter();
  const { t } = useTranslation();

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

  const title = useDebounce(pagination.searchTerm.toLowerCase(), 500);

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

  const fileStatuses = FileStatusOptions(t);

  const selectInputOptions =
    me?.role === Role.ADMIN
      ? [
          ...fileStatuses,
          {
            label: t.dashboard.selectStatus.archived,
            value: FileStatuses.ARCHIVED,
          },
        ]
      : fileStatuses;

  const columnsTableArticles = ColumnsTableArticles(t);

  const selectColumnsTablePlaces =
    me?.role === Role.AUTHOR
      ? columnsTableArticles.filter(
          (column) => column.key !== 'ownerId' && column.key !== 'id'
        )
      : columnsTableArticles;

  const breadcrumbs = [
    CreateBreadcrumb({ key: routes.main, icon: true }),
    CreateBreadcrumb({
      key: routes.dashboard.index,
      text: t.dashboard.indexTitle,
    }),
    CreateBreadcrumb({
      key: routes.dashboard.articles.index,
      text: t.dashboard.articles.index,
      withLink: false,
    }),
  ];

  return (
    <Flex gap="large" vertical>
      <div>
        <Breadcrumb items={breadcrumbs} />
      </div>

      <Flex justify="space-between" align="center" gap="middle" wrap="wrap">
        <div>
          <Button
            type="primary"
            title={t.dashboard.articles.add.title}
            onClick={() => router.push(routes.dashboard.articles.create)}
          >
            {t.dashboard.articles.add.label}
          </Button>
        </div>

        <Flex align="center" gap="middle" wrap="wrap">
          <Input
            placeholder={t.dashboard.articles.search.placeholder}
            title={t.dashboard.articles.search.title}
            allowClear
            onChange={(e) =>
              setPagination({ ...pagination, searchTerm: e.target.value })
            }
            style={{ width: 200 }}
          />

          <CustomSelectInput
            defaultValue={{
              value: FileStatuses.ALL,
              label: t.dashboard.selectStatus.all,
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
        columns={selectColumnsTablePlaces}
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
