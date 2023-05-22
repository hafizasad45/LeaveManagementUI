import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import ValidateForm from 'src/app/helpers/validateForm';
import { ModelDesignation } from 'src/app/models/designation.model';
import { DesignationService } from 'src/app/services/designation.service';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.scss']
})
export class DesignationComponent implements OnInit {
  designationForm!: FormGroup;
  p_DesignationID: number | undefined;
  p_Operation : string = "Create";

  modelInstitute : any[] = [];

  constructor(private fb: FormBuilder, private route : ActivatedRoute, private service : DesignationService,  
              private toastr: ToastrService, private router : Router, private ngxService: NgxUiLoaderService
             ) {}


  ngOnInit(): void {
    this.ngxService.start();
    this.resetForm();  
    this.route.queryParams.subscribe((params) => {
      this.p_DesignationID = params['data'];
      if (this.p_DesignationID != null) {
        console.log(this.p_DesignationID)
        this.getDesignationByID(this.p_DesignationID);
      }
    }); 
    this.ngxService.stop();   
  }

  getDesignationByID(designationID : number) {
    this.p_Operation = "Update";
    this.service
      .getDesignationByID(designationID)
      .subscribe((modelDesignationGet: ModelDesignation[]) => {
        this.setFormData(modelDesignationGet[0]);
      });
  }

  setFormData(modelDesignationSet: ModelDesignation) {
    this.designationForm.controls["designationCode"].disable();
    this.designationForm.setValue({
      designationID: modelDesignationSet.designationID,
      designationCode: modelDesignationSet.designationCode,
      designationName: modelDesignationSet.designationName,
      description: modelDesignationSet.description,
      IsActive: modelDesignationSet.isActive
    });
  }

  resetForm() {
    this.designationForm = this.fb.group({
      designationID : [-1],
      designationCode: ['', Validators.required],
      designationName: ['', Validators.required],
      description: [''],
      IsActive : [true]
    });
  }

  onSave()  {
    this.ngxService.start();
    if (this.designationForm.value.designationID == -1) {
      this.addDesignation();
    } else {
      this.updateDesignation();
    }
    this.ngxService.stop();
  }

  addDesignation() {
    if (this.designationForm.valid) {
      this.service.createDesignation(this.designationForm.value).subscribe({
        next: (res) => {
          this.toastr.success(res[0].message, 'SUCCESS',{
            timeOut: 3000,
          });
          this.designationForm.reset();
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
      ValidateForm.validateAllFormFields(this.designationForm);
      //alert('Your form is invalid!');
    }
  }
  
  updateDesignation() {
    if (this.designationForm.valid) {
      this.designationForm.controls["designationCode"].enable();
      this.service.updateDesignation(this.designationForm.value).subscribe({
        next: (res) => {
          this.toastr.success(res[0].message, 'SUCCESS',{
            timeOut: 3000,
          });          
          this.designationForm.controls["designationCode"].disable();
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
      ValidateForm.validateAllFormFields(this.designationForm);
      //alert('Your form is invalid!');
    }
  }

  goBack(){
    this.router.navigate(['LMS/designationList']);
  }  
}
