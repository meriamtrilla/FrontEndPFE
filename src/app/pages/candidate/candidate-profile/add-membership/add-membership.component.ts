import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Membership } from 'src/app/models/Membership';
import { AuthService } from 'src/app/services/auth.service';
import { EducationService } from 'src/app/services/education.service';
import { MembershipService } from 'src/app/services/membership.service';

@Component({
  selector: 'app-add-membership',
  templateUrl: './add-membership.component.html',
  styleUrls: ['./add-membership.component.scss']
})
export class AddMembershipComponent {
  constructor(private membershipService : MembershipService, private router : Router ,private authService : AuthService,private educationService : EducationService ,private toast : ToastrService){}

  membership : Membership = {
    id: "",

    user_id: this.authService.getCurrentUser()?.id,
    organization: "",
    month: "",
    year: 0,
    position: ""
  }
  addMembership(form : NgForm){
    
    
console.log("Membership ==>",this.membership);
this.membershipService.store(this.membership).subscribe(
  (data)=>{
    console.log(data);
    this.toast.success("Membership added successfully");
    this.router.navigate(['/candidate/profile']);
    
},(err)=>{
  console.log(err);
  
})


  }

}

