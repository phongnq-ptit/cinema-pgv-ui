import {Movie, MoviePublic} from '../../models/Movie';
import {ApiResponse} from '../../models/base';
import useApi from './useApi';

interface MoviePublicParams {
  branchUuid: string;
  movieName: string;
}

interface MovieParams {
  active: number;
  name: string;
}

interface MovieParamsForClient {
  movieName: string;
  branchUuids: string;
  categoryUuids: string;
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

  async function getListMoviePublicForClient(
    params?: Partial<MovieParamsForClient>
  ): Promise<ApiResponse<Array<Movie>>> {
    return GET<ApiResponse<Array<Movie>>>(baseUrl + '/public/client', params);
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

  async function updateMoviePublic(
    uuid: string,
    moviePublicUpdate: MoviePublic
  ): Promise<ApiResponse<MoviePublic>> {
    return PATCH<ApiResponse<MoviePublic>>(
      baseUrl + `/public/${uuid}`,
      moviePublicUpdate
    );
  }

  async function removeMoviePublic(
    uuids: string[]
  ): Promise<ApiResponse<MoviePublic>> {
    return POST<ApiResponse<MoviePublic>>(baseUrl + '/public/remove', uuids);
  }

  return {
    getListMovies,
    getMovie,
    getListMoviePublic,
    getListMoviePublicForClient,
    addNewMovie,
    addMoviePublic,
    changeMovieActive,
    updateMovie,
    updateMoviePublic,
    removeMoviePublic,
  };
};

export default useMovieApi;
