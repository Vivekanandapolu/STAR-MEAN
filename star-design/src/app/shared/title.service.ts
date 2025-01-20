// src/app/services/title.service.ts

import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TitleService {
    private staticTitle = 'Star Design Institute';

    constructor(private router: Router, private titleService: Title) {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(() => {
                let route = this.router.routerState.root;
                let routeTitle = '';

                while (route.firstChild) {
                    route = route.firstChild;
                    if (route.snapshot.data['title']) {
                        routeTitle = route.snapshot.data['title'];
                    }
                }
                return routeTitle;
            })
        ).subscribe((title: string) => {
            const fullTitle = `${this.staticTitle} - ${title || 'Default Title'}`;
            this.titleService.setTitle(fullTitle);
        });
    }
}
