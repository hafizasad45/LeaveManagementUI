import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService  } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  canActivate() {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.toastr.error('Please Login First!', 'ERROR', {
        timeOut: 3000,
      });
      this.router.navigate(['login']);
      return false;
    }
  }
}
