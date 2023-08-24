import {MoviePublic} from './Movie';
import {User} from './User';

export interface Purchase {
  uuid: string;
  user: User;
  moviePublic: MoviePublic;
  quantityOfTickets: number;
  createdAt: Date;
  updatedAt: Date;
}
