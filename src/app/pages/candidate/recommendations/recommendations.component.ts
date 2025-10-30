import { Component } from '@angular/core';
import { Offer } from 'src/app/models/offer';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { IAModelService } from 'src/app/services/IAModel.service';
import { OfferService } from 'src/app/services/offer-service.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent {
constructor(
  private offerService : OfferService,
  private IAService : IAModelService ,
  private auth : AuthService
){}

ngOnInit() {
  this.getAllOffers();
  
  
  
}
user : User = this.auth.getCurrentUser();
allOffers : Offer[] = []
offers : Offer[] = []
  getAllOffers(){
    this.offerService.all().subscribe(offers=>{
      this.allOffers = offers;
      console.log("offers",this.allOffers);
      this.filterOffers()

    },err=>{console.log(err)})
   
  }
  filterOffers(){
    let loffers : any = []
    this.allOffers.map(offer=>{
      loffers.push({...offer ,  "competence" : offer.skills.split(",") })

    });
    console.log("liste des offres apres modifications",loffers);
    
      this.IAService.filtrageOffre( 
        {
          "offres" : loffers  ,
          "candidat" : {
            "competences" : this.skillsToArray(this.user.skills)
          } ,
          nbcandidat : 3
        }
       ).subscribe(offers=>{this.offers = offers},err=>{console.log(err)});
  }
  skillsToArray(skills : any){
    let lskills : String[] = []
    skills.forEach((skill : any)=>{
      lskills.push(`${skill.name}`)
    }); 
    return lskills;
  
  }
}
