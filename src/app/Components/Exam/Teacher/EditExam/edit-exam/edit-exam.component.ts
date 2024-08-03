import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { convertDateFormat, convertTimeFormat } from 'src/app/Components/Exam/DateTimeFormat';
import { ILecture } from 'src/app/Models/iCourse';
import { IExam } from 'src/app/Models/iexam';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { ExamService } from 'src/app/Services/Exam/exam.service';
import { LecturesService } from 'src/app/Services/Lectures/lectures.service';
import { isAnyValueMissing, isDurationValid, isStartDateBeforeEndDate, isStartDateInFuture } from 'src/app/Validators/exam-validators';
import { QuestionsFormComponent } from '../questions-form/questions-form.component';

@Component({
  selector: 'app-edit-exam',
  templateUrl: './edit-exam.component.html',
  styleUrls: ['./edit-exam.component.css']
})
export class EditExamComponent implements OnInit {
  exam!: IExam;
  lecture!: ILecture;
  examForm!: FormGroup;
  activeSection: string = 'questionSettings';
  questions: any[] = [];
  courseTitle!: string;
  userId = "123";
  formSubmitted: boolean = false;

  @ViewChild(QuestionsFormComponent) questionsForm!: QuestionsFormComponent;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private examData: ExamService,
    private lectureData: LecturesService,
    private snackBar: MatSnackBar,
    private userData: AuthService,
    private router: Router,
    private titleService: Title
  ) {
    // this.userId = this.userData.getUserId();
  }

  ngOnInit(): void {
    const pageTitle = this.activatedRoute.snapshot.data['title'];
    this.titleService.setTitle(pageTitle);

    this.initForm();

    this.activatedRoute.queryParams.subscribe(params => {
      this.getExamById(params['examId']);
    });

    this.getLectureId(Number(this.activatedRoute.snapshot.paramMap.get('courseId')), Number(this.activatedRoute.snapshot.paramMap.get('lessonId')));
  }

  getExamById(id: number) {
    this.examData.getExamById(id).subscribe(
      exam => {
        this.exam = exam;
        this.getExamDate(exam);
      },
      error => {
        if (error.status === 404 || error.status === 403) {
          this.closePage();
        } else {
          console.error('Error fetching Exam:', error);
        }
      });
  }

  getLectureId(courseId: number, lectureId: number) {
    this.lectureData.getLecture(lectureId).subscribe(
      lecture => {
        this.lecture = lecture;
      },
      error => {
        if (error.status === 404 || error.status === 403) {
          this.closePage();
        } else {
          console.error('Error fetching Exam:', error);
        }
      });
  }

  initForm(): void {
    this.examForm = this.fb.group({
      title: ['', [Validators.required, Validators.pattern(/^[\u0600-\u06FF\u0750-\u077F\s0-9a-zA-Z]+$/)]],
      startDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required],
      startTime: [0, Validators.required],
      endTime: [0, Validators.required],
      duration: [0, [Validators.required, Validators.min(5), Validators.max(180)]],
      questions: this.fb.array([]),
    }, {
      validators: [
        isAnyValueMissing,
        isStartDateBeforeEndDate,
        isStartDateInFuture,
        isDurationValid,
      ]
    });
  }

  initQuestions(): void {
    const questionsArray = this.examForm.get('questions') as FormArray;
    this.exam.questions?.forEach(question => {
      const questionGroup = this.fb.group({
        points: [question.points, Validators.required],
        header: [question.header, Validators.required],
        type: [question.type, Validators.required],
        imageFile: [question?.imageFile || null],
        answers: this.fb.array([])
      });

      const answersArray = questionGroup.get('answers') as FormArray;
      question.answers.forEach(answer => {
        answersArray.push(this.fb.group({
          header: [answer.header, Validators.required],
          isCorrect: answer.isCorrect,
          imageFile: [answer?.imageFile || null],
        }));
      });

      questionsArray.push(questionGroup);
    });
  }

  getExamDate(exam: IExam) {
    const startDateTime = new Date(exam.startDate);
    const endDateTime = new Date(exam.dueDate);

    this.examForm.patchValue({
      title: exam.title || '',
      startDate: startDateTime || '',
      endDate: endDateTime || '',
      startTime: this.formatTime(startDateTime) || '',
      endTime: this.formatTime(endDateTime) || '',
      duration: exam.duration
    });

    this.courseTitle = exam.title;

    this.initQuestions();
  }

  formatTime(date: Date): string {
    return `${this.padZero(date.getHours())}:${this.padZero(date.getMinutes())}`;
  }

  padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  //SnackBar
  displayErrorMessages(): void {
    const formErrors = this.examForm.errors;

    if (formErrors) {
      if (formErrors['anyValueMissing']) {
        this.openSnackBar('يرجى ملء جميع الحقول', 'حسناً');
      }
      if (formErrors['startDateAfterEndDate']) {
        this.openSnackBar('تاريخ البداية يجب أن يكون قبل تاريخ الانتهاء', 'حسناً');
      }
      if (formErrors['durationInvalid']) {
        this.openSnackBar('المدة المحددة أطول من المدة الفعلية للامتحان', 'حسناً');
      }
      if (formErrors['startDatePast']) {
        this.openSnackBar('يجب أن يكون تاريخ البداية في المستقبل', 'حسناً');
      }
    } else {
      Object.keys(this.examForm.controls).forEach(controlName => {
        const control = this.examForm.get(controlName);
        if (control && control.errors) {
          if (control.errors?.['required']) {
            this.openSnackBar('هذا الحقل مطلوب', 'حسناً');
          }
        }
      });
    }
  }

  openSnackBar(message: string, action: string): void {
    let verticalPosition: 'top' | 'bottom' = 'bottom';
    let horizontalPosition: 'start' | 'center' | 'end' | 'left' | 'right' = 'center';
    let panelClass: string[] = [];

    // Determine position based on message
    if (message === 'غير متاح او لا يمكن الوصول') {
      verticalPosition = 'top';
      horizontalPosition = 'center';
    } else {
      verticalPosition = 'bottom';
      horizontalPosition = 'right';
    }

    // Determine panel class based on message
    if (message === 'تم حفظ الامتحان') {
      panelClass.push('snackbar-success');
    }

    // Open Snackbar with specified configuration
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: verticalPosition,
      horizontalPosition: horizontalPosition,
      panelClass: panelClass
    });
  }

  closePage() {
    this.openSnackBar('غير متاح او لا يمكن الوصول', 'حسناً');

    setTimeout(() => {
      this.goBackAndRemoveCurrentRoute();
    }, 2000);
  }

  goBackAndRemoveCurrentRoute(): void {
    window.history.back();
    window.history.replaceState(null, '', this.router.url);
  }

  onSaveClicked(): void {
    this.examForm.markAllAsTouched();
    this.formSubmitted = true;

    if (this.examForm.valid) {
      console.log('Form submitted successfully!');

      const startDate = convertDateFormat(this.examForm.value.startDate);
      const endDate = convertDateFormat(this.examForm.value.endDate);

      const startTime = convertTimeFormat(this.examForm.value.startTime);
      const endTime = convertTimeFormat(this.examForm.value.endTime);

      // Convert duration to number
      const duration = Number(this.examForm.get('duration')!.value);

      // Get the id from the URL
      const params = this.activatedRoute.snapshot.queryParams;
      const id = params['examId'];

      const questionsData = this.examForm.value.questions.map((question: any, index: number) => {
        // Retrieve question ID if it exists
        const questionId = this.exam.questions && this.exam.questions.length > index ? this.exam.questions[index].id : null;

        // Map answers and add IDs
        const answersData = question.answers.map((answer: any, answerIndex: number) => {
          // Retrieve answer ID if it exists
          const answerId = this.exam.questions && this.exam.questions.length > index &&
            this.exam.questions[index].answers && this.exam.questions[index].answers.length > answerIndex ?
            this.exam.questions[index].answers[answerIndex].id : null;

          return {
            ...answer,
            id: answerId
          };
        });

        return {
          ...question,
          id: questionId,
          answers: answersData
        };
      });

      const examData = {
        ...this.examForm.value,
        type: this.exam.type,
        startDateTime: `${startDate}T${startTime}`,
        endDateTime: `${endDate}T${endTime}`,
        duration: duration,
        lectureId: Number(this.activatedRoute.snapshot.paramMap.get('lessonId')),
        questions: questionsData // Include the updated questions data with preserved IDs
      };

      // Remove startDate, endDate, startTime, and endTime from examData
      delete examData.startDate;
      delete examData.endDate;
      delete examData.startTime;
      delete examData.endTime;

      // Replace id with the one from the URL
      examData.id = Number(id);

      console.log(examData);
      this.openSnackBar('تم حفظ الامتحان', 'حسناً');

      this.examData.editExam(examData.id, examData).subscribe(
        (editedExam: any) => {
          console.log('Exam edited successfully:', editedExam);
          this.openSnackBar('تم حفظ الامتحان', 'حسناً');
        },
        (error) => {
          if (error.status == 200) {
            window.location.reload();
          }
          console.error('Error occurred while adding exam:', error);
        }
      );
    } else {
      console.log('Form validation failed.');
      this.displayErrorMessages();
    }
  }
}

