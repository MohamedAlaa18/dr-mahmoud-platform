import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentExamComponent } from './student-exam.component';

describe('StudentExamComponent', () => {
  let component: StudentExamComponent;
  let fixture: ComponentFixture<StudentExamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentExamComponent]
    });
    fixture = TestBed.createComponent(StudentExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
