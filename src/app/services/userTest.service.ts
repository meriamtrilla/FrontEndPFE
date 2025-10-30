import { Injectable } from '@angular/core';
import { APIURL } from '../apiconfig';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserTestService {

  private apiUrl = APIURL; // Update with your backend URL
 
  constructor(private http: HttpClient) {}
  pass(payload : any) {
    return this.http.post(`${this.apiUrl}user-tests/pass`, payload);
  }
  getTestsByUser(userId : any) {
    return this.http.get(`${this.apiUrl}user-tests/user/${userId}`);
  }

 
}
