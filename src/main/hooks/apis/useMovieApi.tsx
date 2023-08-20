import {Movie, MoviePublic} from '../../models/Movie';
import {ApiResponse} from '../../models/base';
import useApi from './useApi';

interface MoviePublicParams {
  branchUuid: string;
}

interface MovieParams {
  active: number;
}

const useMovieApi = () => {
  const {GET, POST, PATCH} = useApi();
  const baseUrl = 'api/movies';

  async function getListMovies(
    params?: Partial<MovieParams>
  ): Promise<ApiResponse<Array<Movie>>> {
    return GET<ApiResponse<Array<Movie>>>(baseUrl, params);
  }

  async function getMovie(uuid: string): Promise<ApiResponse<Movie>> {
    return GET<ApiResponse<Movie>>(baseUrl + `/${uuid}`);
  }

  async function getListMoviePublic(
    params?: Partial<MoviePublicParams>
  ): Promise<ApiResponse<Array<MoviePublic>>> {
    return GET<ApiResponse<Array<MoviePublic>>>(baseUrl + '/public', params);
  }

  async function changeMovieActive(
    movieUuid: string[],
    active: number
  ): Promise<ApiResponse<Movie>> {
    return POST<ApiResponse<Movie>>(baseUrl + '/active', movieUuid, {active});
  }

  async function addNewMovie(newMovie: Movie): Promise<ApiResponse<Movie>> {
    return POST<ApiResponse<Movie>>(baseUrl, newMovie);
  }

  async function addMoviePublic(
    moviePublic: MoviePublic
  ): Promise<ApiResponse<MoviePublic>> {
    return POST<ApiResponse<MoviePublic>>(baseUrl + '/public', moviePublic);
  }

  async function updateMovie(
    uuid: string,
    movieUpdate: Movie
  ): Promise<ApiResponse<Movie>> {
    return PATCH<ApiResponse<Movie>>(baseUrl + `/${uuid}`, movieUpdate);
  }

  return {
    getListMovies,
    getMovie,
    getListMoviePublic,
    addNewMovie,
    addMoviePublic,
    changeMovieActive,
    updateMovie,
  };
};

export default useMovieApi;
