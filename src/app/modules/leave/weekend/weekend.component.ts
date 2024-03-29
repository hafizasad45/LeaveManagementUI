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
import { LmsWeekendService } from 'src/app/services/lms-weekend.service';
import { ModelLmsWeekend } from 'src/app/models/lms_Weekend.model';
import ValidateForm from 'src/app/helpers/validateForm';

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
  modelBranch: any[] = [];
  modelLmsWeekend: ModelLmsWeekend[] = [];
  modelLmsWeekendAdd : ModelLmsWeekend[] = [];

  dataUpdate: boolean = false;

  dataSource: any;
  displayedColumns: string[] = [
    'nameOfDay',
    'dayLengthID'
  ];


  constructor(private fb: FormBuilder, private branchService: BranchService, private lmsWeekendService: LmsWeekendService,
    private toastr: ToastrService, private router: Router, private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.resetForm();
    this.getBranchList();
    this.getWeekendList();
  }

  resetForm() {
    this.LmsWeekendForm = this.fb.group({
      branchID: ['', Validators.required],
      cboSaturday: [-1],
      cboSunday: [-1],
      cboMonday: [-1],
      cboTuesday: [-1],
      cboWednesday: [-1],
      cboThursday: [-1],
      cboFriday: [-1],
      hdnSaturday: [-1],
      hdnSunday: [-1],
      hdnMonday: [-1],
      hdnTuesday: [-1],
      hdnWednesday: [-1],
      hdnThursday: [-1],
      hdnFriday: [-1],
    });
  }

  onSave() {
    try {
      if (this.LmsWeekendForm.valid) {
        this.modelLmsWeekendAdd = [];
        for (let i = 0; i < 7; i++) {
          if (i === 0) {
            this.modelLmsWeekendAdd.push({branchID: this.LmsWeekendForm.value.branchID, branchCode: '', 
                                          branchWeekendID : this.LmsWeekendForm.value.hdnSaturday, dayLengthID:this.LmsWeekendForm.value.cboSaturday,
                                          nameOfDay: '', weekendID: 101, isUpdate: this.dataUpdate})
          }
          else if (i === 1) {
            this.modelLmsWeekendAdd.push({branchID: this.LmsWeekendForm.value.branchID, branchCode: '', 
                                          branchWeekendID : this.LmsWeekendForm.value.hdnSunday, dayLengthID:this.LmsWeekendForm.value.cboSunday,
                                          nameOfDay: '', weekendID: 102, isUpdate: this.dataUpdate})
          }
          else if (i === 2) {
            this.modelLmsWeekendAdd.push({branchID: this.LmsWeekendForm.value.branchID, branchCode: '', 
                                          branchWeekendID : this.LmsWeekendForm.value.hdnMonday, dayLengthID:this.LmsWeekendForm.value.cboMonday,
                                          nameOfDay: '', weekendID: 103, isUpdate: this.dataUpdate})
          }
          else if (i === 3) {
            this.modelLmsWeekendAdd.push({branchID: this.LmsWeekendForm.value.branchID, branchCode: '', 
                                          branchWeekendID : this.LmsWeekendForm.value.hdnTuesday, dayLengthID:this.LmsWeekendForm.value.cboTuesday,
                                          nameOfDay: '', weekendID: 104, isUpdate: this.dataUpdate})
          }
          else if (i === 4) {
            this.modelLmsWeekendAdd.push({branchID: this.LmsWeekendForm.value.branchID, branchCode: '', 
                                          branchWeekendID : this.LmsWeekendForm.value.hdnWednesday, dayLengthID:this.LmsWeekendForm.value.cboWednesday,
                                          nameOfDay: '', weekendID: 105, isUpdate: this.dataUpdate})
          }
          else if (i === 5) {
            this.modelLmsWeekendAdd.push({branchID: this.LmsWeekendForm.value.branchID, branchCode: '', 
                                          branchWeekendID : this.LmsWeekendForm.value.hdnThursday, dayLengthID:this.LmsWeekendForm.value.cboThursday,
                                          nameOfDay: '', weekendID: 106, isUpdate: this.dataUpdate})
          }
          else if (i === 6) {
            this.modelLmsWeekendAdd.push({branchID: this.LmsWeekendForm.value.branchID, branchCode: '', 
                                          branchWeekendID : this.LmsWeekendForm.value.hdnFriday, dayLengthID:this.LmsWeekendForm.value.cboFriday,
                                          nameOfDay: '', weekendID: 107, isUpdate: this.dataUpdate})
          }
          
        }
        this.lmsWeekendService.createLMS_Weekend(this.modelLmsWeekendAdd).subscribe({
          next: (res) => {
            this.toastr.success(res[0].message, 'SUCCESS',{
              timeOut: 3000,
            });
            this.LmsWeekendForm.reset();
            this.ngOnInit();
            this.ngxService.stop();
          },
          error: (err) => {
            this.toastr.error(err?.error[0].message, 'ERROR', {
              timeOut: 3000,
            }); 
            this.ngxService.stop();
          },
        });
      } else {
        ValidateForm.validateAllFormFields(this.LmsWeekendForm);
      }
      
    } catch (error) {
      console.log("This is catch :" +error)
      this.ngxService.stop();
    }
  }

  getBranchList() {
    this.branchService.getBranchList().subscribe((data: ModelBranch[]) => {
      this.modelBranch = data;
    });
  }

  getWeekendList() {
    this.lmsWeekendService.getLMS_WeekendList().subscribe((data: ModelLmsWeekend[]) => {
      this.modelLmsWeekend = data;
      console.log(this.modelLmsWeekend)
    })
  }

  onBranchChange(branchID : any) {
    const filteredData : ModelLmsWeekend[] = this.modelLmsWeekend.filter((value) => value.branchID == branchID.target.value);

    if (filteredData.length > 0) {
      this.dataUpdate = true;
      this.LmsWeekendForm.get("cboSaturday")!.patchValue(filteredData[0].dayLengthID);
      this.LmsWeekendForm.get("cboSunday")!.patchValue(filteredData[1].dayLengthID);
      this.LmsWeekendForm.get("cboMonday")!.patchValue(filteredData[2].dayLengthID);
      this.LmsWeekendForm.get("cboTuesday")!.patchValue(filteredData[3].dayLengthID);
      this.LmsWeekendForm.get("cboWednesday")!.patchValue(filteredData[4].dayLengthID);
      this.LmsWeekendForm.get("cboThursday")!.patchValue(filteredData[5].dayLengthID);
      this.LmsWeekendForm.get("cboFriday")!.patchValue(filteredData[6].dayLengthID);

      this.LmsWeekendForm.get("hdnSaturday")?.patchValue(filteredData[0].branchWeekendID);
      this.LmsWeekendForm.get("hdnSunday")?.patchValue(filteredData[1].branchWeekendID);
      this.LmsWeekendForm.get("hdnMonday")?.patchValue(filteredData[2].branchWeekendID);
      this.LmsWeekendForm.get("hdnTuesday")?.patchValue(filteredData[3].branchWeekendID);
      this.LmsWeekendForm.get("hdnWednesday")?.patchValue(filteredData[4].branchWeekendID);
      this.LmsWeekendForm.get("hdnThursday")?.patchValue(filteredData[5].branchWeekendID);
      this.LmsWeekendForm.get("hdnFriday")?.patchValue(filteredData[6].branchWeekendID);      
    } else {
      this.dataUpdate = false;
      this.LmsWeekendForm.get("cboSaturday")!.patchValue(-1);
      this.LmsWeekendForm.get("cboSunday")!.patchValue(-1);
      this.LmsWeekendForm.get("cboMonday")!.patchValue(-1);
      this.LmsWeekendForm.get("cboTuesday")!.patchValue(-1);
      this.LmsWeekendForm.get("cboWednesday")!.patchValue(-1);
      this.LmsWeekendForm.get("cboThursday")!.patchValue(-1);
      this.LmsWeekendForm.get("cboFriday")!.patchValue(-1);

      this.LmsWeekendForm.get("hdnSaturday")?.patchValue(-1);
      this.LmsWeekendForm.get("hdnSunday")?.patchValue(-1);
      this.LmsWeekendForm.get("hdnMonday")?.patchValue(-1);
      this.LmsWeekendForm.get("hdnTuesday")?.patchValue(-1);
      this.LmsWeekendForm.get("hdnWednesday")?.patchValue(-1);
      this.LmsWeekendForm.get("hdnThursday")?.patchValue(-1);
      this.LmsWeekendForm.get("hdnFriday")?.patchValue(-1);
    }
    
  }


}
