import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { Course } from '../interfaces/course';
import { CourseService } from "../course.service";


@Component({
  selector: 'app-course-noauth-list',
  templateUrl: './course-noauth-list.component.html',
  styleUrls: ['./course-noauth-list.component.css']
})
export class CourseNoauthListComponent implements OnInit {

  courses: Course[];
  id: string = this.route.snapshot.paramMap.get('id');

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getCoursesNoauth();
  }

  getCoursesNoauth(): void {
    this.courseService.getCoursesNoauth()
      .subscribe(courses => this.courses = courses);
  }

  goBack(): void {
    this.location.back();
  }

}

