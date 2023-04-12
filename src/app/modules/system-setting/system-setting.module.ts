import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemSettingRoutingModule } from './system-setting-routing.module';
import { InstituteComponent } from './institute/institute.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InstituteListComponent } from './institute-list/institute-list.component';
import { BranchComponent } from './branch/branch.component';
import { BranchListComponent } from './branch-list/branch-list.component';


@NgModule({
  declarations: [
    InstituteComponent,
    InstituteListComponent,
    BranchComponent,
    BranchListComponent
  ],
  imports: [
    CommonModule,
    SystemSettingRoutingModule,
    SharedModule, 
    ReactiveFormsModule
  ],
})
export class SystemSettingModule { }
