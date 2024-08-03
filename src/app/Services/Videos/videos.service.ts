import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAttachment } from 'src/app/Models/iCourse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideosService {
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

  getVideos(lectureId: number, pageNumber: number = 1, pageSize: number = 10, title?: string): Observable<any[]> {
    const token = this.getTokenFromCookies();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    if (title) {
      params = params.set('title', title);
    }

    return this.httpClient.get<IAttachment[]>(`${this.URL}/videos/${lectureId}`, { headers, params });
  }

  getVideoDetails(videoId: number): Observable<any> {
    const token = this.getTokenFromCookies();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = `${this.URL}/videos/${videoId}/details`;
    console.log('Request URL:', url);

    return this.httpClient.get<any>(url, { headers });
  }

  addVideo(lectureId: number, videoFile: File): Observable<IAttachment> {
    const token = this.getTokenFromCookies();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const formData = new FormData();
    formData.append('lectureId', lectureId.toString());
    formData.append('video', videoFile);

    return this.httpClient.post<IAttachment>(
      `${this.URL}/videos/`,
      formData,
      { headers }
    );
  }

  editVideo(videoId: number, title: string): Observable<void> {
    const token = this.getTokenFromCookies();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const formData = new FormData();
    formData.append('id', videoId.toString());
    formData.append('title', title);

    return this.httpClient.put<void>(
      `${this.URL}/videos/`,
      formData,
      { headers }
    );
  }

  deleteVideo(videoId: number): Observable<void> {
    const token = this.getTokenFromCookies();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.delete<void>(
      `${this.URL}/videos/${videoId}`,
      { headers }
    );
  }
}
