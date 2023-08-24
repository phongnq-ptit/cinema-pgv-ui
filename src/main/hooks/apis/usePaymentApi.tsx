import {MoviePublic} from '../../models/Movie';
import {Purchase} from '../../models/Purchase';
import {ApiResponse} from '../../models/base';
import useApi from './useApi';

interface MovieParamsForPayment {
  movieUuid: string;
  branchUuid: string;
  startDate: Date | string;
}

interface PurchaseParams {
  userUuid: string;
}

const usePaymentApi = () => {
  const {GET, POST, PATCH} = useApi();
  const baseUrl = '/api/payment';

  async function getListMoviePublicForPayment(
    params?: Partial<MovieParamsForPayment>
  ): Promise<ApiResponse<Array<MoviePublic>>> {
    return GET<ApiResponse<Array<MoviePublic>>>(
      baseUrl + '/moviePublic',
      params
    );
  }

  async function getPurchase(uuid: string): Promise<ApiResponse<Purchase>> {
    return GET<ApiResponse<Purchase>>(baseUrl + `/${uuid}`);
  }

  async function getPurchasesByUser(
    params?: Partial<PurchaseParams>
  ): Promise<ApiResponse<Array<Purchase>>> {
    return GET<ApiResponse<Array<Purchase>>>(baseUrl, params);
  }

  async function createPurchase(
    purchase: Purchase
  ): Promise<ApiResponse<Array<Purchase>>> {
    return POST<ApiResponse<Array<Purchase>>>(baseUrl, purchase);
  }

  async function updatePurchaseDownload(
    uuid: string
  ): Promise<ApiResponse<Purchase>> {
    return PATCH<ApiResponse<Purchase>>(baseUrl + `/downloads/${uuid}`, null);
  }

  return {
    getListMoviePublicForPayment,
    getPurchasesByUser,
    getPurchase,
    createPurchase,
    updatePurchaseDownload,
  };
};

export default usePaymentApi;
