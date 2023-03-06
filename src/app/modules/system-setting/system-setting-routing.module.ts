import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../admin/components/home/home.component';
import { MasterpageComponent } from '../admin/components/masterpage/masterpage.component';
import { InstituteComponent } from './institute/institute.component';

const routes: Routes = [
  {
    path: '',
    component: MasterpageComponent,
    children: [
      { path: '', redirectTo: '/LMS/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'institute', component: InstituteComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemSettingRoutingModule { }
