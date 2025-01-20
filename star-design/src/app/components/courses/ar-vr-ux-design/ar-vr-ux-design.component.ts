import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { apis } from 'src/app/shared/apiUrls';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ar-vr-ux-design',
  templateUrl: './ar-vr-ux-design.component.html',
  styleUrls: ['./ar-vr-ux-design.component.scss'],
})
export class ArVrUxDesignComponent implements OnInit {
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
      'Best AR/VR Courses and Institutes in Hyderabad | Top AR/VR Training Institute'
    );

    // Set the meta description with keywordsv
    this.metaService.updateTag({
      name: 'description',
      content:
        'Join the best AR/VR design institutes in Hyderabad. Explore top AR/VR courses to master augmented and virtual reality. Enroll in leading AR/VR design institutes for immersive learning experiences.',
    });

    // Optional: Add meta keywords
    this.metaService.updateTag({
      name: 'keywords',
      content:
        'AR/VR courses in Hyderabad, AR/VR design institutes in Hyderabad, Top AR/VR design institutes in Hyderabad, Best AR/VR design institutes in Hyderabad',
    });
  }

  async getCourseData() {
    const response: any = await this.http
      .get(apis.node_getCourseData, {
        params: { route: '/courses/ar-vr-ux-design' },
      })
      .toPromise();
    if (response?.success) {
      this.courseData = response.data;
    }
  }
}
