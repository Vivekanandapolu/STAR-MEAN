import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  constructor(private metaService: Meta, private titleService: Title) {
    this.setMeta();
  }

  setMeta() {
    // Set the meta title
    this.titleService.setTitle('UI/UX Design Courses - Master User Interface & Experience Design');

    // Set the meta description
    this.metaService.updateTag({
      name: 'description',
      content: "Explore a variety of UI/UX courses and master the essential skills in user interface design and user experience. Learn interaction design, prototyping, usability testing, and more. Whether you're a beginner or experienced designer, enroll now to advance your career in UI/UX design."
    });
  }
}
