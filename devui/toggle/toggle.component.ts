import {
  Component, EventEmitter, forwardRef, HostListener, Input,
  Output, TemplateRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AnimationNumberDuration } from 'ng-devui/utils';
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
  content = '';

  @Input() size: 'sm' | '' | 'lg' = '';
  @Input() color: string;
  @Input() beforeChange: (value) => boolean | Promise<boolean> | Observable<boolean>;
  @Input() checkedContent: string | TemplateRef<any>;
  @Input() uncheckedContent: string | TemplateRef<any>;

  get customTemplate() {
    const result = this.checked ? this.checkedContent : this.uncheckedContent;
    if (result instanceof TemplateRef) {
      this.content = '';
      return result;
    } else {
      this.content = result || '';
      return null;
    }
  }

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

  private onTouchedCallback = () => {};
  private onChangeCallback = (v: any) => {};
  isMousedown = false;

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

  @HostListener('mousedown')
  onMousedown() {
    this.isMousedown = true;
  }

  @HostListener('mouseup')
  onMouseup() {
    setTimeout(() => {
      this.isMousedown = false;
    }, AnimationNumberDuration.SLOW / 2);
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
