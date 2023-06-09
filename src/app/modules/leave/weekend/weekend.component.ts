import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BranchService } from 'src/app/services/branch.service';
import { ModelBranch } from 'src/app/models/branch.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';

export interface LMS_WeekendItemModel {  
  dayName: string;
}

@Component({
  selector: 'app-weekend',
  templateUrl: './weekend.component.html',
  styleUrls: ['./weekend.component.scss']
})
export class WeekendComponent implements OnInit {
  LmsWeekendForm!: FormGroup;
  modelBranch : any[] = [];



  constructor(private fb: FormBuilder, private branchService: BranchService,
              private toastr: ToastrService, private router : Router, private ngxService: NgxUiLoaderService 
             ) {}
  
  ngOnInit(): void {
    this.resetForm();
    this.getBranchList();
  }

  resetForm() {
    this.LmsWeekendForm = this.fb.group({
      branchID : ['', Validators.required],
    });
  }

  onSave() {

  }

  getBranchList() {
    this.branchService.getBranchList().subscribe((data : ModelBranch[]) => {
      this.modelBranch = data;
    });
  }

}
