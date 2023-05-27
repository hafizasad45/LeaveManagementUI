import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import ValidateForm from 'src/app/helpers/validateForm';
import { ModelGrade } from 'src/app/models/grade.model';
import { GradeService } from 'src/app/services/grade.service';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.scss']
})
export class GradeComponent implements OnInit {
  gradeForm!: FormGroup;
  p_gradeID: number | undefined;
  p_Operation : string = "Create";

  constructor(private fb: FormBuilder, private route : ActivatedRoute, private service : GradeService,  
              private toastr: ToastrService, private router : Router, private ngxService: NgxUiLoaderService
             ) {}


  ngOnInit(): void {
    this.ngxService.start();
    this.resetForm();  
    this.route.queryParams.subscribe((params) => {
      this.p_gradeID = params['data'];
      if (this.p_gradeID != null) {
        this.getgradeByID(this.p_gradeID);
      }
    });   
    this.ngxService.stop(); 
  }

  getgradeByID(gradeID : number) {
    this.p_Operation = "Update";
    this.service
      .getGradeByID(gradeID)
      .subscribe((modelgradeGet: ModelGrade[]) => {
        this.setFormData(modelgradeGet[0]);
      });
  }

  setFormData(modelgradeSet: ModelGrade) {
    this.gradeForm.controls["gradeCode"].disable();
    this.gradeForm.setValue({
      gradeID: modelgradeSet.gradeID,
      gradeCode: modelgradeSet.gradeCode,
      gradeName: modelgradeSet.gradeName,
      description: modelgradeSet.description,
      IsActive: modelgradeSet.isActive
    });
  }

  resetForm() {
    this.gradeForm = this.fb.group({
      gradeID : [-1],
      gradeCode: ['', Validators.required],
      gradeName: ['', Validators.required],
      description: [''],
      IsActive : [true]
    });
  }

  onSave()  {
    this.ngxService.start();
    if (this.gradeForm.value.gradeID == -1) {
      this.addgrade();
    } else {
      this.updategrade();
    }
    this.ngxService.stop();
  }

  addgrade() {
    if (this.gradeForm.valid) {
      this.service.createGrade(this.gradeForm.value).subscribe({
        next: (res) => {
          this.toastr.success(res[0].message, 'SUCCESS',{
            timeOut: 3000,
          });
          this.gradeForm.reset();
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
      ValidateForm.validateAllFormFields(this.gradeForm);
      //alert('Your form is invalid!');
    }
  }
  
  updategrade() {
    if (this.gradeForm.valid) {
      this.gradeForm.controls["gradeCode"].enable();
      this.service.updateGrade(this.gradeForm.value).subscribe({
        next: (res) => {
          this.toastr.success(res[0].message, 'SUCCESS',{
            timeOut: 3000,
          });          
          this.gradeForm.controls["gradeCode"].disable();
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
      ValidateForm.validateAllFormFields(this.gradeForm);
      //alert('Your form is invalid!');
    }
  }

  goBack(){
    this.router.navigate(['LMS/gradeList']);
  }
}
