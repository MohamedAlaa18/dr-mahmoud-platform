import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  URL = "http://localhost:2000";

  constructor(private httpClient: HttpClient) { }

  getAllCourses(): Observable<any> {
    return this.httpClient.get(`${this.URL}/courses`);
  }

  getCourseById(PID: number): Observable<any> {
    return this.httpClient.get(`http://localhost:2000/courses/${PID}`);
  }

  DeleteCourseById(PID: number): Observable<void> {
    let res = this.httpClient.delete<void>(`http://localhost:2000/courses/${PID}`);
    return res;
  }


  // getAllCourses(): Observable<ICourse[]> {
  //   console.log(this.httpClient.get<ICourse[]>(`${this.URL}/courses`))
  //   return this.httpClient.get<ICourse[]>(`${this.URL}/courses`);
  // }

  // getCourseById(courseId: number): Observable<ICourse> {
  //   return this.httpClient.get<ICourse>(`${this.URL}/courses/${courseId}`);
  // }

  // deleteCourseById(courseId: number): Observable<void> {
  //   return this.httpClient.delete<void>(`${this.URL}/courses/${courseId}`);
  // }

  // addCourse(courseData: FormData): Observable<ICourse> {
  //   const headers = new HttpHeaders();
  //   headers.append('Content-Type', 'multipart/form-data');
  //   return this.httpClient.post<ICourse>(`${this.URL}/courses`, courseData, { headers });
  // }

  // editCourse(courseId: number, updatedCourse: FormData): Observable<void> {
  //   const headers = new HttpHeaders();
  //   headers.append('Content-Type', 'multipart/form-data');
  //   return this.httpClient.put<void>(`${this.URL}/api/Courses/${courseId}`, updatedCourse, { headers });
  // }

  // getCoursesEnrolledByStudent(studentId: string): Observable<ICourse[]> {
  //   const params = new HttpParams().set('studentId', studentId);
  //   return this.httpClient.get<ICourse[]>(`${this.URL}/api/Courses/GetCoursesEnrolledByStudent`, { params });
  // }

  // checkEnrollment(courseId: number, studentId: string): Observable<boolean> {
  //   const params = new HttpParams().set('studentId', studentId).set('courseId', courseId);
  //   return this.httpClient.get<boolean>(
  //     `${this.URL}/api/Courses/checkenrollment`,
  //     { params }
  //   );
  // }

  // courseEnroll(studentId: string, courseId: number, couponCode?: string): Observable<ICourse> {
  //   let params = new HttpParams();
  //   if (couponCode) {
  //     params = params.set('couponcodes', couponCode);
  //   }

  //   return this.httpClient.post<ICourse>(
  //     `${this.URL}/api/Courses/enroll`,
  //     { studentId, courseId },
  //     { params }
  //   );
  // }
}
