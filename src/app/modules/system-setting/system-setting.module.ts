import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemSettingRoutingModule } from './system-setting-routing.module';
import { InstituteComponent } from './institute/institute.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    InstituteComponent
  ],
  imports: [
    CommonModule,
    SystemSettingRoutingModule,
    SharedModule, 
    ReactiveFormsModule
  ]
})
export class SystemSettingModule { }
