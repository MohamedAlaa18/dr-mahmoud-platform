import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EnrollDialogComponent } from '../Dialog/enroll-dialog/enroll-dialog.component';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { CoursesService } from 'src/app/Services/Courses/courses.service';
import { Router } from '@angular/router';
import { ICourse } from 'src/app/Models/iCourse';

@Component({
  selector: 'app-course-details-card',
  templateUrl: './course-details-card.component.html',
  styleUrls: ['./course-details-card.component.css'],
})
export class CourseDetailsCardComponent implements OnInit {
  @Input() course!: ICourse;
  isEnrolled: boolean = false;
  role: string = '';
  userId: string;

  constructor(
    public dialog: MatDialog,
    private authData: AuthService,
    private courseData: CoursesService,
    private router: Router
  ) {
    this.userId = this.authData.getUserId();
    this.role = this.authData.getUserRole();
  }

  ngOnInit(): void {
    this.checkEnrollment();
  }

  openDialog(): void {
    if (this.role !== 'Student') {
      this.router.navigate(['/login']);
    } else {
      const dialogRef = this.dialog.open(EnrollDialogComponent, {
        width: '400px',
        panelClass: 'dialog-container',
        autoFocus: false,
        data: {
          title: 'هل أنت متأكد؟',
          message: 'هل لديك كود خصم ؟',
          buttonText: 'اشترك الآن',
          courseId: this.course?.id,
          price: this.course?.price,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
      });
    }
  }

  checkEnrollment() {
    if (this.course) {
      this.courseData.checkEnrollment(this.course.id, this.userId).subscribe((isEnrolled) => {
        this.isEnrolled = isEnrolled;
      });
    }
  }

  isStudentAllowed() {
    return this.role === 'Student' && this.isEnrolled;
  }
}
