import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
export type IButtonType = 'button' | 'submit' | 'reset';
export type IButtonStyle = 'common' | 'primary' | 'text' | 'text-dark' | 'danger';
export type IButtonPosition = 'left' | 'right' | 'default';
export type IButtonSize = 'lg' | 'md' | 'sm' | 'xs';

@Component({
  selector: 'd-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class ButtonComponent implements AfterContentChecked {
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
  @Input() loadingTemplateRef: TemplateRef<any>;
  @Output() btnClick = new EventEmitter<MouseEvent>();
  @ViewChild('buttonContent', { static: true }) buttonContent: ElementRef;

  @HostListener('click', ['$event'])
  handleDisabled($event: Event) {
    if (this.disabled) {
      $event.preventDefault();
      $event.stopImmediatePropagation();
    }
  }

  constructor(private cd: ChangeDetectorRef) {
  }

  // 新增click事件，解决直接在host上使用click，在disabled状态下还能触发事件
  onClick(event) {
    if (!this.showLoading) {
      this.btnClick.emit(event);
    }
  }

  ngAfterContentChecked(): void {
    this.cd.detectChanges();
  }

  hasContent() {
    return !!this.buttonContent && this.buttonContent.nativeElement && this.buttonContent.nativeElement.innerHTML.trim();
  }
}
