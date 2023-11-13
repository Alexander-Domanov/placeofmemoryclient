import { FC, ReactNode, useState } from 'react';
import {
  Breadcrumb,
  Button,
  Flex,
  Input,
  InputNumber,
  Select,
  Table,
} from 'antd';
import { useDebounce } from 'usehooks-ts';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import { TablePaginationConfig } from 'antd/lib';
import { useRouter } from 'next/router';
import { FileStatuses, FilterCondition, IPerson, Role } from '@/types';
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

const defaultPageSize = 10;

interface IPagination {
  searchName: string;
  searchLastName: string;
  birthDate?: string | null;
  deathDate?: string | null;
  filterConditionBirthDate?: FilterCondition;
  filterConditionDeathDate?: FilterCondition;
}

export const Persons: FC = () => {
  const router = useRouter();

  const [pagination, setPagination] = useState<IPagination>({
    searchName: '',
    searchLastName: '',
    filterConditionBirthDate: FilterCondition.gte,
    filterConditionDeathDate: FilterCondition.lte,
  });
  const [sorting, setSorting] = useState<{
    field: string | null | number | bigint;
    order: string | null;
  }>({ field: null, order: null });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [status, setStatus] = useState(FileStatuses.ALL.toLowerCase());

  const name = useDebounce(pagination.searchName, 500);
  const lastName = useDebounce(pagination.searchLastName, 500);

  const { persons, isFetching, me } = usePersons({
    page,
    pageSize,
    status,
    name,
    lastName,
    sorting,
    birthDate: pagination.birthDate,
    deathDate: pagination.deathDate,
    filterConditionBirthDate: pagination.filterConditionBirthDate,
    filterConditionDeathDate: pagination.filterConditionDeathDate,
  });

  const onPageChange = (_page: number) => {
    setPagination({ ...pagination });
    setPage(_page);
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

  const onChangeBirthDate = (value: number | null) => {
    if (value) {
      value.toString().length === 4 &&
        setPagination({ ...pagination, birthDate: value.toString() });
    } else {
      setPagination({ ...pagination, birthDate: null });
    }
  };

  const onChangeDeathDate = (value: number | null) => {
    if (value) {
      value.toString().length === 4 &&
        setPagination({ ...pagination, deathDate: value.toString() });
    } else {
      setPagination({ ...pagination, deathDate: null });
    }
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
  const onChangeBirthDateFilter = (value: string) => {
    setPagination({
      ...pagination,
      filterConditionBirthDate: value as FilterCondition,
    });
  };

  const onChangeDeathDateFilter = (value: string) => {
    setPagination({
      ...pagination,
      filterConditionDeathDate: value as FilterCondition,
    });
  };

  const selectConditionBirthDate = (
    <Select
      style={{ width: 80 }}
      defaultValue="gte"
      onChange={onChangeBirthDateFilter}
    >
      <Select.Option value="gte">More</Select.Option>
      <Select.Option value="lte">Less</Select.Option>
    </Select>
  );

  const selectConditionDeathDate = (
    <Select
      style={{ width: 80 }}
      defaultValue="lte"
      onChange={onChangeDeathDateFilter}
    >
      <Select.Option value="gte">More</Select.Option>
      <Select.Option value="lte">Less</Select.Option>
    </Select>
  );

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
            onClick={() => router.push(routes.dashboard.persons.create)}
          >
            + Add
          </Button>
        </div>

        <Flex align="center" gap="middle" wrap="wrap">
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

          <InputNumber
            addonBefore={selectConditionBirthDate}
            maxLength={4}
            placeholder="Year of birth"
            title="Year of birth"
            style={{ width: 190 }}
            onChange={onChangeBirthDate}
          />

          <InputNumber
            addonBefore={selectConditionDeathDate}
            maxLength={4}
            style={{ width: 190 }}
            placeholder="Year of death"
            title="Year of death"
            onChange={onChangeDeathDate}
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
        columns={columnsTablePersons}
        dataSource={persons?.items}
        loading={isFetching}
        pagination={{
          total: persons?.totalCount || 1,
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
        scroll={{ x: 1300 }}
        onChange={handleTableChange}
      />
    </Flex>
  );
};
