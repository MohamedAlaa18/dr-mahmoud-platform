import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollDialogComponent } from './enroll-dialog.component';

describe('EnrollDialogComponent', () => {
  let component: EnrollDialogComponent;
  let fixture: ComponentFixture<EnrollDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnrollDialogComponent]
    });
    fixture = TestBed.createComponent(EnrollDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
