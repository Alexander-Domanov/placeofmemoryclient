import { Button, Popconfirm, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useGetListLanguages } from '@/services';
import { useDeleteLanguage } from '@/modules/language-module';

export const LanguageListTable = () => {
  const {
    dataListLanguages,
    isSuccessDataListLanguagesLanguages,
    isErrorDataListLanguagesLanguages,
    isFetchingDataListLanguagesLanguages,
  } = useGetListLanguages();
  const {
    mutateDeleteLanguage,
    isSuccessDeleteLanguage,
    isErrorDeleteLanguage,
    isLoadingDeleteLanguage,
  } = useDeleteLanguage();
  const columns: ColumnsType<any> = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: 'Native',
      dataIndex: 'native',
      key: 'native',
      align: 'center',
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      align: 'center',
    },
    {
      title: 'Order',
      dataIndex: 'order',
      key: 'order',
      align: 'center',
    },
    {
      title: 'Date added',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
    },
    {
      title: 'Date update',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      align: 'center',
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          <Button className="w-[175px]">Update {record.name}</Button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => mutateDeleteLanguage({ languageID: record.id })}
          >
            <Button danger disabled={isLoadingDeleteLanguage}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const data: any[] = dataListLanguages?.items || [];
  return <Table columns={columns} dataSource={data} className="pt-3" />;
};
