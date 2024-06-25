import { Component, Inject, AfterViewInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NavigationExtras, Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-exam-time-out',
  templateUrl: './exam-time-out.component.html',
  styleUrls: ['./exam-time-out.component.css']
})
export class ExamTimeOutComponent implements AfterViewInit, OnDestroy {
  private navigationStartSubscription: any;

  constructor(
    public dialogRef: MatDialogRef<ExamTimeOutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
  ) { }

  ngAfterViewInit(): void {
    const backdropElement = document.getElementsByClassName('cdk-overlay-backdrop')[0];
    backdropElement?.addEventListener('click', this.onDialogOverlayClick.bind(this) as EventListenerOrEventListenerObject);
  }

  ngOnInit(): void {
    this.navigationStartSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe(() => {
      this.dialogRef.close(false);
    });
  }

  ngOnDestroy(): void {
    if (this.navigationStartSubscription) {
      this.navigationStartSubscription.unsubscribe();
    }
  }

  onNoClick(): void {
    this.dialogRef.close(false);
    this.navigateToResultPage();
  }

  onYesClick(): void {
    this.dialogRef.close(true);
    this.navigateToResultPage();
  }

  navigateToResultPage(): void {
    const navigationExtras: NavigationExtras = {
      queryParams: { examId: this.data.examId },
      replaceUrl: true
    };
    this.router.navigate(['/course', this.data.courseId, 'lesson', this.data.lessonId, 'result'], navigationExtras);
  }

  onDialogOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.navigateToResultPage();
    }
  }
}
