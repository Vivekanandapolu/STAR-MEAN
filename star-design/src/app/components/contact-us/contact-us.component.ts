import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { apis } from 'src/app/shared/apiUrls';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent {
  selectedMethod: string = 'whatsapp';
  placeholderText: string = 'WhatsApp number';
  formData: any = {};
  constructor(private http: HttpClient, private toastr: ToastrService) {}

  updatePlaceholder() {
    switch (this.selectedMethod) {
      case 'whatsapp':
        this.placeholderText = 'WhatsApp number';
        break;
      case 'phonecall':
        this.placeholderText = 'Phone number';
        break;
      case 'email':
        this.placeholderText = 'E-mail address';
        break;
    }
  }

  openGoogleMapsDirection(location: string) {
    let destinationAddress = '';
    if (location === 'Hyderabad') {
      destinationAddress =
        'Hitec City, 101N-Heights, 1st Floor, Siddiq Nagar, Hitec City, Hyderabad, Telangana 500081';
    } else if (location === 'Bengaluru') {
      destinationAddress =
        '1st floor, RMZ Latitude Commercial Building Bellary Rd, Hebbal, Bengaluru Karnataka 560024 India';
    } else if (location === 'Ameerpet') {
      destinationAddress =
        'Meghamala Apartment road, Kumar Basti, Srinivasa Nagar, Ameerpet, Hyderabad, Telangana 500082';
    } else if (location === 'Himayat Nagar') {
      destinationAddress =
        '2nd Floor, Om Towers, Opposite McDonald’s, Himayatnagar Main Road, Hyderabad-500029 India';
    } else if (location === 'Hitech') {
      destinationAddress =
        'Sowbagyas Amulyas Complex, Hitech City Rd, Jaihind Enclave, HITEC City, Hyderabad, Telangana 500081';
    }
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      destinationAddress
    )}`;

    window.open(mapsUrl, '_blank');
  }

  navigateTo(linkType: string) {
    switch (linkType) {
      case 'twitter':
        window.open('https://x.com/StarDesignInst');
        break;
      case 'facebook':
        window.open('https://www.facebook.com/StarDesignInstitute');
        break;
      case 'instagram':
        window.open('https://www.instagram.com/star_design_institute/');
        break;
      case 'youtube':
        window.open('https://www.youtube.com/@stardesigninstitute6498');
        break;
      case 'linked':
        window.open(
          'https://www.linkedin.com/company/star-di/?viewAsMember=true'
        );
        break;
    }
  }

  submit(form: NgForm) {
    if (form.invalid) {
      form.form.markAllAsTouched();
      return;
    }

    form.value.contact_type = this.selectedMethod;
    this.http.post(apis.node_contactUs, form.value).subscribe((res: any) => {
      if (res.success) {
        this.formData = {};
        form.form.markAsUntouched();
        this.toastr.success(res?.message);
      }
    });
  }
}
