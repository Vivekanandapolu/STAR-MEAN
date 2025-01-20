import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { UIUXDesignComponent } from './ui-ux-design/ui-ux-design.component';
import { GraphicDesignComponent } from './graphic-design/graphic-design.component';
import { BachelorDesignComponent } from './bachelor-design/bachelor-design.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { ArVrUxDesignComponent } from './ar-vr-ux-design/ar-vr-ux-design.component';
import { UiViDesignComponent } from './ui-vi-design/ui-vi-design.component';
import { PhotographyComponent } from './photography/photography.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'ui-ux-design',
    pathMatch: 'full',
  },
  {
    path: '',
    component: CoursesComponent,
    children: [
      {
        path: 'ui-ux-design',
        component: UIUXDesignComponent,
        data: { title: 'ux design course - user experience design course - learn ui ux design - User experience design' }
      },
      {
        path: 'ui-vi-design',
        component: UiViDesignComponent,
        data: { title: 'ux-vi design course - user experience design course - learn ux vi design - User experience design' }
      },
      {
        path: 'ar-vr-ux-design',
        component: ArVrUxDesignComponent,
        data: { title: 'vr ux design - ux design for vr - virtual reality - augmented reality designer - ar ux' }
      },
      {
        path: 'product-management',
        component: ProductManagementComponent,
        data: { title: 'product management - product manager - Best UX Product Management Certification - Product Management Bootcamp - Learn UX Product Management' }
      },
      {
        path: 'bachelor-of-design',
        component: BachelorDesignComponent,
        data: { title: 'top b.des courses in ux design - bachelor of design in ux - bdes ux design - B.Design in User Experience' }
      },
      {
        path: 'graphic-design',
        component: GraphicDesignComponent,
        data: { title: 'graphic design - graphic design course - Best Graphic Design Course - Graphic Design Certification - Graphic Design Training' }
      },
      {
        path: 'photography&digital-imaging',
        component: PhotographyComponent,
        data: { title: 'graphic design - graphic design course - Best Graphic Design Course - Graphic Design Certification - Graphic Design Training' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
