import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './Components/main/main.component';

const routes: Routes = [
  { path: "", component: MainComponent, data: { title: 'EduNex' } },
  { path: "home", component: MainComponent, data: { title: 'EduNex' } },
  { path: "courses", component: MainComponent, data: { title: 'EduNex' } },
  { path: "offers", component: MainComponent, data: { title: 'EduNex' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
