import { Component } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent {
  constructor(private authService : AuthService){}
  profileCompletion = 30
  candidate : any = { firstname : '' , lastname : '' , password:'' , phone : '' , username :'' } ;
  ngOnInit(){
    this.candidate = this.authService.getCurrentUser();
    console.log("candidate ",this.candidate);
  }
}
