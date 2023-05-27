import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import ValidateForm from 'src/app/helpers/validateForm';
import { ModelLmsActivity } from 'src/app/models/lms_Activities.mode';
import { LMSActivitiesService } from 'src/app/services/lms-activities.service';

@Component({
  selector: 'app-lms-activity',
  templateUrl: './lms-activity.component.html',
  styleUrls: ['./lms-activity.component.scss']
})
export class LmsActivityComponent implements OnInit {

  LmsActivityForm!: FormGroup;
  p_LmsActivityID: number | undefined;
  p_Operation : string = "Create";

  modelInstitute : any[] = [];

  constructor(private fb: FormBuilder, private route : ActivatedRoute, private service : LMSActivitiesService,  
              private toastr: ToastrService, private router : Router, private ngxService: NgxUiLoaderService 
            ) {}

  ngOnInit(): void {
    this.ngxService.start();
    this.resetForm();  
    this.route.queryParams.subscribe((params) => {
      this.p_LmsActivityID = params['data'];
      if (this.p_LmsActivityID != null) {
        this.getLmsActivityByID(this.p_LmsActivityID);
      }
    }); 
    this.ngxService.stop();   
  }

  getLmsActivityByID(LmsActivityID : number) {
    this.p_Operation = "Update";
    
    this.service
      .getLMS_ActivityByID(LmsActivityID)
      .subscribe((modelLmsActivityGet: ModelLmsActivity[]) => {
        this.setFormData(modelLmsActivityGet[0]);
      });
  }

  setFormData(modelLmsActivitySet: ModelLmsActivity) {
   // this.LmsActivityForm.controls["LmsActivityCode"].disable();
    this.LmsActivityForm.setValue({
      lms_ActivityID: modelLmsActivitySet.lmS_ActivityID,
      lms_ActivityName: modelLmsActivitySet.lmS_ActivityName,
      lms_ActivityFriendlyName: modelLmsActivitySet.lmS_ActivityFriendlyName,
      subjectForEmail: modelLmsActivitySet.subjectForEmail,
      IsActive: modelLmsActivitySet.isActive
    });
  }

  resetForm() {
    this.LmsActivityForm = this.fb.group({
      lms_ActivityID : [-1],
      lms_ActivityName: ['', Validators.required],
      lms_ActivityFriendlyName: ['', Validators.required],
      subjectForEmail: ['', Validators.required],
      IsActive : [true]
    });
  }

  onSave()  {
    this.ngxService.start();
    if (this.LmsActivityForm.value.lms_ActivityID == -1) {
      this.addLmsActivity();
    } else {
      this.updateLmsActivity();
    }
    this.ngxService.stop();
  }

  addLmsActivity() {
    try {
      if (this.LmsActivityForm.valid) {
        this.service.createLMS_Activity(this.LmsActivityForm.value).subscribe({
          next: (res) => {
            this.toastr.success(res[0].message, 'SUCCESS',{
              timeOut: 3000,
            });
            this.LmsActivityForm.reset();
            this.resetForm();
            this.ngxService.stop();
          },
          error: (err) => {
            //alert(err?.error.message);
            this.toastr.error(err?.error[0].message, 'ERROR', {
              timeOut: 3000,
            }); 
            this.ngxService.stop();
          },
        });
      } else {
        // throug error using toaster and with required fileds
        ValidateForm.validateAllFormFields(this.LmsActivityForm);
        //alert('Your form is invalid!');
      }
      
    } catch (error) {
      this.ngxService.stop();
    }
    
  }
  
  updateLmsActivity() {
    if (this.LmsActivityForm.valid) {
      this.service.updateLMS_Activity(this.LmsActivityForm.value).subscribe({
        next: (res) => {
          this.toastr.success(res[0].message, 'SUCCESS',{
            timeOut: 3000,
          });          
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
      ValidateForm.validateAllFormFields(this.LmsActivityForm);
      //alert('Your form is invalid!');
    }
  }

  goBack(){
    this.router.navigate(['LMS/lms_ActivityList']);
  }

}
