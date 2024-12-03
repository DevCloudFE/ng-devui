import { AfterViewInit, Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DevConfigService, WithConfig } from 'ng-devui/utils';
import { TextareaDirective } from './textarea.directive';

@Component({
  selector: 'd-textarea-max-length',
  templateUrl: './textarea-max-length.component.html',
  styleUrls: ['./textarea-max-length.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaMaxLengthComponent),
      multi: true,
    },
  ],
  preserveWhitespaces: false,
})
export class TextareaMaxLengthComponent implements ControlValueAccessor, AfterViewInit {
  @ViewChild(TextareaDirective) textareaInstance: TextareaDirective;
  @Input() disabled = false;
  @Input() error = false;
  @Input() maxLength: number;
  @Input() maxLengthBlocker = false;
  @Input() placeholder: string;
  @Input() rows = 3;
  @Input() maxWidth: string;
  @Input() maxHeight: string;
  @Input() resize: 'none' | 'vertical' | 'horizontal' | 'both' | 'inherit' = 'none';
  @Input() @WithConfig() styleType = 'default';
  @Input() @WithConfig() showGlowStyle = true;

  textareaElement: HTMLTextAreaElement;
  value: string;

  private onChange = (_: any) => null;
  private onTouch = () => null;

  constructor(private el: ElementRef, private devConfigService: DevConfigService) {}

  ngAfterViewInit(): void {
    this.textareaElement = this.el.nativeElement.querySelector('textarea');
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(val: string): void {
    this.value = val;
  }

  valueChanges(val: string): void {
    this.value = val;
    this.onChange(val);
    this.onTouch();
  }

  blurEvent(): void {
    const event = new Event('blur', { bubbles: false, cancelable: true });
    this.el.nativeElement.dispatchEvent(event);
  }
}
