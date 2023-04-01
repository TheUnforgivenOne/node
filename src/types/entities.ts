export type INewUser = {
  login: string;
  password: string;
  age: number;
};

export type IUser = INewUser & {
  id: string;
  isDeleted: boolean;
};
