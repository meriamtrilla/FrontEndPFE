import { Injectable } from '@angular/core';
import { APIURL } from '../apiconfig';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {
  private apiUrl = APIURL; // Update with your backend URL
 
 

  constructor(private http: HttpClient, private router: Router) {}

  // get all interviews 
  all(): Observable<any> {
    return this.http.get(`${this.apiUrl}interviews/`);
  }
  withoutOffers(): Observable<any> {
    return this.http.get(`${this.apiUrl}interviews/not/associated`);
  }
  // add new test
  store(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}interviews/store`, payload);
  }
  update(payload: any , id : any): Observable<any> {
    return this.http.put(`${this.apiUrl}interviews/update/${id}`, payload);
  }
  get(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}interviews/${id}`);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}interviews/${id}`);
  }
}
