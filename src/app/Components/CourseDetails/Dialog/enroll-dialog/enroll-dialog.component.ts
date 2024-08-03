import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoursesService } from 'src/app/Services/Courses/courses.service';
import { PurchasesService } from 'src/app/Services/Purchases/purchases.service';

@Component({
  selector: 'app-enroll-dialog',
  templateUrl: './enroll-dialog.component.html',
  styleUrls: ['./enroll-dialog.component.css']
})
export class EnrollDialogComponent {
  userId = "123";
  // couponForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EnrollDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private purchasesData: PurchasesService,
    private router: Router,
    private snackBar: MatSnackBar,
    // private fb: FormBuilder
  ) {
    // this.createCouponForm();
  }

  // createCouponForm() {
  //   this.couponForm = this.fb.group({
  //     couponCode: ['', Validators.required]
  //   });
  // }

  purchaseCourse(courseId: number) {
    this.purchasesData.purchaseCourse(courseId).subscribe(response => {
      console.log('Purchase successful', response);
    }, error => {
      console.error('Purchase failed', error);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.purchaseCourse(this.data.courseId);
    // this.courseEnroll();
    this.dialogRef.close();
  }

  // courseEnroll() {
  //   this.courseData.courseEnroll(this.userId, this.data.courseId, this.couponForm.value.couponCode)
  //     .subscribe(
  //       () => {
  //         console.log(`Enrolled successfully`);
  //         this.openSnackBar('لقد اشتركت في الكورس بنجاح');
  //         this.reloadCurrentRoute();
  //       },
  //       (error) => {
  //         if (error.status === 200) {
  //           console.log(`Enrolled successfully`);
  //           this.openSnackBar('لقد اشتركت في الكورس بنجاح');
  //           this.reloadCurrentRoute();
  //         } else {
  //           this.openSnackBar('لا يوجد رصيد كافي في محفظتك');
  //           console.error(`Failed to enroll:`, error);
  //         }
  //       }
  //     );
  // }

  reloadCurrentRoute(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  openSnackBar(message: string) {
    const panelClass = message === 'لقد اشتركت في الكورس بنجاح' ? ['snackbar-success'] : [];

    this.snackBar.open(message, 'حسناَ', {
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: panelClass
    });
  }
}
