import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent {

constructor(private toast : ToastrService,
    private authService: AuthService, private router: Router) {}

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Form Submitted!', form.value);
      this.authService.register(form.value).subscribe(
        (response) => {
          // Assuming response contains user data and JWT token
          //this.authService.setUser(response);
          console.log(response);
          this.toast.success("Utilisateur ajoutee avec success");
          this.router.navigate(['/enterprise/dashboard']); // Redirect to home after login
        },
        (error) => {
          console.error('Register failed', error);
          this.toast.error("Erreur lors de l'ajout d'utilisateur ");
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
