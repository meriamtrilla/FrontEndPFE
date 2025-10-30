import { Component } from '@angular/core';
import { OfferService } from '../../services/offer-service.service';
import { Offer } from 'src/app/models/offer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
constructor(private offerService : OfferService){}
offers : Offer[] = [];
searchQuery : string = '' 
ngOnInit(){
this.getOffers();
}
  getOffers(){
this.offerService.validated().subscribe(res =>{
  this.offers = res;
  console.log(res);
}, err =>{
  console.log(err);
})
  }

  searchOffers(){
    console.log(this.searchQuery.toLowerCase());
    if (this.searchQuery.length > 0){
      this.offers =  this.offers.filter(offer=>offer.title.toLowerCase().includes(this.searchQuery.toLowerCase()) );
    }else{ this.getOffers()}
    //console.log("Searching offers",this.offers);
  }
}
