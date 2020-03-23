import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'd-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioComponent),
    multi: true
  }]
})
export class RadioComponent implements OnInit, ControlValueAccessor {
  _name: string;
  _disabled: boolean;
  __value: string;
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
  get value(): string {
    return this.__value;
  }

  set value(value: string) {
    this.__value = value;
  }

  _value: any;
  handleChange: (event: any, value: any) => void;

  private onChange = (_: any) => null;
  private onTouched = () => null;

  constructor() { }

  ngOnInit() { }

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
}
