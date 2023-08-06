import {
  LoginResponse,
  RefreshTokenResponse,
  User,
  UserLogin,
} from '../../models/User';
import {ApiResponse} from '../../models/base';
import useApi from './useApi';

export const useAuthApi = () => {
  const {POST} = useApi();
  const baseUrl = '/auth';

  async function login(user: UserLogin): Promise<ApiResponse<LoginResponse>> {
    return POST<ApiResponse<LoginResponse>>(baseUrl + '/login', user);
  }

  async function register(user: User): Promise<ApiResponse<User>> {
    return POST<ApiResponse<User>>(baseUrl + '/register', user);
  }

  async function getNewAccessToken(
    refreshToken: string
  ): Promise<ApiResponse<RefreshTokenResponse>> {
    return POST<ApiResponse<RefreshTokenResponse>>(
      baseUrl + '/refresh_token',
      refreshToken
    );
  }

  async function verifyAccount(userUuid: string): Promise<ApiResponse<User>> {
    return POST<ApiResponse<User>>(baseUrl + '/verify-account', null, {
      userUuid,
    });
  }

  return {login, register, getNewAccessToken, verifyAccount};
};
