import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherSignUpFormComponent } from './teacher-sign-up-form.component';

describe('TeacherSignUpFormComponent', () => {
  let component: TeacherSignUpFormComponent;
  let fixture: ComponentFixture<TeacherSignUpFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherSignUpFormComponent]
    });
    fixture = TestBed.createComponent(TeacherSignUpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
