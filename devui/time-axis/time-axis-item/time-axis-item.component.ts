import { Component, HostBinding, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'd-time-axis-item',
  templateUrl: './time-axis-item.component.html',
  styleUrls: ['./time-axis-item.component.scss']
})
export class TimeAxisItemComponent implements OnInit {
  @Input() model;
  @Input() direction;
  @Input() time;
  @Input() timePosition; // direction为vertical时time的位置
  @Input() position;
  @Input() type;
  @Input() lineStyle;
  @Input() customDot;
  @Input() iconClass;
  @Input() extraElement;
  @Input() text;
  @Input() contentTemplate: TemplateRef<any>;
  @Input() data;
  dotText: string;

  /**
  * @deprecated Use type to replace.
  */
  @Input()
  set status(status) {

    if (status === 'runned') {
      this.type = 'runned';
    } else if (status === 'running') {
      this.type = 'running';
    } else if (status === 'error') {
      this.type = 'error';
    }
  }

  @HostBinding('class.devui-time-axis-item-horizontal-no-line') get horizontalNoLine() {
    return this.direction === 'horizontal' && this?.lineStyle?.style === 'none';
  }

  @HostBinding('class.devui-time-axis-item-vertical-no-line') get verticalNoLine() {
    return this.direction === 'vertical' && this?.lineStyle?.style === 'none';
  }

  constructor() { }

  ngOnInit() {
    if (this.position === undefined) {
      this.position = (this.direction === 'vertical' ? 'right' : 'bottom');
    }

    if (this.type === 'runned') {
      this.dotText = '✓';
    } else if (this.type === 'running') {
      this.dotText = '↻';
    } else if (this.type === 'error') {
      this.dotText = '✕';
    }
  }

  get extraTemplate() {
    return this.extraElement instanceof TemplateRef ? this.extraElement : null;
  }

  get dotTemplate() {
    return this.customDot instanceof TemplateRef ? this.extraElement : null;
  }

}
