import { Injectable } from '@angular/core';
import { APIURL } from '../apiconfig';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CandidatureService {

  private apiUrl = APIURL; // Update with your backend URL
 
 

  constructor(private http: HttpClient) {}
  
   // add new test
   store(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}candidates/store`, payload);
  }
    // get all interviews 
    all(): Observable<any> {
      return this.http.get(`${this.apiUrl}candidates/`);
    }
    // add new test
   
    update(payload: any , id : any): Observable<any> {
      return this.http.put(`${this.apiUrl}candidates/update/${id}`, payload);
    }
    get(id: any): Observable<any> {
      return this.http.get(`${this.apiUrl}candidates/${id}`);
    }
    getMyCandidates(id: any): Observable<any> {
      return this.http.get(`${this.apiUrl}candidates/user/${id}`);
    }
    delete(id: any): Observable<any> {
      return this.http.delete(`${this.apiUrl}candidates/${id}`);
    }
}
