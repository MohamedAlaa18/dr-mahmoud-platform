import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IExam } from 'src/app/Models/iexam';
import { IExamResult } from 'src/app/Models/iexam-result';


@Injectable({
  providedIn: 'root'
})
export class ExamService {
  URL = environment.API_KEY;
  // URL = process.env['API_KEY'];

  constructor(private httpClient: HttpClient) { }

  getAllExams(): Observable<IExam[]> {
    return this.httpClient.get<IExam[]>(`${this.URL}/api/Exams`);
  }

  getExamById(examId: number): Observable<IExam> {
    return this.httpClient.get<IExam>(`${this.URL}/api/Exams/${examId}`);
  }

  deleteExamById(examId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.URL}/api/Exams/${examId}`);
  }

  addExam(examData: any): Observable<IExam> {
    return this.httpClient.post<IExam>(`${this.URL}/api/Exams`, examData);
  }

  editExam(examId: number, updatedExam: IExam): Observable<void> {
    return this.httpClient.put<void>(`${this.URL}/api/Exams/${examId}`, updatedExam);
  }

  startExam(examId: number, student: any): Observable<IExam> {
    return this.httpClient.post<IExam>(`${this.URL}/api/Exams/${examId}/start`, student);
  }

  getDurationExam(examId: number, student: any): Observable<IExam> {
    return this.httpClient.get<IExam>(`${this.URL}/api/Exams/${examId}/getInfo/${student}`);
  }

  submitExam(examId: number, submittedExam: any): Observable<IExam> {
    return this.httpClient.post<IExam>(`${this.URL}/api/Exams/${examId}/submit`, submittedExam);
  }

  getSubmissionExam(examId: number, student: any): Observable<IExamResult> {
    return this.httpClient.get<IExamResult>(`${this.URL}/api/Exams/${examId}/submission/${student}`);
  }

  getStudentsOrderedByScore(): Observable<any> {
    return this.httpClient.get<any>(`${this.URL}/api/Home/GetStudentsOrderedByScore`);
  }
}
