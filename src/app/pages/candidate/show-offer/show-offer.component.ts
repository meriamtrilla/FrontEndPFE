import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { OfferService } from 'src/app/services/offer-service.service';
import { Offer } from 'src/app/models/offer';
import { CandidatureService } from 'src/app/services/candidature.service';
import { Candidature } from 'src/app/models/candidature';
import { User } from 'src/app/models/user';
import { FileUploadService } from '../../../services/fileupload.service';
import { EnterpriseService } from '../../../services/enterprise.service';
import { Enterprise } from '../../../models/enterprise';

@Component({
  selector: 'app-show-offer',
  templateUrl: './show-offer.component.html',
  styleUrls: ['./show-offer.component.scss']
})
export class ShowOfferComponent {
  constructor( private enterpriseService :EnterpriseService,
    private router : Router,
      private uploader : FileUploadService,
    private toast : ToastrService ,private authService : AuthService ,private candidatureService : CandidatureService ,private offerService : OfferService , private route :ActivatedRoute) { }
  candidature : Candidature = {
    id: 0,
    user_id: 0,
    offre_id: 0,
    letter: "",
    dateCandidature: "",
    status: "New",
    cv : ""
  }
  user : User = this.authService.getCurrentUser();
  enterprise : Enterprise = {
    id : 0,
    name : "",
    description : "",
    phone : "",
    address : "",
    facebook : "",
    linkedin : "",
    website : "",
    email : "",
    activityField : ""

  }
  getEnterprise() : Enterprise{
    this.enterpriseService.get(1).subscribe((response) => {
      this.enterprise = response;  // assign the response data to your instance variable.
      console.log('Enterprise === ', response);
    })
    return this.enterprise;
  }
  ngOnInit() {
    this.getEnterprise()
    this.getOffer();
    this.getMyCandidates()
  }
  userId = this.authService.getCurrentUser()?.id;
  offer : Offer = {
    id: 0,
    title: "",
    description: "",
    number_post: 0,
    type_contract: "",
    type_employment: "",
    experience: 0,
    skills: "",
    keywords: "",
    status: false
  }
    offerId : string = this.route.snapshot.params['id'];
   
  getOffer(){
    this.offerService.get(this.offerId).subscribe((response) => {
      this.offer = response;  // assign the response data to your instance variable.
      console.log('Offer === ', response);
    })
  }
  selectedFile! : File;
  // postuler(){
   
  //   this.candidatureService.store({ user_id : this.userId , offre_id : this.offerId , letter : "hello"})
  //   .subscribe((data)=>{console.log(data);
  //   },(err)=>{console.log(err);
  //   })
  // }

  isModalOpen = false;

  openModal() {
    if (!this.userId){
      this.router.navigate(['/guest/login']);
    }else{
      this.isModalOpen = true;
    }
   
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onSubmit(data: any) {
    console.log("data: " , data);
    
   // console.log('Submitted Motivation Letter:', content);
    //alert('Your motivation letter:\n\n' + content);
    this.selectedFile = data.selectedFile;
    this.candidature.letter = data.content;
    this.candidature.user_id = this.authService.getCurrentUser()?.id;
    this.candidature.offre_id = parseInt(this.offerId);
    this.uploader.uploadCV(this.userId, this.selectedFile).subscribe((response) => {
      console.log("upload file: " , response);
      this.candidature.cv =response;
        // after upload
        this.candidatureService.store(this.candidature).subscribe(
          (data)=>{
            console.log(data);
            this.toast.success("Candidature envoyée avec succès");
            this.getMyCandidates(); 
            this.getOffer()
          },(err)=>{console.log(err);
          })


    },err=>{console})
      
    this.closeModal();
  }

  candidates : Candidature[] = [];
getMyCandidates(){
  this.candidatureService.getMyCandidates(this.user.id).subscribe(candidates =>{
  console.log(candidates);
  this.candidates = candidates;
  
  },err => {
    console.log(err);
    
  });
    }

    checkApply(id : Number){
      let check = false;
      this.candidates.map((c : Candidature) => {
          if (c?.offer?.id == id){
            check = true;  
          }
      })
      return check;
    }
}
