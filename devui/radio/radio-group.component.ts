import {
  Component,
  Input,
  Output,
  forwardRef,
  EventEmitter,
  ContentChildren,
  QueryList,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

import { RadioComponent } from './radio.component';

@Component({
  selector: 'ave-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss', './radio.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioGroupComponent),
    multi: true
  }]
})
export class RadioGroupComponent implements ControlValueAccessor, OnChanges, AfterViewInit {

  @Input() name: string;
  @Input() values: any[];
  @Input() cssStyle: 'row' | 'column';
  @Input() color = '#5170FF';
  @Input() disabled: boolean;
  @Output() change = new EventEmitter<any>();
  @ContentChildren(RadioComponent) radios: QueryList<RadioComponent> = new QueryList<RadioComponent>();

  _value: any;
  onChange: (_: any) => null;
  onTouched: () => null;

  constructor() {}

  ngAfterViewInit(): void {
    this.radios.forEach(radio => {
      this.registerRadio(radio);
    });

    this.radios.changes.subscribe((radio: RadioComponent) => {
      this.registerRadio(radio);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.name && this.radios) {
      this.radios.forEach(radio => {
        radio.name = this.name;
      });
    }

    if (changes && changes.disabled && this.radios) {
      this.radios.forEach(radio => {
        radio.disabled = this.disabled;
      });
    }

    if (changes && changes.color && this.radios) {
      this.radios.forEach(radio => {
        radio.disabled = this.disabled;
      });
    }
  }

  registerRadio(radio: RadioComponent) {
    radio.registerOnChange((value: any) => {
      this.writeValue(value);
      this.onChange(value);
      this.change.emit(value);
    });
  }

  handleChange($event, value) {
    $event.stopPropagation();
    this.writeValue(value);
    this.onChange(value);
    this.change.emit(value);
  }

  writeValue(value: any) {
    this._value = value;

    if (this.radios && this.radios.length > 0) {
      this.radios.forEach(radio => {
        radio.writeValue(this._value);
      });
    }
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

}
