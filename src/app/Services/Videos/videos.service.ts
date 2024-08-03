import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { IAttachment } from 'src/app/Models/iCourse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideosService {
  URL = environment.API_KEY;

  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }

  getVideos(lectureId: number, pageNumber: number = 1, pageSize: number = 10, title?: string): Observable<any[]> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    if (title) {
      params = params.set('title', title);
    }

    return this.httpClient.get<IAttachment[]>(`${this.URL}/videos/${lectureId}`, { headers, params });
  }

  getVideoDetails(videoId: number): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.URL}/videos/${videoId}/details`;
    console.log('Request URL:', url);

    return this.httpClient.get<any>(url, { headers });
  }

  addVideo(lectureId: number, videoFile: File): Observable<IAttachment> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

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
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

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
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.delete<void>(
      `${this.URL}/videos/${videoId}`,
      { headers }
    );
  }
}
