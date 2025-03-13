import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector: '[dTreeAutoFocus]',
    standalone: false
})
export class AutofocusDirective implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.elementRef.nativeElement.focus();
      this.elementRef.nativeElement.select();
    });
  }

}
