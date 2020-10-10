import {
  Component,
  AfterViewInit,
  ElementRef,
  Input,
  ChangeDetectorRef,
  ViewChild
} from '@angular/core';

import { BadgeStatusType, BadgePositionType } from './types';

@Component({
  selector: 'd-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent implements AfterViewInit {
  hasContent = true;

  @ViewChild('contentProjection') contentProjection?: ElementRef;
  @Input() count: number;
  @Input() maxCount = 99;
  @Input() showDot = false;
  @Input() status: BadgeStatusType;
  @Input() badgePos: BadgePositionType = 'top-right';
  @Input() offsetXY: [number, number];
  @Input() bgColor: string;

  hasContentProjection() {
    const nodes = this.contentProjection?.nativeElement;
    const contents = nodes.childNodes;
    this.hasContent = contents.length ? true : false;
  }

  constructor(
    private cdr: ChangeDetectorRef,
  ) { }

  ngAfterViewInit() {
    this.hasContentProjection();
    this.cdr.detectChanges();
  }

}
