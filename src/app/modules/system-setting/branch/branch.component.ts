import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import ValidateForm from 'src/app/helpers/validateForm';
import { BranchService } from 'src/app/services/branch.service';
import { InstituteService } from 'src/app/services/institute.service';
import { ModelInstitute } from 'src/app/models/institute.model';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {
  branchForm!: FormGroup;

  modelInstitute : any[] = [];

  constructor(private fb: FormBuilder, private service : BranchService, private instituteService: InstituteService, private toastr: ToastrService, private router : Router ) {}


  ngOnInit(): void {
    this.branchForm = this.fb.group({
      branchCode: ['', Validators.required],
      branchName: ['', Validators.required],
      description: [''],
      IsActive : [true],
      instituteID : ['', Validators.required],
    });

    this.getInstituteList();
    
  }

  getInstituteList() {
    this.instituteService.getInstituteList().subscribe((data : ModelInstitute[]) => {
      this.modelInstitute = data;
    });
  }

  onSave()  {
    if (this.branchForm.valid) {
      this.service.createBranch(this.branchForm.value).subscribe({
        next: (res) => {
          this.toastr.success(res[0].message, 'SUCCESS',{
            timeOut: 3000,
          });
          this.branchForm.reset();
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
    this.router.navigate(['LMS/instituteList']);
  }

}
