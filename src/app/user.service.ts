import { Injectable } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { Observable, of } from "rxjs";
import { User } from "./interfaces/user";
import { USERS } from "./mocks/users";
import { UsersComponent } from './users/users.component';

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
    // TODO: remove fake update
    const id = user._id; 
    const index = USERS.findIndex(
      (users) => {
        return users._id == id; 
      }
    )
    console.warn('SERVICE UPDATE id: ', id)
    console.warn('SERVICE UPDATE index: ', index)
    USERS.splice(index, 1);
    USERS.push(user);
    console.warn(USERS);

    return of(USERS);
  }

  /** TODO: Create user on the server */
  createUser(user: User): Observable<any> {
    // TODO: remove fake update
    const id = Math.random().toString();
    user._id = id;
    USERS.push(user);
    console.warn(USERS);
    return of(USERS);
  }

  /** TODO: Delete user on the server*/
  deleteUser(id: string) {
    const index = USERS.findIndex(
      (users) => {
        return users._id == id; 
      }
    )
    USERS.splice(index, 1);
  }


}
