import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { Course } from '../interfaces/course';
import { CourseService } from "../course.service";


@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courses: Course[];
  id: string = this.route.snapshot.paramMap.get('id');

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private location: Location
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

