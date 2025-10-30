import { Offer } from 'src/app/models/offer';
import { OfferService } from './../../../services/offer-service.service';
import { Component } from '@angular/core';
import { Candidature } from 'src/app/models/candidature';
import { CandidatureService } from '../../../services/candidature.service';
import { User } from 'src/app/models/user';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-candidate-offer-list',
  templateUrl: './candidate-offer-list.component.html',
  styleUrls: ['./candidate-offer-list.component.scss']
})
export class CandidateOfferListComponent {
constructor(private auth : AuthService , private  candidateService : CandidatureService ,private offerService : OfferService){

}
user : User = this.auth.getCurrentUser();
offers : Offer[] = []
ngOnInit(){
this.getAllOffers()

}
keywords : any 
search(keyword : string){

  this.offers = [...this.offers].filter(o=>o.title.includes(keyword))

}
getAllOffers(){
  this.offerService.all().subscribe(
    (response) => {
      console.log(response);
      this.offers = response.filter((offer: Offer) => offer.status === true);
    },
    (error) => {
      console.log(error);
    }
  )
}

}
