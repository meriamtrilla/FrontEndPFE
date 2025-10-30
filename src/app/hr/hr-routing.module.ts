import { InterviewListComponent } from '../pages/rh/interviews/interview-list/interview-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HrComponent } from './hr.component';
import { TestsComponent } from '../pages/rh/tests/tests.component';
import { TestCreateComponent } from '../pages/rh/tests/test-create/test-create.component';
import { TestShowComponent } from '../pages/rh/tests/test-show/test-show.component';
import { OfferListComponent } from '../pages/rh/offers/offer-list/offer-list.component';
import { OfferCreateComponent } from '../pages/rh/offers/offer-create/offer-create.component';
import { InterviewCreateComponent } from '../pages/rh/interviews/interview-create/interview-create.component';
import { InterviewShowComponent } from '../pages/rh/interviews/interview-show/interview-show.component';
import { OfferShowComponent } from '../pages/rh/offers/offer-show/offer-show.component';
import { CandidatesComponent } from '../pages/rh/offers/candidates/candidates.component';
import { ProfileComponent } from '../pages/rh/offers/candidates/profile/profile.component';

const routes: Routes = [
  { path: '', component: HrComponent },
  { path: 'tests', component: TestsComponent },
  { path: 'tests/create', component: TestCreateComponent },
  { path: 'tests/:id/show', component: TestShowComponent },
  { path: 'offers', component: OfferListComponent },
  { path: 'offers/create', component: OfferCreateComponent },
  { path: 'offers/:id/show', component: OfferShowComponent },
  { path: 'offers/:id/candidates', component: CandidatesComponent },
  { path: 'interviews', component: InterviewListComponent },
  { path: 'interviews/create', component: InterviewCreateComponent },
  { path: 'interviews/:id/show', component: InterviewShowComponent },
  { path : 'offers/candidate/:id' , component: ProfileComponent}
  
  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrRoutingModule { }
