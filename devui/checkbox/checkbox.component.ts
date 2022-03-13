import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DevConfigService, WithConfig } from 'ng-devui/utils/globalConfig';
import { Observable } from 'rxjs';

@Component({
  selector: 'd-checkbox',
  templateUrl: './checkbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckBoxComponent),
      multi: true,
    },
  ],
  preserveWhitespaces: false,
})
export class CheckBoxComponent implements ControlValueAccessor, OnChanges, OnInit, OnDestroy {
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
  @Input() @WithConfig() showAnimation = true;
  @Input() beforeChange: (value) => boolean | Promise<boolean> | Observable<boolean>;
  @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>();
  /** The native `<input type="checkbox" />` element. */
  @ViewChild('checkbox', { static: true }) checkbox: ElementRef<HTMLInputElement>;
  public animationUnlocked = false;
  public id: number;
  public checked: boolean;
  private onChange = (_: any) => null;
  private onTouch = () => null;

  constructor(private ngZone: NgZone, private changeDetectorRef: ChangeDetectorRef, private devConfigService: DevConfigService) {
    this.id = CheckBoxComponent.ID_SEED++;
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.checkbox.nativeElement.addEventListener('click', stopPropagation);
      this.checkbox.nativeElement.addEventListener('change', stopPropagation);
    });
  }

  ngOnDestroy(): void {
    this.checkbox.nativeElement.removeEventListener('click', stopPropagation);
    this.checkbox.nativeElement.removeEventListener('change', stopPropagation);
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
    this.canChange().then((val) => {
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

function stopPropagation(event: Event): void {
  event.stopPropagation();
}
