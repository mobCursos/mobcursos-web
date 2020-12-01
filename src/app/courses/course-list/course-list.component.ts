import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { Course } from '../interfaces/course';
import { CourseService } from "../course.service";
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courses: Course[];
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
      this.removeCourse(this.id);
    }
  }

  ngOnChanges(): void {
    this.getCourses();
  }

  getCourses(): void {
    if (!this.userRole || this.userRole == 'admin') {
      this.courseService.getCourses(this.authService.isLoggedIn)
      .subscribe(courses => this.courses = courses);
      // only student and teacher
    } else if (this.route.snapshot.routeConfig.path == "available") {
      this.courseService.getAvailableCourses()
      .subscribe(courses => this.courses = courses);
    } else {
      this.courseService.getOwnCourses()
      .subscribe(courses => this.courses = courses);
    }
  }

  removeCourse(id: string): void {
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

