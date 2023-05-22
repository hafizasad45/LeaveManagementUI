import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import ValidateForm from 'src/app/helpers/validateForm';
import { BranchService } from 'src/app/services/branch.service';
import { InstituteService } from 'src/app/services/institute.service';
import { ModelInstitute } from 'src/app/models/institute.model';
import { ModelBranch } from 'src/app/models/branch.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {
  branchForm!: FormGroup;
  p_BranchID: number | undefined;
  p_Operation : string = "Create";

  modelInstitute : any[] = [];

  constructor(private fb: FormBuilder, private route : ActivatedRoute, private service : BranchService, 
              private instituteService: InstituteService, private toastr: ToastrService, private router : Router,
              private ngxService: NgxUiLoaderService
             ) {}


  ngOnInit(): void {
    this.ngxService.start();
    this.resetForm();  
    this.getInstituteList();
    this.route.queryParams.subscribe((params) => {
      this.p_BranchID = params['data'];
      if (this.p_BranchID != null) {
        console.log(this.p_BranchID)
        this.getBranchByID(this.p_BranchID);
      }
    });    
    this.ngxService.stop();
  }

  getBranchByID(branchID : number) {
    this.p_Operation = "Update";
    this.service
      .getBranchByID(branchID)
      .subscribe((modelBranchGet: ModelBranch[]) => {
        this.setFormData(modelBranchGet[0]);
      });
  }

  setFormData(modelBranchSet: ModelBranch) {
    this.branchForm.controls["branchCode"].disable();
    this.branchForm.setValue({
      branchID: modelBranchSet.branchID,
      branchCode: modelBranchSet.branchCode,
      branchName: modelBranchSet.branchName,
      description: modelBranchSet.description,
      instituteID: modelBranchSet.instituteID,
      IsActive: modelBranchSet.isActive
    });
  }

  resetForm() {
    this.branchForm = this.fb.group({
      branchID : [-1],
      branchCode: ['', Validators.required],
      branchName: ['', Validators.required],
      description: [''],
      IsActive : [true],
      instituteID : ['', Validators.required],
    });
  }

  getInstituteList() {
    this.instituteService.getInstituteList().subscribe((data : ModelInstitute[]) => {
      this.modelInstitute = data;
    });
  }

  onSave()  {
    this.ngxService.start();
    if (this.branchForm.value.branchID == -1) {
      this.addBranch();
    } else {
      this.updateBranch();
    }
    this.ngxService.stop();
  }

  addBranch() {
    if (this.branchForm.valid) {
      this.service.createBranch(this.branchForm.value).subscribe({
        next: (res) => {
          this.toastr.success(res[0].message, 'SUCCESS',{
            timeOut: 3000,
          });
          this.branchForm.reset();
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
      ValidateForm.validateAllFormFields(this.branchForm);
      //alert('Your form is invalid!');
    }
  }
  
  updateBranch() {
    if (this.branchForm.valid) {
      this.branchForm.controls["branchCode"].enable();
      this.service.updateBranch(this.branchForm.value).subscribe({
        next: (res) => {
          this.toastr.success(res[0].message, 'SUCCESS',{
            timeOut: 3000,
          });          
          this.branchForm.controls["branchCode"].disable();
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
      ValidateForm.validateAllFormFields(this.branchForm);
      //alert('Your form is invalid!');
    }
  }

  goBack(){
    this.router.navigate(['LMS/branchList']);
  }

}
