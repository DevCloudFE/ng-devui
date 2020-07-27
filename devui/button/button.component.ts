import { ChangeDetectionStrategy, Component, Directive, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

export type IButtonType = 'button' | 'submit' | 'reset';
export type IButtonStyle = 'common' | 'primary' | 'text' | 'text-dark' | 'danger';
export type IButtonPosition = 'left' | 'right' | 'default';
export type IButtonSize = 'lg' | 'md' | 'sm' | 'xs';

@Component({
  selector: 'd-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input() id: string;
  @Input() type: IButtonType = 'button';
  @Input() bsStyle: IButtonStyle = 'primary';
  @Input() bsSize: IButtonSize = 'md';
  @Input() bsPosition: IButtonPosition = 'default';
  @Input() bordered: boolean;
  @Input() icon: string;
  @Input() disabled = false;
  @Input() showLoading = false;
  @Input() width?: string;
  @Input() autofocus = false;
  @Output() btnClick = new EventEmitter<any>();
  @ViewChild('buttonContent', { static: true }) buttonContent: ElementRef;
  constructor() {
  }

  // 新增click事件，解决直接在host上使用click，IE在disabled状态下还能触发事件
  onClick(event) {
    this.btnClick.emit(event);
  }

  hasContent() {
    return !!this.buttonContent && this.buttonContent.nativeElement && this.buttonContent.nativeElement.innerHTML.trim();
  }
}
