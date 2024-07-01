import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSignUpFormComponent } from './student-sign-up-form.component';

describe('StudentSignUpFormComponent', () => {
  let component: StudentSignUpFormComponent;
  let fixture: ComponentFixture<StudentSignUpFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentSignUpFormComponent]
    });
    fixture = TestBed.createComponent(StudentSignUpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
