import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  phoneNumber = '+91 9985280011';
  windowWidth: boolean = false

  ngOnInit(): void {
    this.windowWidth = window.innerWidth <= 786;
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth <= 786;
    });
  }

  openWhatsApp() {
    const url = `https://web.whatsapp.com/send?phone=${this.phoneNumber}`;
    window.open(url);
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
        window.open('https://www.linkedin.com/company/star-di/?viewAsMember=true');
        break;
    }
  }

}
