import { Component, forwardRef, HostListener, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
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
export class RadioComponent implements OnInit, ControlValueAccessor {
  private _name: string;
  private _disabled: boolean;
  private inputValue: string;
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

  @Input() beforeChange: (value) => boolean | Promise<boolean> | Observable<boolean>;

  set value(value: any) {
    this.inputValue = value;
  }

  constructor() {}

  _value: any;
  handleChange: (event: any, value: any) => void;

  @HostListener('click', ['$event'])
  onRadioChange(event) {
    if (this.disabled) {
      event.preventDefault();
    }

    this.canChange().then((change) => {
      if (!change) {
        event.preventDefault();
      }
    });
  }

  private onChange = (_: any) => null;
  private onTouched = () => null;

  ngOnInit() {}

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
    let changeResult = Promise.resolve(true);

    if (this.beforeChange) {
      const result: any = this.beforeChange(this.value);
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
}
