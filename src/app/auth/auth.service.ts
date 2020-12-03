import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, Observable, of } from 'rxjs';
import { catchError, finalize, takeWhile, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MessageService } from '../message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  // redirect after logggin in
  redirectUrl: string = '/';

  userRole: string;
  expiresIn: string; // milisseconds
  expiresInSeconds: string;
  expiresInDatetime: Date;

  sessionTimeDurationSeconds: number = 0;

  private url = environment.apiUrl + 'login';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: '...'
    })
  };

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }

  private setSession(authResult: any) {
    localStorage.setItem('token', authResult.token);
    // expiration time
    localStorage.setItem('expiresIn', authResult.expiresIn)

    this.userRole =  authResult.role;
    this.expiresIn = authResult.expiresIn;
    this.expiresInSeconds = (+this.expiresIn/1000).toString();
    this.expiresInDatetime = this.getExpiresInDatetime(this.expiresIn);
  }

  private getExpiresInDatetime(expiresIn: string) {
    const actualTimeMs:number  = Date.now();
    const expiresInDatetimeMs:number = actualTimeMs + +expiresIn;
    const expiresInDatetime = new Date(expiresInDatetimeMs);
    return expiresInDatetime;
  }

  public isSessionValid():boolean {
    return Date.now() < Date.parse(this.expiresInDatetime.toString())
  }

  startSessionCounter(){
    const secondsCounter = interval(1000);
    const result = secondsCounter.pipe(
      takeWhile(n => n < +this.expiresInSeconds),
      // TODO: woarn user to add another session time
      finalize(() => this.logout()));
    result.subscribe(
      _ => this.sessionTimeDurationSeconds += 1
    )
  }


  getRemainingSessionTime(): number {
    return +this.expiresInSeconds - this.sessionTimeDurationSeconds;
  }

  login(credentials: any): Observable<any>{
    return this.http.post<any>(this.url, credentials, this.httpOptions)
    .pipe(
      tap(_ => this.log('logged in')),
      tap(res => this.setSession(res)),
      tap(_ => this.startSessionCounter()),
      tap(_ => this.isLoggedIn = true),
      catchError(this.handleError<any>('login'))
    )
  }

  logout(): void {
    this.log('logged out')
    this.isLoggedIn = false;
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    this.userRole = '';
  }

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
