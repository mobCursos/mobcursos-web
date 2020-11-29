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

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private location: Location,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getCourses();
    if (this.route.snapshot.routeConfig.path == "remove/:id") {
      this.removeCourse(this.id);
    }

  }

  ngOnChanges(): void {
    this.getCourses();
  }

  getCourses(): void {
    if (!this.userRole || this.userRole == 'admin') {
      this.courseService.getCourses()
      .subscribe(courses => this.courses = courses);
    } else {
      console.warn('GET COURSES OWN:')
      this.courseService.getCoursesOwn()
      .subscribe(courses => {
        this.courses = courses;
        console.warn(courses)});
    }
    
  }

  removeCourse(id: string): void {
    this.courseService.deleteCourse(id)
      .subscribe(() => this.goBack());
  }

  unsubscribe(id: string): void {
    this.courseService.unsubscribeFormCourse(id)
      .subscribe();
  }

  goBack(): void {
    this.location.back();
  }

}

