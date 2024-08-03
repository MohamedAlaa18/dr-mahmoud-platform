import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LecturesService } from 'src/app/Services/Lectures/lectures.service';
import { VideosService } from 'src/app/Services/Videos/videos.service';

@Component({
  selector: 'app-content-dialog',
  templateUrl: './content-dialog.component.html',
  styleUrls: ['./content-dialog.component.css']
})
export class ContentDialogComponent {
  file!: FileList;
  contentType: string = '';

  @ViewChild('videoInput') videoInput!: ElementRef<HTMLInputElement>;
  @ViewChild('pdfInput') pdfInput!: ElementRef<HTMLInputElement>;

  constructor(
    public dialogRef: MatDialogRef<ContentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private lectureData: LecturesService,
    private videoData: VideosService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
    if (this.data.operation === 'edit') {
      this.editVideo(this.data.videoId, this.data.newTitle);
    } else {
      if (this.data.contentType === 'video') {
        this.addVideo(this.data.lectureId, this.file[0]);
      } else {
        this.addAttachment(this.data.lectureId, this.file[0]);
      }
    }
  }

  onFileSelected(event: any): void {
    this.file = event.target.files;
  }

  private addAttachment(lectureId: number, file: File): void {
    this.lectureData.addAttachment(lectureId, file).subscribe(
      () => {
        console.log('Attachment added successfully');
        this.openSnackBar('تمت إضافة الملف بنجاح');
        this.reloadCurrentRoute();
      },
      (error) => {
        console.error('Failed to add attachment:', error);
        this.openSnackBar('فشل إضافة الملف');
      }
    );
  }

  private addVideo(lectureId: number, videoFile: File): void {
    this.videoData.addVideo(lectureId, videoFile).subscribe(
      () => {
        console.log('Video added successfully');
        this.openSnackBar('تمت إضافة الفيديو بنجاح');
        this.reloadCurrentRoute();
      },
      (error) => {
        console.error('Failed to add video:', error);
        this.openSnackBar('فشل إضافة الفيديو');
      }
    );
  }

  private editVideo(videoId: number, newTitle: string): void {
    this.videoData.editVideo(videoId, newTitle).subscribe(
      () => {
        this.openSnackBar('تمت تعديل الفيديو بنجاح');
        this.reloadCurrentRoute();
      },
      (error: any) => {
        console.error('Failed to update video:', error);
        this.openSnackBar('فشل تعديل الفيديو');
      }
    );
  }

  reloadCurrentRoute(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  openSnackBar(message: string): void {
    const panelClass = message.includes('تم') ? ['snackbar-success'] : [];

    this.snackBar.open(message, 'حسناً', {
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: panelClass
    });
  }
}
