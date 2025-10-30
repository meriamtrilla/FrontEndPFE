import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Experience } from 'src/app/models/Experience';
import { AuthService } from 'src/app/services/auth.service';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrls: ['./add-experience.component.scss']
})
export class AddExperienceComponent {
  constructor(private router : Router ,private authService : AuthService,private experienceService : ExperienceService ,private toast : ToastrService){}
   
  experience : Experience = {
    id: "",
    job_title: "",
    company: "",
    place: "",
    place_type: "",
    start_year: 0,
    end_year: 0,
    user_id: this.authService.getCurrentUser()?.id,
    is_current: false,
    employment_type: "",
    start_month: "",
    end_month: "",
    description: ""
  }
  addExperience(form : NgForm){
    
    
console.log("Experience ==>",this.experience);
this.experienceService.store(this.experience).subscribe(
  (data)=>{
    console.log(data);
    this.toast.success("Experience added successfully");
    this.router.navigate(['/candidate/profile']);
    
},(err)=>{
  console.log(err);
  
})


  }
}
