import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EnrollDialogComponent } from '../Dialog/enroll-dialog/enroll-dialog.component';
import { ICourse } from 'src/app/Models/iCourse';

@Component({
  selector: 'app-course-details-card',
  templateUrl: './course-details-card.component.html',
  styleUrls: ['./course-details-card.component.css'],
})
export class CourseDetailsCardComponent {
  @Input() course!: ICourse;
  isEnrolled: boolean = false;
  role: string = '';
  userId = "123";

  constructor(
    public dialog: MatDialog,
  ) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(EnrollDialogComponent, {
      width: '450px',
      panelClass: 'dialog-container',
      autoFocus: false,
      data: {
        title: 'هل أنت متأكد',
        message: 'هل أنت متأكد من شراء كورس' + ' ' + this.course.title + ' ' + '؟',
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
