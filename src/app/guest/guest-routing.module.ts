import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestComponent } from './guest.component';
import { LoginComponent } from '../pages/auth/login/login.component';
import { RegisterComponent } from '../pages/auth/register/register.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  { path: '', component: GuestComponent },
  { path: 'login', component: LoginComponent ,canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent,canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestRoutingModule {}
