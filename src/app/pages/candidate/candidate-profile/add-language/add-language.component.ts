import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

import { Router } from '@angular/router';
import { Language } from 'src/app/models/language';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-add-language',
  templateUrl: './add-language.component.html',
  styleUrls: ['./add-language.component.scss']
})
export class AddLanguageComponent {
constructor(private router : Router ,private authService : AuthService,private languageService : LanguageService ,private toast : ToastrService){}

  language : Language = {
    id: "",
    name :"",
    level : "",
    user_id : this.authService.getCurrentUser()?.id,
  }
  addLanguage(form : NgForm){
    
    
console.log("Language ==>",this.language);
this.languageService.store(this.language).subscribe(
  (data)=>{
    console.log(data);
    this.toast.success("Language added successfully");
    this.router.navigate(['/candidate/profile']);
    
},(err)=>{
  console.log(err);
  
})


  }

}
