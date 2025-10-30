// src/app/guards/auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    const user: User | null = this.authService.getCurrentUser();
    const role : any = this.authService.getUserRole();

    // If the user is logged in
    if (user) {
      // Redirect logged-in users away from login or registration pages
      if (next.routeConfig?.path === 'login' || next.routeConfig?.path === 'register') {
       if (role === "ROLE_ADMIN"){
        this.router.navigate(['/enterprise']); // Redirect to another page (e.g., dashboard or home)
       }
        
        this.router.navigate(['/candidate']); // Redirect to another page (e.g., dashboard or home)
        return false;
      }

      const expectedRole = next.data['expectedRole']; // Get expected role from route data
      console.log("hello this is the role",this.authService.getUserRole());
      
      if (expectedRole && this.authService.getUserRole() != expectedRole ) {
        // Role doesn't match, redirect to unauthorized page or another route
        this.router.navigate(['/unauthorized']);
        return false;
      }
      // User is logged in and role matches
      return true;
    }

    // User is not logged in, allow access to login and register pages
    if (next.routeConfig?.path === 'login' || next.routeConfig?.path === 'register') {
      return true;
    }

    // User is not logged in, redirect to login page for other routes
    this.router.navigate(['/guest/login']);
    return false;
  };
}
