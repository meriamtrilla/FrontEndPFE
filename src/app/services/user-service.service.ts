import { Injectable } from '@angular/core';
import { APIURL } from '../apiconfig';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private apiUrl = APIURL; // Update with your backend URL
 
 

  constructor(private http: HttpClient) {}
get(userId: Number) {

  return this.http.get(`${this.apiUrl}user/get/${userId}`);
}

getAll() {

  return this.http.get(`${this.apiUrl}user/`);
}

getAllRH() {

  return this.http.get(`${this.apiUrl}user/role/rh`);
}

getAllCandidat() {

  return this.http.get(`${this.apiUrl}user/role/Candidat`);
}

  uploadAvatar(userId: number, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}users/${userId}/upload-avatar`, formData, { responseType: 'text' });
  }

  updateAvatar(userId: number, avatarUrl: string) {
    return this.http.put(`${this.apiUrl}user/${userId}/update-avatar`, { avatarUrl });
  }

  update(userId: any, data : any) {
    return this.http.put(`${this.apiUrl}user/${userId}/update-info`, data);
  }

  updateRH(userId: any, data : any) {
    return this.http.post(`${this.apiUrl}user/${userId}/update`, data);
  }
  delete(userId: any) {
    return this.http.delete(`${this.apiUrl}user/${userId}/delete`);
  }
}
