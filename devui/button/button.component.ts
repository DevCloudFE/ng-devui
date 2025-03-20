import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output, Renderer2, SimpleChanges,
  TemplateRef,
  ViewChild, OnChanges
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
  standalone: false
})
export class ButtonComponent implements AfterContentChecked, OnChanges {
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

  constructor(
    private cd: ChangeDetectorRef,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.disabled?.currentValue) {
      this.renderer.setStyle(
        this.el.nativeElement,
        'cursor',
        'not-allowed'
      );
      this.renderer.setStyle(
        this.el.nativeElement,
        'pointer-events',
        'none'
      );
    } else if (!changes?.disabled?.currentValue) {
      this.renderer.removeStyle(
        this.el.nativeElement,
        'cursor'
      );
      this.renderer.removeStyle(
        this.el.nativeElement,
        'pointer-events'
      );
    }
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
