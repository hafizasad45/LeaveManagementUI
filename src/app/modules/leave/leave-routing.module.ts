import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterpageComponent } from '../admin/components/masterpage/masterpage.component';
import { HomeComponent } from '../admin/components/home/home.component';
import { LmsActivityListComponent } from './lms-activity-list/lms-activity-list.component';
import { LmsActivityComponent } from './lms-activity/lms-activity.component';

const routes: Routes = [
  {
    path: '',
    component: MasterpageComponent,
    children: [
      { path: '', redirectTo: '/LMS/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'lms_ActivityList', component: LmsActivityListComponent},
      { path: 'lms_Activity', component: LmsActivityComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveRoutingModule { }
