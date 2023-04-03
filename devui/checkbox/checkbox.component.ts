import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DevConfigService, WithConfig } from 'ng-devui/utils';
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
export class CheckBoxComponent implements ControlValueAccessor, OnChanges, AfterViewInit {
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
  public animationUnlocked = false;
  public id: number;
  public checked: boolean;
  private onChange = (_: any) => null;
  private onTouch = () => null;

  constructor(private changeDetectorRef: ChangeDetectorRef, private devConfigService: DevConfigService, private el: ElementRef) {
    this.id = CheckBoxComponent.ID_SEED++;
  }

  ngAfterViewInit(): void {
    const glowBox = this.el.nativeElement.querySelector('.devui-checkbox > .devui-checkbox-glow-box');
    const labelDom = this.el.nativeElement.querySelector('.devui-checkbox > label');
    const labelHeight = labelDom && getComputedStyle(labelDom).height;
    if (glowBox && labelHeight && labelHeight !== '16px') {
      glowBox.style.height = labelHeight;
    }
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
    if (Object.prototype.hasOwnProperty.call(changes, 'halfchecked')) {
      this.unlockAnimation();
    }
  }
}
