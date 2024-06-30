import { Component, Input } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-answers-form',
  templateUrl: './answers-form.component.html',
  styleUrls: ['./answers-form.component.scss']
})
export class AnswersFormComponent {
  @Input() i!: number;
  @Input() questionsControls!: FormArray;

  constructor(private fb: FormBuilder) { }

  addAnswer(questionIndex: number): void {
    const activeQuestionFormGroup = this.getQuestionFormGroup(questionIndex);

    if (!activeQuestionFormGroup) {
      console.error('Active question form group not found.');
      return;
    }

    const questionType = activeQuestionFormGroup.get('type')?.value;

    if (!questionType) {
      console.error('Question type not found.');
      return;
    }

    const answersFormArray = activeQuestionFormGroup.get('answers') as FormArray;

    if (!answersFormArray) {
      console.error('Answers form array not found.');
      return;
    }

    if (!this.isAnswersLimitReached(questionIndex)) {
      if (questionType === 'TrueFalse') {
        answersFormArray.push(this.createAnswerFormGroup({ text: 'True', isCorrect: false }, questionType, answersFormArray.length));
        answersFormArray.push(this.createAnswerFormGroup({ text: 'False', isCorrect: false }, questionType, answersFormArray.length));
      } else {
        answersFormArray.push(this.createAnswerFormGroup({}, questionType, answersFormArray.length));
      }
    } else {
      console.error('Maximum number of answers reached.');
      return;
    }
  }

  isAnswersLimitReached(questionIndex: number): boolean {
    const questionFormGroup = this.getQuestionFormGroup(questionIndex);
    if (!questionFormGroup) {
      return false;
    }

    const questionType = questionFormGroup.get('type')?.value;
    const answersLength = (questionFormGroup.get('answers') as FormArray)?.length ?? 0;

    return (
      (questionType === 'MultipleChoice' || questionType === 'OneChoice') && answersLength >= 4 ||
      (questionType === 'TrueFalse' && answersLength >= 2)
    );
  }

  createAnswerFormGroup(answer: any, questionType: string, index: number): FormGroup {
    let headerValue = '';
    if (questionType === 'TrueFalse') {
      headerValue = index === 0 ? 'صح' : 'خطأ';
    }

    return this.fb.group({
      header: [headerValue, Validators.required],
      isCorrect: [answer?.isCorrect || null, Validators.required]
    }) as FormGroup;
  }

  //remove from Form
  removeAnswer(questionIndex: number, answerIndex: number): void {
    const activeQuestionFormGroup = this.getQuestionFormGroup(questionIndex);
    const answersFormArray = activeQuestionFormGroup.get('answers') as FormArray;

    if (!answersFormArray) {
      console.error('Answers form array not found.');
      return;
    }

    answersFormArray.removeAt(answerIndex);
  }

  // This method handles the selection of answers and checks if at least one answer is marked as correct
  handleAnswerSelection(questionIndex: number, selectedAnswerIndex: number, isTrueAnswer: boolean): void {
    const questionFormGroup = this.getQuestionFormGroup(questionIndex);
    if (questionFormGroup) {
      const questionType = questionFormGroup.get('type')?.value;
      if ((questionType === 'OneChoice' || questionType === 'TrueFalse') && isTrueAnswer) {
        const answersFormArray = questionFormGroup.get('answers') as FormArray;
        if (answersFormArray) {
          for (let i = 0; i < answersFormArray.length; i++) {
            if (i !== selectedAnswerIndex) {
              const answerFormGroup = answersFormArray.at(i) as FormGroup;
              const isCorrectControl = answerFormGroup.get('isCorrect');
              if (isCorrectControl) {
                isCorrectControl.setValue(false);
              }
            }
          }
        }
      }
      const answerFormGroup = this.getAnswerFormGroup(questionIndex, selectedAnswerIndex);
      if (answerFormGroup) {
        const isCorrectControl = answerFormGroup.get('isCorrect');
        if (isCorrectControl) {
          isCorrectControl.setValue(isTrueAnswer);
          // Check if at least one answer is marked as true
          const anyTrue = this.checkAnyTrue(questionIndex);
          if (anyTrue) {
            // Clear error if any checkbox is checked as "true"
            this.clearErrorMessages(questionIndex);
          } else {
            // Set error if all checkboxes are marked as false
            this.setErrorMessages(questionIndex);
          }
        }
      }
    }
  }
  getAnswerFormGroup(questionIndex: number, answerIndex: number): FormGroup {
    const questionFormGroup = this.getQuestionFormGroup(questionIndex);
    if (!questionFormGroup) {
      console.error('Question form group not found.');
      return this.fb.group({});
    }

    const answersFormArray = questionFormGroup.get('answers') as FormArray;
    if (!answersFormArray) {
      console.error('Answers form array not found.');
      return this.fb.group({});
    }

    if (answerIndex >= 0 && answerIndex < answersFormArray.length) {
      return answersFormArray.at(answerIndex) as FormGroup;
    } else {
      console.error('Answer form group not found.');
      return this.fb.group({});
    }
  }

  // Method to check if at least one answer is marked as true
  checkAnyTrue(questionIndex: number): boolean {
    const questionFormGroup = this.getQuestionFormGroup(questionIndex);
    if (questionFormGroup) {
      const answersFormArray = questionFormGroup.get('answers') as FormArray;
      if (answersFormArray) {
        for (let i = 0; i < answersFormArray.length; i++) {
          const answerFormGroup = answersFormArray.at(i) as FormGroup;
          const isCorrectControl = answerFormGroup.get('isCorrect');
          if (isCorrectControl && isCorrectControl.value) {
            return true;
          }
        }
      }
    }
    return false;
  }

  // Method to set the error message for all checkboxes when all are marked as false
  setErrorMessages(questionIndex: number): void {
    const questionFormGroup = this.getQuestionFormGroup(questionIndex);
    if (questionFormGroup) {
      const answersFormArray = questionFormGroup.get('answers') as FormArray;
      if (answersFormArray) {
        for (let i = 0; i < answersFormArray.length; i++) {
          const answerFormGroup = answersFormArray.at(i) as FormGroup;
          const isCorrectControl = answerFormGroup.get('isCorrect');
          if (isCorrectControl && !isCorrectControl.value) {
            const errorMessageControl = answerFormGroup.get('isCorrect');
            if (errorMessageControl) {
              errorMessageControl.setErrors({ 'atLeastOneTrueFalseRequired': true });
            }
          }
        }
      }
    }
  }

  // Method to clear the error messages for all checkboxes
  clearErrorMessages(questionIndex: number): void {
    const questionFormGroup = this.getQuestionFormGroup(questionIndex);
    if (questionFormGroup) {
      const answersFormArray = questionFormGroup.get('answers') as FormArray;
      if (answersFormArray) {
        answersFormArray.controls.forEach(control => {
          const isCorrectControl = control.get('isCorrect');
          if (isCorrectControl && isCorrectControl.errors && isCorrectControl.errors['atLeastOneTrueFalseRequired']) {
            isCorrectControl.setErrors(null);
          }
        });
      }
    }
  }

  //getFormControls
  getFormArrayControls(control: AbstractControl | null): AbstractControl[] {
    if (control instanceof FormArray) {
      return control.controls;
    }
    return [];
  }

  getQuestionFormGroup(index: number): FormGroup {
    return this.questionsControls.at(index) as FormGroup;
  }
}
