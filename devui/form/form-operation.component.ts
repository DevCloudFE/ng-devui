import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  Host,
  HostBinding,
  Input,
  OnDestroy,
  Optional,
  Renderer2,
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormDirective } from './form.directive';

@Component({
  selector: 'd-form-operation',
  template: '<ng-content></ng-content>',
  styles: [
    `
      .devui-form-horizontal :host.devui-form-operation {
        display: block;
        margin-left: 96px;
      }
      .devui-form-vertical :host.devui-form-operation {
        display: block;
      }
      .devui-form-columns :host.devui-form-operation {
        display: block;
        padding: 8px 0;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class FormOperationComponent {
  constructor(elementRef: ElementRef, renderer: Renderer2) {
    renderer.addClass(elementRef.nativeElement, 'devui-form-operation');
  }
}

@Directive({
  selector: '[dFormSubmit]',
})
export class DFormSubmitDirective implements AfterViewInit, OnDestroy {
  @HostBinding('class.devui-form-submit') default = true;

  _eventName = 'click';
  @Input('dFormSubmit')
  set eventName(eventName) {
    if (eventName) {
      this._eventName = eventName;
      this.registerEvent();
    }
  }

  @Input('dFormSubmitData') data: any;

  private destroy$ = new Subject<void>();

  // TODO：这里是否需要接管如果所关联的表单校验不通过，切换到disabled状态

  constructor(private elementRef: ElementRef, @Optional() @Host() private _dForm: FormDirective) {}

  ngAfterViewInit() {
    this.registerEvent();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  registerEvent() {
    this.destroy$.next();
    fromEvent(this.elementRef.nativeElement, this._eventName)
      .pipe(takeUntil(this.destroy$))
      .subscribe(($event) => {
        if (this._dForm) {
          this._dForm.updateOnSubmit($event, this.data);
        }
      });
  }
}

@Directive({
  selector: '[dFormReset]',
})
export class DFormResetDirective implements AfterViewInit, OnDestroy {
  @HostBinding('class.devui-form-reset') default = true;

  // TODO: emit now form
  // TODO: Abstract a parent class
  _eventName = 'click';
  @Input('dFormReset')
  set eventName(eventName) {
    if (eventName) {
      this._eventName = eventName;
      this.registerEvent();
    }
  }

  private destroy$ = new Subject<void>();

  constructor(private elementRef: ElementRef, @Optional() @Host() private _dForm: FormDirective) {}

  ngAfterViewInit() {
    this.registerEvent();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  registerEvent() {
    this.destroy$.next();
    fromEvent(this.elementRef.nativeElement, this._eventName)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this._dForm) {
          this._dForm.updateOnReset();
        }
      });
  }
}
