import { User } from './user';

export interface Course {
  _id?: string,
  name: string,
  description: string,
  teacher?: User,
  student?: User[]
}