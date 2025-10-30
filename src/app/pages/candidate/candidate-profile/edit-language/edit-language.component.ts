import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LanguageService } from '../../../../services/language.service';
import { Language } from '../../../../models/language';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-language',
  templateUrl: './edit-language.component.html',
  styleUrls: ['./edit-language.component.scss']
})
export class EditLanguageComponent {
  constructor(
    private router : Router,
    private route : ActivatedRoute , private languageService : LanguageService){

  }
  id : String = this.route.snapshot.params["id"]; 
language : Language = {
  id: "",
  name :"",
  level : "",
  user_id : "",


}
getLanguage()  {
  this.languageService.get(this.id).subscribe(data =>{
    this.language = data;
    console.log(this.language);  // you can use this data in your form fields for editing purpose.
  }, err =>{
    console.log(err);
    
  })
}
ngOnInit(): void {
this.getLanguage()
}
  editLanguage(form : NgForm){
    this.languageService.update(this.language , this.language.id).subscribe(data=>{
this.router.navigate(['/candidate/profile']);
    },err=>{console.log();
    })

  }
}
