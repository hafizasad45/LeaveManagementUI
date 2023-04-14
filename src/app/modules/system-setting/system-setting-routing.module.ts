import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../admin/components/home/home.component';
import { MasterpageComponent } from '../admin/components/masterpage/masterpage.component';
import { BranchComponent } from './branch/branch.component';
import { InstituteListComponent } from './institute-list/institute-list.component';
import { InstituteComponent } from './institute/institute.component';
import { BranchListComponent } from './branch-list/branch-list.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentComponent } from './department/department.component';

const routes: Routes = [
  {
    path: '',
    component: MasterpageComponent,
    children: [
      { path: '', redirectTo: '/LMS/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'instituteList', component: InstituteListComponent},
      { path: 'institute', component: InstituteComponent},
      { path: 'branchList', component: BranchListComponent},
      { path: 'branch', component: BranchComponent},
      { path: 'departmentList', component: DepartmentListComponent},
      { path: 'department', component: DepartmentComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemSettingRoutingModule { }
