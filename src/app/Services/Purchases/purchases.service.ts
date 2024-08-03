import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {
  URL = environment.API_KEY;

  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }

  purchaseCourse(courseId: number): Observable<any> {
    const token = this.cookieService.get('userToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const body = { courseId: courseId };

    return this.httpClient.post<any>(`${this.URL}/purchases/purchase-course`, body, { headers });
  }
}
