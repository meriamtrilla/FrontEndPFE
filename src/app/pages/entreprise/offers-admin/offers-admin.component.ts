import { Component } from '@angular/core';
import { Offer } from 'src/app/models/offer';
import { OfferService } from 'src/app/services/offer-service.service';

@Component({
  selector: 'app-offers-admin',
  templateUrl: './offers-admin.component.html',
  styleUrls: ['./offers-admin.component.scss']
})
export class OffersAdminComponent {

  constructor(private offerService : OfferService){

  }
offers : Offer[] = [];
getOffers(){
  this.offerService.all().subscribe(res => {
    this.offers = res;
  })
  }
  ngOnInit(){
    this.getOffers();
      }
      deleteOffer(id : any) {
        
      }
}
 

