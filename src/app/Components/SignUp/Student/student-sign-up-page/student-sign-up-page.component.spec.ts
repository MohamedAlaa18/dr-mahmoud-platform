import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSignUpPageComponent } from './student-sign-up-page.component';

describe('StudentSignUpPageComponent', () => {
  let component: StudentSignUpPageComponent;
  let fixture: ComponentFixture<StudentSignUpPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentSignUpPageComponent]
    });
    fixture = TestBed.createComponent(StudentSignUpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
