import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollAnimation]'
})
export class ScrollAnimationDirective {

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const element = this.elRef.nativeElement;
    const rect = element.getBoundingClientRect();

    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
      this.renderer.addClass(element, 'slide-in');
    } else {
      this.renderer.removeClass(element, 'slide-in');
    }
  }

}
