export enum Role {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  AUTHOR = 'AUTHOR',
  USER = 'USER',
}

export enum StatusUser {
  ACTIVE = 'ACTIVE',
  BANNED = 'BANNED',
}

export interface IMeType {
  userId: number;
  userName: string | null;
  email: string;
  hasBusinessAccount: boolean;
  urlAvatar: string | null;
  lang: string;
  role: Role;
  status: StatusUser;
}
