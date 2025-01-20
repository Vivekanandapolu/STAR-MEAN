import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { apis } from 'src/app/shared/apiUrls';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photography',
  templateUrl: './photography.component.html',
  styleUrls: ['./photography.component.scss'],
})
export class PhotographyComponent {
  windowWidth: boolean = false;
  courseData: any;
  domain = environment.apiDomain;
  constructor(private metaService: Meta, private http: HttpClient) {
    this.setMeta();
  }
  ngOnInit(): void {
    this.windowWidth = window.innerWidth <= 1024;
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth <= 1024;
    });
    this.setMeta();
  }

  setMeta() {
    this.metaService.updateTag({
      name: 'description',
      content:
        'Discover the Bachelor of Design (B.Des) in UX and Digital Product Design. Learn user experience (UX) principles, digital product design, and user-centered design methodologies. Develop the skills to create innovative digital products that meet user needs and expectations. Start your journey towards a career in UX and digital product design today.',
    });
  }

  // async getCourseData() {
  //   const response: any = await this.http
  //     .get(apis.node_getCourseData, {
  //       params: { route: '/courses/photography&digital-imaging' },
  //     })
  //     .toPromise();
  //   if (response?.success) {
  //     this.courseData = response.data;
  //   }
  // }
}
