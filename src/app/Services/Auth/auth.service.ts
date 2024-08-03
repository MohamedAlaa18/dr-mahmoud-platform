import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { environment } from 'src/environments/environment';
import { IUser } from 'src/app/Models/iuser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = environment.API_KEY;
  private authSubject = new BehaviorSubject<boolean>(false);
  public authStatus$ = this.authSubject.asObservable();

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  register(user: IUser): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/auth/register`, { user })
      .pipe(
        catchError(this.handleError)
      );
  }

  login(email: string, password: string): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/auth/login`, { email, password })
      .pipe(
        catchError(this.handleError)
      );
  }

  logout(): void {
    // localStorage.removeItem('token');
    // this.authSubject.next(false);
    // this.router.navigate(['/login']);
    // this.snackBar.open('Logged out successfully!', 'Close', { duration: 3000 });
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    this.snackBar.open(errorMessage, 'Close', { duration: 3000 });
    return throwError(errorMessage);
  }
}
