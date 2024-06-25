import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAttachment } from 'src/app/Models/iCourse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttachmentsService {
  // URL = process.env['API_KEY'];
  URL = environment.API_KEY;

  constructor(private httpClient: HttpClient) { }

  getAllAttachments(courseId: number, lectureId: number): Observable<IAttachment[]> {
    return this.httpClient.get<IAttachment[]>(`${this.URL}/api/courses/${courseId}/lectures/${lectureId}/attachments`);
  }

  getAttachmentById(courseId: number, lectureId: number, attachmentId: number): Observable<IAttachment> {
    return this.httpClient.get<IAttachment>(`${this.URL}/api/courses/${courseId}/Lectures/${lectureId}/attachments/${attachmentId}`);
  }

  deleteAttachmentById(courseId: number, lectureId: number, attachmentId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.URL}/api/courses/${courseId}/Lectures/${lectureId}/attachments/${attachmentId}`);
  }

  addAttachment(courseId: number, lectureId: number, FileData: any): Observable<IAttachment> {
    return this.httpClient.post<IAttachment>(`${this.URL}/api/courses/${courseId}/lectures/${lectureId}/attachments`, FileData);
  }

  editAttachment(courseId: number, lectureId: number, updatedLecture: any, attachmentId: number): Observable<void> {
    return this.httpClient.put<void>(`${this.URL}/api/courses/${courseId}/Lectures/${lectureId}/attachments/${attachmentId}`, updatedLecture);
  }
}
