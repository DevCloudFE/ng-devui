import {
  Component, EventEmitter, forwardRef, HostListener, Input,
  Output
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'd-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: [`./toggle.component.scss`],
  exportAs: 'toggle',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ToggleComponent),
    multi: true
  }],
  preserveWhitespaces: false,
})

export class ToggleComponent implements ControlValueAccessor {
  private _checked: boolean;
  private _disabled: boolean;

  @Input() size: 'sm' | '' | 'lg' = '';
  @Input() color: string;
  @Input() beforeChange: (value) => boolean | Promise<boolean> | Observable<boolean>;
  @Input() set checked(v: boolean) {
    this._checked = v === true;
  }

  get checked() {
    return this._checked;
  }

  @Input() set disabled(v: boolean) {
    this._disabled = v === true;
  }

  get disabled() {
    return this._disabled;
  }

  @Output() change = new EventEmitter<boolean>();

  private onTouchedCallback = () => {
  }
  private onChangeCallback = (v: any) => {
  }

  @HostListener('click')
  onToggle() {
    if (this.disabled) {
      return;
    }
    this.canChange().then((change) => {
      if (!change) {
        return;
      }
      this.checked = !this.checked;
      this.change.emit(this.checked);
      this.onChangeCallback(this.checked);
      this.onTouchedCallback();
    });
  }

  canChange() {
    let changeResult = Promise.resolve(true);

    if (this.beforeChange) {
      const result: any = this.beforeChange(this.checked);
      if (typeof result !== 'undefined') {
        if (result.then) {
          changeResult = result;
        } else if (result.subscribe) {
          changeResult = (result as Observable<boolean>).toPromise();
        } else {
          changeResult = Promise.resolve(result);
        }
      }
    }

    return changeResult;
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
