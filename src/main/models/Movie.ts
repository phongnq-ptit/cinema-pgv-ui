import {Category} from './Category';
import {File} from './File';
import {User} from './User';

export interface Movie {
  uuid: string;
  name: string;
  duration: number;
  author: string;
  releaseDate: Date | string;
  categories: Array<Category>;
  images: Array<File> | null;
  movieFile: File | null;
  active: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MoviePublic {
  uuid: string;
  movie: Movie;
  branch: User;
  startDate: Date | string;
  endDate: Date | string;
  price: number;
  totalTickets: number;
}
