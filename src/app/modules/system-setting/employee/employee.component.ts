import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import ValidateForm from 'src/app/helpers/validateForm';
import { ModelEmployee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  p_EmployeeID: number | undefined;
  p_Operation : string = "Create";

  modelInstitute : any[] = [];

  constructor(private fb: FormBuilder, private route : ActivatedRoute, private service : EmployeeService,  private toastr: ToastrService, private router : Router ) {}


  ngOnInit(): void {
    this.resetForm();  
    this.route.queryParams.subscribe((params) => {
      this.p_EmployeeID = params['data'];
      if (this.p_EmployeeID != null) {
        console.log(this.p_EmployeeID)
        this.getEmployeeByID(this.p_EmployeeID);
      }
    });    
  }

  getEmployeeByID(employeeID : number) {
    this.p_Operation = "Update";
    this.service
      .getEmployeeByID(employeeID)
      .subscribe((modelEmployeeGet: ModelEmployee[]) => {
        this.setFormData(modelEmployeeGet[0]);
      });
  }

  setFormData(modelEmployeeSet: ModelEmployee) {
    this.employeeForm.controls["employeeCode"].disable();
    this.employeeForm.setValue({
      employeeID: modelEmployeeSet.employeeID,
      employeeCode: modelEmployeeSet.employeeCode,
      employeeName: modelEmployeeSet.employeeName,
      instituteID: modelEmployeeSet.instituteID,
      branchID: modelEmployeeSet.branchID,
      departmrntID: modelEmployeeSet.departmrntID,
      designationID: modelEmployeeSet.designationID,
      gradeID: modelEmployeeSet.gradeID,
      employeeTypeID: modelEmployeeSet.employeeTypeID,
      email: modelEmployeeSet.email,
      address: modelEmployeeSet.address,
      mobile: modelEmployeeSet.mobile,
      supervisorID: modelEmployeeSet.supervisorID,
      leaveApprovalAuthority: modelEmployeeSet.leaveApprovalAuthority,
    });
  }

  resetForm() {
    this.employeeForm = this.fb.group({
      employeeID : [-1],
      employeeCode: ['', Validators.required],
      employeeName: ['', Validators.required],
      instituteID: ['', Validators.required],
      branchID: ['', Validators.required],
      departmrntID: ['', Validators.required],
      designationID: ['', Validators.required],
      gradeID: ['', Validators.required],
      employeeTypeID: ['', Validators.required],
      email: ['', Validators.required],
      address: [''],
      mobile: [''],
      supervisorID: [null],
      leaveApprovalAuthority: ['', Validators.required],
    });
  }

  onSave()  {
    if (this.employeeForm.value.employeeID == -1) {
      this.addEmployee();
    } else {
      this.updateEmployee();
    }
  }

  addEmployee() {
    if (this.employeeForm.valid) {
      this.service.createEmployee(this.employeeForm.value).subscribe({
        next: (res) => {
          this.toastr.success(res[0].message, 'SUCCESS',{
            timeOut: 3000,
          });
          this.employeeForm.reset();
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
      ValidateForm.validateAllFormFields(this.employeeForm);
      //alert('Your form is invalid!');
    }
  }
  
  updateEmployee() {
    if (this.employeeForm.valid) {
      this.employeeForm.controls["EmployeeCode"].enable();
      this.service.updateEmployee(this.employeeForm.value).subscribe({
        next: (res) => {
          this.toastr.success(res[0].message, 'SUCCESS',{
            timeOut: 3000,
          });          
          this.employeeForm.controls["EmployeeCode"].disable();
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
      ValidateForm.validateAllFormFields(this.employeeForm);
      //alert('Your form is invalid!');
    }
  }

  goBack(){
    this.router.navigate(['LMS/employeeList']);
  } 
}
