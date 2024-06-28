import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCandidates(): Observable<any[]> {
    const url = `${this.apiUrl}/candidates`;
    return this.http.get<any[]>(url);
  }
}
