import { User } from './user';

export interface Course {
  _id: String,
  name: String,
  description: String,
  teacher?: User,
  student?: User[]
}