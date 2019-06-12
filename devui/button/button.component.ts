import {
  Component,
  Input,
  SimpleChanges,
  Directive,
  ElementRef,
  OnInit,
  OnChanges,
  Output,
  EventEmitter,
  HostBinding
} from '@angular/core';

declare var $: any;

export type IButtonType = 'button' | 'submit' | 'reset';
export type IButtonStyle = 'common' | 'primary' | 'text' | 'text-dark';
export type IButtonSize = 'lg' | 'sm' | 'xs';

@Component({
  selector: 'ave-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() id: string;
  @Input() type: IButtonType = 'button';
  @Input() bsStyle: IButtonStyle = 'primary';
  @Input() bsSize: IButtonSize;
  @Input() bordered: boolean;
  @Input() icon: string;
  @Input() disabled = false;
  @Input() showLoading = false;
  @Input() width?: string;
  @Input() autofocus = false;
  @Output() btnClick = new EventEmitter();
  @HostBinding('style.display') color = 'inline-block';
  constructor() {
  }

  // 新增click事件，解决直接在host上使用click，IE在disabled状态下还能触发事件
  onClick(event) {
    this.btnClick.emit(event);
  }
}

@Directive({
  selector: '[aveBtnAutofocus]',
})
export class BtnAutoFocusDirective implements OnInit {
  @Input() aveBtnAutofocus = false;
  constructor(private element: ElementRef) { }
  ngOnInit() {
      if (this.aveBtnAutofocus) {
          this.element.nativeElement.focus();
      }
  }
}
