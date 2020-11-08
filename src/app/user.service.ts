import { Injectable } from '@angular/core';
import { User } from "./interfaces/user";
import { USERS } from "./mocks/users";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  /** TODO: Get users from the server */
  getUsers(): User[] {
    return USERS;
  }
}
