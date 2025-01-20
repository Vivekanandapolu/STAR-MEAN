import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ServicesComponent } from './components/services/services.component'; import { AboutusComponent } from './components/aboutus/aboutus.component';
import { PlacementsComponent } from './components/placements/placements.component';
// import { HeaderModule } from './shared/header/header.module';
import { HeaderComponent } from './shared/header/header.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { HireTalentComponent } from './components/hire-talent/hire-talent.component';
import { FooterComponent } from './shared/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomPreloadingStrategy } from './shared/services-comp/custom-preloading-strategy';
import { UrlSerializer } from '@angular/router';
import { LowerCaseUrlSerializer } from './shared/LowerCaseUrlSerializer';
import { LoginComponent } from './components/Auth/login/login.component';
import { SitemapComponent } from './shared/sitemap/sitemap.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './shared/auth.interceptor';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NumberInputDirectiveModule } from './shared/directive/number-input.directive';
import { TrimPipeModule } from './shared/pipes/trim.pipe';
import { ToastrModule } from 'ngx-toastr';
import { LoaderService } from './shared/loader/loader.service';
import { LoaderComponent } from './shared/loader/loader.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ServicesComponent,
    AboutusComponent,
    PlacementsComponent,
    ContactUsComponent,
    HireTalentComponent,
    FooterComponent,
    LoginComponent,
    SitemapComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    NumberInputDirectiveModule,
    TrimPipeModule,
    ToastrModule.forRoot({ timeOut: 2000 }),
    NgbTooltipModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }, LoaderService,
    CustomPreloadingStrategy, Title, { provide: UrlSerializer, useClass: LowerCaseUrlSerializer }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
