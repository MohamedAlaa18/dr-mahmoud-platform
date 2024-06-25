import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamTimeOutComponent } from './exam-time-out.component';

describe('ExamTimeOutComponent', () => {
  let component: ExamTimeOutComponent;
  let fixture: ComponentFixture<ExamTimeOutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamTimeOutComponent]
    });
    fixture = TestBed.createComponent(ExamTimeOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
