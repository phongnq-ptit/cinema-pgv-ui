import {Movie} from '../../models/Movie';
import {ApiResponse} from '../../models/base';
import useApi from './useApi';

const useMovieApi = () => {
  const {POST} = useApi();
  const baseUrl = 'api/movies';

  async function addNewMovie(newMovie: Movie): Promise<ApiResponse<Movie>> {
    return POST<ApiResponse<Movie>>(baseUrl, newMovie);
  }

  return {addNewMovie};
};

export default useMovieApi;
