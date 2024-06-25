import { HttpClient, HttpParams } from '@angular/common/http';
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

  getAllLectures(courseId: number): Observable<ILecture[]> {
    return this.httpClient.get<ILecture[]>(`${this.URL}/api/courses/${courseId}/lectures`);
  }

  getLectureById(courseId: number, lectureId: number, userId: string): Observable<ILecture> {
    const params = new HttpParams().set('userId', userId);
    return this.httpClient.get<ILecture>(
      `${this.URL}/api/courses/${courseId}/lectures/${lectureId}`,
      { params }
    );
  }

  deleteLectureById(courseId: number, lectureId: number, userId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.URL}/api/courses/${courseId}/Lectures/${lectureId}`, { params: { userId: userId.toString() } });
  }

  addLecture(courseId: number, lectureData: ILecture, userId: string): Observable<ILecture> {
    const params = new HttpParams().set('userId', userId);
    return this.httpClient.post<ILecture>(
      `${this.URL}/api/courses/${courseId}/lectures`,
      lectureData,
      { params }
    );
  }

  editLecture(courseId: number, lectureId: number, updatedLecture: ILecture, userId: string): Observable<void> {
    const params = new HttpParams().set('userId', userId);
    return this.httpClient.put<void>(
      `${this.URL}/api/courses/${courseId}/lectures/${lectureId}`,
      updatedLecture,
      { params }
    );
  }
}
