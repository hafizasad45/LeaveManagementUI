import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../admin/components/home/home.component';
import { MasterpageComponent } from '../admin/components/masterpage/masterpage.component';
import { BranchComponent } from './branch/branch.component';
import { InstituteListComponent } from './institute-list/institute-list.component';
import { InstituteComponent } from './institute/institute.component';

const routes: Routes = [
  {
    path: '',
    component: MasterpageComponent,
    children: [
      { path: '', redirectTo: '/LMS/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'instituteList', component: InstituteListComponent},
      { path: 'institute', component: InstituteComponent},
      { path: 'branch', component: BranchComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemSettingRoutingModule { }
