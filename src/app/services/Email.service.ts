import { Injectable } from '@angular/core';
import { APIURL } from '../apiconfig';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = APIURL; // Update with your backend URL
 
 

  constructor(private http: HttpClient) {}
 
   // add new test
   send(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}emails/send-code`, payload);
  }

  mail(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}emails/mail`, payload);
  }
   
   
 
    
}
