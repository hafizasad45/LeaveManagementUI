import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import ValidateForm from 'src/app/helpers/validateForm';
import { InstituteService } from 'src/app/services/institute.service';

@Component({
  selector: 'app-institute',
  templateUrl: './institute.component.html'
})
export class InstituteComponent implements OnInit {
  instituteForm!: FormGroup;

  constructor(private fb: FormBuilder, private service: InstituteService, private toastr: ToastrService, private router : Router ) {}

  
  ngOnInit(): void {
    this.instituteForm = this.fb.group({
      instituteCode: ['', Validators.required],
      instituteName: ['', Validators.required],
      description: [''],
      IsActive : [true]
    });
  }

  onSave()  {
    if (this.instituteForm.valid) {
      this.service.createInstitute(this.instituteForm.value).subscribe({
        next: (res) => {
          this.toastr.success(res[0].message, 'SUCCESS',{
            timeOut: 3000,
          });
          this.instituteForm.reset();
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
