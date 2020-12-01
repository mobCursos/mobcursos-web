import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { Course } from '../interfaces/course';
import { CourseService } from "../course.service";
import { AuthService } from 'src/app/auth/auth.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courses$: Observable<Course[]>;
  id: string = this.route.snapshot.paramMap.get('id');
  userRole: string = this.authService.userRole;
  currentRoute: string;
  isOwnCourses: boolean;
  title: string;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private location: Location,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getCourses();
    this.currentRoute = this.route.snapshot.routeConfig.path;
    if (!this.authService.isLoggedIn ||
         this.currentRoute == 'available' ||
         this.userRole == 'admin') {
      this.title = 'Cursos';
      this.isOwnCourses = false;
    } else {
      this.title = 'Meus Cursos';
      this.isOwnCourses = true;
    }
    if (this.currentRoute == "remove/:id") {
      this.deleteCourse(this.id);
    }
  }

  getCourses(): void {
    // TODO: use route.paramMap and change deleteCourse method
    // TODO: reload component or reuse (reuse is preferable)
    if (!this.userRole || this.userRole == 'admin') {
      this.courses$ = this.courseService.getCourses(this.authService.isLoggedIn);
    
      // only student and teacher
    } else if (this.route.snapshot.routeConfig.path == "available") {
      this.courses$ = this.courseService.getAvailableCourses()
    } else {
      this.courses$ = this.courseService.getOwnCourses()
    }
  }

  deleteCourse(id: string): void {
    this.courseService.deleteCourse(id)
      .subscribe(() => this.goBack());
  }

  subscribe(id: string): void {
    this.courseService.subscribeToCourse(id)
      .subscribe();
  }

  unsubscribe(id: string): void {
    this.courseService.unsubscribeFormCourse(id)
      .subscribe();
  }

  goBack(): void {
    this.location.back();
  }

}

