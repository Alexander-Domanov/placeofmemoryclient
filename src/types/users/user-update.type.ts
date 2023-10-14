export enum UserRoles {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  AUTHOR = 'AUTHOR',
  USER = 'USER',
}
export enum UserStatuses {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  BANNED = 'BANNED',
  DELETED = 'DELETED',
}
export interface IUpdateUserRole {
  role: UserRoles;
}

export interface IUpdateUserStatus {
  status: UserStatuses;
}
