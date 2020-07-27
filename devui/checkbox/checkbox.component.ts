import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  TemplateRef,
  ViewEncapsulation,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'd-checkbox',
  templateUrl: './checkbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./checkbox.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckBoxComponent),
      multi: true
    }
  ]
})
export class CheckBoxComponent implements ControlValueAccessor, OnChanges {
  static ID_SEED = 0;
  @Input() name: string;
  @Input() label: string;
  @Input() cssClass: string;
  @Input() color;
  @Input() disabled = false;
  @Input() isShowTitle = true;
  @Input() title;
  @Input() labelTemplate: TemplateRef<any>;
  @Input() halfchecked = false;
  @Input() showAnimation = true;
  @Input() beforeChange: (value) => boolean | Promise<boolean> | Observable<boolean>;
  @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>();
  public animationUnlocked = false;
  public id: number;
  public checked: boolean;
  private onChange = (_: any) => null;
  private onTouch = () => null;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.id = CheckBoxComponent.ID_SEED++;
  }

  writeValue(checked: any): void {
    if (this.animationUnlocked || checked !== null) {
      this.checked = !!checked;
      this.changeDetectorRef.markForCheck();
      this.unlockAnimation();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  toggle($event) {
    this.canChange().then(val => {
      if (this.disabled || !val) {
        return;
      }
      this.checked = !this.checked;
      this.onChange(this.checked);
      this.change.next(this.checked);
      this.onTouch();
    });
  }

  private unlockAnimation() {
    if (!this.animationUnlocked) {
      setTimeout(() => {
        this.animationUnlocked = true;
      }, 0);
    }
  }

  canChange() {
    let changeResult = Promise.resolve(true);

    if (this.beforeChange) {
      const result: any = this.beforeChange(this.label);
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('halfchecked')) {
      this.unlockAnimation();
    }
  }
}
