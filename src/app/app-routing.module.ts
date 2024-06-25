import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './Components/main/main.component';
import { LectureComponent } from './Components/lecture/lecture.component';
import { CourseDetailsComponent } from './Components/CourseDetails/course-details/course-details.component';

const routes: Routes = [
  { path: "home", component: MainComponent, data: { title: 'EduNex' } },
  { path: "", redirectTo: "home", pathMatch: "full", data: { title: 'EduNex' } },
  { path: "courses", component: MainComponent, data: { title: 'courses' } },
  { path: "offers", component: MainComponent, data: { title: 'offers' } },
  { path: "lesson/:id", component: LectureComponent, data: { title: 'Lecture' } },
  { path: "course/:id", component: CourseDetailsComponent, data: { title: 'Course Details' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
