import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoaderService } from './loader/loader.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { AuthTokenService } from './services/auth-token.service';
// import { LoaderService } from './services/loader.service'; // Adjust path as needed

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private loaderService: LoaderService,
    private toastr: ToastrService,
    private router: Router,
    private tokenService: AuthTokenService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderService.show();

    const token: string = localStorage.getItem('token') || '';
    let clonedRequest = req;
    if (token) {
      const isTokenExpired: boolean = this.tokenService.isTokenExprired(token);
      if (isTokenExpired) {
        localStorage.clear();
        this.router.navigate(['/login']).then(() => {
          this.toastr.warning('Token Exprired. Login Again');
        });
      }
    }
    if (token) {
      clonedRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
    }
    return next.handle(clonedRequest).pipe(
      finalize(() => {
        this.loaderService.hide(); // Hide loader when request completes
      }),
      catchError((err: any) => {
        if (err.status === 401 || err.error.exc_type == 'CSRFTokenError') {
          this.toastr.error(
            err?.error?.message?.split(':')[
              err?.error?.message?.split(':')?.length - 1
            ]
          );
          localStorage.clear();
          this.router.navigate(['/login']);
        }
        if (err.status === 500) {
          if (err?.error?.message?.includes('email_1 dup key')) {
            this.toastr.error('Email is already exists');
          } else if (err?.error?.message?.includes('mobile_number_1')) {
            this.toastr.error('Mobile number is already exists');
          } else {
            this.toastr.error(
              err?.error?.message?.split(':')[
                err?.error?.message?.split(':')?.length - 1
              ] || 'Internal Error 500'
            );
          }
        }
        if (err.status === 403) {
          this.toastr.error(
            err?.error?.message?.split(':')[
              err?.error?.message?.split(':')?.length - 1
            ] || 'Forbidden Error 403'
          );
          this.router.navigate(['/login']);
        }
        if (err.status === 409) {
          this.toastr.error(
            err?.error?.message?.split(':')[
              err?.error?.message?.split(':')?.length - 1
            ] || 'Already Exists'
          );
        }
        if (err.status === 400) {
          this.toastr.error(
            err?.error?.message?.split(':')[
              err?.error?.message?.split(':')?.length - 1
            ] || 'Bad Request'
          );
        }
        if (err.status === 404) {
          this.toastr.error(
            err?.error?.message?.split(':')[
              err?.error?.message?.split(':')?.length - 1
            ] || 'Not Found'
          );
        }
        if (err.status === 504) {
          this.toastr.error(
            err?.error?.message?.split(':')[
              err?.error?.message?.split(':')?.length - 1
            ] || 'Bad Gateway'
          );
        }
        return throwError(err);
      })
    );
  }
}
