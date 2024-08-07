import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './Components/main/main.component';
import { LectureComponent } from './Components/lecture/lecture.component';
import { CourseDetailsComponent } from './Components/CourseDetails/course-details/course-details.component';
import { EditExamComponent } from './Components/Exam/Teacher/EditExam/edit-exam/edit-exam.component';
import { StudentExamComponent } from './Components/Exam/Student/student-exam/student-exam.component';
import { ExamResultComponent } from './Components/Exam/Student/exam-result/exam-result.component';
import { StudentSignUpPageComponent } from './Components/SignUp/Student/student-sign-up-page/student-sign-up-page.component';
import { LoginComponent } from './Components/login/login.component';

const routes: Routes = [
  { path: "home", component: MainComponent, data: { title: 'منصة د. محمود اسماعيل' } },
  { path: "", redirectTo: "home", pathMatch: "full", data: { title: 'منصة د. محمود اسماعيل' } },
  // { path: "courses", component: MainComponent, data: { title: 'courses' } },
  // { path: "offers", component: MainComponent, data: { title: 'offers' } },
  { path: "lecture/:id", component: LectureComponent, data: { title: 'Lecture' } },
  { path: "course/:id", component: CourseDetailsComponent, data: { title: 'Course Details' } },
  { path: "course/:courseId/lecture/:lectureId/create", component: EditExamComponent, data: { title: 'Exam' } },
  { path: "course/:courseId/lecture/:lectureId/view", component: StudentExamComponent, data: { title: 'Exam' } },
  { path: "course/:courseId/lecture/:lectureId/result", component: ExamResultComponent, data: { title: 'Result' } },
  { path: "signup", component: StudentSignUpPageComponent, data: { title: 'Student Signup' } },
  { path: "login", component: LoginComponent, data: { title: 'Login' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
