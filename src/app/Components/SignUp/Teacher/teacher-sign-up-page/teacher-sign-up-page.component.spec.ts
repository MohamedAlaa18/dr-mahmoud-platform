import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherSignUpComponent } from './teacher-sign-up-page.component';

describe('TeacherSignUpComponent', () => {
  let component: TeacherSignUpComponent;
  let fixture: ComponentFixture<TeacherSignUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherSignUpComponent]
    });
    fixture = TestBed.createComponent(TeacherSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
