import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AttachmentsService } from 'src/app/Services/Attachments/attachments.service';
import { LecturesService } from 'src/app/Services/Lectures/lectures.service';
import { VideosService } from 'src/app/Services/Videos/videos.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {
  userId = "123";

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private lectureData: LecturesService,
    private attachmentData: AttachmentsService,
    private videoData: VideosService,
    private router: Router,
    private snackBar: MatSnackBar,
    private location: Location
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
    if (this.data.deleteType == "video") {
      this.deleteVideo(this.data.videoId);
    } else if (this.data.deleteType == "attachment") {
      this.deleteAttachment(this.data.attachmentId)
    } else if (this.data.deleteType == "lecture") {
      this.deleteLecture(this.data.lectureId);
    }
  }

  deleteLecture(lectureId: number): void {
    this.lectureData.deleteLecture(lectureId).subscribe(
      () => {
        console.log(`Lecture with ID ${lectureId} deleted successfully.`);
        this.openSnackBar('تم حذف الحصة بنجاح');
        this.reloadCurrentRoute();
      },
      (error) => {
        console.error(`Failed to delete lecture with ID ${lectureId}:`, error);
        this.openSnackBar('فشل  حذف الحصة');
      }
    );
    this.dialogRef.close(false);
  }

  deleteVideo(videoId: number): void {
    this.videoData.deleteVideo(videoId).subscribe(
      () => {
        this.openSnackBar('تم حذف الفيديو بنجاح');
        this.reloadCurrentRoute();
      },
      (error: any) => {
        console.error('Failed to delete video:', error);
        this.openSnackBar('فشل حذف الفيديو');
      }
    );
  }

  deleteAttachment(attachmentId: number): void {
    this.attachmentData.deleteAttachment(attachmentId).subscribe(
      () => {
        this.openSnackBar('تم حذف الملف بنجاح');
        this.reloadCurrentRoute();
      },
      (error: any) => {
        console.error('Failed to delete attachment:', error);
        this.openSnackBar('فشل حذف الملف');
      }
    );
  }

  reloadCurrentRoute(): void {
    const currentUrl = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(currentUrl);
    });
  }

  openSnackBar(message: string): void {
    const panelClass = message === 'تم حذف الحصه بنجاح' ||
      message === 'تم حذف الملف بنجاح' ||
      message === 'تم حذف الفيديو بنجاح' ||
      message === 'تم حذف الكورس بنجاح' ? ['snackbar-success'] : [];

    this.snackBar.open(message, 'حسناَ', {
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: panelClass
    });
  }
}
