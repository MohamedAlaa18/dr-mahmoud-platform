import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamDialogComponent } from './exam-dialog.component';

describe('ExamDialogComponent', () => {
  let component: ExamDialogComponent;
  let fixture: ComponentFixture<ExamDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamDialogComponent]
    });
    fixture = TestBed.createComponent(ExamDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
