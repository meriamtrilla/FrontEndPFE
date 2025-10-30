import { Injectable } from '@angular/core';
import { APIURL } from '../apiconfig';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  private apiUrl = APIURL; // Update with your backend URL
 
 

  constructor(private http: HttpClient) {}
  activate (id : any) : Observable<any> {
    return this.http.put(`${this.apiUrl}offers/${id}/activate`, {});
  }
  deactivate (id : any) : Observable<any> {
    return this.http.put(`${this.apiUrl}offers/${id}/deactivate`, {});
  }
   // add new test
   store(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}offers/store`, payload);
  }
    // get all interviews 
    all(): Observable<any> {
      return this.http.get(`${this.apiUrl}offers/`);
    }
    validated(): Observable<any> {
      return this.http.get(`${this.apiUrl}offers/validated`);
    }
    // add new test
   
    update(payload: any , id : any): Observable<any> {
      return this.http.put(`${this.apiUrl}offers/update/${id}`, payload);
    }
    get(id: any): Observable<any> {
      return this.http.get(`${this.apiUrl}offers/${id}`);
    }
    delete(id: any): Observable<any> {
      return this.http.delete(`${this.apiUrl}offers/${id}`);
    }
}
