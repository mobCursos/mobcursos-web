import { Course } from '../../courses/interfaces/course';

export interface User {
  _id?: string,
  role: string,
  name: string,
  avatar?: string,
  username: string,
  password?: string,
  email: string,
  courses?: Course[]
}