import { User } from '../../users/interfaces/user';
import { Category } from './category';

export interface Course {
  _id?: string,
  name: string,
  category: Category,
  description: string,
  teacher?: User,
  student?: User[]
}