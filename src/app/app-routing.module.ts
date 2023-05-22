import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'LMS',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'LMS',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/system-setting/system-setting.module').then((m) => m.SystemSettingModule),
  },
  {
    path: 'LMS',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/leave/leave.module').then((m) => m.LeaveModule),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
