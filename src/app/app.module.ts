import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';

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
    HeroLogoComponent
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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
