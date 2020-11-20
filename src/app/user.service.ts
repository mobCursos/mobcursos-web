import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map, tap, retry } from 'rxjs/operators';
import { User } from "./interfaces/user";
import { USERS } from "./mocks/users";
import { UsersComponent } from './users/users.component';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // Authorization: '...'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient) { }

  private usersUrl = environment.apiUrl + "users/";

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
    /** TODO: implement log and handleError */
      // .pipe(
      //   catchError(this.handleError<User[]>('getUsers', []))
      // )    
  }

  getUser(id: string): Observable<User> {
    /** TODO: implement log and handleError */
    const url =  `${this.usersUrl}${id}`;
    return this.http.get<User>(url);
  }

  updateUser(user: User): Observable<User> {
    /** TODO: implement log and handleError */
    // httpOptions.headers =
    //   httpOptions.headers.set('Authorization', 'my-new-auth-token');
    const id = user._id;
    const url =  `${this.usersUrl}${id}`;
    return this.http.put<User>(url, user);
  }

  createUser(user: User): Observable<User> {
    /** TODO: implement log and handleError */

    // api login route - register function
    const url =  environment.apiUrl + 'register/'
    return this.http.post<User>(url, user);

    // api user route - add function (do not verify duplicated usernames, etc)
    // return this.http.post<User>(this.usersUrl, user);
  }

  deleteUser(id: string): Observable<{}> {
    /** TODO: implement log and handleError */
    /** TODO: confirm deletion */
    /** TODO: logic deletion */
    const url = `${this.usersUrl}${id}`;
    console.warn('DELETE url: ', url);
    return this.http.delete(url);
  }

  /**
   * base on: https://angular.io/tutorial/toh-pt6#error-handling
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  // private handleError<T>(operation = 'operation', result?: T) {
  //  return (error: any): Observable<T> => {
    
  //    // TODO: send the error to remote logging infrastructure
  //    console.error(error); // log to console instead
    
  //    // TODO: better job of transforming error for user consumption
  //    this.log(`${operation} failed: ${error.message}`);
    
  //    // Let the app keep running by returning an empty result.
  //    return of(result as T);
  //  };
  // }


}
