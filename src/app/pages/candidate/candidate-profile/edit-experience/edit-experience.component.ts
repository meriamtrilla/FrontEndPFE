import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Experience } from 'src/app/models/Experience';
import { AuthService } from 'src/app/services/auth.service';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
  selector: 'app-edit-experience',
  templateUrl: './edit-experience.component.html',
  styleUrls: ['./edit-experience.component.scss']
})
export class EditExperienceComponent {
constructor(private route : ActivatedRoute,
  private router : Router ,
  private authService : AuthService,
  private experienceService : ExperienceService,
  private toast : ToastrService){}
   
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
  getExperience(){
    this.experienceService.get(this.route.snapshot.params["id"]).subscribe((experience)=>{
      console.log("experience",experience);
      this.experience = experience;
    }, err=>{
      console.log(err);
      
    })
  }
  ngOnInit() {
this.getExperience()
  }
  editExperience(form : NgForm){
    
    
console.log("Experience ==>",this.experience);
this.experienceService.update(this.experience , this.experience.id ).subscribe(
  (data)=>{
    console.log(data);
    this.toast.success("Experience modifier successfully");
    this.router.navigate(['/candidate/profile']);
    
},(err)=>{
  console.log(err);
  
})


  }
}
