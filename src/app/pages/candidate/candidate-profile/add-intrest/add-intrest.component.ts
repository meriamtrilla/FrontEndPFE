import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Intrest } from 'src/app/models/intrest';
import { AuthService } from 'src/app/services/auth.service';
import { IntrestService } from 'src/app/services/intrest.service';

@Component({
  selector: 'app-add-intrest',
  templateUrl: './add-intrest.component.html',
  styleUrls: ['./add-intrest.component.scss']
})
export class AddIntrestComponent {
  constructor(private router : Router ,private authService : AuthService,private intrestService : IntrestService ,private toast : ToastrService){}
  intrest : Intrest = {
    id: 0,
    name: "",
    description: "",
    user_id : this.authService.getCurrentUser()?.id,
  }
  addIntrest(form : NgForm){
    
    
console.log("Intrest ==>",this.intrest);
this.intrestService.store(this.intrest).subscribe(
  (data)=>{
    console.log(data);
    this.toast.success("Intrest added successfully");
    this.router.navigate(['/candidate/profile']);
    
},(err)=>{
  console.log(err);
  
})


  }
}