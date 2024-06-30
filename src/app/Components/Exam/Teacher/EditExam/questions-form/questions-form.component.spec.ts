import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsFormComponent } from './questions-form.component';

describe('QuestionsFormComponent', () => {
  let component: QuestionsFormComponent;
  let fixture: ComponentFixture<QuestionsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionsFormComponent]
    });
    fixture = TestBed.createComponent(QuestionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
