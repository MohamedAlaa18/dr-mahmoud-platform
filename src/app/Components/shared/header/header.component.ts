import { Component, HostBinding, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        transform: 'translate3d(0,0,0)'
      })),
      state('closed', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('open <=> closed', [
        animate('400ms ease-in-out')
      ]),
    ]),
  ]
})
export class HeaderComponent implements OnInit, AfterViewInit {
  theme = new FormControl(false);
  @HostBinding('class') className = '';
  @ViewChild('sidenav') sidenav!: MatDrawer;
  @ViewChild('overlay') overlay!: ElementRef;
  @ViewChild('toggleCheckbox') toggleCheckbox!: ElementRef<HTMLInputElement>;

  darkClass = 'theme-dark';
  lightClass = 'theme-light';
  isShowing: boolean = false;
  userData: any = "";
  hideHeader: boolean = false;

  constructor(
    private renderer: Renderer2,
    private router: Router
  ) { }

  toggleRightSidenav() {
    this.isShowing = !this.isShowing;
  }

  ngOnInit() {
    const savedTheme = localStorage.getItem('themePreference');
    const currentTheme = savedTheme === 'dark';

    this.theme.setValue(currentTheme);

    this.applyTheme(currentTheme);

    this.theme.valueChanges.subscribe((currentTheme) => {
      this.applyTheme(currentTheme);
    });


    if (this.overlay && this.sidenav) {
      this.renderer.listen('document', 'click', (event) => {
        if (this.isShowing && !this.overlay.nativeElement.contains(event.target) && !this.sidenav.opened) {
          this.toggleRightSidenav();
        }
      });
    }

    this.MarkerActiveDetect();

    // Call MarkerActiveDetect() on window resize
    window.addEventListener('resize', () => {
      this.MarkerActiveDetect();
    });
  }

  ngAfterViewInit(): void {
    if (localStorage.getItem('themePreference') === 'dark') {
      this.toggleCheckbox.nativeElement.checked = true;
    }
  }

  private applyTheme(currentTheme: boolean | null): void {
    if (currentTheme === null) {
      currentTheme = false;
    }

    localStorage.setItem('themePreference', currentTheme ? 'dark' : 'light');

    this.className = currentTheme ? this.darkClass : this.lightClass;
    const bodyElement = document.getElementsByTagName('body')[0];

    if (currentTheme) {
      bodyElement.classList.add(this.darkClass);
      bodyElement.classList.remove(this.lightClass);
    } else {
      bodyElement.classList.add(this.lightClass);
      bodyElement.classList.remove(this.darkClass);
    }
  }

  moveMarker(target: HTMLElement | null): void {
    const marker = document.getElementById('marker');
    if (marker && target) {
      const rect = target.getBoundingClientRect();
      const offsetX = rect.left + window.pageXOffset;
      marker.style.width = target.offsetWidth + 'px';
      marker.style.left = offsetX + 'px';
    }
  }

  MarkerActiveDetect() {
    setTimeout(() => {
      const activeButton = document.querySelector('.nav-items button.active') as HTMLElement;
      if (activeButton) {
        this.moveMarker(activeButton);
      } else {
        // Move marker to home button if no button is active
        const homeButton = document.querySelector('.nav-items button.router-link-active') as HTMLElement;
        if (homeButton) {
          this.moveMarker(homeButton);
        }
      }
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          const activeButton = document.querySelector('.nav-items button.active') as HTMLElement;
          if (activeButton) {
            this.moveMarker(activeButton);
          } else {
            // Move marker to home button if no button is active
            const homeButton = document.querySelector('.nav-items button.router-link-active') as HTMLElement;
            if (homeButton) {
              this.moveMarker(homeButton);
            }
          }
        });
      }
    });
  }

  isDark() {
    return localStorage.getItem('themePreference') == 'dark';
  }
}
