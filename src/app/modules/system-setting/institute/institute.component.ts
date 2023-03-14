import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import ValidateForm from 'src/app/helpers/validateForm';
import { InstituteService } from 'src/app/services/institute.service';

@Component({
  selector: 'app-institute',
  templateUrl: './institute.component.html',
  styleUrls: ['./institute.component.scss']
})
export class InstituteComponent implements OnInit {
  instituteForm!: FormGroup;

  constructor(private fb: FormBuilder, private service: InstituteService, private toastr: ToastrService ) {}

  
  ngOnInit(): void {
    this.instituteForm = this.fb.group({
      instituteCode: ['', Validators.required],
      instituteName: ['', Validators.required],
      description: [''],
      active : [true]
    });
  }

  onSave()  {
    if (this.instituteForm.valid) {
      this.service.createInstitute(this.instituteForm.value).subscribe({
        next: (res) => {
          // alert(res.message);
          this.toastr.success(res.message, 'SUCCESS',{
            timeOut: 3000,
          });
          this.instituteForm.reset();
        },
        error: (err) => {
          //alert(err?.error.message);
          this.toastr.error(err?.error.message, 'ERROR', {
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

}
