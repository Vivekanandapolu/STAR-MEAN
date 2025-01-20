import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { apis } from 'src/app/shared/apiUrls';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ui-ux-design',
  templateUrl: './ui-ux-design.component.html',
  styleUrls: ['./ui-ux-design.component.scss'],
})
export class UIUXDesignComponent implements OnInit {
  @ViewChild('cards') cardsContainers: ElementRef | undefined;

  batchDetails: any = {
    from_day: null,
    to_day: null,
    training_type: null,
    location: null,
  };

  domain = environment.apiDomain;

  days: any[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  batches: any[] = [];

  type: any;

  courseData: any;

  // default_img: string = encodeURI(
  //   'assets/Hero images/ui ux star design institute.png'
  // );

  constructor(
    private metaService: Meta,
    private titleService: Title,
    private http: HttpClient,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {
    this.setMeta();
  }

  ngOnInit(): void {
    this.getCourseData();
  }

  setMeta() {
    // Set the meta title with keywords
    this.titleService.setTitle(
      'Best UI/UX Design Training Institute in Hyderabad | Courses with Placement'
    );

    // Set the meta description with keywords
    this.metaService.updateTag({
      name: 'description',
      content:
        'Join the best UI/UX design training institute in Hyderabad. Learn UI/UX design courses in Ameerpet with placement. Enroll in offline UI/UX training to advance your career at the top design centers near you.',
    });

    // Set additional meta keywords for SEO (optional)
    this.metaService.updateTag({
      name: 'keywords',
      content:
        'Best UI/UX design training institute in Hyderabad, UI/UX design course in Ameerpet, UI/UX design course with placement in Hyderabad, Offline UI/UX design course in Hyderabad, Top UI/UX design centers in Hyderabad, UI/UX institute near me, Best UI/UX institute near me',
    });
  }

  slide(direction: string) {
    if (this.cardsContainers)
      if (direction === 'left') {
        this.cardsContainers.nativeElement.scrollLeft -= 350;
      } else if (direction === 'right') {
        this.cardsContainers.nativeElement.scrollLeft += 350;
      }
  }

  async getCourseData() {
    const response: any = await this.http
      .get(apis.node_getCourseData, {
        params: { route: '/courses/ui-ux-design' },
      })
      .toPromise();
    if (response?.success) {
      this.courseData = response.data;
    }
  }
}
