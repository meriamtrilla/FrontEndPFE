import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnterpriseComponent } from './enterprise.component';
import { AuthGuard } from '../guards/auth.guard';
import { DashboardComponent } from '../pages/entreprise/dashboard/dashboard.component';
import { UpdateComponent } from '../pages/entreprise/update/update.component';
import { UserAddComponent } from '../pages/entreprise/user-add/user-add.component';
import { UpdateAddComponent } from '../pages/entreprise/update-add/update-add.component';
import { UsersRHComponent } from '../pages/entreprise/users-rh/users-rh.component';
import { OffersAdminComponent } from '../pages/entreprise/offers-admin/offers-admin.component';
import { TestsAdminComponent } from '../pages/entreprise/tests-admin/tests-admin.component';
import { CategoriesAdminComponent } from '../pages/entreprise/categories-admin/categories-admin.component';
import { UsersCandidatComponent } from '../pages/entreprise/users-candidat/users-candidat.component';

const routes: Routes = [
  { path: '', component: EnterpriseComponent , canActivate: [AuthGuard], data: { expectedRole: 'ROLE_ADMIN' } }
,{ path : 'dashboard' , component : DashboardComponent }
,{ path : 'update' , component : UpdateComponent }
,{ path : 'user/add' , component : UserAddComponent }
,{ path : 'user/edit/:id' , component : UpdateAddComponent }
,{ path : 'usersRH' , component : UsersRHComponent }
,{ path : 'usersCandidat' , component : UsersCandidatComponent }
,{ path : 'offres' , component : OffersAdminComponent }
,{ path : 'tests' , component : TestsAdminComponent }
,{ path : 'categories' , component : CategoriesAdminComponent }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnterpriseRoutingModule { }
