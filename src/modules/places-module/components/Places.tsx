import { FC, ReactNode, useState } from 'react';
import { Breadcrumb, Button, Flex, Input, Table } from 'antd';
import { useDebounce } from 'usehooks-ts';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import { TablePaginationConfig } from 'antd/lib';
import { useRouter } from 'next/router';
import { FileStatuses, IPlace, Role } from '@/types';
import SelectInput from '@/common-dashboard/helpers/SelectInput';
import { usePlaces } from '@/modules/places-module/hooks/usePlaces';
import { columnsTablePlaces } from '@/modules/places-module/components/ColumnsTablePlaces';
import { routes } from '@/common/routing/routes';
import { CreateBreadcrumb } from '@/common-dashboard/helpers/CreateBreadcrumb';
import { fileStatusOptions } from '@/common-dashboard/options-file-statuses-select-input';

const breadcrumbs = [
  CreateBreadcrumb({ key: routes.main, icon: true }),
  CreateBreadcrumb({ key: routes.dashboard.index, text: 'Dashboard' }),
  CreateBreadcrumb({
    key: routes.dashboard.places.index,
    text: 'Places',
    withLink: false,
  }),
];

const defaultPageSize = 10;

export const Places: FC = () => {
  const router = useRouter();

  const [pagination, setPagination] = useState({
    searchTerm: '',
    searchCountry: '',
    searchCity: '',
  });
  const [sorting, setSorting] = useState<{
    field: string | null | number | bigint;
    order: string | null;
  }>({ field: null, order: null });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [status, setStatus] = useState(FileStatuses.ALL.toLowerCase());

  const search = useDebounce(pagination.searchTerm, 500);
  const country = useDebounce(pagination.searchCountry, 500);
  const city = useDebounce(pagination.searchCity, 500);

  const { places, isFetching, me } = usePlaces(
    page,
    pageSize,
    status,
    search,
    country,
    city,
    sorting
  );

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
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button
            type="primary"
            onClick={() => router.push(routes.dashboard.places.create)}
          >
            + Add
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

        <Flex align="center" gap="middle" wrap="wrap">
          <Input
            placeholder="Search by name"
            allowClear
            onChange={(e) =>
              setPagination({ ...pagination, searchTerm: e.target.value })
            }
            style={{ width: 200 }}
          />

          <Input
            placeholder="Search by country"
            allowClear
            onChange={(e) =>
              setPagination({ ...pagination, searchCountry: e.target.value })
            }
            style={{ width: 200 }}
          />

          <Input
            placeholder="Search by city"
            allowClear
            onChange={(e) =>
              setPagination({ ...pagination, searchCity: e.target.value })
            }
            style={{ width: 200 }}
          />

          <SelectInput
            defaultValue={{ value: FileStatuses.ALL, label: 'All' }}
            options={selectInputOptions}
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
          total: places?.totalCount || 1,
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
