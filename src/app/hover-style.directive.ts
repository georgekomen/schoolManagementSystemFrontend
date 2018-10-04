import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appHoverStyle]'
})
export class HoverStyleDirective {

  constructor(private el: ElementRef) { }

  @Input('condition') condition: boolean;

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.condition);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(condition) {
    if (condition) {
      this.el.nativeElement.style.boxShadow = 'inset 0 0 10px #000000';
    } else {
      this.el.nativeElement.style.boxShadow = null;
    }
  }

}
