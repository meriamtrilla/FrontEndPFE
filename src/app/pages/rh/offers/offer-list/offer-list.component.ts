import { Component } from '@angular/core';
import { Offer } from 'src/app/models/offer';
import { OfferService } from 'src/app/services/offer-service.service';


@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent {

  constructor(private offerService : OfferService){}
  offers : Offer[] = []
  searchQuery : string = ''
  getOffers(){
    this.offerService.all().subscribe(
      (response) => {
        console.log(response);
        this.offers = response
      },
      (error) => {
        console.error('Fetch failed', error);
      }
    );
  }
  
  
  ngOnInit(){
    this.getOffers()

  }
  searchOffers(){
    this.offers = this.offers.filter(offer => offer.title.toLocaleLowerCase().includes(this.searchQuery.toLocaleLowerCase()))
  }
}
