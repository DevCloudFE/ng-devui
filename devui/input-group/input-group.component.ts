import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  Renderer2,
  TemplateRef,
  ViewChild
} from '@angular/core';

export type ISpliceType = 'standalone' | 'left' | 'right' | 'both';

@Component({
  selector: 'd-input-group',
  templateUrl: './input-group.component.html',
  styleUrls: ['./input-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class InputGroupComponent implements AfterViewInit, OnDestroy {
  @Input() isEmbed = false;
  @Input() disabled = false;
  @Input() prefixContent: string | TemplateRef<any>;
  @Input() suffixContent: string | TemplateRef<any>;
  @Input() spliceType: ISpliceType = 'standalone';
  @ViewChild('container') container: ElementRef;
  @HostBinding('class.embed')
  get embed() {
    return this.isEmbed;
  }

  isPrefix = false;
  isSuffix = false;
  innerContentClass = '';

  private parent: HTMLElement;
  private resizeObserver: any;

  constructor(private cdr: ChangeDetectorRef, private el: ElementRef, private render: Renderer2) {}

  ngAfterViewInit(): void {
    if (this.el.nativeElement.parentElement && !this.isEmbed) {
      this.parent = this.el.nativeElement.parentElement;
      this.handlerSpliceStatus();
      // 监听父容器尺寸变化刷新拼接效果
      this.resizeObserver = new (window as any).ResizeObserver(() => this.handlerSpliceStatus());
      this.resizeObserver.observe(this.parent);
    }
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.unobserve(this.parent);
    }
  }

  checkIsInputGroup(dom: HTMLElement) {
    return dom?.nodeName === 'D-INPUT-GROUP' && dom;
  }

  handlerSpliceStatus = () => {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const previous = this.checkIsInputGroup(this.el.nativeElement.previousElementSibling);
    const next = this.checkIsInputGroup(this.el.nativeElement.nextElementSibling);
    this.spliceLeft(previous, rect);
    this.spliceRight(next, rect);
    this.setInnerContentBorderRadius();
  };

  spliceLeft(previous: HTMLElement, rect: DOMRect) {
    if (previous && ['left', 'both'].includes(this.spliceType)) {
      const previousRect = previous.getBoundingClientRect();
      this.isPrefix = rect.left > previousRect.left;
      if (this.isPrefix) {
        this.render.addClass(this.el.nativeElement, 'devui-splice-left-item');
        return;
      }
    }
    this.render.removeClass(this.el.nativeElement, 'devui-splice-left-item');
  }

  spliceRight(next: HTMLElement, rect: DOMRect) {
    if (next && ['right', 'both'].includes(this.spliceType)) {
      const nextRect = next.getBoundingClientRect();
      this.isSuffix = nextRect.left > rect.left;
      if (this.isSuffix) {
        this.render.addClass(this.el.nativeElement, 'devui-splice-right-item');
        return;
      }
    }
    this.render.removeClass(this.el.nativeElement, 'devui-splice-right-item');
  }

  setInnerContentBorderRadius() {
    const isPrefix = this.isPrefix || this.prefixContent;
    const isSuffix = this.isSuffix || this.suffixContent;
    const prefix = isPrefix && 'prefix';
    const suffix = isSuffix && 'suffix';
    this.innerContentClass = isPrefix && isSuffix ? 'both' : prefix || suffix || '';
    this.cdr.markForCheck();
  }

  changeInputPadding(pos: ISpliceType, style: string): void {
    if (this.isEmbed && this.container) {
      const dom = this.container.nativeElement.querySelector('input[dTextInput]');
      if (!dom) {
        return;
      }
      if (['right', 'both'].includes(pos)) {
        this.render.setStyle(dom, 'padding-right', style);
      }
      if (['left', 'both'].includes(pos)) {
        this.render.setStyle(dom, 'padding-left', style);
      }
    }
  }
}
