// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { APIURL } from '../apiconfig';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = APIURL; // Update with your backend URL
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public currentUser: Observable<any> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  // Register a new user
  register(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}auth/register`, payload);
  }
  // Log in user
  login(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}auth/login`, payload);
  }

  // Store user data in local storage
  setUser(user: any) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('user', JSON.stringify(user.user));
    localStorage.setItem('token', JSON.stringify(user.token));
    this.currentUserSubject.next(user);
  }

  // Get current user
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  // Log out user
  logout() {
    localStorage.clear();
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']); // Redirect to login page
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }
  // Method to get user roles
  getUserRole(): string {
    const user = this.getCurrentUser();
    console.log("user data",user);
    return user ? user.roles[0].name : null; // Return roles or an empty array
  }

  // Méthode pour récupérer le token du localStorage
  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  // Méthode pour récupérer le rôle de l'utilisateur à partir du token
  decodeToken(token: string): any {
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
  }

  // Méthode pour obtenir le rôle
  getUserRoles(): string {
    const token = this.getToken();
    const decodedToken = this.decodeToken(token);
    return decodedToken.role; // Assurez-vous que le role est bien stocké dans le token
  }

  // Méthode pour vérifier si l'utilisateur est un admin
isAdmin(): boolean {
  const role = this.getUserRole();
  return role === 'ROLE_ADMIN'; // On suppose que le rôle 'ADMIN' est stocké dans le token
}
}
