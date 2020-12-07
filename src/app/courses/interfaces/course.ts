import { User } from '../../users/interfaces/user';
import { Category } from './category';

export interface Course {
  _id?: string,
  name: string,
  category: string,  //TODO: use Category model on API
  description: string,
  teacher?: User,
  student?: User[]
}