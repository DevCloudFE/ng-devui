import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'd-demo-scroll-container',
  templateUrl: './scroll-container.component.html',
  styleUrls: ['./scroll-container.component.scss'],
})
export class ScrollContainerComponent implements OnInit, AfterViewInit {
  @ViewChild('header', { static: true }) headerRef: ElementRef;

  @ViewChild('navSprite', {static: true}) navSprite;

  view = { top: 0, bottom: 0 };

  spriteOption = {
    top: '60%',
    left: '80%',
    zIndex: 20,
  };

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.view.top = this.headerRef.nativeElement.clientHeight;
    this.cdr.detectChanges();
  }

  ngAfterViewInit () {
    this.navSprite.getNavData();
  }
}
