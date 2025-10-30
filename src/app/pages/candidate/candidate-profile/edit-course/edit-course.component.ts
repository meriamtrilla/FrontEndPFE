import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Course } from 'src/app/models/course';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent {
constructor(
  private route : ActivatedRoute,
  
  private router : Router ,
  private authService : AuthService,
  private courseService : CourseService ,
  private toast : ToastrService){}

  course : Course = {
    id: "",
    user_id: this.authService.getCurrentUser()?.id,
    name: "",
    training_organization: "",
    certificat_url: "",
    start_month: "",
    start_year: 0,
    end_month: "",
    end_year: 0
  }
  getCourse(){
    this.courseService.get(this.route.snapshot.params["id"]).subscribe((course)=>{
      console.log("course",course);
      this.course = course;
    }, err=>{
      console.log(err);
      
    })

  }
  ngOnInit() {
    this.getCourse()
  }
  editCourse(form : NgForm){
    
    
console.log("Education ==>",this.course);
this.courseService.update(this.course , this.course.id).subscribe(
  (data)=>{
    console.log(data);
    this.toast.success("Education modifier avec succes");
    this.router.navigate(['/candidate/profile']);
    
},(err)=>{
  console.log(err);
  
})


  }
}
