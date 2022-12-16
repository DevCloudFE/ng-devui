import { NgIf } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AnchorDirective, AnchorBoxDirective, AnchorBoxHashSupportDirective, AnchorLinkDirective } from 'ng-devui/anchor';
import { ButtonModule } from 'ng-devui/button';
import { StickyModule } from 'ng-devui/sticky';

@Component({
  selector: 'd-anchor-hash',
  standalone: true,
  imports: [
    NgIf,
    AnchorDirective,
    AnchorBoxDirective,
    AnchorBoxHashSupportDirective,
    AnchorLinkDirective,
    ButtonModule,
    StickyModule
  ],
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
