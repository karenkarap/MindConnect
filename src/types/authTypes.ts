export interface LoginData {
  password: string;
  email: string;
}

export interface RegisterData extends LoginData {
  username: string;
}
