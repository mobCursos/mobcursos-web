import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map, tap, retry } from 'rxjs/operators';
import { User } from "./interfaces/user";
import { USERS } from "./mocks/users";
import { UsersComponent } from './users/users.component';
import { environment } from 'src/environments/environment';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: '...'
    })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
    ) { }

  private usersUrl = environment.apiUrl + "users";

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        tap(_ => this.log('fetched users')),
        catchError(this.handleError<User[]>('getUsers', []))
      )    
  }

  getUser(id: string): Observable<User> {
    const url =  `${this.usersUrl}/${id}`;
    return this.http.get<User>(url)
      .pipe(
        tap(_ => this.log(`fetched user id=${id}`)),
        catchError(this.handleError<User>(`getUser id=${id}`))
      );
  }

  searchUsers(term: string): Observable<User[]> {
    if(!term.trim()){
      return of([])
    }
    const url = `${this.usersUrl}/search?role=${term}&name=${term}&username=${term}&email=${term}`;
    return this.http.get<User[]>(url)
      .pipe(
        tap(x => x.length ?
            this.log('found users') :
            this.log('not found')),
        catchError(this.handleError<User[]>('searchUsers', []))
      )
  }

  updateUser(user: User): Observable<User> {
    // httpOptions.headers =
    //   httpOptions.headers.set('Authorization', 'my-new-auth-token');
    const id = user._id;
    const url =  `${this.usersUrl}/${id}`;
    return this.http.put<User>(url, user)
      .pipe(
        tap(_ => this.log(`updated user id=${id}`)),
        catchError(this.handleError<User>(`updateUser id=${id}`))
      );
  }

  createUser(user: User): Observable<User> {

    // api login route - register function
    const url =  environment.apiUrl + 'register/'
    return this.http.post<User>(url, user, this.httpOptions)
      .pipe(
        tap((newUser: User) => this.log(`added user id=${newUser._id}`)),
        catchError(this.handleError<User>(`createUser`))
      );

    // TODO: api user route - add function (do not verify duplicated usernames, etc)
    // return this.http.post<User>(this.usersUrl, user);
  }

  deleteUser(id: string): Observable<{}> {
    /** TODO: confirm deletion */
    /** TODO: logic deletion */
    const url = `${this.usersUrl}/${id}`;
    return this.http.delete(url)
      .pipe(
        tap(_ => this.log(`deleted user id=${id}`)),
        catchError(this.handleError(`deleteUser id=${id}`))
      );
  }

  /** Log a message with the service */
  private log(message: string): void {
    this.messageService.add(`[UserService] ${message}`);
  }

  /**
  * based on: https://angular.io/tutorial/toh-pt6#error-handling
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
   return (error: any): Observable<T> => {
    
     // TODO: send the error to remote logging infrastructure
     console.error(error); // log to console instead
    
     // TODO: better job of transforming error for user consumption
     this.log(`${operation} failed: ${error.message}`);
    
     // Let the app keep running by returning an empty result.
     return of(result as T);
   };
  }

}
