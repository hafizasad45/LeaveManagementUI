import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemSettingRoutingModule } from './system-setting-routing.module';
import { InstituteComponent } from './institute/institute.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InstituteListComponent } from './institute-list/institute-list.component';
import { BranchComponent } from './branch/branch.component';
import { BranchListComponent } from './branch-list/branch-list.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentComponent } from './department/department.component';
import { DesignationListComponent } from './designation-list/designation-list.component';
import { DesignationComponent } from './designation/designation.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeComponent } from './employee/employee.component';
import { GradeListComponent } from './grade-list/grade-list.component';
import { GradeComponent } from './grade/grade.component';
import { EmployeeTypeComponent } from './employee-type/employee-type.component';
import { EmployeeTypeListComponent } from './employee-type-list/employee-type-list.component';


@NgModule({
  declarations: [
    InstituteComponent,
    InstituteListComponent,
    BranchComponent,
    BranchListComponent,
    DepartmentListComponent,
    DepartmentComponent,
    DesignationListComponent,
    DesignationComponent,
    EmployeeListComponent,
    EmployeeComponent,
    GradeListComponent,
    GradeComponent,
    EmployeeTypeComponent,
    EmployeeTypeListComponent
  ],
  imports: [
    CommonModule,
    SystemSettingRoutingModule,
    SharedModule, 
    ReactiveFormsModule
  ],
})
export class SystemSettingModule { }
