import {Category} from './Category';
import {File} from './File';

export interface Movie {
  uuid: string;
  name: string;
  duration: number;
  author: string;
  releaseDate: Date;
  categories: Array<Category>;
  images: Array<File>;
  movieFile: File | null;
  active: number;
  createdAt?: Date;
  updatedAt?: Date;
}
