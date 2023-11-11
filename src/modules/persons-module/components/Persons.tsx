import { FC, ReactNode, useState } from 'react';
import {
  Breadcrumb,
  Button,
  DatePicker,
  DatePickerProps,
  Flex,
  Input,
  Table,
} from 'antd';
import { useDebounce } from 'usehooks-ts';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import { TablePaginationConfig } from 'antd/lib';
import { useRouter } from 'next/router';
import { FileStatuses, IPerson } from '@/types';
import SelectInput from '@/common-dashboard/helpers/SelectInput';
import { routes } from '@/common/routing/routes';
import { usePersons } from '@/modules/persons-module/hooks/usePersons';
import { columnsTablePersons } from '@/modules/persons-module/components/ColumnsTablePersons';
import { CreateBreadcrumb } from '@/common-dashboard/helpers/CreateBreadcrumb';
import { fileStatusOptions } from '@/common-dashboard/options-file-statuses-select-input';

const breadcrumbs = [
  CreateBreadcrumb({ key: routes.main, icon: true }),
  CreateBreadcrumb({ key: routes.dashboard.index, text: 'Dashboard' }),
  CreateBreadcrumb({
    key: routes.dashboard.persons.index,
    text: 'Persons',
    withLink: false,
  }),
];
const defaultPageSize = 11;

export const Persons: FC = () => {
  const router = useRouter();
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: defaultPageSize,
    searchName: '',
    searchLastName: '',
  });
  const [sorting, setSorting] = useState<{
    field: string | null | number | bigint;
    order: string | null;
  }>({ field: null, order: null });

  const [status, setStatus] = useState(FileStatuses.ALL.toLowerCase());

  const name = useDebounce(pagination.searchName, 500);
  const lastName = useDebounce(pagination.searchLastName, 500);

  const { persons, isFetching } = usePersons({
    page: pagination.page,
    pageSize: pagination.pageSize,
    status,
    name,
    lastName,
    sorting,
  });

  const onPageChange = (_page: number) => {
    setPagination({ ...pagination, page: _page });
  };

  const onPageSizeChange = (_page: number, size: number) => {
    setPagination({ ...pagination, page: 1, pageSize: size });
  };

  const onStatusChange = (value: { value: string; label: ReactNode }) => {
    setPagination({ ...pagination, page: 1 });
    setStatus(value.value);
  };

  const onChangeBirthDate: DatePickerProps['onChange'] = (
    date: any,
    dateString: string
  ) => {
    console.log(dateString, 'dateBirth');
  };

  const onChangeDeathDate: DatePickerProps['onChange'] = (
    date: any,
    dateString: string
  ) => {
    console.log(dateString, 'dateDeath');
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<IPerson> | any
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

      <Flex justify="space-between" align="center" gap="middle" wrap="wrap">
        <div>
          <Button
            type="primary"
            onClick={() => router.push(routes.dashboard.persons.create)}
          >
            + Add
          </Button>
        </div>

        <Flex align="center" gap="middle">
          <Input
            placeholder="First Name"
            allowClear
            onChange={(e) =>
              setPagination({ ...pagination, searchName: e.target.value })
            }
            style={{ width: 200 }}
          />

          <Input
            placeholder="Last Name"
            allowClear
            onChange={(e) =>
              setPagination({ ...pagination, searchLastName: e.target.value })
            }
            style={{ width: 200 }}
          />

          <DatePicker
            onChange={onChangeBirthDate}
            placeholder="Year of birth"
            picker="year"
            allowClear
          />

          <DatePicker
            onChange={onChangeDeathDate}
            placeholder="Year of death"
            picker="year"
            allowClear
          />

          <SelectInput
            defaultValue={{
              value: FileStatuses.ALL,
              label: 'All',
            }}
            options={fileStatusOptions}
            onChange={onStatusChange}
          />
        </Flex>
      </Flex>

      <Table
        bordered
        size="small"
        rowKey={(record) => record.id}
        columns={columnsTablePersons}
        dataSource={persons?.items}
        loading={isFetching}
        pagination={{
          position: ['bottomCenter'],
          total: persons?.totalCount || 1,
          current: pagination.page,
          onChange: onPageChange,
          defaultCurrent: 1,
          defaultPageSize,
          pageSizeOptions: [10, 20, 30, 50, 100],
          onShowSizeChange: onPageSizeChange,
        }}
        scroll={{ x: 1300 }}
        onChange={handleTableChange}
      />
    </Flex>
  );
};
