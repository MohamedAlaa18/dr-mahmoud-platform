import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExamTimeOutComponent } from '../exam-time-out/exam-time-out.component';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy, OnChanges {
  @Input() duration!: number;
  @Input() examId!: number;
  @Input() type!: string;
  @Output() submitExam: EventEmitter<void> = new EventEmitter<void>();
  timerStarted: boolean = false;
  timerEnded: boolean = false;
  timeLeft: number = 0;
  timeLeftString!: string;
  circleOffset: number = 283;
  timeElapsedPercentage: number = 0;
  private destroyed$: Subject<void> = new Subject();

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.startTimer();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.destroyed$)
    ).subscribe(() => {
      // Perform cleanup here or any other actions needed on route change
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['duration'] && !changes['duration'].firstChange) {
      this.startTimer();
    }
  }

  startTimer() {
    if (this.duration) {
      this.timeLeft = this.duration * 60;
      this.timerStarted = true;

      const countdown = setInterval(() => {
        const hours = Math.floor(this.timeLeft / 3600);
        const minutes = Math.floor((this.timeLeft % 3600) / 60);
        const seconds = this.timeLeft % 60;

        this.timeLeftString = `${this.formatTime(hours)}:${this.formatTime(minutes)}:${this.formatTime(seconds)}`;

        this.timeElapsedPercentage = ((this.duration - this.timeLeft) / this.duration) * 100;

        this.timeLeft--;

        if (this.timeLeft < 0) {
          clearInterval(countdown);
          this.timerEnded = true;
          this.submitExam.emit();
          this.openTimeOutDialog();
        }
      }, 1000);
    }
  }

  openTimeOutDialog(): void {
    const routeUrl = this.router.url;
    const courseId = this.route.snapshot.paramMap.get('courseId');
    const lessonId = this.route.snapshot.paramMap.get('lessonId');
    const examId = this.route.snapshot.queryParamMap.get('examId');

    const expectedRoute = `/course/${courseId}/lesson/${lessonId}/view`;
    // console.log(expectedRoute)
    // console.log(routeUrl)
    if (
      routeUrl === expectedRoute &&
      courseId &&
      lessonId &&
      examId
    ) {
      this.dialog.open(ExamTimeOutComponent, {
        width: '300px',
        data: {
          message: this.type == 'exam' ? 'انتهى وقت الامتحان' : 'انتهى وقت الواجب',
          courseId: courseId,
          lessonId: lessonId,
          examId: examId
        }
      });
    }
  }

  formatTime(time: number): string {
    return time < 10 ? `0${time}` : `${time}`;
  }
}
