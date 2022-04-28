import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent, Observable, Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';

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
export class RadioGroupComponent implements ControlValueAccessor, OnChanges, OnInit, AfterViewInit, OnDestroy {
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
  @Input() beforeChange: (value) => boolean | Promise<boolean> | Observable<boolean>;
  @Output() change = new EventEmitter<any>();
  @ContentChildren(RadioComponent) radios: QueryList<RadioComponent> = new QueryList<RadioComponent>();

  _value: any;
  onChange: (_: any) => null;
  onTouched: () => null;

  private destroy$ = new Subject<void>();

  constructor(private ngZone: NgZone, private host: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() =>
      fromEvent(this.host.nativeElement, 'click')
        .pipe(
          filter((event) => (event.target as HTMLElement).tagName.toLowerCase() === 'input'),
          switchMap((event) => {
            if (this.disabled) {
              event.preventDefault();
            }
            return this.canChange().then((change) => ({ event, change }));
          }),
          takeUntil(this.destroy$)
        )
        .subscribe(({ event, change }) => {
          if (!change) {
            event.preventDefault();
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

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

  canChange() {
    let changeResult = Promise.resolve(true);
    if (this.beforeChange) {
      const result: any = this.beforeChange(this.values);
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
