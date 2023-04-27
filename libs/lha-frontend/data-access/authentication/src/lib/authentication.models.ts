export interface LoginDto {
  username: string;
  password: string;
}

export interface LoginResultDto {
  access_token?: string;
}

export interface Authentication {
  accessToken: string;
}
