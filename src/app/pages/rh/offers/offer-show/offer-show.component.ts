import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Offer } from 'src/app/models/offer';
import { OfferService } from 'src/app/services/offer-service.service';

@Component({
  selector: 'app-offer-show',
  templateUrl: './offer-show.component.html',
  styleUrls: ['./offer-show.component.scss']
})
export class OfferShowComponent {
  constructor(
    private route: ActivatedRoute,
    private offerService: OfferService,
    private toastr: ToastrService
  ) {}
  edit: boolean = false;
  offerId: String = this.route.snapshot.params['id'];
  offer!: Offer;
  activateEdit() {
    this.edit = true;
  }
  ngOnInit() {
 
    this.getOffer();
   
  }
  getOffer() {
    this.offerService.get(this.offerId).subscribe(
      (response) => {
        console.log('offer ===', response);
        this.offer = response;
        this.assignRandomColors()
        
      },
      (error) => {
        console.log(error);
      }
    );
  }

 activaterOffer(){
  this.offerService.activate(this.offerId).subscribe(
    (response) => {
      console.log('offer ===', response);
      //this.offer = response;
      this.toastr.success("Offre activer et publier dans la liste des offres.", "Offre")
    this.getOffer()
    },
    (error) => {
      console.log(error);
    }
  );
 }
 desactivateOffre(){
  this.offerService.deactivate(this.offerId).subscribe(
    (response) => {
      console.log('offer ===', response);
      //this.offer = response;
      this.toastr.success("Offre desactiver avec succes.", "Offre")
    this.getOffer()
    },
    (error) => {
      console.log(error);
    }
  );
 }
 tagColors: { [key: number]: string } = {};
 assignRandomColors(): void {
  console.log("skills",this.offer);
   
  this.offer.skills.split(',').forEach((tag ,id )=> {
    console.log("id",tag,id);
    
    this.tagColors[id] = this.getRandomColor();
  });
}
getRandomColor(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
 
}
