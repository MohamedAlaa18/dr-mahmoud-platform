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

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkRouteForSVG(event.urlAfterRedirects);
      }
    });

    this.checkRouteForSVG(this.router.url);
  }

  private checkRouteForSVG(url: string) {
    const exactRoutes = ['/home'];
    const regexRoutes = [/^\/course\/(\d+)$/];

    this.hideSVG = exactRoutes.includes(url) || regexRoutes.some(regex => regex.test(url));
  }
}
