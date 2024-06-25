import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDetailsCardComponent } from './course-details-card.component';

describe('CourseDetailsCardComponent', () => {
  let component: CourseDetailsCardComponent;
  let fixture: ComponentFixture<CourseDetailsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseDetailsCardComponent]
    });
    fixture = TestBed.createComponent(CourseDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
