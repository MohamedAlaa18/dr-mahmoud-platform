import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AttachmentsService } from 'src/app/Services/Attachments/attachments.service';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { CoursesService } from 'src/app/Services/Courses/courses.service';
import { LecturesService } from 'src/app/Services/Lectures/lectures.service';
import { VideosService } from 'src/app/Services/Videos/videos.service';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {
  userId: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private lectureData: LecturesService,
    private courseData: CoursesService,
    private attachmentData: AttachmentsService,
    private videoData: VideosService,
    private userData: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.userId = this.userData.getUserId();
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
    if (this.data.deleteType == "content") {
      this.deleteContent(this.data.lectureId, this.data.contentId, this.data.contentType);
    } else if (this.data.deleteType == "lecture") {
      this.deleteLecture(this.data.lectureId);
    } else if (this.data.deleteType == "course") {
      this.deleteCourse(this.data.courseId);
    }
  }

  deleteLecture(lectureId: number): void {
    const courseId = this.data.courseId;
    this.lectureData.deleteLectureById(courseId, lectureId, this.userId).subscribe(
      () => {
        console.log(`Lesson with ID ${lectureId} and its content deleted successfully`);
        this.reloadCurrentRoute();
      },
      (error) => {
        if (error.status == 200) {
          this.reloadCurrentRoute();
        } else if (error.status === 500) {
          this.openSnackBar('لايمكن حذف حصه تحتوي علي امتحانات', 'حسنًا');
        } else {
          console.error(`Failed to delete lesson with ID ${lectureId} and its content:`, error);
        }
      }
    );
    this.dialogRef.close(false);
  }

  deleteContent(lectureId: number, contentId: number, contentType: string): void {
    const courseId = this.data.courseId;
    const methodToDelete = contentType === 'video' ? this.videoData.deleteVideoById : this.attachmentData.deleteAttachmentById;

    methodToDelete.call(this.videoData || this.attachmentData, courseId, lectureId, contentId).subscribe(
      () => {
        console.log(`Lesson content with ID ${contentId} removed successfully`);
        this.reloadCurrentRoute();
      },
      (error) => {
        if (error.status == 200) {
          this.reloadCurrentRoute();
        }
        console.error(`Failed to remove lesson content with ID ${contentId}:`, error);
      }
    );
    this.dialogRef.close(false);
  }

  deleteCourse(courseId: number): void {
    console.log(courseId)
    this.courseData.deleteCourseById(courseId).subscribe(
      () => {
        console.log(`Lesson with ID ${courseId} and its content deleted successfully`);
        this.reloadCurrentRoute();
      },
      (error) => {
        if (error.status == 200) {
          this.reloadCurrentRoute();
        }
        console.error(`Failed to delete lesson with ID ${courseId} and its content:`, error);
      }
    );
    this.dialogRef.close(false);
  }

  reloadCurrentRoute(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  openSnackBar(message: string, action: string,): void {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
    });
  }
}
