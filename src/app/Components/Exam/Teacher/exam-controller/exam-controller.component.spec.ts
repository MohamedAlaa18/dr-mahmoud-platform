import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamControllerComponent } from './exam-controller.component';

describe('ExamControllerComponent', () => {
  let component: ExamControllerComponent;
  let fixture: ComponentFixture<ExamControllerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamControllerComponent]
    });
    fixture = TestBed.createComponent(ExamControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
