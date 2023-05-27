import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import ValidateForm from 'src/app/helpers/validateForm';
import { ModelDepartment } from 'src/app/models/department.model';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  departmentForm!: FormGroup;
  p_DepartmentID: number | undefined;
  p_Operation : string = "Create";

  modelInstitute : any[] = [];

  constructor(private fb: FormBuilder, private route : ActivatedRoute, private service : DepartmentService,  
              private toastr: ToastrService, private router : Router, private ngxService: NgxUiLoaderService 
             ) {}


  ngOnInit(): void {
    this.ngxService.start();
    this.resetForm();  
    this.route.queryParams.subscribe((params) => {
      this.p_DepartmentID = params['data'];
      if (this.p_DepartmentID != null) {
        this.getDepartmentByID(this.p_DepartmentID);
      }
    }); 
    this.ngxService.stop();   
  }

  getDepartmentByID(departmentID : number) {
    this.p_Operation = "Update";
    this.service
      .getDepartmentByID(departmentID)
      .subscribe((modelDepartmentGet: ModelDepartment[]) => {
        this.setFormData(modelDepartmentGet[0]);
      });
  }

  setFormData(modelDepartmentSet: ModelDepartment) {
    this.departmentForm.controls["departmentCode"].disable();
    this.departmentForm.setValue({
      departmentID: modelDepartmentSet.departmentID,
      departmentCode: modelDepartmentSet.departmentCode,
      departmentName: modelDepartmentSet.departmentName,
      description: modelDepartmentSet.description,
      IsActive: modelDepartmentSet.isActive
    });
  }

  resetForm() {
    this.departmentForm = this.fb.group({
      departmentID : [-1],
      departmentCode: ['', Validators.required],
      departmentName: ['', Validators.required],
      description: [''],
      IsActive : [true]
    });
  }

  onSave()  {
    this.ngxService.start();
    if (this.departmentForm.value.departmentID == -1) {
      this.addDepartment();
    } else {
      this.updateDepartment();
    }
    this.ngxService.stop();
  }

  addDepartment() {
    if (this.departmentForm.valid) {
      this.service.createDepartment(this.departmentForm.value).subscribe({
        next: (res) => {
          this.toastr.success(res[0].message, 'SUCCESS',{
            timeOut: 3000,
          });
          this.departmentForm.reset();
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
      ValidateForm.validateAllFormFields(this.departmentForm);
      //alert('Your form is invalid!');
    }
  }
  
  updateDepartment() {
    if (this.departmentForm.valid) {
      this.departmentForm.controls["departmentCode"].enable();
      this.service.updateDepartment(this.departmentForm.value).subscribe({
        next: (res) => {
          this.toastr.success(res[0].message, 'SUCCESS',{
            timeOut: 3000,
          });          
          this.departmentForm.controls["departmentCode"].disable();
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
      ValidateForm.validateAllFormFields(this.departmentForm);
      //alert('Your form is invalid!');
    }
  }

  goBack(){
    this.router.navigate(['LMS/departmentList']);
  }
}
