import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ServicesComponent } from './components/services/services.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { PlacementsComponent } from './components/placements/placements.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { HireTalentComponent } from './components/hire-talent/hire-talent.component';
import { CustomPreloadingStrategy } from './shared/services-comp/custom-preloading-strategy';
import { LoginComponent } from './components/Auth/login/login.component';
import { SitemapComponent } from './shared/sitemap/sitemap.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title:
        'ui ux design course | ui ux design course in hyderabad with 100% placements | star design institute, staruiux.com',
    },
  },
  {
    path: 'services',
    component: ServicesComponent,
    data: { title: 'Services' },
  },
  {
    path: 'aboutus',
    component: AboutusComponent,
    data: { title: 'About Us' },
  },
  {
    path: 'placements',
    component: PlacementsComponent,
    data: { title: 'Placements' },
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
    data: { title: 'Contact Us' },
  },
  {
    path: 'hire-talent',
    component: HireTalentComponent,
    data: { title: 'Hire Talent' },
  },
  { path: 'login', component: LoginComponent, data: { title: 'Login' } },
  {
    path: 'sitemap',
    component: SitemapComponent,
    data: { title: 'Sitemap' },
  },
  {
    path: 'courses',
    loadChildren: () =>
      import('./components/courses/courses.module').then(
        (m) => m.CoursesModule
      ),
    data: { title: 'Courses' },
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: CustomPreloadingStrategy,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
