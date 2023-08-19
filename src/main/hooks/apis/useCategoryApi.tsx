import useApi from './useApi';
import {ApiResponse} from '../../models/base';
import {Category} from '../../models/Category';

const useCategoryApi = () => {
  const {GET, POST, PATCH} = useApi();
  const baseUrl = 'api/categories';

  async function getListCategories(): Promise<ApiResponse<Array<Category>>> {
    return GET<ApiResponse<Array<Category>>>(baseUrl);
  }

  async function createCategory(
    category: Category
  ): Promise<ApiResponse<Category>> {
    return POST<ApiResponse<Category>>(baseUrl, category);
  }

  async function updateCategory(
    uuid: string,
    category: Category
  ): Promise<ApiResponse<Category>> {
    return PATCH<ApiResponse<Category>>(baseUrl + `/${uuid}`, category);
  }

  return {getListCategories, createCategory, updateCategory};
};

export default useCategoryApi;
