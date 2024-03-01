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
import { AnimationNumberDuration } from 'ng-devui/utils';
export type IButtonType = 'button' | 'submit' | 'reset';
/**
 * 类型中text-dark参数废弃
 */
export type IButtonStyle = 'common' | 'primary' | 'text' | 'text-dark' | 'danger' | 'success' | 'warning';
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
  @Input() shape: 'circle';
  @Input() bsSize: IButtonSize = 'md';
  /**
   * @deprecated
   * 原左右按钮用按钮组实现
   */
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

  waveLeft = 0;
  waveTop = 0;
  showWave = false;
  isMouseDown = false;

  constructor(private cd: ChangeDetectorRef) {
  }

  // 新增click事件，解决直接在host上使用click，在disabled状态下还能触发事件
  onClick(event) {
    if (!this.showLoading) {
      this.btnClick.emit(event);
    }
    this.showClickWave(event);
  }

  showClickWave(event) {
    this.waveLeft = event.offsetX;
    this.waveTop = event.offsetY;
    this.showWave = true;

    setTimeout(() => {
      this.showWave = false;
      this.cd.detectChanges();
    }, AnimationNumberDuration.SLOW);
  }

  ngAfterContentChecked(): void {
    this.cd.detectChanges();
  }

  hasContent() {
    return !!this.buttonContent && this.buttonContent.nativeElement && this.buttonContent.nativeElement.innerHTML.trim();
  }
}
