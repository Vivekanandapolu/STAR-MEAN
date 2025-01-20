import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { apis } from 'src/app/shared/apiUrls';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-graphic-design',
  templateUrl: './graphic-design.component.html',
  styleUrls: ['./graphic-design.component.scss'],
})
export class GraphicDesignComponent implements OnInit {
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
    // Set the meta title with keywords
    this.titleService.setTitle(
      'Best Graphic Design Institute in Hyderabad | Courses with Placement'
    );

    // Set the meta description with keywords
    this.metaService.updateTag({
      name: 'description',
      content:
        'Explore the best graphic design courses in Hyderabad, including Ameerpet. Join the top design institute with affordable fees and placement opportunities. Enroll today and kickstart your creative career.',
    });

    // Optional: Add meta keywords
    this.metaService.updateTag({
      name: 'keywords',
      content:
        'Best graphic design institute in Hyderabad, Graphic design courses in Hyderabad Ameerpet, Graphic design course with placement in Hyderabad, Best graphic design courses in Hyderabad fees structure',
    });
  }

  async getCourseData() {
    const response: any = await this.http
      .get(apis.node_getCourseData, {
        params: { route: '/courses/graphic-design' },
      })
      .toPromise();
    if (response?.success) {
      this.courseData = response.data;
    }
  }
}
