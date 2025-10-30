import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { EnterpriseLayoutComponent } from './layouts/enterprise-layout/enterprise-layout.component';
import { HrLayoutComponent } from './layouts/hr-layout/hr-layout.component';
import { CandidateLayoutComponent } from './layouts/candidate-layout/candidate-layout.component';
import { GuestLayoutComponent } from './layouts/guest/guest.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
import { UnauthorizedComponent } from './shared/unauthorized/unauthorized.component';
import { TestsComponent } from './pages/rh/tests/tests.component';
import { TestCreateComponent } from './pages/rh/tests/test-create/test-create.component';
import { TestShowComponent } from './pages/rh/tests/test-show/test-show.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { OfferListComponent } from './pages/rh/offers/offer-list/offer-list.component';
import { OfferCreateComponent } from './pages/rh/offers/offer-create/offer-create.component';
import { CandidateOfferListComponent } from './pages/candidate/candidate-offer-list/candidate-offer-list.component';
import { InterviewCreateComponent } from './pages/rh/interviews/interview-create/interview-create.component';
import { InterviewListComponent } from './pages/rh/interviews/interview-list/interview-list.component';
import { InterviewShowComponent } from './pages/rh/interviews/interview-show/interview-show.component';
import { OfferShowComponent } from './pages/rh/offers/offer-show/offer-show.component';
import { CandidateProfileComponent } from './pages/candidate/candidate-profile/candidate-profile.component';
import { AddEducationComponent } from './pages/candidate/candidate-profile/add-education/add-education.component';
import { AddSkillComponent } from './pages/candidate/candidate-profile/add-skill/add-skill.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { EditDetailsComponent } from './pages/candidate/candidate-profile/edit-details/edit-details.component';
import { AddLanguageComponent } from './pages/candidate/candidate-profile/add-language/add-language.component';
import { AddExperienceComponent } from './pages/candidate/candidate-profile/add-experience/add-experience.component';
import { AddCourseComponent } from './pages/candidate/candidate-profile/add-course/add-course.component';
import { MonthSelectComponent } from './components/month-select/month-select.component';
import { YearSelectComponent } from './components/year-select/year-select.component';
import { AddMembershipComponent } from './pages/candidate/candidate-profile/add-membership/add-membership.component';
import { AddIntrestComponent } from './pages/candidate/candidate-profile/add-intrest/add-intrest.component';
import { ShowOfferComponent } from './pages/candidate/show-offer/show-offer.component';
import { ModalComponent } from './components/modal/modal.component';
import { MyCandidatesComponent } from './pages/candidate/my-candidates/my-candidates.component';
import { HomeComponent } from './pages/home/home.component';
import { InscriptionModalComponent } from './components/inscription-modal/inscription-modal.component';
import { CandidatesComponent } from './pages/rh/offers/candidates/candidates.component';
import { NotificationDropdownComponent } from './components/notification-dropdown/notification-dropdown.component';
import { TestpassComponent } from './pages/candidate/testpass/testpass.component';
import { InterviewpassComponent } from './pages/candidate/interviewpass/interviewpass.component';
import { MeetModalComponent } from './components/meet-modal/meet-modal.component';
import { CandidateCVComponent } from './pages/candidate-cv/candidate-cv.component';
import { DashboardComponent } from './pages/entreprise/dashboard/dashboard.component';
import { UpdateComponent } from './pages/entreprise/update/update.component';
import { UserAddComponent } from './pages/entreprise/user-add/user-add.component';
import { UpdateAddComponent } from './pages/entreprise/update-add/update-add.component';
import { ResponseIAModalComponent } from './components/response-iamodal/response-iamodal.component';
import { ProfileComponent } from './pages/rh/offers/candidates/profile/profile.component';
import { RecommendationsComponent } from './pages/candidate/recommendations/recommendations.component';
import { EditEducationComponent } from './pages/candidate/candidate-profile/edit-education/edit-education.component';
import { EditSkillComponent } from './pages/candidate/candidate-profile/edit-skill/edit-skill.component';
import { EditLanguageComponent } from './pages/candidate/candidate-profile/edit-language/edit-language.component';
import { EditMembershipComponent } from './pages/candidate/candidate-profile/edit-membership/edit-membership.component';
import { EditCourseComponent } from './pages/candidate/candidate-profile/edit-course/edit-course.component';
import { EditIntrestComponent } from './pages/candidate/candidate-profile/edit-intrest/edit-intrest.component';
import { EditExperienceComponent } from './pages/candidate/candidate-profile/edit-experience/edit-experience.component';
import { OffCanvasComponent } from './shared/off-canvas/off-canvas.component';
import { UsersRHComponent } from './pages/entreprise/users-rh/users-rh.component';
import { OffersAdminComponent } from './pages/entreprise/offers-admin/offers-admin.component';
import { TestsAdminComponent } from './pages/entreprise/tests-admin/tests-admin.component';
import { CategoriesAdminComponent } from './pages/entreprise/categories-admin/categories-admin.component';
import { UsersCandidatComponent } from './pages/entreprise/users-candidat/users-candidat.component';
import { CvUploadComponent } from './pages/candidate/candidate-profile/cv-upload/cv-upload.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    EnterpriseLayoutComponent,
    HrLayoutComponent,
    CandidateLayoutComponent,
    GuestLayoutComponent,
    LoginComponent,
    RegisterComponent,
    LoaderComponent,
    UnauthorizedComponent,
    TestsComponent,
    TestCreateComponent,
    TestShowComponent,
    OfferListComponent,
    OfferCreateComponent,
    CandidateOfferListComponent,
    InterviewCreateComponent,
    InterviewListComponent,
    InterviewShowComponent,
    OfferShowComponent,
    CandidateProfileComponent,
    AddEducationComponent,
    AddSkillComponent,
    EditDetailsComponent,
    AddLanguageComponent,
    AddExperienceComponent,
    AddCourseComponent,
    MonthSelectComponent,
    YearSelectComponent,
    AddMembershipComponent,
    AddIntrestComponent,
    ShowOfferComponent,
    ModalComponent,
    MyCandidatesComponent,
    HomeComponent,
    InscriptionModalComponent,
    CandidatesComponent,
    NotificationDropdownComponent,
    TestpassComponent,
    InterviewpassComponent,
    MeetModalComponent,
    CandidateCVComponent,
    DashboardComponent,
    UpdateComponent,
    UserAddComponent,
    UpdateAddComponent,
    ResponseIAModalComponent,
    ProfileComponent,
    RecommendationsComponent,
    EditEducationComponent,
    EditSkillComponent,
    EditLanguageComponent,
    EditMembershipComponent,
    EditCourseComponent,
    EditIntrestComponent,
    EditExperienceComponent,
    OffCanvasComponent,
    UsersRHComponent,
    OffersAdminComponent,
    TestsAdminComponent,
    CategoriesAdminComponent,
    UsersCandidatComponent,
    CvUploadComponent

  ],
  imports: [BrowserModule,
    AppRoutingModule ,
    FormsModule,
    ReactiveFormsModule ,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgCircleProgressModule.forRoot()
],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent],
})
export class AppModule {}
