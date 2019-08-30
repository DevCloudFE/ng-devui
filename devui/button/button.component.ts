import {
  Component,
  Input,
  Directive,
  ElementRef,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';

export type IButtonType = 'button' | 'submit' | 'reset';
export type IButtonStyle = 'common' | 'primary' | 'text' | 'text-dark';
export type IButtonSize = 'lg' | 'sm' | 'xs';

@Component({
  selector: 'd-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() id: string;
  @Input() type: IButtonType = 'button';
  @Input() bsStyle: IButtonStyle = 'primary';
  @Input() bsSize: IButtonSize = 'sm';
  @Input() bordered: boolean;
  @Input() icon: string;
  @Input() disabled = false;
  @Input() showLoading = false;
  @Input() width?: string;
  @Input() autofocus = false;
  @Output() btnClick = new EventEmitter();
  constructor() {
  }

  // 新增click事件，解决直接在host上使用click，IE在disabled状态下还能触发事件
  onClick(event) {
    this.btnClick.emit(event);
  }
}

@Directive({
  selector: '[dBtnAutofocus]',
})
export class BtnAutoFocusDirective implements OnInit {
  @Input() dBtnAutofocus = false;
  constructor(private element: ElementRef) { }
  ngOnInit() {
      if (this.dBtnAutofocus) {
          this.element.nativeElement.focus();
      }
  }
}
