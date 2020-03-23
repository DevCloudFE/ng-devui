import {
  Directive,
  HostListener,
  Input,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { OverlayContainerRef } from 'ng-devui/overlay-container';
import { TooltipComponent } from './tooltip.component';
import { PositionType } from './tooltip.types';

@Directive({
  selector: '[dTooltip]',
  exportAs: 'dTooltip',
})
export class TooltipDirective implements OnDestroy {
  @Input() content: string;
  @Input() position: PositionType = 'bottom';
  @Input() showAnimate: boolean;
  tooltipComponentRef: ComponentRef<TooltipComponent>;

  constructor(private triggerElementRef: ElementRef,
              private overlayContainerRef: OverlayContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.show();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hide();
  }

  @HostListener('focus') onFocus() {
    this.show();
  }

  @HostListener('blur') onBlur() {
    this.hide();
  }

  createTooltip() {
    this.tooltipComponentRef = this.overlayContainerRef.createComponent(
      this.componentFactoryResolver.resolveComponentFactory(TooltipComponent)
    );

    Object.assign(this.tooltipComponentRef.instance, {
      content: this.content,
      position: this.position,
      showAnimate: this.showAnimate,
      triggerElementRef: this.triggerElementRef,
    });
  }

  show() {
    if (!this.content) {
      return;
    }

    if (this.tooltipComponentRef) {
      this.destroy();
    }

    this.createTooltip();
    if (this.showAnimate) {
      this.tooltipComponentRef.instance.onShow();
    }
  }

  destroy() {
    if (this.tooltipComponentRef) {
      this.tooltipComponentRef.destroy();
      this.tooltipComponentRef = null;
    }
  }

  hide() {
    if (this.tooltipComponentRef) {
      this.tooltipComponentRef.instance.onHide();
      if (!this.showAnimate) {
        this.destroy();
        return;
      }
      this.tooltipComponentRef.instance.onHidden = () => {
        this.destroy();
      };
    }
  }

  ngOnDestroy() {
    this.destroy();
  }
}
