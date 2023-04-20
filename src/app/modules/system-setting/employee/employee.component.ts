import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import ValidateForm from 'src/app/helpers/validateForm';
import { ModelBranch } from 'src/app/models/branch.model';
import { ModelDepartment } from 'src/app/models/department.model';
import { ModelDesignation } from 'src/app/models/designation.model';
import { ModelEmployee } from 'src/app/models/employee.model';
import { modelEmployeeType } from 'src/app/models/employeeType.model';
import { ModelGrade } from 'src/app/models/grade.model';
import { ModelInstitute } from 'src/app/models/institute.model';
import { BranchService } from 'src/app/services/branch.service';
import { DepartmentService } from 'src/app/services/department.service';
import { DesignationService } from 'src/app/services/designation.service';
import { EmployeeTypeService } from 'src/app/services/employee-type.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { GradeService } from 'src/app/services/grade.service';
import { InstituteService } from 'src/app/services/institute.service';

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
  modelBranch : any[] = [];
  modelDepartment : any[] = [];
  modelDesignation : any[] = [];
  modelGrade : any[] = [];
  modelEmployeeType : any[] = [];

  constructor(  private fb: FormBuilder, private route : ActivatedRoute, private service : EmployeeService,  
                private toastr: ToastrService, private router : Router, private insService : InstituteService,
                private brService : BranchService, private depService : DepartmentService,
                private desService : DesignationService, private grdService : GradeService,
                private empTypeService : EmployeeTypeService
             ) {}


  ngOnInit(): void {
    this.resetForm();  
    this.loadDropDown();
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
      departmentID: ['', Validators.required],
      designationID: ['', Validators.required],
      gradeID: ['', Validators.required],
      employeeTypeID: ['', Validators.required],
      email: [null],
      address: [null],
      mobile: [null],
      supervisorID: [null],
      leaveApprovalAuthority: [false],
    });
  }

  loadDropDown() {
    this.insService.getInstituteList().subscribe((data : ModelInstitute[]) => {
      this.modelInstitute = data;
    });

    this.brService.getBranchList().subscribe((data : ModelBranch[]) => {
      this.modelBranch = data;
    });

    this.depService.getDepartmentList().subscribe((data : ModelDepartment[]) => {
      this.modelDepartment = data;
    });

    this.desService.getDesignationList().subscribe((data : ModelDesignation[]) => {
      this.modelDesignation = data;
    });

    this.grdService.getGradeList().subscribe((data : ModelGrade[]) => {
      this.modelGrade = data;
      console.log(data)
    });

    this.empTypeService.getEmployeeTypeList().subscribe((data : modelEmployeeType[]) => {
      this.modelEmployeeType = data;
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
