import React, { FC, useState } from 'react';
import { Breadcrumb, Button, Flex, Input, Table } from 'antd';
import { useDebounce } from 'usehooks-ts';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import { TablePaginationConfig } from 'antd/lib';
import { useRouter } from 'next/router';
import { IPlace } from '@/types';
import SelectInput from '@/common-dashboard/helpers/SelectInput';
import { usePlaces } from '@/modules/places-module/hooks/usePlaces';
import { columnsTablePlaces } from '@/modules/places-module/components/ColumnsTablePlaces';
import { routes } from '@/common/routing/routes';
import { CreateBreadcrumb } from '@/common-dashboard/helpers/CreateBreadcrumb';

const breadcrumbs = [
  CreateBreadcrumb({ key: routes.main, icon: true }),
  CreateBreadcrumb({ key: routes.dashboard.index, text: 'Dashboard' }),
  CreateBreadcrumb({
    key: routes.dashboard.places.index,
    text: 'Places',
    withLink: false,
  }),
];

const defaultPageSize = 6;

export const Places: FC = () => {
  const router = useRouter();
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: defaultPageSize,
    searchTerm: '',
  });
  const [sorting, setSorting] = useState<{
    field: string | null | number | bigint;
    order: string | null;
  }>({ field: null, order: null });

  const [status, setStatus] = useState('all');

  const search = useDebounce(pagination.searchTerm, 500);

  const { places, isFetching } = usePlaces(
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

  // const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  // // const [loading, setLoading] = useState(false);
  // const [selectedRows, setSelectedRows] = useState<IPlace[]>([]);
  //
  // const rowSelection = {
  //   onChange: (selectedRowKeys: React.Key[], selectedRows: IPlace[]) => {
  //     setSelectedRowKeys(selectedRowKeys);
  //     setSelectedRows(selectedRows);
  //   },
  //   // getCheckboxProps: (record: IPlace) => ({
  //   //   disabled: record.nameCemetery === 'Disabled User', // Column configuration not to be checked
  //   //   name: record.nameCemetery,
  //   // }),
  // };
  //
  // const hasSelected = selectedRowKeys.length > 0;

  return (
    <Flex gap="large" vertical>
      <div>
        <Breadcrumb items={breadcrumbs} />
      </div>

      <Flex justify="space-between" align="center" gap="middle" wrap="wrap">
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button
            type="primary"
            onClick={() => router.push(routes.dashboard.places.create)}
          >
            Add Place
          </Button>

          {/* <Button */}
          {/*  type="primary" */}
          {/*  danger */}
          {/*  // onClick={start} */}
          {/*  disabled={!hasSelected} */}
          {/*  // loading={loading} */}
          {/* > */}
          {/*  Delete */}
          {/* </Button> */}
          {/* <DeletePlaceComponent place={selectedRowKeys} /> */}
        </div>

        <Flex align="center">
          <Input
            placeholder="Search by name"
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
        // rowSelection={{
        //   ...rowSelection,
        // }}
        rowKey={(record) => record.id}
        columns={columnsTablePlaces}
        dataSource={places?.items}
        loading={isFetching}
        pagination={{
          position: ['bottomCenter'],
          total: places?.totalCount || 1,
          current: pagination.page,
          onChange: onPageChange,
          defaultCurrent: 1,
          defaultPageSize,
          pageSizeOptions: [10, 20, 30, 50, 100],
          onShowSizeChange: onPageSizeChange,
        }}
        scroll={{ x: 1000 }}
        onChange={handleTableChange}
      />
    </Flex>
  );
};
