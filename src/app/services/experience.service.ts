import { Injectable } from '@angular/core';
import { APIURL } from '../apiconfig';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  private apiUrl = APIURL; // Update with your backend URL
 
 

  constructor(private http: HttpClient) {}
 
   // add new test
   store(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}experiences/store`, payload);
  }
    // get all interviews 
    all(): Observable<any> {
      return this.http.get(`${this.apiUrl}experiences/`);
    }
    // add new test
   
    update(payload: any , id : any): Observable<any> {
      return this.http.put(`${this.apiUrl}experiences/update/${id}`, payload);
    }
    get(id: any): Observable<any> {
      return this.http.get(`${this.apiUrl}experiences/${id}`);
    }
    delete(id: any): Observable<any> {
      return this.http.delete(`${this.apiUrl}experiences/${id}`);
    }
    getExperiencesByUser(userId: any): Observable<any> {
      return this.http.get(`${this.apiUrl}experiences/user/${userId}`);
    }
    
}
