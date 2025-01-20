import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { apis } from 'src/app/shared/apiUrls';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ui-vi-design',
  templateUrl: './ui-vi-design.component.html',
  styleUrls: ['./ui-vi-design.component.scss'],
})
export class UiViDesignComponent implements OnInit {
  courseData: any;

  domain = environment.apiDomain;

  constructor(
    private metaService: Meta,
    private titleService: Title,
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    this.setMeta();
  }

  ngOnInit(): void {
    this.getCourseData();
  }

  setMeta() {
    // Set the meta title with keywords
    this.titleService.setTitle(
      'Best UX/VI Design Course and Training Institute in Hyderabad | Fees & Details'
    );

    // Set the meta description with keywords
    this.metaService.updateTag({
      name: 'description',
      content:
        'Explore the best UX/VI design course in Hyderabad with affordable fees. Join the top UX/VI design training institute and advance your career with expert guidance and hands-on training.',
    });

    // Optional: Add meta keywords
    this.metaService.updateTag({
      name: 'keywords',
      content:
        'UX/VI design course fees in Hyderabad, Best UX/VI design training institute in Hyderabad fees, UX/VI design course Hyderabad, Best UX/VI design course in Hyderabad',
    });
  }

  async getCourseData() {
    const response: any = await this.http
      .get(apis.node_getCourseData, {
        params: { route: '/courses/ui-vi-design' },
      })
      .toPromise();
    if (response?.success) {
      this.courseData = response.data;
    } else {
      this.toastr.error(response.message, '');
    }
  }
}
