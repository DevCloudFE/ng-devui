import { Component, EventEmitter, forwardRef, HostListener, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ave-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: [`./toggle.component.scss`],
  exportAs: 'toggle',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ToggleComponent),
    multi: true
  }]
})

export class ToggleComponent implements ControlValueAccessor {
  private _checked: boolean;
  private _disabled: boolean;

  @Input() size = 'small';
  @Output() change = new EventEmitter<boolean>();
  @Input() color: string;
  @Input() set checked(v: boolean) {
    this._checked = v !== false;
  }

  get checked() {
    return this._checked;
  }

  @Input() set disabled(v: boolean) {
    this._disabled = v !== false;
  }

  get disabled() {
    return this._disabled;
  }

  private onTouchedCallback = (v: any) => {
  }
  private onChangeCallback = (v: any) => {
  }

  @HostListener('click')
  onToggle() {
    if (this.disabled) {
      return;
    }
    this.checked = !this.checked;
    this.change.emit(this.checked);
    this.onChangeCallback(this.checked);
    this.onTouchedCallback(this.checked);
  }

  writeValue(obj: any): void {
    if (obj !== this.checked) {
      this.checked = !!obj;
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
}
