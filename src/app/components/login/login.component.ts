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
import { UserStoreService } from 'src/app/services/user-store.service';
import { NgxUiLoaderService } from "ngx-ui-loader"; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  passFieldType: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService ,
    private userStore: UserStoreService,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit() {
    this.ngxService.start();
    this.loginForm = this.fb.group({
      loginID: ['', Validators.required],
      passWord: ['', Validators.required],
    });
    this.ngxService.stop();
  }

  goToSignUp() {
    this.router.navigateByUrl('/signup');
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText
      ? (this.passFieldType = 'text')
      : (this.passFieldType = 'password');
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.ngxService.start();
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          // this.toastr.success(res.message, 'SUCCESS',{
          //   timeOut: 3000,
          // }); 
          this.loginForm.reset();
          //console.log(res[0].accessToken);
          this.authService.storeToken(res[0].accessToken);
          this.authService.storeRefreshToken(res[0].refreshToken);
          const tokenPayLoad = this.authService.decodedToken();
          this.userStore.setFullNameForStore(tokenPayLoad.name);
          this.userStore.setRoleForStore(tokenPayLoad.role);
          this.router.navigate(['LMS']);
          this.ngxService.stop();
        },
        error: (err) => {
          //alert(err?.error.message);
          this.toastr.error(err?.error.message, 'ERROR', {
            timeOut: 3000,
          });   
          this.ngxService.stop();      
        },
      });
    } else {
      // throug error using toaster and with required fileds
      ValidateForm.validateAllFormFields(this.loginForm);
      //alert('Your form is invalid!');
    }
  }
}
