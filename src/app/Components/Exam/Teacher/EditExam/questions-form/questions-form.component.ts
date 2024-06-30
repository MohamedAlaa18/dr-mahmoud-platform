import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-questions-form',
  templateUrl: './questions-form.component.html',
  styleUrls: ['./questions-form.component.scss']
})
export class QuestionsFormComponent implements OnInit {
  @Output() questionIndexClicked = new EventEmitter<number>();
  @Output() addQuestionClicked = new EventEmitter<void>();
  @Input() examForm: FormGroup | undefined;
  @Input() activeSection!: string;
  @Input() formSubmitted!: boolean;

  questionsControls!: FormArray;
  activeQuestions: boolean[] = [];
  activeQuestionIndex: number = 0;
  questionIndex: number = 0;
  selectedValue: number = 10;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.questionsControls = this.examForm?.get('questions') as FormArray;
    for (let i = 0; i < this.questionsControls.length; i++) {
      this.activeQuestions.push(false);
    }

    this.examForm?.get('questionIndex')?.valueChanges.subscribe((index: number) => {
      this.activeQuestionIndex = index;
      this.updateAnswersControls();
    });
  }

  removeQuestion(index: number): void {
    this.questionsControls.removeAt(index);
    this.activeQuestions.splice(index, 1);
  }

  //add in Form
  addQuestion(): void {
    const questionFormGroup = this.createQuestionFormGroup();
    this.questionsControls.push(questionFormGroup);
  }

  handleQuestionIndexClicked(index: number): void {
    if (index != this.activeQuestionIndex) {
      this.activeQuestions[index] = !this.activeQuestions[index];
      this.activeQuestionIndex = this.activeQuestionIndex === index ? -1 : index;
      this.activeSection = 'questionSettings';
    }
  }

  createQuestionFormGroup(): FormGroup {
    return this.fb.group({
      points: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      header: ['', [Validators.required, Validators.pattern(/^[\u0600-\u06FF\u0750-\u077F\s0-9a-zA-Z]+$/)]],
      type: ['', Validators.required],
      answers: this.fb.array([], [this.validateAnswersLength])
    });
  }

  validateAnswersLength(control: AbstractControl): { [key: string]: boolean } | null {
    const answersArray = control as FormArray;
    if (answersArray && answersArray.length < 2) {
      return { 'minAnswers': true };
    }
    return null;
  }

  onAddQuestionClicked(): void {
    const questionsFormArray = this.examForm?.get('questions') as FormArray;
    questionsFormArray.push(this.createQuestionFormGroup());
    this.examForm?.markAsDirty();
  }

  //getFormGroup
  get questionFormGroup(): FormGroup {
    if (this.questionIndex >= 0 && this.questionIndex < this.questionsControls.length) {
      return this.questionsControls.at(this.questionIndex) as FormGroup;
    } else {
      return this.fb.group({});
    }
  }

  getQuestionFormGroup(index: number): FormGroup {
    return this.questionsControls.at(index) as FormGroup;
  }

  //getAnswers
  getAnswersForActiveQuestion(): FormArray | undefined {
    if (this.activeQuestionIndex === -1) {
      console.error('No active question selected.');
      return;
    }
    const activeQuestionFormGroup = this.getQuestionFormGroup(this.activeQuestionIndex);
    if (!activeQuestionFormGroup) {
      console.error('Active question form group not found.');
      return;
    }
    return activeQuestionFormGroup.get('answers') as FormArray;
  }

  updateAnswersControls(): void {
    const activeQuestionFormGroup = this.getQuestionFormGroup(this.activeQuestionIndex);
    if (!activeQuestionFormGroup) {
      console.error('Active question form group not found.');
      return;
    }

    const answersFormArray = activeQuestionFormGroup.get('answers') as FormArray;
    if (!answersFormArray) {
      console.error('Answers form array not found.');
      return;
    }
  }

  getAnswersControls(): FormArray | undefined {
    if (this.questionIndex === -1) {
      console.error('No question selected.');
      return;
    }
    const questionsFormArray = this.examForm?.get('questions') as FormArray;
    const questionControl = questionsFormArray.at(this.questionIndex);
    if (!questionControl) {
      // console.error(`Question index ${this.questionIndex} is out of bounds.`);
      return;
    }
    let answersArray = questionControl.get('answers') as FormArray;
    if (!answersArray) {
      answersArray = this.createAnswerFormArray();
      questionControl.patchValue({ answers: answersArray });
    }
    return answersArray;
  }

  //createFormGroup
  private createAnswerFormArray(): FormArray {
    return this.fb.array([]);
  }

  updateAnswerCorrectness(questionIndex: number, answerIndex: number, isTrueAnswer: boolean) {
    const answersArray = this.getQuestionFormGroup(questionIndex).get('answers') as FormArray;
    if (this.getQuestionFormGroup(questionIndex).get('type')?.value === 'OneChoice') {
      answersArray.controls.forEach((control, i) => {
        if (i !== answerIndex) {
          control.get('isCorrect')?.setValue(false);
        }
      });
    }
  }
}
