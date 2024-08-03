import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { IAttachment } from 'src/app/Models/iCourse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttachmentsService {
  // URL = process.env['API_KEY'];
  URL = environment.API_KEY;

  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }

  getAllAttachments(courseId: number, lectureId: number): Observable<IAttachment[]> {
    return this.httpClient.get<IAttachment[]>(`${this.URL}/api/courses/${courseId}/lectures/${lectureId}/attachments`);
  }

  getAttachment(courseId: number, lectureId: number, attachmentId: number): Observable<IAttachment> {
    return this.httpClient.get<IAttachment>(`${this.URL}/api/courses/${courseId}/Lectures/${lectureId}/attachments/${attachmentId}`);
  }

  deleteAttachment(attachmentId: number): Observable<void> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.delete<void>(`${this.URL}/attachments/${attachmentId}`, { headers });
  }
}
