import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { apis } from 'src/app/shared/apiUrls';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-upcoming-batch',
  templateUrl: './upcoming-batch.component.html',
  styleUrls: ['./upcoming-batch.component.scss'],
})
export class UpcomingBatchComponent implements OnInit {
  @Input() pageRoute: any;

  batchDetails: any = {
    from_day: null,
    to_day: null,
    training_type: null,
    location: null,
  };

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
  userDetails: any;

  constructor(
    private metaService: Meta,
    private titleService: Title,
    private http: HttpClient,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private userService: UserService
  ) {
    userService.loadUserDetails();
  }

  ngOnInit(): void {
    this.userService.userDetails.subscribe((res) => {
      if (res) {
        this.userDetails = res;
      }
    });
    // console.log(this.pageRoute, "this.pageRoute");
    this.getBatches();
  }

  async onSubmit(form: NgForm) {
    if (form.invalid) {
      form.form.markAllAsTouched();
      return;
    }

    const startTime = this.formatTime(form.value.startTime);
    const endTime = this.formatTime(form.value.endTime);

    const days = `${startTime} - ${endTime}`;

    let obj: any = {
      route: this.pageRoute,
      nextBatchFrom: form.value.nextBatchFrom,
      duration: form.value.duration,
      days: form.value.from_day + '-' + form.value.to_day,
      training_type: form.value.training_type,
      timings: days,
      location: form.value.location,
      course_fee: form.value.course_fee,
      vacancies: form.value.vacancies,
    };

    const response: any = await this.http
      .post(apis.node_addUpcomingBatch, obj)
      .toPromise();

    if (response.success) {
      this.toastr.success(response.message);
      this.batchDetails = {
        from_day: null,
        to_day: null,
        training_type: null,
        location: null,
      };
      this.modalService.dismissAll();
      form.form.markAsUntouched();
      await this.getBatches();
      return;
    }
  }

  async getBatches() {
    this.batches = [];
    const res: any = await this.http
      .get(apis.node_getBatches, { params: { route: this.pageRoute } })
      .toPromise();
    if (res.success) {
      this.batches = res.data;
    } else {
    }
  }

  formatTime(time: string): string {
    const [hour, minute] = time.split(':').map(Number);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12; // Convert 0 to 12 for 12-hour format
    return `${this.padZero(formattedHour)}:${this.padZero(minute)} ${ampm}`;
  }

  padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  openCourseModal(content: any) {
    this.type = 'add';

    this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false,
    });
  }
}
