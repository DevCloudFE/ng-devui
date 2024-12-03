import {
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DevConfigService, WithConfig } from 'ng-devui/utils';
import { Observable } from 'rxjs';
import { RadioComponent } from './radio.component';

@Component({
  selector: 'd-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss', './radio.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true,
    },
  ],
  preserveWhitespaces: false,
})
export class RadioGroupComponent implements ControlValueAccessor, OnChanges, AfterViewInit {
  @Input() name: string;
  @Input() values: any[];
  /**
   * @deprecated Use direction to replace.
   */
  @Input() set cssStyle(direction: any) {
    this.direction = direction;
  }
  @Input() direction: 'row' | 'column';
  @Input() disabled: boolean;
  @Input() @WithConfig() showGlowStyle = true;
  @HostBinding('class.devui-glow-style') get hasGlowStyle() {
    return this.showGlowStyle;
  }
  @Input() beforeChange: (value) => boolean | Promise<boolean> | Observable<boolean>;
  @Output() change = new EventEmitter<any>();
  @ContentChildren(RadioComponent) radios: QueryList<RadioComponent> = new QueryList<RadioComponent>();

  _value: any;
  onChange: (_: any) => null;
  onTouched: () => null;
  @HostListener('click', ['$event'])
  onRadioChange(event) {
    const target = event.target;
    if (target.tagName.toLowerCase() === 'input') {
      event.preventDefault();
      if (this.disabled) {
        return;
      }
      let value = target.value;
      if (this.radios.length) {
        const result = this.radios.find((item) => item.id === target.id);
        value = result?.value || value;
      }
      this.canChange(value).then((change) => {
        if (change) {
          this._value = value;
          this.onChange(value);
          this.change.emit(value);
        }
      });
    }
  }

  constructor(private devConfigService: DevConfigService) {}

  ngAfterViewInit(): void {
    this.radios.forEach((radio) => {
      this.registerRadio(radio);
    });

    this.radios.changes.subscribe((newRadios) => {
      newRadios.forEach((radio: RadioComponent) => {
        this.registerRadio(radio);
        Promise.resolve(true).then(() => radio.writeValue(this._value));
      });
    });

    this.radios.notifyOnChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.name && this.radios) {
      this.radios.forEach((radio) => {
        radio.name = this.name;
      });
    }

    if (changes && changes.disabled && this.radios) {
      this.radios.forEach((radio) => {
        radio.disabled = this.disabled;
      });
    }

    if (changes && this.radios) {
      this.radios.forEach((radio) => {
        radio.disabled = this.disabled;
      });
    }
  }

  registerRadio(radio: RadioComponent) {
    radio.registerOnChange((value: any) => {
      this.writeValue(value);
      this.onChange(value);
      Promise.resolve().then(() => this.onTouched());
      this.change.emit(value);
    });
  }

  canChange(value: any) {
    let changeResult = Promise.resolve(true);
    if (this.beforeChange) {
      const result: any = this.beforeChange(value);
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

  handleChange($event, value) {
    $event.stopPropagation();
    this.writeValue(value);
    this.onChange(value);
    this.change.emit(value);
  }

  writeValue(value: any) {
    this._value = value;
    if (this.radios && this.radios.length > 0) {
      this.radios.forEach((radio) => {
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
