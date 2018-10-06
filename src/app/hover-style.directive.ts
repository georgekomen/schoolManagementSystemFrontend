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
    try {
      if (condition) {
        // this.el.nativeElement.style.boxShadow = 'inset 0 0 10px #000000';
        this.el.nativeElement.style.boxShadow = 'inset 0 0 5px #000000';
        this.el.nativeElement.querySelector('.showOnHover').style.cursor = 'pointer';
        this.el.nativeElement.querySelector('.showOnHover').style.visibility = 'visible';
      } else {
        this.el.nativeElement.style.boxShadow = null;
        this.el.nativeElement.querySelector('.showOnHover').style.cursor = 'auto';
        this.el.nativeElement.querySelector('.showOnHover').style.visibility = 'hidden';
      }
    } catch (e) {
      console.log(e);
    }
  }
}
