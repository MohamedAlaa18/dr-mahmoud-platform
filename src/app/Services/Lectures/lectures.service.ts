import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ILecture } from 'src/app/Models/iCourse';

@Injectable({
  providedIn: 'root'
})
export class LecturesService {
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

  getLecture(id: number): Observable<any> {
    const token = this.getTokenFromCookies();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.get<ILecture>(`${this.URL}/lectures/${id}`, { headers });
  }

  addLecture(courseId: number, lectureData: any): Observable<ILecture> {
    const token = this.getTokenFromCookies();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const body = {
      lecture: {
        title: lectureData.title,
        description: lectureData.description,
        code: lectureData.code,
        courseId: courseId
      }
    };

    return this.httpClient.post<ILecture>(
      `${this.URL}/lectures/`,
      body,
      { headers }
    );
  }

  editLecture(updatedLecture: any): Observable<void> {
    const token = this.getTokenFromCookies();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const body = {
      lecture: updatedLecture
    };

    return this.httpClient.put<void>(
      `${this.URL}/lectures/`,
      body,
      { headers }
    );
  }

  deleteLecture(lectureId: number): Observable<void> {
    const token = this.getTokenFromCookies();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.delete<void>(`${this.URL}/lectures/${lectureId}`, { headers });
  }

  addAttachment(lectureId: number, file: File): Observable<void> {
    const token = this.getTokenFromCookies();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Create FormData object
    const formData = new FormData();
    formData.append('lectureId', lectureId.toString());
    formData.append('attachment', file);

    return this.httpClient.post<void>(
      `${this.URL}/lectures/add-attachment`,
      formData,
      { headers }
    );
  }
}
