import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AttachmentsService } from 'src/app/Services/Attachments/attachments.service';
import { VideosService } from 'src/app/Services/Videos/videos.service';

@Component({
  selector: 'app-content-dialog',
  templateUrl: './content-dialog.component.html',
  styleUrls: ['./content-dialog.component.css']
})
export class ContentDialogComponent {
  file: FileList | null = null;
  contentType: string = '';

  @ViewChild('videoInput') videoInput!: ElementRef<HTMLInputElement>;
  @ViewChild('pdfInput') pdfInput!: ElementRef<HTMLInputElement>;

  constructor(
    public dialogRef: MatDialogRef<ContentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private attachmentData: AttachmentsService,
    private videoData: VideosService,
    private router: Router,
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
    if (this.data.operation === 'edit') {
      this.editContent(this.data.lectureId, this.data.contentId);
    } else {
      this.addContent(this.data.lectureId);
    }
  }

  onFileSelected(event: any): void {
    this.file = event.target.files;
  }

  private editContent(lectureId: number, contentId: number): void {
    // Create a copy of the content to modify
    const updatedContent: any = {
      id: contentId,
      attachmentTitle: this.contentType
    };

    if (this.data.contentType === 'file') {
      this.attachmentData.editAttachment(this.data.courseId, lectureId, updatedContent, contentId).subscribe(
        () => {
          console.log(`Attachment with ID ${contentId} updated successfully`);
          this.reloadCurrentRoute();
        },
        (error) => {
          if (error.status == 200) {
            this.reloadCurrentRoute();
          }
          console.error(`Failed to update attachment with ID ${contentId}:`, error);
        }
      );
    } else if (this.data.contentType === 'video') {
      this.videoData.editVideo(this.data.courseId, lectureId, updatedContent, contentId).subscribe(
        () => {
          console.log(`Video with ID ${contentId} updated successfully`);
          this.reloadCurrentRoute();
        },
        (error) => {
          if (error.status == 200) {
            this.reloadCurrentRoute();
          }
          console.error(`Failed to update video with ID ${contentId}:`, error);
        }
      );
    } else {
      console.error(`Unsupported content type: ${this.data.contentType}`);
    }
  }

  private addContent(lectureId: number): void {
    if (!this.file) {
      console.error('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('LectureId', lectureId.toString());
    formData.append('File', this.file[0]);

    let contentTypeKey: string;
    let addMethod: any;

    if (this.data.contentType === 'file') {
      contentTypeKey = 'AttachmentTitle';
      addMethod = this.attachmentData.addAttachment.bind(this.attachmentData);
    } else if (this.data.contentType === 'video') {
      contentTypeKey = 'VideoTitle';
      addMethod = this.videoData.addVideo.bind(this.videoData);
    } else {
      console.error(`Unsupported content type: ${this.data.contentType}`);
      return;
    }

    formData.append(contentTypeKey, this.contentType);

    // Add the content using FormData
    addMethod(this.data.courseId, lectureId, formData).subscribe(
      () => {
        console.log(`New ${this.data.contentType} added successfully`);
        this.reloadCurrentRoute();
      },
      (error: any) => {
        if (error.status == 200) {
          this.reloadCurrentRoute();
        }
        console.error(`Failed to add new ${this.data.contentType}:`, error);
      }
    );
  }

  reloadCurrentRoute(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
