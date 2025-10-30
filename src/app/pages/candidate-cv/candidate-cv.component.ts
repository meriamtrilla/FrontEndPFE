import { Component } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-candidate-cv',
  templateUrl: './candidate-cv.component.html',
  styleUrls: ['./candidate-cv.component.scss']
})
export class CandidateCVComponent {

  constructor(
    private route: ActivatedRoute,
      // Inject ActivatedRoute for route parameters
    private userServiceService : UserServiceService , private router:Router) { }
user : User = {
  id: 0,
  firstname: '',
  lastname: '',
  username: '',
  password: '',
  phone: '',
  age: 0,
  city: '',
  speciality: '',
  education: '',
  sexe: '',
  avatar: '',
  notifications: [],
  skills : [],
  experiences : [],
  educations : [],
  courses : [],
  experience :0  
} 
 id : Number = this.route.snapshot.params["id"];
getUser(){
  this.userServiceService.get(this.id).subscribe((user : any )=> {
    this.user = user;
  }, err => {console.log(err);
  });
}
    ngOnInit() {
    
      // Get user data using the user id
     this.getUser()
    }
print(){
  window.print();
}

goToProfile() {
  this.router.navigate(['/candidate/profile']);
}


}
