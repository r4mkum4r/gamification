import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './guards';
import { EGELoginComponent } from './auth/login/login.component';
import { EGEAuthComponent } from './auth';

const routes: Routes = [
  { path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule', canActivate: [AuthGuard] },
  {
    path: 'auth',
    component: EGEAuthComponent,
    children: [
      {
        path: '',
        component: EGELoginComponent,
      },
      {
        path: 'login',
        component: EGELoginComponent,
      },
    ],
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
