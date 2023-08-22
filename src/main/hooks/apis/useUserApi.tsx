import React from 'react';
import useApi from './useApi';
import {UserRole} from '../../models/enums/UserRole';
import {User} from '../../models/User';
import {ApiResponse} from '../../models/base';

interface Params {
  role: UserRole;
}

const useUserApi = () => {
  const {GET} = useApi();
  const baseUrl = 'api/users';

  async function getUserByRole(
    params: Partial<Params>
  ): Promise<ApiResponse<User[]>> {
    return GET<ApiResponse<User[]>>(baseUrl, params);
  }

  return {getUserByRole};
};

export default useUserApi;
