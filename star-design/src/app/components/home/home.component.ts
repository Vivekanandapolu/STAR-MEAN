import {
  Component,
  ViewChild,
  ElementRef,
  HostListener,
  OnInit,
  OnDestroy,
  TemplateRef,
} from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Meta, Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { apis } from 'src/app/shared/apiUrls';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('dropAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate(
          '1000ms ease-out',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
    ]),
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  windowWidth: number = window.innerWidth;
  isLeftScrollable: boolean = false;
  isRightScrollable: boolean = false;
  @ViewChild('cards') cardsContainers: ElementRef | undefined;
  scrollIntervalId: any;
  scrollDirection: string = 'right';
  windowWidth786: boolean = false;
  image: any;
  domain = environment.apiDomain;

  courseFiles: any = {
    bg_img: '',
    course_img: '',
  };

  type: any;

  addCourseForm: any = {
    route: null,
    title: null,
  };

  selectedRoute: string | null = null;

  coursesData: any[] = [];

  courseRouteMap: { [key: string]: string } = {
    'UI/UX Design': '/courses/ui-ux-design',
    'AR-VR/UX Design': '/courses/ar-vr-ux-design',
    'UX/VI Design': '/courses/ui-vi-design',
    'Bachelor of Design': '/courses/bachelor-of-design',
    'Product Management': '/courses/product-management',
    'Graphic Design': '/courses/graphic-design',
  };
  userDetails: any | null;

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private http: HttpClient,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private userService: UserService
  ) {
    userService.loadUserDetails();
  }

  ngOnInit(): void {
    this.updateScrollState();
    this.startAutoScroll();
    this.windowWidth786 = window.innerWidth <= 786;
    window.addEventListener('resize', () => {
      this.windowWidth786 = window.innerWidth <= 786;
      this.updateScrollState();
    });
    this.userService.userDetails.subscribe((res) => {
      if (res) {
        this.userDetails = res;
      }
    });

    this.setMeta();
    this.getAllCourses();
  }

  onCourseChange(selectedCourse: string): void {
    // Update the selectedRoute based on the course
    this.selectedRoute = this.courseRouteMap[selectedCourse] || null;
    this.addCourseForm.route = this.selectedRoute; // Optional: Sync form route
  }

  openCourseModal(content: any) {
    this.type = 'add';
    this.addCourseForm = {
      route: null,
      title: null,
    };
    this.courseFiles.course_img = '';
    this.courseFiles.bg_img = '';

    this.modalService.open(content, {
      // size: 'lg',
      backdrop: 'static',
      keyboard: false,
    });
  }

  uploadFile(e: any, type: any) {
    if (type == 'bg') {
      this.courseFiles.bg_img = '';
    } else {
      this.courseFiles.course_img = '';
    }

    const file = e.target.files[0];
    const fileformData = new FormData();
    fileformData.append('file', file, file?.name);
    this.http
      .post(apis.node_singleFileUpload, fileformData)
      .subscribe((res: any) => {
        if (res.success) {
          if (type == 'bg') {
            this.courseFiles.bg_img = res.file.filename;
          } else {
            this.courseFiles.course_img = res.file.filename;
          }
          this.toastr.success(res.message);
        } else {
          if (type == 'bg') {
            this.courseFiles.bg_img = res.file.filename;
          } else {
            this.courseFiles.course_img = res.file.filename;
          }
          this.toastr.error(res.message);
        }
      });
  }

  removeImg(type: any) {
    if (type == 'course') {
      this.courseFiles.course_img = '';
      return;
    } else {
      this.courseFiles.bg_img = '';
    }
  }

  async addCourseCard(form: NgForm) {
    if (
      form.invalid ||
      !this.courseFiles.bg_img ||
      !this.courseFiles.course_img
    ) {
      form.form.markAllAsTouched();
      return;
    }

    if (this.addCourseForm.title == 'custom') {
      form.value.title = this.addCourseForm.custom_course_title;
    }

    form.value.bg_img = this.courseFiles.bg_img;
    console.log(this.selectedRoute, 'this.selectedRoute');
    form.value.route = !this.selectedRoute
      ? form.value.title
      : this.selectedRoute;
    form.value.course_img = this.courseFiles.course_img;

    try {
      if (this.type === 'add') {
        const res: any = await this.http
          .post(apis.node_addCourse, [form.value])
          .toPromise();
        if (res.success) {
          this.toastr.success(res.message);
        } else {
          this.toastr.error(res.message);
          return;
        }
      } else {
        form.value.action = true;
        const res: any = await this.http
          .put(
            apis.node_updateCourse + '/' + this.addCourseForm?._id,
            form.value
          )
          .toPromise();
        if (res.success) {
          this.toastr.success(res.message);
        } else {
          this.toastr.error(res.message);
          return;
        }
      }

      // Reset form and file values
      this.addCourseForm = { route: null };
      this.courseFiles.course_img = '';
      this.courseFiles.bg_img = '';
      this.modalService.dismissAll();

      // Fetch all courses after API call completes
      await this.getAllCourses();
    } catch (error) {
      console.error('Error during API call:', error);
      this.toastr.error('An error occurred while processing the request.');
    }
  }

  editCourseModal(content: any, course: any) {
    this.addCourseForm = { ...course };
    this.type = 'edit';
    this.courseFiles.bg_img = course.bg_img;
    console.log(course.title);
    this.onCourseChange(course.title);
    this.courseFiles.course_img = course.course_img;
    this.modalService.open(content, {
      backdrop: 'static',
    });
  }

  getAllCourses() {
    this.coursesData = [];
    this.http.get(apis.node_getAllcourses).subscribe((res: any) => {
      if (res.success) {
        if (res?.data.length > 0) {
          this.coursesData = res.data;
        }
      } else {
        this.toastr.error(res.message);
      }
    });
  }

  async confirmDelete(course: any) {
    let result: any = await window.confirm(
      `Are you sure to delete this ${course?.title} Course`
    );
    if (result) {
      await this.deleteCourse(course);
    }
  }

  async deleteCourse(course: any) {
    // course.action = false;
    const res: any = await this.http
      .delete(apis.node_deleteCourse + '/' + course?._id)
      .toPromise();
    if (res.success) {
      this.toastr.success(res.message);
    } else {
      this.toastr.error(res.message);
      return;
    }

    await this.getAllCourses();
  }

  setMeta() {
    this.titleService.setTitle(
      'Best UI/UX Design and Graphic Design Institute in Hyderabad | AR/VR Training'
    );

    this.metaService.updateTag({
      name: 'description',
      content:
        'Join the top UI/UX design institute in Hyderabad offering the best graphic design and AR/VR courses with placement. Discover your potential at the best design center for UI/UX, graphic design, and AR/VR training.',
    });

    // Set additional meta keywords for SEO
    this.metaService.updateTag({
      name: 'keywords',
      content:
        'UI/UX Design institute in Hyderabad, Best ui ux design Institute In Hyderabad | Ammerpet , Best graphic design institute with placement, AR/VR UX design course Hyderabad, Top UX/VI institute in Hyderabad, Graphic design design Hyderabad',
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = event.target.innerWidth;
    this.updateScrollState();
  }

  slide(direction: string) {
    if (this.cardsContainers) {
      const cards = this.cardsContainers.nativeElement;
      const scrollStep = this.calculateScrollStep(); // Calculate scroll step dynamically

      if (direction === 'left') {
        const newScrollLeft = cards.scrollLeft - scrollStep;
        cards.scrollLeft = Math.max(newScrollLeft, 0); // Ensure scrollLeft doesn't go below 0
      } else if (direction === 'right') {
        const newScrollLeft = cards.scrollLeft + scrollStep;
        cards.scrollLeft = Math.min(
          newScrollLeft,
          cards.scrollWidth - cards.clientWidth
        ); // Ensure scrollLeft doesn't exceed scrollWidth
      }

      this.updateScrollState();
    }
  }

  updateScrollState() {
    if (this.cardsContainers) {
      const cards = this.cardsContainers.nativeElement;
      // Check if scroll is at the leftmost position
      this.isLeftScrollable = cards.scrollLeft > 0;
      // Check if scroll is at the rightmost position
      this.isRightScrollable =
        cards.scrollLeft < cards.scrollWidth - cards.offsetWidth;

      if (!this.isRightScrollable) {
        this.scrollDirection = 'left';
      } else if (!this.isLeftScrollable) {
        this.scrollDirection = 'right';
      }
    }
  }

  startAutoScroll() {
    this.clearAutoScroll(); // Clear any existing intervals
    this.scrollIntervalId = setInterval(() => {
      this.slide1(this.scrollDirection);
      this.updateScrollState();
      if (!this.isRightScrollable) {
        this.scrollDirection = 'left';
      } else if (!this.isLeftScrollable) {
        this.scrollDirection = 'right';
      }
    }, 2000);
  }

  clearAutoScroll() {
    if (this.scrollIntervalId) {
      clearInterval(this.scrollIntervalId);
      this.scrollIntervalId = null;
    }
  }

  calculateScrollStep(): number {
    if (this.cardsContainers && this.cardsContainers.nativeElement) {
      const cardWidth =
        this.cardsContainers.nativeElement.children[0].offsetWidth + 15; // Assuming all cards have the same width
      return cardWidth;
    } else {
      return 0;
    }
  }

  slide1(direction: string) {
    if (this.cardsContainers) {
      const cards = this.cardsContainers.nativeElement;
      cards.style.transition = 'all 2s ease-in-out';
      const scrollStep = 365;
      if (direction === 'left') {
        const newScrollLeft = cards.scrollLeft - scrollStep;
        cards.scrollLeft = Math.max(newScrollLeft, 0); // Ensure scrollLeft doesn't go below 0
      } else if (direction === 'right') {
        const newScrollLeft = cards.scrollLeft + scrollStep;
        cards.scrollLeft = Math.min(
          newScrollLeft,
          cards.scrollWidth - cards.clientWidth
        ); // Ensure scrollLeft doesn't exceed scrollWidth
      }
    }
  }

  ngOnDestroy(): void {
    this.clearAutoScroll();
  }
}
