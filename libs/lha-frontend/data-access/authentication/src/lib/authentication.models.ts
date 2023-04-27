export interface LoginDto {
  username: string;
  password: string;
}

export interface LoginResultDto {
  username: string;
  accessToken?: string;
}

export interface LogoutResultDto {
  success: boolean;
}

export interface Authentication {
  username: string;
  accessToken: string;
}
