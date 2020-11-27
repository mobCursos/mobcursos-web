import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseNoauthListComponent } from './course-noauth-list.component';

describe('CoursesComponent', () => {
  let component: CourseNoauthListComponent;
  let fixture: ComponentFixture<CourseNoauthListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseNoauthListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseNoauthListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
