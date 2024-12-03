import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, HostBinding, Inject, Input, OnDestroy, Optional, Renderer2, Self } from '@angular/core';
import { NgModel } from '@angular/forms';
import { DevConfigService, WithConfig } from 'ng-devui/utils';

@Directive({
  selector: '[dTextarea]',
  exportAs: 'dTextarea',
})
export class TextareaDirective implements AfterViewInit, OnDestroy {
  @Input() maxLengthBlocker = false;
  @Input() maxLengthCounter = false;
  @Input() @HostBinding('style.resize') resize: 'none' | 'vertical' | 'horizontal' | 'both' | 'inherit' = 'none';
  @Input() @HostBinding('class.error') error: boolean;
  @Input() @HostBinding('attr.rows') rows = 3;
  @Input() @WithConfig() styleType = 'default';
  @Input() @WithConfig() showGlowStyle = true;
  @HostBinding('class.devui-glow-style') get hasGlowStyle() {
    return this.showGlowStyle;
  }
  @HostBinding('class.devui-gray-style') get gray() {
    return this.styleType === 'gray';
  }
  checkMaxLength: Function;
  getMaxLength: Function;
  counter: HTMLSpanElement;
  counterInner: HTMLElement;
  document: any;
  resizeWatcher: any;
  fontSize = 12;

  constructor(
    @Optional() @Self() private ngModel: NgModel,
    @Inject(DOCUMENT) private doc: any,
    private devConfigService: DevConfigService,
    private el: ElementRef,
    private render: Renderer2
  ) {
    this.document = this.doc;
    const root = getComputedStyle(this.document.querySelector(':root'));
    this.fontSize = parseInt(root.getPropertyValue('--devui-font-size-sm'), 10) || 12;
  }

  ngAfterViewInit(): void {
    this.setMaxLengthBlocker();
    this.setMaxLengthCounter();
    // 监听 ngModel 变化
    const max = this.el.nativeElement.maxLength;
    const rules = [!!this.ngModel, this.maxLengthCounter, !!max];
    if (!rules.includes(false)) {
      this.ngModel.valueChanges.subscribe((value) => {
        const content = value || this.el.nativeElement.value || '';
        this.counterInner.textContent = `${content.length}/${max}`;
      });
    }
  }

  ngOnDestroy(): void {
    if (this.checkMaxLength) {
      this.checkMaxLength();
    }
    if (this.getMaxLength) {
      this.getMaxLength();
    }
    if (this.resizeWatcher) {
      this.resizeWatcher.unobserve();
    }
  }

  setMaxLengthBlocker(): void {
    if (this.maxLengthBlocker) {
      this.checkMaxLength = this.render.listen(this.el.nativeElement, 'compositionupdate', () => {
        /**
         * 通过失焦中断composition输入事件规避chrome textarea中文符号输入超出最大宽度问题，如浏览器修复该问题可移除此方法
         * 复现步骤：
         * 1. 输若干入内容
         * 2. 回车换行
         * 3. 粘贴内容至最大长度
         * 4. 输入中文等触发composition事件输入法的符号
         */
        const max = this.el.nativeElement.maxLength;
        const len = (this.el.nativeElement.textContent || this.el.nativeElement.value).length;
        if (max <= len) {
          this.el.nativeElement.blur();
          this.el.nativeElement.focus();
        }
      });
    }
  }

  setMaxLengthCounter(): void {
    const max = this.el.nativeElement.maxLength;
    if (this.maxLengthCounter && max) {
      const length = this.ngModel?.model ? this.ngModel.model.length : this.el.nativeElement.value.length;
      this.counter = this.document.createElement('span');
      this.counter.className = 'devui-textarea-counter';
      this.counterInner = this.document.createElement('i');
      this.counterInner.textContent = `${length}/${max}`;
      this.counterInner.style.width = `${(String(max).length * 2 + 1) * this.fontSize}px`;
      this.counter.appendChild(this.counterInner);
      this.el.nativeElement.after(this.counter);
      this.checkMaxLength = this.render.listen(this.el.nativeElement, 'input', () => {
        this.counterInner.textContent = `${this.el.nativeElement.value.length}/${max}`;
      });
      this.resizeWatcher = new ResizeObserver(() => {
        this.counter.style.left = `${this.el.nativeElement.offsetWidth - this.counterInner.offsetWidth}px`;
        this.counter.style.top = `${this.el.nativeElement.offsetHeight - this.counter.offsetHeight}px`;
      }).observe(this.el.nativeElement);
    }
  }
}
