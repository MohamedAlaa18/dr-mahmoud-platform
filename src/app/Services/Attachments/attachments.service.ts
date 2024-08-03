import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  private getCookie(name: string): string {
    const matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : '';
  }

  private getTokenFromCookies(): string {
    const token = this.getCookie('userAdminToken');
    return token;
  }

  getAllAttachments(courseId: number, lectureId: number): Observable<IAttachment[]> {
    return this.httpClient.get<IAttachment[]>(`${this.URL}/api/courses/${courseId}/lectures/${lectureId}/attachments`);
  }

  getAttachment(courseId: number, lectureId: number, attachmentId: number): Observable<IAttachment> {
    return this.httpClient.get<IAttachment>(`${this.URL}/api/courses/${courseId}/Lectures/${lectureId}/attachments/${attachmentId}`);
  }

  deleteAttachment(attachmentId: number): Observable<void> {
    const token = this.getTokenFromCookies();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.delete<void>(`${this.URL}/attachments/${attachmentId}`, { headers });
  }
}
