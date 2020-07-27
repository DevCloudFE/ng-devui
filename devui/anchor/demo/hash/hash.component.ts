import { Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'd-anchor-hash',
  templateUrl: './hash.component.html',
  styleUrls: ['./hash.component.css']
})
export class HashComponent {
  updateUrlWhenAnchorActive = true;
  scrollToAnchorByHashOnlyInit = false;
  show = true;
  constructor(private router: Router, private el: ElementRef) {}
  reInit() {
    this.show = false;
    setTimeout(() => {
      this.router.navigate([], { fragment: 'issue-list' });
      this.show = true;
    }, 2000);
  }
  jumpTo() {
    this.router.navigate([], { fragment: 'issue-list' });
  }
  click(selector) {
    const el = this.el.nativeElement.querySelector(selector);
    if (el) {
      el.click();
    }
  }
  @HostListener('click', ['$event'])
  hostClick(event: MouseEvent) {
    event.stopPropagation();
  }
}
