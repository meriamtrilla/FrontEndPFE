import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Course } from 'src/app/models/course';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent {
  constructor(private router : Router ,private authService : AuthService,private courseService : CourseService ,private toast : ToastrService){}

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
  addCourse(form : NgForm){
    
    
console.log("Education ==>",this.course);
this.courseService.store(this.course).subscribe(
  (data)=>{
    console.log(data);
    this.toast.success("Education added successfully");
    this.router.navigate(['/candidate/profile']);
    
},(err)=>{
  console.log(err);
  
})


  }
}
