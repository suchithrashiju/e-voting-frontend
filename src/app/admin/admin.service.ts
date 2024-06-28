import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getVoteList(): Observable<any[]> {
    const url = `${this.apiUrl}/admin/results`;
    const headers = this.getAuthHeaders();

    return this.http
      .get<any[]>(url, { headers })
      .pipe(catchError(this.handleError));
  }
  loginAdmin(data: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/admin-login`, data)
      .pipe(catchError(this.handleError));
  }
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }

  private handleErrorMessage(error: HttpErrorResponse) {
    return throwError(error.error.message || 'Server error');
  }
}
