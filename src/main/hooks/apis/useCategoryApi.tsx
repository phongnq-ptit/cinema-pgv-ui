import React from 'react';
import useApi from './useApi';
import {ApiResponse} from '../../models/base';
import {Category} from '../../models/Category';

const useCategoryApi = () => {
  const {GET} = useApi();
  const baseUrl = 'api/categories';

  async function getListCategories(): Promise<ApiResponse<Array<Category>>> {
    return GET<ApiResponse<Array<Category>>>(baseUrl);
  }

  return {getListCategories};
};

export default useCategoryApi;
