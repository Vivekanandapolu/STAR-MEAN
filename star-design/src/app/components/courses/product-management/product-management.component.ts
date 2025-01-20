import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { apis } from 'src/app/shared/apiUrls';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss'],
})
export class ProductManagementComponent implements OnInit {
  courseData: any;

  domain = environment.apiDomain;
  constructor(
    private metaService: Meta,
    private titleService: Title,
    private http: HttpClient
  ) {
    this.setMeta();
  }
  ngOnInit(): void {
    this.getCourseData();
  }

  setMeta() {
    // Set the meta title
    this.titleService.setTitle(
      'Master Product Management - Become a Full-Stack Product Manager'
    );

    // Set the meta description
    this.metaService.updateTag({
      name: 'description',
      content:
        'Learn product management and become a full-stack product manager. Master product strategy, development, and market analysis to drive product success. Enroll now to advance your career as a product manager.',
    });
  }

  async getCourseData() {
    const response: any = await this.http
      .get(apis.node_getCourseData, {
        params: { route: '/courses/product-management' },
      })
      .toPromise();
    if (response?.success) {
      this.courseData = response.data;
    }
  }
}
