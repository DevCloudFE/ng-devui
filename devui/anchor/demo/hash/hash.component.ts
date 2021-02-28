import { Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'd-anchor-hash',
  templateUrl: './hash.component.html',
  styleUrls: ['./hash.component.scss']
})
export class HashComponent {
  updateUrlWhenAnchorActive = true;
  scrollToAnchorByHashOnlyInit = false;
  show = true;
  constructor(private router: Router, private el: ElementRef) {}
  @HostListener('click', ['$event'])
  hostClick(event: MouseEvent) {
    event.stopPropagation();
  }
}
