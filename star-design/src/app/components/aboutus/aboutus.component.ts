import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent {
  constructor(private metaService: Meta, private titleService: Title) {
    this.setMeta();
  }

  setMeta() {
    // Set the meta title
    this.titleService.setTitle('Exceptional Design and Research Services');

    // Set the meta description
    this.metaService.updateTag({
      name: 'description',
      content: "Design, Research, Deep Dive – 12+ Years of Excellence. We are dedicated to delivering exceptional design and research services, specializing in deep dives to uncover insights and drive innovation."
    });
  }
}
