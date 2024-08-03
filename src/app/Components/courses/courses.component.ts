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
  totalPages: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  title: string = '';
  description: string = '';
  code: string = '';

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
    this.courseData.getAllCourses(this.currentPage, this.pageSize, this.title, this.description, this.code).subscribe(response => {
      if (response) {
        this.courses = response.data;
        this.totalPages = response.totalPages;
        console.log(response.data);
      } else {
        console.error('Response is not valid:', response);
      }
    }, error => {
      console.error('Error fetching courses:', error);
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getAllCourses();
  }

  calculateMiddlePrice(prices: number[]): number {
    const sortedPrices = prices.sort((a, b) => a - b);
    const middleIndex = Math.floor(sortedPrices.length / 2);
    return sortedPrices[middleIndex];
  }
}
