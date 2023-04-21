export type INewUser = {
  login: string;
  password: string;
  age: number;
};

export type IUser = INewUser & {
  id: string;
  isDeleted: boolean;
};

export enum Permission {
  READ = 'READ',
  WRITE = 'WRITE',
  DELETE = 'DELETE',
  SHARE = 'SHARE',
  UPLOAD_FILES = 'UPLOAD_FILES',
}

// export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export type INewGroup = {
  name: string;
  permissions: Array<Permission>;
};

export type IGroup = INewGroup & {
  id: string;
};
