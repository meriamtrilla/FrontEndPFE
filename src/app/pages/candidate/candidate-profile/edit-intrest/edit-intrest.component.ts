import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Intrest } from 'src/app/models/intrest';
import { AuthService } from 'src/app/services/auth.service';
import { IntrestService } from 'src/app/services/intrest.service';

@Component({
  selector: 'app-edit-intrest',
  templateUrl: './edit-intrest.component.html',
  styleUrls: ['./edit-intrest.component.scss']
})
export class EditIntrestComponent {
constructor(
  private route : ActivatedRoute,
  private router : Router ,
  private authService : AuthService,
  private intrestService : IntrestService ,
  private toast : ToastrService){}
  intrest : Intrest = {
    id: 0,
    name: "",
    description: "",
    user_id : this.authService.getCurrentUser()?.id,
  }
  getIntrest(){

    this.intrestService.get(this.route.snapshot.params["id"]).subscribe(
      (intrest)=>{
        console.log("intrest",intrest);
        this.intrest = intrest;
      },err=>{console.log(err);
      })


  }
  ngOnInit() {
    this.getIntrest()
  }
  editIntrest(form : NgForm){
    
    
console.log("Intrest ==>",this.intrest);
this.intrestService.update(this.intrest, this.intrest.id).subscribe(
  (data)=>{
    console.log(data);
    this.toast.success("Intrest modifier avec succes");
    this.router.navigate(['/candidate/profile']);
    
},(err)=>{
  console.log(err);
  
})


  }
}
