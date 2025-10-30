import { OfferService } from 'src/app/services/offer-service.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Interview } from 'src/app/models/Interview';
import { Test } from 'src/app/models/test';
import { InterviewService } from 'src/app/services/interview.service';
import { TestService } from 'src/app/services/test-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-offer-create',
  templateUrl: './offer-create.component.html',
  styleUrls: ['./offer-create.component.scss']
})
export class OfferCreateComponent {
  constructor(private offerService : OfferService , private testService : TestService ,
     private interviewService : InterviewService,
     private toastr: ToastrService,
     private categoryService: CategoryService,
    private router : Router ){}
  selectedType: string = 'Présentielle';
  selectedContract :string = 'Stage';
  keywordsTab : String[] = []
  interviews : Interview[] = []
  categories : Category[] = []
  tests : Test[] = []
  keywords : String = ""
  keyw : String = ''
  addOffer(form : NgForm){
    console.log(form.value);
    let data = form.value;
    data['skills'] = this.skills;
    data['keywords'] = this.keywords;
    data['experience'] = parseInt(form.controls['experience'].value);
    
   

    console.log("data ==>" , data );
    

    this.offerService.store( data ).subscribe(
      (data)=>{
        console.log(data);
        this.toastr.success('Offre', 'Offre ajoutee avec succes');
        this.router.navigate(['/hr/offers/'+ data.id +'/show'])
        
      },
      (err)=>{
        this.toastr.error('Offre', 'Erreur lors de l\'ajout');
        console.log(err);
      }
    )

    
  }
  addKeyword( ){
    console.log("hello ==>",this.keyw);
    if (this.keyw.length > 0){
      if (this.keywords.length == 0 ){
        this.keywordsTab.push(this.keyw)
        this.keywords =  this.keyw 
        this.keyw = ""
      }else{
        this.keywordsTab.push(this.keyw)
        this.keywords = this.keywords + ',' + this.keyw
        this.keyw = ""
      }
      console.log("hello ==>",this.keywords);
    }
  

  }
  skillsTab : String[] = []
  skills : String = ""
  skillw : String = ''
addCategorie : boolean = false
  
  setAdd(){
this.addCategorie = true
  }
  addCategory(title : string){
    this.categoryService.store({ title : title}).subscribe(
      (data) => {    
        console.log(data);
        this.toastr.success("Categorie ajouter avec succes" , "Categorie")
        this.getCategories()
        this.addCategorie = false
      } ,
      (err) => { console.log(err);
      }
    )
  }
  addSkill( ){
    console.log("hello ==>",this.skillw);
    if (this.skillw.length > 0){
      if (this.skills.length == 0 ){
        this.skillsTab.push(this.skillw)
        this.skills =  this.skillw 
        this.skillw = ""
      }else{
        this.skillsTab.push(this.skillw)
        this.skills = this.skills + ',' + this.skillw
        this.skillw = ""
      }
      console.log("hello ==>",this.skills);
    }
  

  }
  getCategories(){
    this.categoryService.all().subscribe(
      (data) => {    
        console.log(data);
        this.categories = data} ,
      (err) => { console.log(err);
      }
    )

  }
  getInterviews(){
    this.interviewService.withoutOffers().subscribe(
      (data) => {    
        console.log(data);
        this.interviews = data} ,
      (err) => { console.log(err);
      }
    )

  }
  getTests(){
    this.testService.withoutOffer().subscribe(
      (data) => { 
        console.log(data);
        this.tests = data} ,
      (err) => { console.log(err);
      }
    )

  }

  ngOnInit() : void {
    this.getTests()
    this.getInterviews()
    this.getCategories()
  }
}
