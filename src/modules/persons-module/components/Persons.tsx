import React, { FC, ReactNode, useEffect, useState } from 'react';
import {
  Breadcrumb,
  Button,
  Flex,
  FloatButton,
  Input,
  InputNumber,
  Select,
  Table,
  Tour,
} from 'antd';
import { useDebounce } from 'usehooks-ts';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import { TablePaginationConfig } from 'antd/lib';
import { useRouter } from 'next/router';
import {
  CaretDownOutlined,
  CaretUpOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import {
  FileStatuses,
  FilterCondition,
  IPerson,
  Role,
  StatusUser,
} from '@/types';
import { routes } from '@/common/routing/routes';
import { usePersons } from '@/modules/persons-module/hooks/usePersons';
import { ColumnsTablePersons } from '@/modules/persons-module/components/ColumnsTablePersons';
import { CustomSelectInput, DashboardSelectLanguage } from '@/components';
import { FileStatusOptions } from '@/common-dashboard/helpers/options-file-statuses-select-input';
import { CreateBreadcrumb } from '@/components/dashboard/helpers/CreateBreadcrumb';
import { PersonsStepsTour } from '@/modules/persons-module/components/PersonsStepsTour';
import { useTranslation } from '@/components/internationalization';

const defaultPageSize = 10;

interface IPagination {
  searchName: string;
  searchLastName: string;
  searchCountry: string;
  searchCity: string;
  birthYear?: string | null;
  deathYear?: string | null;
  filterConditionBirthDate?: FilterCondition;
  filterConditionDeathDate?: FilterCondition;
}

export const Persons: FC = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const [open, setOpen] = useState<boolean>(false);

  const [pagination, setPagination] = useState<IPagination>({
    searchName: '',
    searchLastName: '',
    searchCountry: '',
    searchCity: '',
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

  const [isShowMoreFilters, setIsShowMoreFilters] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState(false);

  const [isDisabled, setIsDisabled] = useState(false);

  const name = useDebounce(pagination.searchName, 500);
  const lastName = useDebounce(pagination.searchLastName, 500);
  const country = useDebounce(pagination.searchCountry, 500);
  const city = useDebounce(pagination.searchCity, 500);

  const { persons, isFetching, me } = usePersons({
    pageNumber: page,
    pageSize,
    status,
    name,
    country,
    city,
    lastName,
    sorting,
    birthYear: pagination.birthYear,
    deathYear: pagination.deathYear,
    filterConditionBirthDate: pagination.filterConditionBirthDate,
    filterConditionDeathDate: pagination.filterConditionDeathDate,
  });

  useEffect(() => {
    if (me?.status === StatusUser.BANNED) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [me?.status]);

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

  const onChangeBirthDate = (value: number | null) => {
    if (value) {
      value.toString().length === 4 &&
        setPagination({ ...pagination, birthYear: value.toString() });
    } else {
      setPagination({ ...pagination, birthYear: null });
    }
  };

  const onChangeDeathDate = (value: number | null) => {
    if (value) {
      value.toString().length === 4 &&
        setPagination({ ...pagination, deathYear: value.toString() });
    } else {
      setPagination({ ...pagination, deathYear: null });
    }
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<IPerson> | any
  ) => {
    if (sorter && sorter.columnKey) {
      let field = sorter.columnKey;
      if (field === 'birthDate') {
        field = 'birthYear';
      } else if (field === 'deathDate') {
        field = 'deathYear';
      }
      const order = sorter.order === 'ascend' ? 'asc' : 'desc';
      setSorting({ field, order });
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

  const onShowMoreFilters = () => {
    setIsShowMoreFilters(!isShowMoreFilters);
  };

  const selectConditionBirthDate = (
    <Select
      style={{ width: 90 }}
      defaultValue="gte"
      onChange={onChangeBirthDateFilter}
    >
      <Select.Option value="gte">
        {' '}
        {t.dashboard.persons.search.more}
      </Select.Option>
      <Select.Option value="lte">
        {' '}
        {t.dashboard.persons.search.less}
      </Select.Option>
    </Select>
  );

  const selectConditionDeathDate = (
    <Select
      style={{ width: 90 }}
      defaultValue="lte"
      onChange={onChangeDeathDateFilter}
    >
      <Select.Option value="gte">
        {t.dashboard.persons.search.more}
      </Select.Option>
      <Select.Option value="lte">
        {t.dashboard.persons.search.less}
      </Select.Option>
    </Select>
  );

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

  const columnsTablePersons = ColumnsTablePersons(t);
  const personsStepsTour = PersonsStepsTour(t);

  const selectColumnsTablePlaces =
    me?.role === Role.USER || me?.role === Role.AUTHOR
      ? columnsTablePersons.filter(
          (column) =>
            column.key !== 'ownerId' &&
            column.key !== 'id' &&
            column.key !== 'updatedAt' &&
            column.key !== 'place'
        )
      : columnsTablePersons;

  const selectColumnsTablePlacesForStatus = isDisabled
    ? selectColumnsTablePlaces.filter((column) => column.key !== 'actions')
    : selectColumnsTablePlaces;

  const setScrollForTable =
    me?.role === Role.USER || me?.role === Role.AUTHOR
      ? { x: 1000 }
      : { x: 1300 };

  const breadcrumbs = [
    CreateBreadcrumb({ key: routes.main, icon: true }),
    CreateBreadcrumb({
      key: routes.dashboard.index,
      text: t.dashboard.indexTitle,
    }),
    CreateBreadcrumb({
      key: routes.dashboard.persons.index,
      text: t.dashboard.persons.index,
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
        <Flex align="center" gap="middle">
          <Button
            type="primary"
            title={t.dashboard.persons.add.title}
            onClick={() => router.push(routes.dashboard.persons.create)}
            disabled={isDisabled}
          >
            {t.dashboard.persons.add.label}
          </Button>

          <Button
            type={isButtonActive ? 'dashed' : 'default'}
            title={t.dashboard.persons.filters.placeholder}
            icon={isButtonActive ? <CaretUpOutlined /> : <CaretDownOutlined />}
            onClick={() => {
              onShowMoreFilters();
              setIsButtonActive(!isButtonActive);
            }}
            className={isButtonActive ? 'active-button' : ''}
          >
            {t.dashboard.persons.filters.title}
          </Button>
        </Flex>

        <Flex align="center" gap="middle" wrap="wrap">
          <Input
            placeholder={t.dashboard.persons.search.name.placeholder}
            title={t.dashboard.persons.search.name.title}
            allowClear
            onChange={(e) =>
              setPagination({ ...pagination, searchName: e.target.value })
            }
            style={{ width: 180 }}
          />

          <Input
            placeholder={t.dashboard.persons.search.lastName.placeholder}
            title={t.dashboard.persons.search.lastName.title}
            allowClear
            onChange={(e) =>
              setPagination({ ...pagination, searchLastName: e.target.value })
            }
            style={{ width: 180 }}
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

      {isShowMoreFilters && (
        <Flex justify="end" align="center" gap="middle" wrap="wrap">
          <Flex align="center" gap="middle" wrap="wrap">
            <InputNumber
              addonBefore={selectConditionBirthDate}
              maxLength={4}
              placeholder={t.dashboard.persons.search.birthDate.placeholder}
              title={t.dashboard.persons.search.birthDate.title}
              style={{ width: 190 }}
              onChange={onChangeBirthDate}
            />

            <InputNumber
              addonBefore={selectConditionDeathDate}
              maxLength={4}
              style={{ width: 190 }}
              placeholder={t.dashboard.persons.search.deathDate.placeholder}
              title={t.dashboard.persons.search.deathDate.title}
              onChange={onChangeDeathDate}
            />

            <Input
              placeholder={t.dashboard.persons.search.country.placeholder}
              title={t.dashboard.persons.search.country.title}
              allowClear
              onChange={(e) =>
                setPagination({ ...pagination, searchCountry: e.target.value })
              }
              style={{ width: 160 }}
            />

            <Input
              placeholder={t.dashboard.persons.search.city.placeholder}
              title={t.dashboard.persons.search.city.title}
              allowClear
              onChange={(e) =>
                setPagination({ ...pagination, searchCity: e.target.value })
              }
              style={{ width: 160 }}
            />
          </Flex>
        </Flex>
      )}

      <Table
        bordered
        size="small"
        rowKey={(record) => record.id}
        columns={selectColumnsTablePlaces}
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
        scroll={setScrollForTable}
        onChange={handleTableChange}
      />

      <FloatButton
        icon={<QuestionCircleOutlined />}
        type="primary"
        style={{ right: 24 }}
        onClick={() => setOpen(true)}
      />
      <Tour
        scrollIntoViewOptions={{ behavior: 'smooth' }}
        open={open}
        onClose={() => setOpen(false)}
        steps={personsStepsTour}
      />
    </Flex>
  );
};
