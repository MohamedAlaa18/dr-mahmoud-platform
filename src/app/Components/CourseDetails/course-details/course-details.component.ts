import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ContentDialogComponent } from '../Dialog/content-dialog/content-dialog.component';
import { ConfirmationDialogComponent } from '../Dialog/confirmation-dialog/confirmation-dialog.component';
import { ExamDialogComponent } from '../Dialog/exam-dialog/exam-dialog.component';
import { CoursesService } from 'src/app/Services/Courses/courses.service';
import { Title } from '@angular/platform-browser';
import { IAttachment, ICourse, ILecture } from 'src/app/Models/iCourse';
import { LectureDialogComponent } from '../Dialog/lecture-dialog/lecture-dialog.component';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
})
export class CourseDetailsComponent implements OnInit {
  panelOpenState = false;
  course: ICourse | null = null;
  courseID: number = 0;
  showDetails: boolean = false;
  lectures: ILecture[] = [];
  attachment!: IAttachment;

  constructor(
    private activatedRoute: ActivatedRoute,
    private courseData: CoursesService,
    public dialog: MatDialog,
    private titleData: Title
  ) {
    this.courseID = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    const pageTitle = this.activatedRoute.snapshot.data['title'];
    this.titleData.setTitle(pageTitle);

    this.getCourse();
    // this.fetchLecture(1);
  }

  getCourse() {
    this.courseData.getCourse(this.courseID).subscribe(course => {
      this.course = course.content;
      console.log(course)
    });
  }

  createLectureDialog(): void {
    this.dialog.open(LectureDialogComponent, {
      // width: '400px',
      panelClass: 'dialog-container',
      autoFocus: false,
      data: {
        header: 'اضافه حصة',
        confirmButtonText: 'أضف الحصة',
        courseId: this.course?.id,
      }
    });
  }

  editLectureDialog(lecture: ILecture): void {
    this.dialog.open(LectureDialogComponent, {
      width: '400px',
      panelClass: 'dialog-container',
      autoFocus: false,
      data: {
        header: 'تعديل الحصة',
        confirmButtonText: 'تعديل الأسم',
        courseId: this.course?.id,
        initialLectureId: lecture.id,
        initialLectureTitle: lecture.title,
        initialDescription: lecture.description,
        initialCode: lecture.code
      }
    });
  }

  DeleteLectureDialog(lectureId: number): void {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        message: 'هل أنت متأكد أنك تريد حذف الحصة؟',
        confirmButtonText: 'حذف الحصة',
        lectureId: lectureId,
        deleteType: "lecture"
      }
    });
  }

  addContentDialog(contentType: string, lectureId: number): void {
    this.dialog.open(ContentDialogComponent, {
      width: '400px',
      panelClass: 'dialog-container',
      autoFocus: false,
      data: {
        confirmButtonText: 'أضف الملفات',
        operation: 'add',
        courseId: this.course?.id,
        contentType: contentType,
        lectureId: lectureId,
      }
    });
  }

  openExamDialog(examType: string, course: ICourse, lecture: ILecture, contentId: number): void {
    this.dialog.open(ExamDialogComponent, {
      width: '600px',
      data: {
        header: examType == 'PreExam' ? 'بيانات الامتحان' : 'بيانات الواجب',
        confirmButtonText: examType == 'PreExam' ? 'أضف الامتحان' : 'أضف الواجب',
        lectureId: lecture.id,
        lectureTitle: lecture.title,
        contentId: contentId,
        courseID: course.id,
        courseTitle: course.title,
        // grade: course.levelName,
        examType: examType,
      }
    });
  }

  printLectureDetails(lecture: any): void {
    console.log('Lecture details:', lecture);
  }
}
