import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/shared/header/header.component';
import { MainComponent } from './Components/main/main.component';
import { HeroComponent } from './Components/hero/hero.component';
import { FooterComponent } from './Components/shared/footer/footer.component';
import { CoursesComponent } from './Components/courses/courses.component';
import { CourseCardComponent } from './Components/shared/course-card/course-card.component';
import { LoadingCardsComponent } from './Components/shared/loading-cards/loading-cards.component';
import { LogoComponent } from '../assets/svgs/logo/logo.component';
import { HeroLogoComponent } from './Components/shared/hero-logo/hero-logo.component';
import { LectureComponent } from './Components/lecture/lecture.component';
import { CourseDetailsComponent } from './Components/CourseDetails/course-details/course-details.component';
import { CourseDetailsCardComponent } from './Components/CourseDetails/course-details-card/course-details-card.component';
import { CourseDetailsHeaderComponent } from './Components/CourseDetails/course-details-header/course-details-header.component';
import { ConfirmationDialogComponent } from './Components/CourseDetails/Dialog/confirmation-dialog/confirmation-dialog.component';
import { EnrollDialogComponent } from './Components/CourseDetails/Dialog/enroll-dialog/enroll-dialog.component';
import { ExamDialogComponent } from './Components/CourseDetails/Dialog/exam-dialog/exam-dialog.component';
import { LectureDialogComponent } from './Components/CourseDetails/Dialog/lesson-dialog/lecture-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ContentDialogComponent } from './Components/CourseDetails/Dialog/content-dialog/content-dialog.component';
import { EditExamComponent } from './Components/Exam/Teacher/EditExam/edit-exam/edit-exam.component';
import { ExamControllerComponent } from './Components/Exam/Teacher/exam-controller/exam-controller.component';
import { QuestionControllerComponent } from './Components/Exam/Teacher/question-controller/question-controller.component';
import { TimerComponent } from './Components/Exam/Student/timer/timer.component';
import { StudentExamComponent } from './Components/Exam/Student/student-exam/student-exam.component';
import { ExamResultComponent } from './Components/Exam/Student/exam-result/exam-result.component';
import { ExamFormComponent } from './Components/Exam/Teacher/EditExam/exam-form/exam-form.component';
import { AnswersFormComponent } from './Components/Exam/Teacher/EditExam/answers-form/answers-form.component';
import { QuestionsFormComponent } from './Components/Exam/Teacher/EditExam/questions-form/questions-form.component';
import { StudentSignUpPageComponent } from './Components/SignUp/Student/student-sign-up-page/student-sign-up-page.component';
import { LoginComponent } from './Components/login/login.component';
import { StudentSignUpFormComponent } from './Components/SignUp/Student/student-sign-up-form/student-sign-up-form.component';
import { DatePipe } from '@angular/common';
import { BreadcrumbComponent } from './Components/shared/breadcrumb/breadcrumb.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    HeroComponent,
    FooterComponent,
    CoursesComponent,
    CourseCardComponent,
    LoadingCardsComponent,
    LogoComponent,
    HeroLogoComponent,
    LectureComponent,
    CourseDetailsComponent,
    CourseDetailsCardComponent,
    CourseDetailsHeaderComponent,
    ConfirmationDialogComponent,
    EnrollDialogComponent,
    ExamDialogComponent,
    LectureDialogComponent,
    ContentDialogComponent,
    EditExamComponent,
    ExamControllerComponent,
    QuestionControllerComponent,
    TimerComponent,
    StudentExamComponent,
    ExamResultComponent,
    ExamFormComponent,
    AnswersFormComponent,
    QuestionsFormComponent,
    StudentSignUpPageComponent,
    StudentSignUpFormComponent,
    LoginComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatCardModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonToggleModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
