import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-question-controller',
  templateUrl: './question-controller.component.html',
  styleUrls: ['./question-controller.component.css']
})
export class QuestionControllerComponent implements OnInit {

  @Input() formSubmitted!: boolean;
  @Input() examForm: FormGroup | undefined;
  @Output() questionIndexClicked: EventEmitter<number> = new EventEmitter<number>();
  @Output() addQuestionClicked: EventEmitter<any> = new EventEmitter<any>();

  questionIndex: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.onAddQuestionClicked();
  }

  get questionsArray(): FormArray {
    return this.examForm?.get('questions') as FormArray;
  }

  onAddQuestionClicked(): void {
    const questionsArray = this.examForm?.get('questions') as FormArray | null;
    if (questionsArray && questionsArray.controls.length < 12) {
      this.addQuestionClicked.emit();
      this.sendIndexToParent(questionsArray.controls.length -1)
    }
  }

  sendIndexToParent(index: number): void {
    this.questionIndex = index;
    this.questionIndexClicked.emit(index);
  }

  isQuestionInvalid(index: number): boolean {
    const questionControl = this.questionsArray.at(index);
    return (this.formSubmitted && questionControl?.touched) && (questionControl?.invalid);
  }

}
