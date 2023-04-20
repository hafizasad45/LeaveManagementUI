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
import { DesignationListComponent } from './designation-list/designation-list.component';
import { DesignationComponent } from './designation/designation.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeComponent } from './employee/employee.component';

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
      { path: 'designationList', component: DesignationListComponent},
      { path: 'designation', component: DesignationComponent},
      { path: 'employeeList', component: EmployeeListComponent},
      { path: 'employee', component: EmployeeComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemSettingRoutingModule { }
