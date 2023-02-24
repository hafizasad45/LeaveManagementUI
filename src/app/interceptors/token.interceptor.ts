import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastrService  } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TokenApiModel } from '../models/token-api.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const myToken = this.authService.getToken();

    if (myToken) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${myToken}` },
      });
    }

    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            // this.toast.warning({
            //   detail: 'Warning',
            //   summary: 'Token is expired, Please Login again',
            // });
            // this.router.navigate(['login']);
            return this.handleUnAuthorizedError(request, next);
          }
        }
        return throwError(() => new Error('Some other error occured'));
      })
    );
  }

  handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler) {
    let tokenApiModel = new TokenApiModel();
    tokenApiModel.accessToken = this.authService.getToken()!;
    tokenApiModel.refreshToken = this.authService.getRefreshToken()!;
    return this.authService.reNewToken(tokenApiModel).pipe(
      switchMap((data) => {
        this.authService.storeRefreshToken(data[0].refreshToken);
        this.authService.storeToken(data[0].accessToken);
        req = req.clone({
          setHeaders: { Authorization: `Bearer ${data[0].accessToken}` },
        });
        return next.handle(req);
      }),
      catchError((err) => {
        return throwError(() => {
          this.toastr.warning('Token is expired, Please Login again', 'Warning',{
            timeOut: 3000,
          });
          
          this.router.navigate(['login']);
        });
      })
    );
  }
}
