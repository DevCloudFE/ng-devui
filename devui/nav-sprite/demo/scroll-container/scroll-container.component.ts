import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'd-demo-scroll-container',
  templateUrl: './scroll-container.component.html',
  styleUrls: ['./scroll-container.component.scss'],
})
export class ScrollContainerComponent implements OnInit {
  @ViewChild('header', { static: true }) headerRef: ElementRef;

  view = { top: 0, bottom: 0 };

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.view.top = this.headerRef.nativeElement.clientHeight;
    this.cdr.detectChanges();
  }
}
