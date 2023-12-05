import React, { FC, ReactNode, useEffect, useState } from 'react';
import { Breadcrumb, Button, Flex, Input, Table } from 'antd';
import { useDebounce } from 'usehooks-ts';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import { TablePaginationConfig } from 'antd/lib';
import { useRouter } from 'next/router';
import { FileStatuses, IPlace, Role, StatusUser } from '@/types';
import { usePlaces } from '@/modules/places-module/hooks/usePlaces';
import { ColumnsTablePlaces } from '@/modules/places-module/components/ColumnsTablePlaces';
import { routes } from '@/common/routing/routes';
import { CustomSelectInput, DashboardSelectLanguage } from '@/components';
import { FileStatusOptions } from '@/common-dashboard/helpers/options-file-statuses-select-input';
import { CreateBreadcrumb } from '@/components/dashboard/helpers/CreateBreadcrumb';
import { useTranslation } from '@/components/internationalization';

const defaultPageSize = 10;

export const Places: FC = () => {
  const router = useRouter();
  const { t } = useTranslation();

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
  const [isDisabled, setIsDisabled] = useState(false);

  const name = useDebounce(pagination.searchTerm.toLowerCase(), 500);
  const country = useDebounce(pagination.searchCountry, 500);
  const city = useDebounce(pagination.searchCity, 500);

  const { places, isFetching, me } = usePlaces({
    pageNumber: page,
    pageSize,
    status,
    name,
    country,
    city,
    sorting,
  });

  useEffect(() => {
    if (me?.status === StatusUser.BANNED) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [me?.status, status]);

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
  const columnsTablePlaces = ColumnsTablePlaces(t);
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

  const breadcrumbs = [
    CreateBreadcrumb({ key: routes.main, icon: true }),
    CreateBreadcrumb({
      key: routes.dashboard.index,
      text: t.dashboard.indexTitle,
    }),
    CreateBreadcrumb({
      key: routes.dashboard.places.index,
      text: t.dashboard.places.index,
      withLink: false,
    }),
  ];

  return (
    <Flex gap="large" vertical>
      <Flex justify="space-between">
        <Breadcrumb items={breadcrumbs} />

        <DashboardSelectLanguage />
      </Flex>

      <Flex justify="space-between" align="center" gap="middle" wrap="wrap">
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button
            type="primary"
            title={t.dashboard.places.add.title}
            onClick={() => router.push(routes.dashboard.places.create)}
            disabled={isDisabled}
          >
            {t.dashboard.places.add.label}
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
            placeholder={t.dashboard.places.search.name.placeholder}
            title={t.dashboard.places.search.name.title}
            allowClear
            onChange={(e) =>
              setPagination({ ...pagination, searchTerm: e.target.value })
            }
            style={{ width: 200 }}
          />

          <Input
            placeholder={t.dashboard.places.search.country.placeholder}
            title={t.dashboard.places.search.country.title}
            allowClear
            onChange={(e) =>
              setPagination({ ...pagination, searchCountry: e.target.value })
            }
            style={{ width: 160 }}
          />

          <Input
            placeholder={t.dashboard.places.search.city.placeholder}
            title={t.dashboard.places.search.city.title}
            allowClear
            onChange={(e) =>
              setPagination({ ...pagination, searchCity: e.target.value })
            }
            style={{ width: 160 }}
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
        scroll={{ x: 1280 }}
        onChange={handleTableChange}
      />
    </Flex>
  );
};
