import { Injectable } from '@angular/core';
import { APIURL } from '../apiconfig';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiUrl = APIURL; // Update with your backend URL
 
 

  constructor(private http: HttpClient) {}
 
   // add new test
   store(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}questions/store`, payload);
  }
    // get all interviews 
    all(): Observable<any> {
      return this.http.get(`${this.apiUrl}questions/`);
    }
    // add new test
   
    update(payload: any , id : any): Observable<any> {
      return this.http.put(`${this.apiUrl}questions/update/${id}`, payload);
    }
    get(id: any): Observable<any> {
      return this.http.get(`${this.apiUrl}questions/${id}`);
    }
    delete(id: any): Observable<any> {
      return this.http.delete(`${this.apiUrl}questions/${id}`);
    }
    getQuestionsByTest(testId: any): Observable<any> {
      return this.http.get(`${this.apiUrl}questions/test/${testId}`);
    }
    getQuestionsByInterview(interviewId: any): Observable<any> {
        return this.http.get(`${this.apiUrl}questions/interview/${interviewId}`);
      }
    
}
