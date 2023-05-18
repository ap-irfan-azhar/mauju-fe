

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  email: string;
  name: string;
  password: string;
  password_confirm: string;
}

export interface IUser extends ILogin {
  id: string;
}

export interface ILoginResponse {
  "access_token": string,
}