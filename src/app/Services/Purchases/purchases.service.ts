import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {
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

  purchaseCourse(courseId: number): Observable<any> {
    const token = this.getTokenFromCookies();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const body = { courseId: courseId };

    return this.httpClient.post<any>(`${this.URL}/purchases/purchase-course`, body, { headers });
  }
}
