import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonDialogComponent } from './lecture-dialog.component';

describe('LessonDialogComponent', () => {
  let component: LessonDialogComponent;
  let fixture: ComponentFixture<LessonDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LessonDialogComponent]
    });
    fixture = TestBed.createComponent(LessonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
