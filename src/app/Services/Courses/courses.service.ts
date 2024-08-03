import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ICourse, ISubject } from 'src/app/Models/iCourse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
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

  getAllCourses(pageNumber: number = 1, pageSize: number = 10, title?: string, description?: string, code?: string): Observable<any> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    if (title) {
      params = params.set('title', title);
    }
    if (description) {
      params = params.set('description', description);
    }
    if (code) {
      params = params.set('code', code);
    }

    const token = this.getTokenFromCookies();

     const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.get<any>(`${this.URL}/courses/`, { params, headers })
      .pipe(map(response => response.content));
  }

  getCourse(courseId: number): Observable<any> {
    const token = this.getTokenFromCookies();

     const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });


    return this.httpClient.get<ICourse>(`${this.URL}/courses/${courseId}`, { headers });
  }

  deleteCourse(courseId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.URL}/api/Courses/${courseId}`);
  }

  addCourse(courseData: FormData): Observable<ICourse> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.httpClient.post<ICourse>(`${this.URL}/api/Courses`, courseData, { headers });
  }

  editCourse(courseId: number, updatedCourse: FormData): Observable<void> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.httpClient.put<void>(`${this.URL}/api/Courses/${courseId}`, updatedCourse, { headers });
  }

  courseEnroll(studentId: string, courseId: number, couponCode?: string): Observable<ICourse> {
    let params = new HttpParams();
    if (couponCode) {
      params = params.set('couponcodes', couponCode);
    }

    return this.httpClient.post<ICourse>(
      `${this.URL}/api/Courses/enroll`,
      { studentId, courseId },
      { params }
    );
  }

  getAllTeacherCourses(teacherId: string): Observable<ICourse[]> {
    return this.httpClient.get<ICourse[]>(`${this.URL}/api/Courses/GetTeacherCourses?teacherId=${teacherId}`);
  }

  getAllSubjects(): Observable<ISubject[]> {
    return this.httpClient.get<ISubject[]>(`${this.URL}/api/Courses/get-All-Subject`);
  }

  getCoursesOrderedByCreationDateDescending(): Observable<ICourse[]> {
    return this.httpClient.get<ICourse[]>(`${this.URL}/api/Home/GetCoursesOrderedByCreationDateDescending`);
  }

  getCoursesOrderedByEnrollment(): Observable<ICourse[]> {
    return this.httpClient.get<ICourse[]>(`${this.URL}/api/Home/GetCoursesOrderedByEnrollment`);
  }

}
