import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Education } from 'src/app/models/Education';
import { AuthService } from 'src/app/services/auth.service';
import { EducationService } from 'src/app/services/education.service';

@Component({
  selector: 'app-edit-education',
  templateUrl: './edit-education.component.html',
  styleUrls: ['./edit-education.component.scss']
})
export class EditEducationComponent {

  constructor(private route : ActivatedRoute , private router : Router ,private authService : AuthService,private educationService : EducationService ,private toast : ToastrService){}
    id : string = this.route.snapshot.params["id"];
     education : Education = {
      id: "",
      university: "",
      start_year: 0,
      end_year: 0,
      diploma: "",
      current: false,
      user_id : this.authService.getCurrentUser()?.id,
    }

    getEducation(){
      this.educationService.get(this.id).subscribe((education)=>{
        console.log("education",education);
        this.education = education;
        

      },err=>{console.log(err)});
    }
  ngOnInit(): void {
this.getEducation();
  }
    
  
    updateEducation(form : NgForm){
      
      
  console.log("Education ==>",this.education);
  this.educationService.update(this.education , this.education.id ).subscribe(
    (data)=>{
      console.log(data);
      this.toast.success("Education modifier avec  succes");
      this.router.navigate(['/candidate/profile']);
      
  },(err)=>{
    console.log(err);
    
  })
  
  
    }
}
