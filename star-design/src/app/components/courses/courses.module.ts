import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { UIUXDesignComponent } from './ui-ux-design/ui-ux-design.component';
import { ArVrUxDesignComponent } from './ar-vr-ux-design/ar-vr-ux-design.component';
import { UiViDesignComponent } from './ui-vi-design/ui-vi-design.component';
import { BachelorDesignComponent } from './bachelor-design/bachelor-design.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { GraphicDesignComponent } from './graphic-design/graphic-design.component';
import { PhotographyComponent } from './photography/photography.component';
import { FormsModule } from '@angular/forms';
import { NumberInputDirectiveModule } from 'src/app/shared/directive/number-input.directive';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { UpcomingBatchComponent } from './upcoming-batch/upcoming-batch.component';
// import { HeaderModule } from 'src/app/shared/header/header.module';


@NgModule({
  declarations: [CoursesComponent, UIUXDesignComponent, ArVrUxDesignComponent, UiViDesignComponent, BachelorDesignComponent, ProductManagementComponent, GraphicDesignComponent, PhotographyComponent, ContactFormComponent, UpcomingBatchComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    // HeaderModule
    FormsModule,
    NumberInputDirectiveModule
  ]
})
export class CoursesModule { }
