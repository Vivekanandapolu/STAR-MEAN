import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CheckboxControlValueAccessor, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { apis } from 'src/app/shared/apiUrls';
import UserDetails, { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  passwordType: boolean = false;
  isSignUpPage: boolean = false;

  formData: any = {};

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private userService: UserService
  ) {
    userService.loadUserDetails();
  }
  ngOnInit(): void {
    this.userService.userDetails.subscribe((res) => {
      if (res) {
        this.router.navigate(['/']);
      }
    });
  }

  login(form: NgForm) {
    if (form.invalid) {
      form.form.markAllAsTouched();
      return;
    }
    this.http.post(apis.node_login, form.value).subscribe((res: any) => {
      if (res.success) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('userDetails', JSON.stringify(res.userDetails));
        this.router.navigate(['/']).then(() => {
          this.toastr.success(res.message);
          window.location.reload();
        });
      }
    });
  }

  signUp(form: NgForm) {
    if (form.invalid) {
      form.form.markAllAsTouched();
      return;
    }
    console.log(form.value);
    this.http.post(apis.node_signup, form.value).subscribe((res: any) => {
      if (res.success) {
        // localStorage.setItem('token', res.token);
        // localStorage.setItem('userDetails', JSON.stringify(res.userDetails));
        // this.router.navigate(['/login']).then(() => {
        this.isSignUpPage = false;
        this.toastr.success(res.message);
        // });
      }
    });
  }
}
