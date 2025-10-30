import { Injectable } from '@angular/core';
import { APIURL } from '../apiconfig';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = APIURL; // Update with your backend URL
 
 

  constructor(private http: HttpClient) {}
  
   // add new test
   store(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}categories/store`, payload);
  }
    // get all interviews 
    all(): Observable<any> {
      return this.http.get(`${this.apiUrl}categories/`);
    }
    // add new test
   
    update(payload: any , id : any): Observable<any> {
      return this.http.put(`${this.apiUrl}categories/update/${id}`, payload);
    }
    get(id: any): Observable<any> {
      return this.http.get(`${this.apiUrl}categories/${id}`);
    }
    delete(id: any): Observable<any> {
      return this.http.delete(`${this.apiUrl}categories/${id}`);
    }
}
