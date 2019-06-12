import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[autofocus]' // tslint:disable-line
})
export class AutofocusDirective implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.elementRef.nativeElement.focus();
    setTimeout(() => {
      this.elementRef.nativeElement.select();
    });
  }

}
