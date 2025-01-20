import { Component, OnInit } from '@angular/core';
import { TitleService } from './shared/title.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs';
import UserDetails, { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  currentPath: any = true;
  showHeaderFooter: boolean = true;
  userDetails: any | null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private userService: UserService
  ) {
    this.userService.loadUserDetails();
  }

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        mergeMap((route) => route.data)
      )
      .subscribe((event) => {
        this.titleService.setTitle(event['title']);
      });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentPath = event.urlAfterRedirects;
        // Hide header and footer if on the login page
        this.showHeaderFooter = !this.currentPath.includes('/login');
      }
    });
    this.userService.userDetails.subscribe((res: UserDetails) => {
      if (res) {
        this.userDetails = res;
      }
      if (window.location.pathname === '/login') {
        this.showHeaderFooter = false;
      } else {
        this.showHeaderFooter = true;
      }
    });
  }
}
