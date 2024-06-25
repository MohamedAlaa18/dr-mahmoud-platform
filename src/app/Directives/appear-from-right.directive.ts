import { Directive, ElementRef, Renderer2, OnInit, HostListener } from '@angular/core';

@Directive({
  selector: '[AppearFromRight]'
})
export class AppearFromRightDirective implements OnInit {

  private animationApplied = false;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.checkAnimation();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkAnimation();
  }

  checkAnimation() {
    if (!this.animationApplied) {
      const element = this.elRef.nativeElement;
      const rect = element.getBoundingClientRect();

      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        this.renderer.removeClass(element, 'hidden');
        this.renderer.addClass(element, 'slide-from-right');
        this.animationApplied = true;
      }
    }
  }
}
