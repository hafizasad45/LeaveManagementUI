import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import ValidateForm from 'src/app/helpers/validateForm';
import { ModelEmployeeType } from 'src/app/models/employeeType.model';
import { EmployeeTypeService } from 'src/app/services/employee-type.service';

@Component({
  selector: 'app-employee-type',
  templateUrl: './employee-type.component.html',
  styleUrls: ['./employee-type.component.scss']
})
export class EmployeeTypeComponent implements OnInit {
  employeeTypeForm!: FormGroup;
  p_employeeTypeID: number | undefined;
  p_Operation : string = "Create";

  constructor(private fb: FormBuilder, private route : ActivatedRoute, private service : EmployeeTypeService,  
              private toastr: ToastrService, private router : Router, private ngxService: NgxUiLoaderService
             ) {}


  ngOnInit(): void {
    this.ngxService.start();
    this.resetForm();  
    this.route.queryParams.subscribe((params) => {
      this.p_employeeTypeID = params['data'];
      if (this.p_employeeTypeID != null) {
        console.log(this.p_employeeTypeID)
        this.getemployeeTypeByID(this.p_employeeTypeID);
      }
    }); 
    this.ngxService.stop();   
  }

  getemployeeTypeByID(employeeTypeID : number) {
    this.p_Operation = "Update";
    this.service
      .getEmployeeTypeByID(employeeTypeID)
      .subscribe((modelemployeeTypeGet: ModelEmployeeType[]) => {
        this.setFormData(modelemployeeTypeGet[0]);
      });
  }

  setFormData(modelemployeeTypeSet: ModelEmployeeType) {
    this.employeeTypeForm.controls["employeeTypeCode"].disable();
    this.employeeTypeForm.setValue({
      employeeTypeID: modelemployeeTypeSet.employeeTypeID,
      employeeTypeCode: modelemployeeTypeSet.employeeTypeCode,
      employeeTypeName: modelemployeeTypeSet.employeeTypeName,
      description: modelemployeeTypeSet.description,
      IsActive: modelemployeeTypeSet.isActive
    });
  }

  resetForm() {
    this.employeeTypeForm = this.fb.group({
      employeeTypeID : [-1],
      employeeTypeCode: ['', Validators.required],
      employeeTypeName: ['', Validators.required],
      description: [''],
      IsActive : [true]
    });
  }

  onSave()  {
    this.ngxService.start();
    if (this.employeeTypeForm.value.employeeTypeID == -1) {
      this.addemployeeType();
    } else {
      this.updateemployeeType();
    }
    this.ngxService.stop();
  }

  addemployeeType() {
    if (this.employeeTypeForm.valid) {
      this.service.createEmployeeType(this.employeeTypeForm.value).subscribe({
        next: (res) => {
          this.toastr.success(res[0].message, 'SUCCESS',{
            timeOut: 3000,
          });
          this.employeeTypeForm.reset();
          this.resetForm();
        },
        error: (err) => {
          //alert(err?.error.message);
          this.toastr.error(err?.error[0].message, 'ERROR', {
            timeOut: 3000,
          }); 
        },
      });
    } else {
      // throug error using toaster and with required fileds
      ValidateForm.validateAllFormFields(this.employeeTypeForm);
      //alert('Your form is invalid!');
    }
  }
  
  updateemployeeType() {
    if (this.employeeTypeForm.valid) {
      this.employeeTypeForm.controls["employeeTypeCode"].enable();
      this.service.updateEmployeeType(this.employeeTypeForm.value).subscribe({
        next: (res) => {
          this.toastr.success(res[0].message, 'SUCCESS',{
            timeOut: 3000,
          });          
          this.employeeTypeForm.controls["employeeTypeCode"].disable();
        },
        error: (err) => {
          //alert(err?.error.message);
          this.toastr.error(err?.error[0].message, 'ERROR', {
            timeOut: 3000,
          }); 
        },
      });
    } else {
      // throug error using toaster and with required fileds
      ValidateForm.validateAllFormFields(this.employeeTypeForm);
      //alert('Your form is invalid!');
    }
  }

  goBack(){
    this.router.navigate(['LMS/employeeTypeList']);
  }
}
