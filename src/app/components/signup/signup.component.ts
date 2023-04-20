import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService  } from 'ngx-toastr';
import ValidateForm from 'src/app/helpers/validateForm';
import { AuthService } from 'src/app/services/auth.service';
import { faUser, faMessage, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  passFieldType: string = 'password';
  isText: boolean = false;
  faEye = faEyeSlash;
  //faEyeSlash = faEyeSlash;
  signUpForm!: FormGroup;

  faUser = faUser;
  faMessage = faMessage;
  faLock = faLock;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      loginID: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  goToSignUp() {
    this.router.navigateByUrl('/signup');
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.faEye = faEye : this.faEye = faEyeSlash;
    this.isText
      ? (this.passFieldType = 'text')
      : (this.passFieldType = 'password');
  }

  onSignUp() {
    if (this.signUpForm.valid) {
      this.authService.signUp(this.signUpForm.value).subscribe({
        next: (res) => {
          // alert(res.message);
          this.toastr.success(res.message, 'SUCCESS',{
            timeOut: 3000,
          });
          this.signUpForm.reset();
          this.router.navigateByUrl('/login');
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
      ValidateForm.validateAllFormFields(this.signUpForm);
      //alert('Your form is invalid!');
    }
  }
}
