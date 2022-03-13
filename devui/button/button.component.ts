import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
export type IButtonType = 'button' | 'submit' | 'reset';
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
export class ButtonComponent implements OnInit, AfterContentChecked, OnDestroy {
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
  /** The native `<button class="devui-btn"></button>` element. */
  @ViewChild('button', { static: true }) button: ElementRef<HTMLButtonElement>;

  constructor(private cd: ChangeDetectorRef, private host: ElementRef<HTMLElement>, private ngZone: NgZone) {}

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.host.nativeElement.addEventListener('click', this.handleDisabled);
      this.button.nativeElement.addEventListener('click', this.handleNativeButtonClick);
    });
  }

  ngOnDestroy(): void {
    this.host.nativeElement.removeEventListener('click', this.handleDisabled);
    this.button.nativeElement.removeEventListener('click', this.handleNativeButtonClick);
  }

  ngAfterContentChecked(): void {
    this.cd.detectChanges();
  }

  hasContent() {
    return !!this.buttonContent && this.buttonContent.nativeElement && this.buttonContent.nativeElement.innerHTML.trim();
  }

  private handleDisabled = (event: MouseEvent): void => {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  };

  private handleNativeButtonClick = (event: MouseEvent): void => {
    if (!this.showLoading && this.btnClick.observers.length) {
      this.ngZone.run(() => {
        this.btnClick.emit(event);
        this.cd.markForCheck();
      });
    }
  };
}
