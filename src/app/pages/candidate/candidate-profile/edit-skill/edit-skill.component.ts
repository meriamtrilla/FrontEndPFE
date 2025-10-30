import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Skill } from 'src/app/models/Skill';
import { AuthService } from 'src/app/services/auth.service';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.scss']
})
export class EditSkillComponent {
constructor( private route : ActivatedRoute , private router : Router ,private authService : AuthService,private skillService : SkillService ,private toast : ToastrService){}

id : string = this.route.snapshot.params["id"];
  skill : Skill = {
    id: "",
    name: "",
    level: "",
    user_id : this.authService.getCurrentUser()?.id,
  }
  updateSkill(form : NgForm){
    
    
console.log("Skill ==>",this.skill);
this.skillService.update(this.skill,this.id).subscribe(
  (data)=>{
    console.log(data);
    this.toast.success("Skill modifier avec successfull");
    this.router.navigate(['/candidate/profile']);
    
},(err)=>{
  console.log(err);
  
})
  }
getSkill(){
  this.skillService.get(this.id).subscribe((skill)=>{
    console.log("skill",skill);
    this.skill = skill;
    

  },err=>{console.log(err)});
}

ngOnInit() {
  this.getSkill();
}
  }

