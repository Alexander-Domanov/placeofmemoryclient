import { AxiosError } from 'axios';
import { notification } from 'antd';

interface IError {
  messages: {
    message: string;
    field: string;
  }[];
  error: string;
  statusCode: number;
}

export const ErrorNotification = (error: AxiosError<IError> | unknown) => {
  if (error instanceof AxiosError) {
    const errorResponse = error as AxiosError<IError>;
    const messages = errorResponse?.response?.data?.messages;
    if (messages && messages.length > 0) {
      messages?.forEach(({ message }) => {
        notification.error({
          message: `Error: ${message}`,
          placement: 'bottomLeft',
        });
      });
    } else {
      notification.error({
        message: `Error: ${errorResponse.message}`,
        placement: 'bottomLeft',
      });
    }
  }
};
