import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MessageService } from '../message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  // redirect after logggin in
  redirectUrl: string;

  private url = environment.apiUrl + 'login';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: '...'
    })
  };

  private setSession(authResult: any) {
    localStorage.setItem('token', authResult.token);
    // expiration time
    localStorage.setItem('expiresIn', authResult.expiresIn)
    localStorage.setItem('role', authResult.role)
  }

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }

  login(credentials: any): Observable<any>{
    return this.http.post<any>(this.url, credentials, this.httpOptions)
    .pipe(
      tap(//_ => this.log('logged in'),
          res => this.setSession(res)),
      catchError(this.handleError<any>('login'))
    )
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('role');
  }

  // TODO: calculate when login expires

  /** Log a message with the service */
  private log(message: string): void {
    this.messageService.add(`[LoginService] ${message}`);
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
