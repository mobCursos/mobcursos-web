import { Injectable } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { Observable, of } from "rxjs";
import { User } from "./interfaces/user";
import { USERS } from "./mocks/users";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  /** SEE: https://angular.io/tutorial/toh-pt6 */

  /** TODO: Get users from the server */
  getUsers(): Observable<User[]> {
    return of(USERS);
  }

  /** TODO: Get user from the server */
  getUser(id: string): Observable<User> {
    return of(USERS.find(user => user._id === id));
  }

  /** TODO: Update user on the server */
  updateUser(user: User): Observable<any> {
    USERS.push(user);
    console.warn(USERS);
    return of(USERS);
  }


}
