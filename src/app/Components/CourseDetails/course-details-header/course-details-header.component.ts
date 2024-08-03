import { Component, Input, OnInit } from '@angular/core';
import { ICourse } from 'src/app/Models/iCourse';
import { CountsService } from 'src/app/Services/Counts/counts.service';

@Component({
  selector: 'app-course-details-header',
  templateUrl: './course-details-header.component.html',
  styleUrls: ['./course-details-header.component.css']
})
export class CourseDetailsHeaderComponent implements OnInit {
  @Input() course!: ICourse;
  lecturesCount!: number;
  studentsCount!: number;

  constructor(private countsData: CountsService) { }

  ngOnInit(): void {
    // this.getCounts();
  }

  getCounts() {
    if (this.course) {
      this.countsData.getCountLectures(this.course.id).subscribe(count => {
        this.lecturesCount = count;
      });

      this.countsData.getCountStudentsPerCourse(this.course.id).subscribe(count => {
        this.studentsCount = count;
      });
    }
  }
}
