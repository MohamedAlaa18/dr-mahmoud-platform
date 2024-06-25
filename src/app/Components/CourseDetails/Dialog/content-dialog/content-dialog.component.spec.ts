import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentDialogComponent } from './content-dialog.component';

describe('ContentDialogComponent', () => {
  let component: ContentDialogComponent;
  let fixture: ComponentFixture<ContentDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContentDialogComponent]
    });
    fixture = TestBed.createComponent(ContentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
