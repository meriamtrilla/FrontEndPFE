import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Skill } from 'src/app/models/Skill';
import { AuthService } from 'src/app/services/auth.service';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.scss']
})
export class AddSkillComponent {
  constructor(private router : Router ,private authService : AuthService,private skillService : SkillService ,private toast : ToastrService){}

  skill : Skill = {
    id: "",
    name: "",
    level: "",
   
    user_id : this.authService.getCurrentUser()?.id,
  }
  addEDucation(form : NgForm){
    
    
console.log("Skill ==>",this.skill);
this.skillService.store(this.skill).subscribe(
  (data)=>{
    console.log(data);
    this.toast.success("Skill added successfully");
    this.router.navigate(['/candidate/profile']);
    
},(err)=>{
  console.log(err);
  
})


  }
}
