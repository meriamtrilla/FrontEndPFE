import { Injectable } from '@angular/core';
import { APIURL } from '../apiconfig';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {

  private apiUrl = APIURL; // Update with your backend URL
 
 

  constructor(private http: HttpClient) {}
  
   
   
    update(payload: any , id : any): Observable<any> {
      return this.http.put(`${this.apiUrl}enterprises/update/${id}`, payload);
    }
    get(id: any): Observable<any> {
      return this.http.get(`${this.apiUrl}enterprises/${id}`);
    }
    delete(id: any): Observable<any> {
      return this.http.delete(`${this.apiUrl}enterprises/${id}`);
    }
}
