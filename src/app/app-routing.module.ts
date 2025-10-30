import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnterpriseLayoutComponent } from './layouts/enterprise-layout/enterprise-layout.component';
import { HrLayoutComponent } from './layouts/hr-layout/hr-layout.component';
import { CandidateLayoutComponent } from './layouts/candidate-layout/candidate-layout.component';
import { GuestLayoutComponent } from './layouts/guest/guest.component';
import { UnauthorizedComponent } from './shared/unauthorized/unauthorized.component';
import { HomeComponent } from './pages/home/home.component';
import { CandidateCVComponent } from './pages/candidate-cv/candidate-cv.component';

const routes: Routes = [
  {path:"" , component : HomeComponent},
  {path:"candidate/:id/cv" , component : CandidateCVComponent},
  {path:"unauthorized" , component : UnauthorizedComponent},
  {
    path: 'guest',
    component: GuestLayoutComponent,
    children: [
      // Add enterprise-specific routes here
      {
        path: '',
        loadChildren: () =>
          import('./guest/guest.module').then((m) => m.GuestModule),
      },
    ],
  },
  {
    path: 'enterprise',
    component: EnterpriseLayoutComponent,
    children: [
      // Add enterprise-specific routes here
      {
        path: '',
        loadChildren: () =>
          import('./enterprise/enterprise.module').then(
            (m) => m.EnterpriseModule
          ),
      },
    ],
  },
  {
    path: 'hr',
    component: HrLayoutComponent,
    children: [
      // Add HR-specific routes here
      {
        path: '',
        loadChildren: () => import('./hr/hr.module').then((m) => m.HrModule),
      },
    ],
  },
  {
    path: 'candidate',
    component: CandidateLayoutComponent,
    children: [
      // Add candidate-specific routes here
      {
        path: '',
        loadChildren: () =>
          import('./candidate/candidate.module').then((m) => m.CandidateModule),
      },
    ],
  },
  //{ path: '', redirectTo: '/guest/login', pathMatch: 'full' }, // Redirect to guest module
  {
    path: 'guest',
    loadChildren: () =>
      import('./guest/guest.module').then((m) => m.GuestModule),
  }, // Default route
  {
    path: 'enterprise',
    loadChildren: () =>
      import('./enterprise/enterprise.module').then((m) => m.EnterpriseModule),
  },
  {
    path: 'hr',
    loadChildren: () => import('./hr/hr.module').then((m) => m.HrModule),
  },
  {
    path: 'candidate',
    loadChildren: () =>
      import('./candidate/candidate.module').then((m) => m.CandidateModule),
  }, // Default route
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
