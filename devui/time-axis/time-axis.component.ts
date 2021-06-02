import { AfterContentInit, AfterViewInit, Component, ContentChildren, ElementRef, Input, QueryList, TemplateRef } from '@angular/core';
import { TimeAxisItemComponent } from './time-axis-item/time-axis-item.component';
@Component({
  selector: 'd-time-axis',
  templateUrl: './time-axis.component.html',
  styleUrls: [`./time-axis.component.scss`],
  exportAs: 'time-axis',
  preserveWhitespaces: false,
})

export class TimeAxisComponent implements AfterContentInit, AfterViewInit {
  @ContentChildren(TimeAxisItemComponent) listOfItems!: QueryList<TimeAxisItemComponent>;
  @Input() data;
  @Input() contentTemplate: TemplateRef<any>;
  @Input() direction = 'vertical';
  @Input() mode = 'normal';
  @Input() widthMode = 'fitContent';

  constructor(private elementRef: ElementRef) {

  }

  ngAfterContentInit() {
    if (this.mode === 'alternative') {
      this.updateAlternativePosition();
    }
  }

  ngAfterViewInit() {
    if (this._direction === 'horizontal') {
      const ulElement = this.elementRef.nativeElement.querySelector('.devui-time-axis-horizontal')  as HTMLElement;
      const topElement = this.elementRef.nativeElement.querySelector('.devui-time-axis-item-data-horizontal-top')  as HTMLElement;
      const bottomElement = this.elementRef.nativeElement.querySelector('.devui-time-axis-item-data-horizontal-bottom')  as HTMLElement;
      ulElement.style.height = `${ Math.max(topElement.offsetHeight, bottomElement.offsetHeight) * 2 + 42}px`;
    }
  }

  get _direction() {
    if (this.data !== undefined) {
      return this.data.direction || 'vertical';
    } else {
      return this.direction;
    }
  }

  get _widthMode() {
    if (this.data !== undefined) {
      return this.data.widthMode;
    } else {
      return this.widthMode;
    }
  }

  updateAlternativePosition() {
    if (this.data === undefined) {
      this.listOfItems.forEach((item, index) => {
        if (this._direction === 'vertical') {
          item.position = index % 2 === 0 ? 'left' : 'right';
        } else {
          item.position = index % 2 === 0 ? 'bottom' : 'top';
        }
      });
    } else {
      for (let i = 0; i < this.data.list.length; i++) {
        if (this._direction === 'vertical') {
          this.data.list[i].position = i % 2 === 0 ? 'left' : 'right';
        } else {
          this.data.list[i].position = i % 2 === 0 ? 'bottom' : 'top';
        }
      }
    }
  }

}
