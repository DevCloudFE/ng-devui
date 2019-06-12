import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[aveAutoFocus]',
})
export class AutoFocusDirective implements AfterViewInit {

  @Input('aveAutoFocus') autoFocus: boolean;

  constructor(private  elementRef: ElementRef) {
  }

  ngAfterViewInit(): void {
    if (this.autoFocus) {
      this.elementRef.nativeElement.focus();
    }
  }
}
