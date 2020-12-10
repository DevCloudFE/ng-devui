import {
  Directive,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ComponentRef,
  ComponentFactoryResolver,
  ElementRef,
  TemplateRef,
  OnInit
} from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { OverlayContainerRef } from 'ng-devui/overlay-container';
import { PopoverComponent } from 'ng-devui/popover';
import { PositionType } from 'ng-devui/tooltip';
import { I18nInterface, I18nService } from 'ng-devui/i18n';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[dClipboard]'
})
export class ClipboardDirective implements OnInit , OnDestroy {
  @Input('dClipboard') devuiTargetElm: HTMLInputElement | HTMLTextAreaElement | undefined | '';
  @Input() container: HTMLElement;
  @Input() content: string | undefined;
  @Input() position: PositionType = 'top';
  @Input() sticky = false;
  @Input() tipContent: string | HTMLElement | TemplateRef<any>;
  @Output() copyResultEvent = new EventEmitter<any>();
  popoverComponentRef: ComponentRef<PopoverComponent>;
  i18nCommonText: I18nInterface['common'];
  i18nSubscription: Subscription;

  constructor(
    private elm: ElementRef,
    private clipboard: Clipboard,
    private i18n: I18nService,
    private overlayContainerRef: OverlayContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit(): void {
    this.setI18nText();
  }

  setI18nText() {
    this.i18nCommonText = this.i18n.getI18nText().common;
    this.i18nSubscription = this.i18n.langChange().subscribe((data) => {
      this.i18nCommonText = data.common;
    });
  }

  @HostListener('click')
  onClickEvent() {
    let isSucceeded = false;
    const isSupported = !!document.queryCommandSupported && !!document.queryCommandSupported('copy') && !!window;
    if (isSupported && this.content) {
      isSucceeded = this.clipboard.copy(this.content);
      if (isSucceeded) {
        this.tipContent = this.tipContent || this.i18nCommonText.copied;
        this.createPopover();
      }
      const result = { isSupported: isSupported, isSucceeded: isSucceeded, content: this.content };
      this.copyResultEvent.emit(result);
    }
  }

  createPopover() {
    if (this.popoverComponentRef) {
      this.popoverComponentRef.destroy();
    }
    this.popoverComponentRef = this.overlayContainerRef.createComponent(
      this.componentFactoryResolver.resolveComponentFactory(PopoverComponent)
    );
    Object.assign(this.popoverComponentRef.instance, {
      content: this.tipContent,
      triggerElementRef: this.elm,
      position: this.position,
      popType: 'default',
      popMaxWidth: 200,
      appendToBody: true,
      zIndex: 1060
    });
    document.addEventListener('click', this.onDocumentClick);
    if (!this.sticky) {
      setTimeout(() => this.destroy(), 3000);
    }
  }

  destroy() {
    if (this.popoverComponentRef) {
      this.popoverComponentRef.destroy();
      this.popoverComponentRef = null;
    }
    document.removeEventListener('click', this.onDocumentClick);
  }

  onDocumentClick = (event) => {
    event.stopPropagation();
    if (!this.elm.nativeElement.contains(event.target)) {
      this.destroy();
    }
  }

  ngOnDestroy() {
    if (this.i18nSubscription) {
      this.i18nSubscription.unsubscribe();
    }
  }
}
