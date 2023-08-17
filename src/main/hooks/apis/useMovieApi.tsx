import {Movie} from '../../models/Movie';
import {ApiResponse} from '../../models/base';
import useApi from './useApi';

const useMovieApi = () => {
  const {GET, POST} = useApi();
  const baseUrl = 'api/movies';

  async function getListMovies(): Promise<ApiResponse<Array<Movie>>> {
    return GET<ApiResponse<Array<Movie>>>(baseUrl);
  }

  async function addNewMovie(newMovie: Movie): Promise<ApiResponse<Movie>> {
    return POST<ApiResponse<Movie>>(baseUrl, newMovie);
  }

  return {getListMovies, addNewMovie};
};

export default useMovieApi;
