import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.scss']
})
export class EditDetailsComponent {
  constructor(private router : Router,private authService : AuthService , private userService : UserServiceService) { }
  user : User = this.authService.getCurrentUser();
  editUserData(form : NgForm){
  console.log(form.value);
  this.userService.update(this.user?.id,form.value).subscribe(res =>{
    console.log(res);
    localStorage.setItem('user',JSON.stringify(res));
    this.router.navigate(["/candidate/profile"]);
  },err=>{ console.log(err);
   });


  }

}
