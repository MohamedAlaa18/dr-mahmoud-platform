import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { LecturesService } from 'src/app/Services/Lectures/lectures.service';

@Component({
  selector: 'app-lecture-dialog',
  templateUrl: './lecture-dialog.component.html',
  styleUrls: ['./lecture-dialog.component.css']
})
export class LectureDialogComponent {
  lectureTitle!: string;
  price!: number;
  userId: string;

  constructor(
    public dialogRef: MatDialogRef<LectureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private lectureData: LecturesService,
    private userData: AuthService,
    private router: Router
  ) {
    this.userId = this.userData.getUserId();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close(this.lectureTitle);
    const courseId = this.data.courseId;
    const lectureId = this.data.initialLectureId;
    const price = this.data.initialPrice;

    if (this.data.initialLectureTitle) {
      // Edit existing lecture
      const updatedLecture: any = {
        id: lectureId,
        lectureTitle: this.lectureTitle,
        price: price,
        courseId: courseId
      };

      this.lectureData.editLecture(courseId, lectureId, updatedLecture, this.userId).subscribe(
        () => {
          console.log(`Lecture with ID ${lectureId} in course ${courseId} updated successfully.`);
          this.reloadCurrentRoute();
        },
        (error) => {
          if (error.status == 200) {
            this.reloadCurrentRoute();
          }
          console.error(`Failed to update lecture with ID ${lectureId} in course ${courseId}:`, error);
        }
      );
    } else {
      // Add new lecture
      const newLecture: any = {
        lectureTitle: this.lectureTitle,
        price: this.price,
        courseId: courseId
      };

      this.lectureData.addLecture(courseId, newLecture, this.userId).subscribe(
        () => {
          console.log(`New lecture added to course ${courseId} successfully.`);
          this.reloadCurrentRoute();
        },
        (error) => {
          if (error.status == 200) {
            this.reloadCurrentRoute();
          }
          console.error(`Failed to add new lecture to course ${courseId}:`, error);
        }
      );
    }
  }

  reloadCurrentRoute(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
