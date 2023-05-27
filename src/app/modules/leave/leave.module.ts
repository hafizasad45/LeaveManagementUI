import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { LeaveRoutingModule } from './leave-routing.module';
import { LmsActivityListComponent } from './lms-activity-list/lms-activity-list.component';
import { LmsActivityComponent } from './lms-activity/lms-activity.component';


@NgModule({
  declarations: [
    LmsActivityListComponent,
    LmsActivityComponent
  ],
  imports: [
    CommonModule,
    LeaveRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class LeaveModule { }
