import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dr-mahmoud-platform';
  hideSVG: boolean = false;
  hideLayout: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkRouteForSVG(event.urlAfterRedirects);
        this.checkRouteForLayout(event.urlAfterRedirects);
      }
    });

    this.checkRouteForSVG(this.router.url);
    this.checkRouteForLayout(this.router.url);
  }

  private checkRouteForSVG(url: string) {
    const exactRoutes = ['/home', '/login', '/signup'];
    const regexRoutes = [/^\/course\/(\d+)$/];

    this.hideSVG = exactRoutes.includes(url) || regexRoutes.some(regex => regex.test(url));
  }

  private checkRouteForLayout(url: string) {
    const exactRoutes = ['/login', '/signup'];
    this.hideLayout = exactRoutes.includes(url);
  }
}
