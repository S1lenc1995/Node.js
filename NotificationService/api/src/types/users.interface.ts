export interface User {
  id?: number;
  email: string;
  password: string;
  token?: string;
}

export interface RequestUser {
  id: number;
  email: string;
}

export interface NewUser {
  email: string,
  id?: number,
  createDate?: Date;
  password: string, 
}
