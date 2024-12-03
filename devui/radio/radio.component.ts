import { Component, forwardRef, HostBinding, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DevConfigService, WithConfig } from 'ng-devui/utils';
import { Observable } from 'rxjs';

@Component({
  selector: 'd-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true,
    },
  ],
  preserveWhitespaces: false,
})
export class RadioComponent implements ControlValueAccessor {
  private _name: string;
  private _disabled: boolean;
  private inputValue: string;
  id: string;
  @Input()
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = value;
  }

  @Input()
  get value(): any {
    return this.inputValue;
  }
  set value(value: any) {
    this.inputValue = value;
    if (value instanceof Object) {
      this.id = '';
    } else {
      this.id = `${this.name}-${value}`;
    }
  }

  @Input() beforeChange: (value) => boolean | Promise<boolean> | Observable<boolean>;
  @Input() @WithConfig() showGlowStyle = true;
  @HostBinding('class.devui-glow-style') get hasGlowStyle() {
    return this.showGlowStyle;
  }
  @HostListener('click', ['$event'])
  onRadioChange(event) {
    event.preventDefault();
    if (this.disabled) {
      return;
    }
    this.canChange().then((change) => {
      if (change) {
        this._value = this.value;
        this.onChange(this.value);
      }
    });
  }

  _value: any;
  handleChange: (event: any, value: any) => void;

  private onChange = (_: any) => null;
  private onTouched = () => null;

  constructor(private devConfigService: DevConfigService) {}

  registerHandleChange(fn: any) {
    this.handleChange = fn;
  }

  writeValue(obj: any): void {
    this._value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  handleModelChange($event, value) {
    $event.stopPropagation();
    this._value = value;
    this.onTouched();
    this.onChange(value);
  }

  canChange() {
    let changeResult: Promise<boolean> | Observable<boolean> = Promise.resolve(true);
    if (this.beforeChange) {
      const result = this.beforeChange(this.value);
      if (typeof result !== 'undefined') {
        if ((result as Promise<boolean>).then) {
          changeResult = result as Promise<boolean>;
        } else if ((result as Observable<boolean>).subscribe) {
          changeResult = (result as Observable<boolean>).toPromise();
        } else {
          changeResult = Promise.resolve(result as boolean);
        }
      }
    }
    return changeResult;
  }
}
