import { Component } from '@angular/core';
import { Candidature } from 'src/app/models/candidature';
import { Category } from 'src/app/models/category';
import { Interview } from 'src/app/models/Interview';
import { Offer } from 'src/app/models/offer';
import { Test } from 'src/app/models/test';
import { User } from 'src/app/models/user';
import { CandidatureService } from 'src/app/services/candidature.service';
import { CategoryService } from 'src/app/services/category.service';
import { InterviewService } from 'src/app/services/interview.service';
import { OfferService } from 'src/app/services/offer-service.service';
import { TestService } from 'src/app/services/test-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {


  constructor(
    private candidatureService : CandidatureService,
    private userService : UserServiceService,
    private interviewService : InterviewService,
    private categoryService : CategoryService,
    private testService : TestService,
    private offerService : OfferService){}
offers : Offer[]  = []
tests : Test[]  = []
categories : Category[] = []
interviews : Interview[] = []
users : User[] = []
candidatures : Candidature[] = []
  ngOnInit(){
    this.getOffers()
    this.getTests()
    this.getCategories()
    this.getInterviews()

    this.getCandidatures()
     }
  getOffers(){
    this.offerService.all().subscribe((offers : Offer[]) => this.offers = offers);

  }
  getTests(){
    this.testService.all().subscribe((tests : Test[]) => this.tests = tests);

  }
  getCategories(){
    this.categoryService.all().subscribe((categories : Category[]) => this.categories = categories);

  }
  getInterviews(){
    this.interviewService.all().subscribe((interviews : Interview[]) => this.interviews = interviews);

  }
 

  getCandidatures(){
    this.candidatureService.all().subscribe((candidatures : Candidature[]) => {
      this.candidatures = candidatures
    });
  }

  currentCandidatures(){
    return [...this.candidatures].filter((candidature : Candidature) => candidature.status !== 'Fail');
  }

   countDistinctUserIds(): number {
    const userIds = new Set(this.candidatures.map((item : Candidature ) => item?.user?.id));
    return userIds.size;
  }


  
}
