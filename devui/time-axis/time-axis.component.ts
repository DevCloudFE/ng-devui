import { AfterContentInit, AfterViewInit, Component, ContentChildren, ElementRef, Input, QueryList, TemplateRef } from '@angular/core';
import { TimeAxisItemComponent } from './time-axis-item/time-axis-item.component';
import { TimeAxisMode } from './time-axis.type';
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
  @Input() mode: TimeAxisMode = 'normal';
  @Input() widthMode = 'fitContent';

  constructor(private elementRef: ElementRef) {

  }

  ngAfterContentInit() {
    if (this.mode === 'alternative') {
      this.updateAlternativePosition();
    }

    this.vanishHorizontalLastLine();
  }

  ngAfterViewInit() {
    if (this._direction === 'horizontal' && this.mode !== 'top' && this.mode !== 'bottom') {
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

  vanishHorizontalLastLine() {
    if (this._direction === 'horizontal') {
      if (this.data === undefined) {
        if (this.listOfItems.last.lineStyle === undefined) {
          this.listOfItems.last.lineStyle = { style: 'none' };
        }
      } else {
        if (this.data.list[this.data.list.length - 1].lineStyle === undefined) {
          this.data.list[this.data.list.length - 1].lineStyle = { style: 'none' };
        }
      }
    }
  }

  changeStatusLine(event) {
    if (this.data !== undefined && this.data.direction === 'horizontal') {
      setTimeout(() => {
        this.data.list.forEach((item, index, array) => {
          if (item.status === 'runned' && index > 0) {
            array[index - 1].lineStyle = { style: 'solid', color: 'var(--devui-success)' };
          } else if (item.status === 'running' && index > 0) {
            array[index - 1].lineStyle = { style: 'dotted', color: 'var(--devui-success)' };
          } else if (item.status === '' && index > 0) {
            array[index - 1].lineStyle = { style: 'solid' };
          }
        });
      });
    }
  }
}
