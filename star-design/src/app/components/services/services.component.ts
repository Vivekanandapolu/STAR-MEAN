import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  windowWidth: number = window.innerWidth;
  windowWidth786: boolean = false;

  constructor(private metaService: Meta, private titleService: Title) {
    this.setMeta();
  }

  setMeta() {
    // Set the meta title
    this.titleService.setTitle('Transforming Ideas into Successful Products');

    // Set the meta description
    this.metaService.updateTag({
      name: 'description',
      content: "We turn ideas into products. From concept to launch, we specialize in transforming your vision into successful products. Our team offers comprehensive services including product strategy, development, market analysis, and more."
    });
  }

  ngOnInit(): void {
    this.windowWidth786 = window.innerWidth <= 768;
    window.addEventListener('resize', () => {
      this.windowWidth786 = window.innerWidth <= 768;
      console.log(this.windowWidth786);
    });
  }

}
