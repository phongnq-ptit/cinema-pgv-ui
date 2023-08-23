import {MoviePublic} from '../../models/Movie';
import {ApiResponse} from '../../models/base';
import useApi from './useApi';

interface MovieParamsForPayment {
  movieUuid: string;
  branchUuid: string;
  startDate: Date | string;
}

const usePaymentApi = () => {
  const {GET} = useApi();
  const baseUrl = '/api/payment';

  async function getListMoviePublicForPayment(
    params?: Partial<MovieParamsForPayment>
  ): Promise<ApiResponse<Array<MoviePublic>>> {
    return GET<ApiResponse<Array<MoviePublic>>>(
      baseUrl + '/moviePublic',
      params
    );
  }

  return {
    getListMoviePublicForPayment,
  };
};

export default usePaymentApi;
