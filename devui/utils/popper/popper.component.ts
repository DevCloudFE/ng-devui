import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import Popper, {PopperOptions} from 'popper.js';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'popper-component',
  templateUrl: './popper.component.html',
  styleUrls: [`./popper.component.scss`],
})
export class PopperComponent implements AfterViewInit, OnDestroy {

  get open() {
    return this._isOpen;
  }

  @Input() set open(value) {
    if (this._isOpen === value) { return; }
    this.animate = true;
    if (!!value) {
      this.show();
    } else {
      this.close();
    }
    this._isOpen = value;

    PopperComponent.nextTick(() => {
      this.openChange.emit(value);
      this.setBlurListener();
    });
  }
  @Input() fluidPopper = true;
  @Input() appendTo = 'body';
  protected popper: Popper = null;
  protected _isOpen: any = false;
  protected animate: boolean;
  protected popperDirection: string;
  protected directionAnimationTransformOrigin = {
    'top': '0 100%',
    'bottom': '0 0'
  };
  protected popperNode;
  protected popperParent;

  @Output() openChange = new EventEmitter();
  @ViewChild('popperActivator') popperActivator: ElementRef;
  @ViewChild('popperContainer') popperContainer: ElementRef;

  static nextTick(fn) {
    // Force to run fn after current data changed.
    setTimeout(() => fn.bind(this)());
  }
  onDocumentClick = ($event: MouseEvent) => {
    if (!!this.appendTo && this.popperContainer.nativeElement !== $event.target &&
      !this.popperContainer.nativeElement.contains($event.target)) {
      this.open = false;
    } else if (!this.appendTo && this.open && !this.el.nativeElement.contains($event.target)) {
      this.open = false;
    }
  }
  private blockEvent = ($event: MouseEvent) => {
    $event.preventDefault();
    $event.stopPropagation();
  }

  constructor(protected el: ElementRef, protected renderer: Renderer2, protected ngZone: NgZone,
              protected changeDetectorRef: ChangeDetectorRef) {
  }

  show() {
    // Append to selector or original parent.
    if (!!this.appendTo) {
      if (this.fluidPopper) {
        const popperWidth = this.popperActivator.nativeElement && this.popperActivator.nativeElement.offsetWidth;
        this.popperContainer.nativeElement.firstElementChild.style.width = `${popperWidth}px`;
      }
      this.attachPopperContainerToSelector(this.appendTo);
    } else {
      this.attachPopperContainerToNode(this.popperParent);
    }
    this.popper = this.createPopper();
    this.renderer.setStyle(this.popperContainer.nativeElement, 'display', 'block');
  }

  private close() {
    const popperContainer = this.popperContainer.nativeElement;
    this.setTransition('close');
    // For IE 11/Edge
    if (popperContainer.style.transform.match(/scale3d\(1, 1, 1\)/)) {
      // Replace transform open state with close state
      this.renderer.setStyle(popperContainer, 'transform',
        popperContainer.style.transform.replace('scale3d(1, 1, 1)', 'scale3d(1, 0, 1)'));
    } else {
      // perspective(1px) solves pixel shift caused by webkit transform
      this.renderer.setStyle(popperContainer, 'transform',
        popperContainer.style.transform + ` scale3d(1, 0, 1) perspective(1px)`);
    }
    // Set container to transparent
    this.renderer.setStyle(popperContainer, 'opacity', 0);

    // Can't use bind(this) since it calls itself
    const that = this;
    const handler = function (e) {
      if (!that.open && that.popper) {
        // Set final state of container to invisible
        that.renderer.setStyle(popperContainer, 'display', 'none');
        that.animate = false;
        // Remove transition
        that.setTransition();
        that.popper.destroy();
        that.popper = null;
        that.detachPopperContainer();
      }
      e.currentTarget.removeEventListener(e.type, handler);
    };

    this.popperContainer.nativeElement.addEventListener('transitionend', handler);
  }

  setBlurListener() {
    this.ngZone.runOutsideAngular(() => {
      if (this.open) {
        document.addEventListener('click', this.onDocumentClick);
        this.popperContainer.nativeElement.addEventListener('click', this.blockEvent);
      } else {
        document.removeEventListener('click', this.onDocumentClick);
        this.popperContainer.nativeElement.removeEventListener('click', this.blockEvent);
      }
    });
  }

  private applyTransitionStyle(data: Popper.Data) {
    const optionsContainer = this.popperContainer.nativeElement;
    this.updateContainerTransitionDirection(data.flipped);
    if (this.animate) {
      // perspective(1px) solves pixel shift caused by webkit transform
      this.renderer.setStyle(optionsContainer, 'transform',
        optionsContainer.style.transform + ` scale3d(1, 0, 1) perspective(1px)`);
      // Set container init state to transparent as beginning of the transition.
      this.renderer.setStyle(optionsContainer, 'opacity', 0);
      PopperComponent.nextTick(() => {
        this.setTransition('open');
        const that = this;
        const handler = function (e) {
          // remove transition
          that.setTransition();
          e.currentTarget.removeEventListener(e.type, handler);
        };

        optionsContainer.addEventListener('transitionend', handler);
        this.renderer.setStyle(optionsContainer, 'transform',
          optionsContainer.style.transform.replace('scale3d(1, 0, 1)', 'scale3d(1, 1, 1)'));
        this.renderer.setStyle(optionsContainer, 'opacity', 1);
        this.animate = false;
      });
    } else {
      // handle popper re-rendering, incoming transform doesn't have scale info
      this.renderer.setStyle(optionsContainer, 'transform',
        optionsContainer.style.transform + (this.open ? ' scale3d(1, 1, 1)' : ' scale3d(1, 0, 1)') + ' perspective(1px)');
    }
  }

  private updateContainerTransitionDirection(flipped: boolean) {
    const direction = flipped ? 'top' : 'bottom';
    if (this.popperDirection !== direction) {
      this.popperDirection = direction;
      this.setTransitionOrigin();
    }
  }

  private setTransitionOrigin() {
    if (this.popperContainer.nativeElement) {
      this.renderer.setStyle(this.popperContainer.nativeElement, 'transform-origin',
        this.directionAnimationTransformOrigin[this.popperDirection]);
    }
  }

  private createPopper() {
    return new Popper(this.popperActivator.nativeElement, this.popperContainer.nativeElement, {
      placement: 'bottom-start',
      modifiers: {
        preventOverflow: {
          // Do not stick to the window edge
          escapeWithReference: true,
          // boundariesElement: 'viewport'
        },
        applyReactStyle: {
          enabled: true,
          // Apply extra transition and transform to popper
          fn: this.applyTransitionStyle.bind(this),
        },
        offset: {
          // Set vertical offset 5px
          offset: '0, 5px'
        }
      },
      positionFixed: !!this.appendTo
    } as PopperOptions);
  }

  private setTransition(command = null) {
    const popperContainer = this.popperContainer.nativeElement;
    if (this.animate && command) {
      if (command === 'open') {
        this.renderer.setStyle(popperContainer, 'transition', 'transform .2s cubic-bezier(0.23, 1, 0.32, 1)');
      } else if (command === 'close') {
        popperContainer.style.transition = 'all .15s cubic-bezier(0.755, 0.05, 0.855, 0.06)';
      }
    } else {
      this.renderer.setStyle(popperContainer, 'transition', null);
    }
  }

  public update() {
    PopperComponent.nextTick(() => {
      if (this.popper) { this.popper.update(); }
    });
  }

  ngOnDestroy() {
    // Close popper
    this.open = false;
  }

  private detachPopperContainer() {
    // Cache popper's parent and popper node.
    this.popperParent = this.popperContainer.nativeElement.parentNode;
    this.popperNode = this.popperContainer.nativeElement;
    if (this.popperParent && this.popperNode) {
      this.popperParent.removeChild(this.popperNode);
    }
  }

  private attachPopperContainerToNode(nodeParent) {
    if (nodeParent && this.popperNode) {
      this.popperParent = nodeParent;
      this.popperParent.appendChild(this.popperNode);
    }
  }

  private attachPopperContainerToSelector(targetSelector) {
    const nodeParent = document.querySelector(targetSelector);
    this.attachPopperContainerToNode(nodeParent);
  }


  ngAfterViewInit(): void {
    // Detach popper container once view initialized.
    this.detachPopperContainer();
  }
}
