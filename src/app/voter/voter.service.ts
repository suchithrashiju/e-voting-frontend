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
export class VoterService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
  registerVoter(data: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/voter-register`, data)
      .pipe(catchError(this.handleError));
  }

  loginVoter(data: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/voter-login`, data)
      .pipe(catchError(this.handleError));
  }

  validateAadhar(aadharNumber: string): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.apiUrl}/votes/validate-aadhar`,
      {
        aadharNumber,
      },
      {
        headers: this.getAuthHeaders(),
      }
    );
  }
  submitVote(voteData: any): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/votes`, voteData, {
        headers: this.getAuthHeaders(),
      })
      .pipe(catchError(this.handleErrorMessage));
  }

  checkVotingStatus(): Observable<{ voted: boolean }> {
    return this.http.get<{ voted: boolean }>(`${this.apiUrl}/votes/status`, {
      headers: this.getAuthHeaders(),
    });
  }
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }

  private handleErrorMessage(error: HttpErrorResponse) {
    return throwError(error.error.message || 'Server error');
  }
}
