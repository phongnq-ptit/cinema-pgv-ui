import {Movie, MoviePublic} from '../../models/Movie';
import {ApiResponse} from '../../models/base';
import useApi from './useApi';

interface MoviePublicParams {
  branchUuid: string;
}

const useMovieApi = () => {
  const {GET, POST} = useApi();
  const baseUrl = 'api/movies';

  async function getListMovies(): Promise<ApiResponse<Array<Movie>>> {
    return GET<ApiResponse<Array<Movie>>>(baseUrl);
  }

  async function getListMoviePublic(
    params?: Partial<MoviePublicParams>
  ): Promise<ApiResponse<Array<MoviePublic>>> {
    return GET<ApiResponse<Array<MoviePublic>>>(baseUrl + '/public', params);
  }

  async function addNewMovie(newMovie: Movie): Promise<ApiResponse<Movie>> {
    return POST<ApiResponse<Movie>>(baseUrl, newMovie);
  }

  async function addMoviePublic(
    moviePublic: MoviePublic
  ): Promise<ApiResponse<MoviePublic>> {
    return POST<ApiResponse<MoviePublic>>(baseUrl + '/public', moviePublic);
  }

  return {getListMovies, getListMoviePublic, addNewMovie, addMoviePublic};
};

export default useMovieApi;
