import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateComponent } from './candidate.component';
import { AuthGuard } from '../guards/auth.guard';
import { CandidateOfferListComponent } from '../pages/candidate/candidate-offer-list/candidate-offer-list.component';
import { CandidateProfileComponent } from '../pages/candidate/candidate-profile/candidate-profile.component';
import { AddEducationComponent } from '../pages/candidate/candidate-profile/add-education/add-education.component';
import { AddSkillComponent } from '../pages/candidate/candidate-profile/add-skill/add-skill.component';
import { EditDetailsComponent } from '../pages/candidate/candidate-profile/edit-details/edit-details.component';
import { AddLanguageComponent } from '../pages/candidate/candidate-profile/add-language/add-language.component';
import { AddExperienceComponent } from '../pages/candidate/candidate-profile/add-experience/add-experience.component';
import { AddCourseComponent } from '../pages/candidate/candidate-profile/add-course/add-course.component';
import { AddMembershipComponent } from '../pages/candidate/candidate-profile/add-membership/add-membership.component';
import { AddIntrestComponent } from '../pages/candidate/candidate-profile/add-intrest/add-intrest.component';
import { ShowOfferComponent } from '../pages/candidate/show-offer/show-offer.component';
import { MyCandidatesComponent } from '../pages/candidate/my-candidates/my-candidates.component';
import { TestpassComponent } from '../pages/candidate/testpass/testpass.component';
import { InterviewpassComponent } from '../pages/candidate/interviewpass/interviewpass.component';
import { RecommendationsComponent } from '../pages/candidate/recommendations/recommendations.component';
import { EditEducationComponent } from '../pages/candidate/candidate-profile/edit-education/edit-education.component';
import { EditSkillComponent } from '../pages/candidate/candidate-profile/edit-skill/edit-skill.component';
import { EditIntrestComponent } from '../pages/candidate/candidate-profile/edit-intrest/edit-intrest.component';
import { EditMembershipComponent } from '../pages/candidate/candidate-profile/edit-membership/edit-membership.component';
import { EditExperienceComponent } from '../pages/candidate/candidate-profile/edit-experience/edit-experience.component';
import { EditCourseComponent } from '../pages/candidate/candidate-profile/edit-course/edit-course.component';
import { EditLanguageComponent } from '../pages/candidate/candidate-profile/edit-language/edit-language.component';
import { CvUploadComponent } from '../pages/candidate/candidate-profile/cv-upload/cv-upload.component';

const routes: Routes = [
  { path: '', component: CandidateComponent ,
    canActivate: [AuthGuard], data: { expectedRole: 'ROLE_USER' } }
  ,{ path : 'find-job' , component : CandidateOfferListComponent }
  ,{ path : 'show-offer/:id' , component : ShowOfferComponent}
  ,{ path : 'test/:id/exam' , component : TestpassComponent}
  ,{ path : 'interview/:id/exam' , component : InterviewpassComponent}
  ,{ path : 'mycandidates' , component : MyCandidatesComponent}
  ,{ path : 'recommendations' , component : RecommendationsComponent}
  ,{ path : 'profile' , children : [
    { path : '' , component : CandidateProfileComponent },
    { path : 'add-education' , component : AddEducationComponent },
    { path : 'edit-education/:id' , component : EditEducationComponent },
    { path : 'add-skill' , component : AddSkillComponent },
    { path : 'edit-skill/:id' , component : EditSkillComponent },
    { path : 'add-language' , component : AddLanguageComponent },
    { path : 'edit-language/:id' , component : EditLanguageComponent },
    { path : 'add-course' , component : AddCourseComponent },
    { path : 'edit-course/:id' , component : EditCourseComponent },
    { path : 'add-experience' , component : AddExperienceComponent },
    { path : 'edit-experience/:id' , component : EditExperienceComponent },
    { path : 'add-membership' , component : AddMembershipComponent },
    { path : 'edit-membership/:id' , component : EditMembershipComponent },
    { path : 'add-intrest' , component : AddIntrestComponent },
    { path : 'edit-intrest/:id' , component : EditIntrestComponent },
    { path : 'details' , component : EditDetailsComponent } , // Add more routes for other candidate profile fields here
    { path : 'Cvapload', component : CvUploadComponent}
  ]}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateRoutingModule { }
