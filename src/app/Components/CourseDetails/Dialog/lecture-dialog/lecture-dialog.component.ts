import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LecturesService } from 'src/app/Services/Lectures/lectures.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-lecture-dialog',
  templateUrl: './lecture-dialog.component.html',
  styleUrls: ['./lecture-dialog.component.css']
})
export class LectureDialogComponent implements OnInit {
  lectureForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<LectureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private lectureService: LecturesService,
    private cookieService: CookieService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.lectureForm = this.fb.group({
      lectureTitle: [this.data.initialLectureTitle || '', Validators.required],
      description: [this.data.initialDescription || '', Validators.required],
      code: [this.data.initialCode || '', Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.lectureForm.invalid) {
      return;
    }

    const lectureData = this.lectureForm.value;
    const courseId = this.data.courseId;
    const lectureId = this.data.initialLectureId;

    const lecturePayload = {
      title: lectureData.lectureTitle,
      description: lectureData.description,
      code: lectureData.code,
      courseId: courseId
    };

    if (lectureId) {
      // Editing an existing lecture
      this.lectureService.editLecture({ ...lecturePayload, id: lectureId }).subscribe(
        () => {
          console.log(`Lecture with ID ${lectureId} updated successfully.`);
          this.openSnackBar('تم تحديث المحاضرة بنجاح');
          this.reloadCurrentRoute();
        },
        (error) => {
          console.error(`Failed to update lecture with ID ${lectureId}:`, error);
          this.openSnackBar('فشل في تحديث المحاضرة');
        }
      );
    } else {
      // Adding a new lecture
      this.lectureService.addLecture(courseId, lecturePayload).subscribe(
        () => {
          console.log(`New lecture added to course ${courseId} successfully.`);
          this.openSnackBar('تمت إضافة المحاضرة بنجاح');
          this.reloadCurrentRoute();
        },
        (error) => {
          console.error(`Failed to add new lecture to course ${courseId}:`, error);
          this.openSnackBar('فشل في إضافة المحاضرة');
        }
      );
    }

    this.dialogRef.close(lectureData.lectureTitle);
  }

  reloadCurrentRoute(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  openSnackBar(message: string): void {
    const panelClass = message === 'تم تحديث المحاضرة بنجاح' ||
      message === 'تمت إضافة المحاضرة بنجاح' ? ['snackbar-success'] : [];

    this.snackBar.open(message, 'حسناَ', {
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: panelClass
    });
  }
}
