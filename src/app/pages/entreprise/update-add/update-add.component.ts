import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-update-add',
  templateUrl: './update-add.component.html',
  styleUrls: ['./update-add.component.scss']
})
export class UpdateAddComponent {

constructor(private toast : ToastrService,
  private userService : UserServiceService,
    private route: ActivatedRoute, private router: Router) {}

    userId = this.route.snapshot.params["id"];
    user : User = {
      id: 0,
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      phone: '',
      age: 0,
      city: '',
      speciality: '',
      education: '',
      sexe: '',
      avatar: '',
      notifications: [],
      skills: [],
      languages: [],
      experiences: [],
      educations: [],
      courses: [],
      experience: 0,
    }
    ngOnInit() {
      this.userService.get(this.userId).subscribe(
        (user : any )=> {
          this.user = user;
        }, err => {console.log(err)
        });
      
    }
  onUpdate(form: any) {
    console.log('Form Submitted!', form.value);
    if (form.valid) {
      console.log('Form Submitted!', form.value);
      this.userService.updateRH(this.userId,form.value).subscribe(
        (response) => {
         
          console.log(response);
          this.toast.success("Utilisateur mis a jour avec success");
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
