import { FC } from 'react';
import { FaRightFromBracket } from 'react-icons/fa6';
import { Button, Modal, notification } from 'antd';
import { useLogout } from '@/modules/auth-modules/logout-module';

const { confirm } = Modal;

export const DashboardLogout: FC = () => {
  const { sendLogoutAsync } = useLogout();

  const onLogout = () => {
    confirm({
      title: 'Do you want to logout?',
      okType: 'danger',
      async onOk() {
        await sendLogoutAsync();

        notification.success({
          message: 'You was logged out',
          placement: 'bottomLeft',
        });
      },
    });
  };

  return (
    <Button
      // type="text"
      // style={{ color: '#fff' }}
      // ghost
      icon={<FaRightFromBracket />}
      onClick={onLogout}
    />
  );
};
