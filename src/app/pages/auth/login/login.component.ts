import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private toast : ToastrService,private authService: AuthService, private router: Router) {}

  login(form : NgForm) {
  
    this.authService.login(form.value).subscribe(
      (response) => {
        // Assuming response contains user data and JWT token
        this.authService.setUser(response);
        if (this.authService.getUserRole() === "ROLE_USER"){
          this.router.navigate(['/candidate']); 
        }else if (this.authService.getUserRole() === "ROLE_RH"){
          this.router.navigate(['/hr']); 
        }else{
          this.router.navigate(['/enterprise/dashboard']); 
        }
       // Redirect to home after login
      },
      (error) => {
        console.error('Login failed', error);
        this.toast.error("Login failed");
      }
    );
  }
}