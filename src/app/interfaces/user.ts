import { Course } from './course';

export interface User {
  _id?: String,
  role: String,
  name: String,
  avatar?: String,
  username: String,
  password?: String,
  email: String,
  courses?: Course[]
}