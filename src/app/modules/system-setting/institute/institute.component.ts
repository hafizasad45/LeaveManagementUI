import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import ValidateForm from 'src/app/helpers/validateForm';
import { ModelInstitute } from 'src/app/models/institute.model';
import { InstituteService } from 'src/app/services/institute.service';

@Component({
  selector: 'app-institute',
  templateUrl: './institute.component.html'
})

export class InstituteComponent implements OnInit {
  instituteForm!: FormGroup;
  p_InstituteID: number | undefined;
  p_Operation : string = "Create";

  constructor(private fb: FormBuilder, private service: InstituteService, private toastr: ToastrService, 
              private router : Router, private route : ActivatedRoute, private ngxService: NgxUiLoaderService
             ) {}

  
  ngOnInit(): void {
    this.ngxService.start();
    this.resetForm();
    this.route.queryParams.subscribe((params) => {
      this.p_InstituteID = params['data'];
      if (this.p_InstituteID != null) {
        this.getInstituteByID(this.p_InstituteID);
      }
    });
    this.ngxService.stop();
  }
  getInstituteByID(instituteID : number) {
    this.p_Operation = "Update";
    this.service
      .getInstituteByID(instituteID)
      .subscribe((modelInstituteGet: ModelInstitute[]) => {
        this.setFormData(modelInstituteGet[0]);
      });
  }

  setFormData(modelInstituteSet: ModelInstitute) {
    this.instituteForm.controls["instituteCode"].disable();
    this.instituteForm.setValue({
      instituteID: modelInstituteSet.instituteID,
      instituteCode: modelInstituteSet.instituteCode,
      instituteName: modelInstituteSet.instituteName,
      description: modelInstituteSet.description,
      IsActive: modelInstituteSet.isActive
    });
  }

  resetForm() {
    this.instituteForm = this.fb.group({
      instituteID : [-1],
      instituteCode: ['', Validators.required],
      instituteName: ['', Validators.required],
      description: [''],
      IsActive : [true]
    });
  }

  onSave()  {    
    this.ngxService.start();
    if (this.instituteForm.value.instituteID == -1) {
      this.addInstitute();
    } else {
      this.updateInstitute();
    }
    this.ngxService.stop();
  }

  addInstitute() {
    if (this.instituteForm.valid) {
      this.service.createInstitute(this.instituteForm.value).subscribe({
        next: (res) => {
          this.toastr.success(res[0].message, 'SUCCESS',{
            timeOut: 3000,
          });
          this.instituteForm.reset();
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
      ValidateForm.validateAllFormFields(this.instituteForm);
      //alert('Your form is invalid!');
    }
  }

  updateInstitute() {
    if (this.instituteForm.valid) {
      this.instituteForm.controls["instituteCode"].enable();
      this.service.updateInstitute(this.instituteForm.value).subscribe({
        next: (res) => {
          this.toastr.success(res[0].message, 'SUCCESS',{
            timeOut: 3000,
          });
         // this.instituteForm.reset();
         // this.resetForm();
         this.instituteForm.controls["instituteCode"].disable();
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
      ValidateForm.validateAllFormFields(this.instituteForm);
      //alert('Your form is invalid!');
    }
  }

  goBack(){
    this.router.navigate(['LMS/instituteList']);
  }

}
