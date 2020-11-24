import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { Course } from '../interfaces/course';
import { CourseService } from "../course.service";


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: Course[];
  id: string = this.route.snapshot.paramMap.get('id');

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getCourses();
    if (this.route.snapshot.routeConfig.path == "courses/remove/:id") {
      this.removeCourse(this.id);
    }

  }

  ngOnChanges(): void {
    this.getCourses();
  }

  getCourses(): void {
    this.courseService.getCourses()
      .subscribe(courses => this.courses = courses);
  }

  removeCourse(id: string): void {
    this.courseService.deleteCourse(id)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}

