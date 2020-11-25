import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map, tap, retry } from 'rxjs/operators';
import { Course } from "./interfaces/course";
import { environment } from 'src/environments/environment';
import { MessageService } from '../message.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

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

  private coursesUrl = environment.apiUrl + "courses";

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.coursesUrl)
      .pipe(
        tap(_ => this.log('fetched courses')),
        catchError(this.handleError<Course[]>('getCourses', []))
      )    
  }

  getCourse(id: string): Observable<Course> {
    const url =  `${this.coursesUrl}/${id}`;
    return this.http.get<Course>(url)
      .pipe(
        tap(_ => this.log(`fetched course id=${id}`)),
        catchError(this.handleError<Course>(`getCourse id=${id}`))
      );
  }

  searchCourses(term: string): Observable<Course[]> {
    if(!term.trim()){
      return of([])
    }
    const url = `${this.coursesUrl}/search?name=${term}&description=${term}`;
    return this.http.get<Course[]>(url)
      .pipe(
        tap(x => x.length ?
            this.log('found courses') :
            this.log('not found')),
        catchError(this.handleError<Course[]>('searchCourses', []))
      )
  }

  updateCourse(course: Course): Observable<Course> {
    // httpOptions.headers =
    //   httpOptions.headers.set('Authorization', 'my-new-auth-token');
    const id = course._id;
    const url =  `${this.coursesUrl}/${id}`;
    return this.http.put<Course>(url, course)
      .pipe(
        tap(_ => this.log(`updated course id=${id}`)),
        catchError(this.handleError<Course>(`updateCourse id=${id}`))
      );
  }

  createCourse(course: Course): Observable<Course> {

    // api login route - register function
    const url =  environment.apiUrl + 'register/'
    return this.http.post<Course>(url, course, this.httpOptions)
      .pipe(
        tap((newCourse: Course) => this.log(`added course id=${newCourse._id}`)),
        catchError(this.handleError<Course>(`createCourse`))
      );

    // TODO: api course route - add function (do not verify duplicated coursenames, etc)
    // return this.http.post<Course>(this.coursesUrl, course);
  }

  deleteCourse(id: string): Observable<{}> {
    /** TODO: confirm deletion */
    /** TODO: logic deletion */
    const url = `${this.coursesUrl}/${id}`;
    return this.http.delete(url)
      .pipe(
        tap(_ => this.log(`deleted course id=${id}`)),
        catchError(this.handleError(`deleteCourse id=${id}`))
      );
  }

  /** Log a message with the service */
  private log(message: string): void {
    this.messageService.add(`[CourseService] ${message}`);
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
    
     // TODO: better job of transforming error for course consumption
     this.log(`${operation} failed: ${error.message}`);
    
     // Let the app keep running by returning an empty result.
     return of(result as T);
   };
  }

}
