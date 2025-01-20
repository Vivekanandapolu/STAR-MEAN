import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { apis } from 'src/app/shared/apiUrls';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  @Input() pageRoute: any;

  contactFormData: any = {
    gender: null,
    qualification: null,
  };

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  ngOnInit(): void {}

  async addContact(form: NgForm) {
    if (form.invalid) {
      form.form.markAllAsTouched();
      return;
    }

    // form.value.course_type = this.pageRoute
    form.value.route = this.pageRoute;

    const res: any = await this.http
      .post(apis.node_addCourseAdvisor, form.value)
      .toPromise();
    if (res.success) {
      await this.toastr.success(res.message);
      this.contactFormData = {
        gender: null,
        qualification: null,
      };
      form.form.markAsUntouched();
    } else {
      this.toastr.error(res.message);
    }
  }
}
