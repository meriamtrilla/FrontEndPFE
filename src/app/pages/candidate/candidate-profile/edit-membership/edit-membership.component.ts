import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Membership } from 'src/app/models/Membership';
import { AuthService } from 'src/app/services/auth.service';
import { EducationService } from 'src/app/services/education.service';
import { MembershipService } from 'src/app/services/membership.service';

@Component({
  selector: 'app-edit-membership',
  templateUrl: './edit-membership.component.html',
  styleUrls: ['./edit-membership.component.scss']
})
export class EditMembershipComponent {
 constructor(
  private route :ActivatedRoute,
  private membershipService : MembershipService,
   private router : Router,
   private authService : AuthService,
   private educationService : EducationService ,
   private toast : ToastrService){}

  membership : Membership = {
    id: "",

    user_id: this.authService.getCurrentUser()?.id,
    organization: "",
    month: "",
    year: 0,
    position: ""
  }
  getMembership(){
    this.membershipService.get(this.route.snapshot.params["id"]).subscribe((membership)=>{
      console.log("membership",membership);
      this.membership = membership;
    }, err=>{
      console.log(err);
      
    })
  }
  ngOnInit() {
    this.getMembership()
  }
  editMembership(form : NgForm){
    
    
console.log("Membership ==>",this.membership);
this.membershipService.update(this.membership,this.membership.id).subscribe(
  (data)=>{
    console.log(data);
    this.toast.success("Membership added successfully");
    this.router.navigate(['/candidate/profile']);
    
},(err)=>{
  console.log(err);
  
})


  }
}
