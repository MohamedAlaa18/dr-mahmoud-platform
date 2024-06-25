import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ICourse } from 'src/app/Models/iCourse';
import { CoursesService } from 'src/app/Services/Courses/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  panelOpenState = false;

  courses: ICourse[] = [];

  constructor(
    private courseData: CoursesService,
    private route: ActivatedRoute,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    const pageTitle = this.route.snapshot.data['title'];
    this.titleService.setTitle(pageTitle);

    this.getAllCourses();
  }

  getAllCourses() {
    this.courseData.getAllCourses().subscribe(courses => {
      // console.log(courses);
      this.courses = courses;
    });
  }

  calculateMiddlePrice(prices: number[]): number {
    const sortedPrices = prices.sort((a, b) => a - b);
    const middleIndex = Math.floor(sortedPrices.length / 2);
    return sortedPrices[middleIndex];
  }
}
