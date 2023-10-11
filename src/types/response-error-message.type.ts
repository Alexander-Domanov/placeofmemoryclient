export interface IResponseError {
  response: {
    data: {
      messages: {
        message: string;
        field: string;
      }[];
    };
  };
}
