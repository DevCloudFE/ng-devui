import { AfterViewInit, Component, ElementRef, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'd-time-axis',
  templateUrl: './time-axis.component.html',
  styleUrls: [`./time-axis.component.scss`],
  exportAs: 'time-axis',
  preserveWhitespaces: false,
})

export class TimeAxisComponent implements AfterViewInit {
  @Input() data: any = {
      direction: '', // vertical/horizontal
      position: '', // 如果为bottom时，才生效；
      model: '', // text/html/template
      list: []
  };

  private viewRenderComplete = false;

  @Input() contentTemplate: TemplateRef<any>;

  constructor(
    private elementRef: ElementRef
  ) { }

  ngAfterViewInit() {
    Promise.resolve(null).then(() => {
      this.viewRenderComplete = true;
    });
  }

  get bottomPositionMarginLeft() {
    const timeElement = this.elementRef.nativeElement.querySelector('.devui-time-axis.bottom .devui-axis-time-time > div');
    const ICON_WIDTH_PX = 20;
    return timeElement && this.viewRenderComplete ? timeElement.offsetWidth / 2 - ICON_WIDTH_PX / 2 : 0;
  }

  get bottomPositionTextLeft() {
    const timeElement = this.elementRef.nativeElement.querySelector('.devui-time-axis.bottom .devui-axis-time-time');
    return timeElement ? -timeElement.offsetWidth / 2 : 0;
  }
}
