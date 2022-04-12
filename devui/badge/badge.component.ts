import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild
} from '@angular/core';
import { BadgePositionType, BadgeStatusType } from './badge.types';


@Component({
  selector: 'd-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent implements AfterViewInit {
  hasContent = true;

  @ViewChild('contentProjection') contentProjection?: ElementRef;
  @Input() count: number | string;
  @Input() maxCount = 99;
  @Input() showDot = false;
  @Input() status: BadgeStatusType;
  /**
   * @deprecated
   * 用position替代
   */
  @Input() set badgePos(value: BadgePositionType) {
    this.position = value;
  }
  @Input() position: BadgePositionType = 'top-right';
  /**
   * @deprecated
   * 用offset替代
   */
  @Input() set offsetXY(value: [number, number]) {
    this.offset = value;
  }
  @Input() offset: [number, number];

  @Input() bgColor: string;
  @Input() textColor: string;

  hasContentProjection() {
    const nodes = this.contentProjection?.nativeElement;
    const contents = nodes.childNodes;
    this.hasContent = contents.length ? true : false;
  }

  parseCountToNumber() {
    if(typeof(this.count) === 'number') {
      return this.count;
    } else {
      const parseNumber = parseInt(this.count);
      return isNaN(parseNumber) ? -1 : parseNumber;
    }
  }

  constructor(
    private cdr: ChangeDetectorRef,
  ) { }

  ngAfterViewInit() {
    this.hasContentProjection();
    this.cdr.detectChanges();
  }

}
