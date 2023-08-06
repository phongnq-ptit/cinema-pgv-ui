import {UserRole} from './enums/UserRole';

export interface User {
  uuid: string;
  userName: string;
  email: string;
  address: string;
  role: UserRole;
  active: number;
  cinemaId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}

export interface LoginResponse extends RefreshTokenResponse {
  refreshToken: string;
  user: User;
}
