import { ToastrService } from 'ngx-toastr';
import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Education } from 'src/app/models/Education';
import { AuthService } from 'src/app/services/auth.service';
import { EducationService } from 'src/app/services/education.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
  styleUrls: ['./add-education.component.scss']
})
export class AddEducationComponent {
constructor(private router : Router ,private authService : AuthService,private educationService : EducationService ,private toast : ToastrService){}
  
   education : Education = {
    id: "",
    university: "",
    start_year: 0,
    end_year: 0,
    diploma: "",
    current: false,
    user_id : this.authService.getCurrentUser()?.id,
  }

  

  addEDucation(form : NgForm){
    
    
console.log("Education ==>",this.education);
this.educationService.store(this.education).subscribe(
  (data)=>{
    console.log(data);
    this.toast.success("Education added successfully");
    this.router.navigate(['/candidate/profile']);
    
},(err)=>{
  console.log(err);
  
})


  }

}
