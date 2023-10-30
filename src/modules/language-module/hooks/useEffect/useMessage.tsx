import { useEffect } from 'react';
import { message } from 'antd';

interface IUseMessage {
  error: any;
  isSuccess: boolean;
}
export const useMessage = ({
  error,
  isSuccess,
}: IUseMessage): { contextHolder: JSX.Element } => {
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (error || isSuccess) {
      const messageType =
        (error && 'error') || (isSuccess && 'success') || null;
      const contentMessage = error ? error.message : 'Success';

      messageApi.open({
        type: messageType,
        content: contentMessage,
      });
    }
  }, [error, isSuccess, messageApi]);

  return { contextHolder };
};
