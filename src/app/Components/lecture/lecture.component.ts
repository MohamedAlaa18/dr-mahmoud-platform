import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ILecture } from 'src/app/Models/iCourse';
import { LecturesService } from 'src/app/Services/Lectures/lectures.service';
import { VideosService } from 'src/app/Services/Videos/videos.service';
import { ConfirmationDialogComponent } from '../CourseDetails/Dialog/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ContentDialogComponent } from '../CourseDetails/Dialog/content-dialog/content-dialog.component';

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.css']
})
export class LectureComponent implements OnInit {
  lecture!: ILecture;
  courseId!: number;
  contentIndex: number = 0;
  panelOpenState = false;
  selected?: boolean;
  isEnrolled!: boolean;
  otp!: string;
  playbackInfo!: string;

  videoOptions: { id: number; label: string; selected: boolean; videoUrl: string; }[] = [];
  fileOptions: { id: number; label: string; pdfUrl: string; }[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private lectureData: LecturesService,
    private videoData: VideosService,
    private snackBar: MatSnackBar,
    private titleService: Title,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    const pageTitle = this.activatedRoute.snapshot.data['title'];
    this.titleService.setTitle(pageTitle);

    this.activatedRoute.queryParams.subscribe(params => {
      this.courseId = params['courseId'];
      const lectureId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.getLecture(lectureId);
    });
  }

  getLecture(lectureId: number): void {
    this.lectureData.getLecture(lectureId).subscribe(
      (lecture) => {
        this.lecture = lecture.content;
        this.setFileOptions();
        this.getVideos(lectureId);
      },
      (error: any) => {
        console.error('Failed to fetch lecture details:', error);
      }
    );
  }

  getVideos(lectureId: number): void {
    this.videoData.getVideos(lectureId).subscribe(
      (videos: any) => {
        console.log('Videos response:', videos);
        if (Array.isArray(videos.content.data)) {
          this.videoOptions = videos.content.data.map((video: any) => ({
            id: video.id,
            label: video.title,
            selected: false,
            videoUrl: video.url
          }));
        } else {
          console.error('Expected an array but received:', videos);
        }
      },
      (error: any) => {
        console.error('Failed to fetch lecture videos:', error);
      }
    );
  }

  setFileOptions(): void {
    if (this.lecture.attachments) {
      this.fileOptions = this.lecture.attachments.map(attachment => ({
        id: attachment.id,
        label: attachment.fileName,
        pdfUrl: attachment.url
      }));
    }
  }

  toggleOption(index: number): void {
    const selectedVideo = this.videoOptions[index];
    this.videoOptions.forEach((videoOption, i) => {
      videoOption.selected = i === index;
      this.getVideoDetails(selectedVideo.id);
    });
  }

  getVideoDetails(videoId: number): void {
    console.log('Fetching details for video ID:', videoId);
    this.videoData.getVideoDetails(videoId).subscribe(
      (response: any) => {
        console.log('Video details response:', response);
        if (response.content && response.content.playbackInfo) {
          this.playbackInfo = response.content.playbackInfo;
          this.otp = response.content.otp;

        } else {
          console.error('Failed to get video playback info', response);
        }
      },
      (error: any) => {
        console.error('Failed to fetch video details:', error);
      }
    );
  }

  DeleteVideoDialog(videoId: number): void {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '600px',
      data: {
        message: 'هل أنت متأكد أنك تريد حذف هذا الفيديو ؟',
        confirmButtonText: 'حذف الفيديو',
        videoId: videoId,
        deleteType: "video"
      }
    });
  }

  DeleteAttachmentDialog(attachmentId: number): void {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '600px',
      data: {
        message: 'هل أنت متأكد أنك تريد حذف هذا الفيديو ؟',
        confirmButtonText: 'حذف الفيديو',
        attachmentId: attachmentId,
        deleteType: "attachment"
      }
    });
  }

  EditVideoDialog(videoId: number, title: string): void {
    this.dialog.open(ContentDialogComponent, {
      width: '400px',
      data: {
        confirmButtonText: 'تعديل الفيديو',
        videoId: videoId,
        title: title,
        operation: "edit"
      }
    });
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
