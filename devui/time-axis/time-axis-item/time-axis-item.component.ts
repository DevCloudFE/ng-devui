import { Component, EventEmitter, HostBinding, Input, OnInit, Output, TemplateRef } from '@angular/core';

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
  @Input() lineStyle;
  @Input() customDot;
  @Input() dotColor;
  @Input() iconClass;
  @Input() extraElement;
  @Input() text;
  @Input() contentTemplate: TemplateRef<any>;
  @Input() data;
  @Input() horizontalAlign = 'center';
  @Output() statusChanged = new EventEmitter<string>();
  _type;
  dotText: string;

  @Input()
  set type(type) {
    switch (type) {
    case 'success':
      this._type = 'right';
      break;

    case 'danger':
      this._type = 'danger';
      break;

    case 'warning':
      this._type = 'warning';
      break;

    case 'primary':
      this._type = 'primary';
      break;

    case 'running':
      this._type = 'running';
      this.dotText = '↻';
      break;

    default:
      break;
    }
  }

  /**
  * @deprecated Use type to replace.
  */
  @Input()
  set status(status) {
    if (status !== undefined) {
      this.statusChanged.emit(status);

      if (status === 'running') {
        this.type = 'running';
      } else if (this._type === 'running' && status === '') {
        this.type = 'primary';
      }
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
  }

  get extraTemplate() {
    return this.extraElement instanceof TemplateRef ? this.extraElement : null;
  }

  get dotTemplate() {
    return this.customDot instanceof TemplateRef ? this.extraElement : null;
  }

  get timeAxisLineClass() {
    let styleClass = `devui-time-axis-line-style-${ this.lineStyle?.style || 'solid' }`;
    styleClass += this.timePosition !== 'bottom' ? ' devui-time-axis-item-line' : ' devui-time-axis-item-line-time-bottom';
    return styleClass;
  }

}
