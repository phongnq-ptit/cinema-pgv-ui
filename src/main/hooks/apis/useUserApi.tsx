import React from 'react';
import useApi from './useApi';
import {UserRole} from '../../models/enums/UserRole';
import {User} from '../../models/User';
import {ApiResponse} from '../../models/base';

interface Params {
  role: UserRole;
  search: string;
}

export interface ICreateUser extends User {
  password: string;
}

const useUserApi = () => {
  const {GET, POST} = useApi();
  const baseUrl = 'api/users';

  async function getUserByRole(
    params: Partial<Params>
  ): Promise<ApiResponse<User[]>> {
    return GET<ApiResponse<User[]>>(baseUrl, params);
  }

  async function getUser(uuid: string): Promise<ApiResponse<User>> {
    return GET<ApiResponse<User>>(baseUrl + `/${uuid}`);
  }

  async function createUser(newUser: ICreateUser): Promise<ApiResponse<User>> {
    return POST<ApiResponse<User>>(baseUrl, newUser);
  }

  return {getUserByRole, getUser, createUser};
};

export default useUserApi;
