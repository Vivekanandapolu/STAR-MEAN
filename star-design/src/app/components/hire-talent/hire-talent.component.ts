import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-hire-talent',
  templateUrl: './hire-talent.component.html',
  styleUrls: ['./hire-talent.component.scss']
})
export class HireTalentComponent {
  constructor(private metaService: Meta, private titleService: Title) {
    this.setMeta();
  }

  setMeta() {
    // Set the meta title
    this.titleService.setTitle('Comprehensive Hiring Solutions - Find Top Talent Today');

    // Set the meta description
    this.metaService.updateTag({
      name: 'description',
      content: "Hire top talent with our comprehensive hiring solutions. We provide access to a diverse pool of skilled professionals, ensuring you find the right candidates to drive your business forward. Connect with us today to build your dream team."
    });
  }


}
