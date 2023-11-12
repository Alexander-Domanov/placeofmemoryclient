interface RootProfile {
  userName: string | null;
  city: string | null;
}

interface ResponseError {
  response: {
    data: {
      messages: {
        message: string;
      }[];
    };
  };
}

export type { ResponseError, RootProfile };
