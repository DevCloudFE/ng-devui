import { AfterViewInit, Directive, ElementRef, HostBinding, Input, OnDestroy, Renderer2 } from '@angular/core';
import { DevConfigService, WithConfig } from 'ng-devui/utils';

@Directive({
  selector: '[dTextarea]',
  exportAs: 'dTextarea',
})
export class TextareaDirective implements AfterViewInit, OnDestroy {
  @Input() maxLengthBlocker = false;
  @Input() @HostBinding('style.resize') resize: 'none' | 'vertical' | 'horizontal' | 'both' | 'inherit' = 'none';
  @Input() @HostBinding('class.error') error: boolean;
  @Input() @WithConfig() styleType = 'default';
  @HostBinding('class.devui-gray-style')
  get gray() {
    return this.styleType === 'gray';
  }
  checkMaxLength: any;

  constructor(private devConfigService: DevConfigService, private el: ElementRef, private render: Renderer2) {}

  ngAfterViewInit(): void {
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

  ngOnDestroy(): void {
    if (this.checkMaxLength) {
      this.checkMaxLength();
    }
  }
}
