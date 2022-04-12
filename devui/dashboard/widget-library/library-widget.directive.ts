import { DomPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import {
  AfterViewInit, ApplicationRef, ComponentFactoryResolver, Directive, ElementRef, HostBinding, Injector,
  Input, OnChanges, OnDestroy, Optional, SimpleChanges, TemplateRef, ViewContainerRef
} from '@angular/core';
import { DashboardComponent } from '../dashboard.component';
import { GridStackService } from '../grid-stack.service';
import { DashboardLibraryPanelDirective } from '../widget-library/library-panel.directive';

@Directive({
  selector: '[dDashboardLibraryWidget]',
})
export class DashboardLibraryWidgetDirective implements OnChanges, AfterViewInit, OnDestroy {
  @HostBinding('attr.gs-w')
  @Input()
  width: number;

  @HostBinding('attr.gs-h')
  @Input()
  height: number;

  @Input() widgetData;

  @Input() dragMode: 'copy' | 'move' = 'copy';
  @Input() dragTemplate: TemplateRef<any>;
  @Input() dragDisabled = false;
  @Input() dragCopyStyle = false;

  @HostBinding('class.grid-stack-new-item')
  hostBinding = true;
  @HostBinding('attr.gs-instance')
  gridStackId;

  @Input() targetDashboard: DashboardComponent;
  isSetup = false;
  get gridStackService(): GridStackService {
    return this.targetDashboard?.gridStackService;
  }
  constructor(
    private el: ElementRef,
    private cfr: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    private vcf: ViewContainerRef,
    @Optional() private libraryPanel: DashboardLibraryPanelDirective
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.targetDashboard) {
      this.setup();
    }
    if (changes.dragDisabled) {
      if (this.dragDisabled) {
        GridStackService.disableDrag(this.el.nativeElement);
      } else {
        GridStackService.enableDrag(this.el.nativeElement);
      }
    }
  }
  ngAfterViewInit() {
    if (!this.isSetup) {
      GridStackService.cleanDragIn(this.el.nativeElement);
      this.setup();
    }
  }

  ngOnDestroy() {
    if (this.gridStackService) {
      this.gridStackService.destroyDragIn(this.el.nativeElement);
    }
  }

  setup() {
    if (this.targetDashboard && !this.isSetup) {
      setTimeout(() => {
        if (this.gridStackService && this.gridStackService.gridStack) {
          GridStackService.cleanDragIn(this.el.nativeElement);
          this.gridStackService.setupDragIn(this.el.nativeElement, this, this.helper, this.notify);
          if (this.dragDisabled) {
            GridStackService.disableDrag(this.el.nativeElement);
          }
        }
      });
      this.isSetup = true;
    }
  }
  notify = (event: 'dragStart' | 'dragStop' | string) => {
    if (this.libraryPanel) {
      if (event === 'dragStart') {
        return (...args) => {
          this.libraryPanel.dragStartHandler();
        };
      }
      if (event === 'dragStop') {
        return (...args) => {
          this.libraryPanel.dragStopHandler();
        };
      }
    } else {
      return () => { };
    }
  };

  helper = (event) => {
    if (this.dragMode === 'move') {
      // grid stack 有高度变化的bug， 暂时就不解决了
      return this.el.nativeElement;
    }
    if (!this.dragTemplate) {
      const el = this.el.nativeElement.cloneNode(true);
      el.style.zIndex = '1060';
      this.copyCanvas(this.el.nativeElement, el);
      if (this.dragCopyStyle) {
        this.copyStyle(this.el.nativeElement, el);
      }
      return el;
    } else {
      const el = document.createElement('div');
      el.classList.add('grid-stack-item-adding-item-template');
      el.style.zIndex = '1060';
      if (this.width !== undefined) {
        el.setAttribute('gs-w', `${this.width}`);
      }
      if (this.height !== undefined) {
        el.setAttribute('gs-h', `${this.height}`);
      }
      this.setDragWidthHeight(el);
      const domPortalOutlet = new DomPortalOutlet(el, this.cfr, this.appRef, this.injector);
      domPortalOutlet.attachTemplatePortal(
        new TemplatePortal(this.dragTemplate, this.vcf, {
          $implicit: this.widgetData,
          width: this.width,
          height: this.height,
        })
      );
      const result = el.cloneNode(true);
      this.copyCanvas(el, result);
      if (this.dragCopyStyle) {
        this.copyStyle(el, result);
      }
      domPortalOutlet.detach();
      domPortalOutlet.dispose();
      return result;
    }
  };

  copyCanvas(origin, target) {
    // 拷贝canvas的内容
    const originCanvasArr = origin.querySelectorAll('canvas');
    const targetCanvasArr = target.querySelectorAll('canvas');
    [].forEach.call(targetCanvasArr, (canvas, index) => {
      canvas.getContext('2d').drawImage(originCanvasArr[index], 0, 0);
    });
  }

  setDragWidthHeight(el) {
    const columnWidth = this.targetDashboard.getCurrentColumnWidth();
    const cellHeight = this.targetDashboard.getCurrentCellHeight();
    const margin = this.targetDashboard.getCurrentMargin();
    if (this.width) {
      el.style.width = columnWidth * (this.width || 1) - margin * ((this.width || 1) - 1) + 'px';
    }
    if (this.height) {
      el.style.height = cellHeight * (this.height || 1) - margin * 2 + 'px';
    }
  }
  copyStyle(source, target) {
    ['id', 'style', 'draggable'].forEach((att) => {
      target.removeAttribute(att);
    });

    // copy style (without transitions)
    const computedStyle = getComputedStyle(source);
    for (let i = 0; i < computedStyle.length; i++) {
      const key = computedStyle[i];
      if (key.indexOf('transition') < 0) {
        target.style[key] = computedStyle[key];
      }
    }
    target.style.pointerEvents = 'none';
    // and repeat for all children
    for (let i = 0; i < source.children.length; i++) {
      this.copyStyle(source.children[i], target.children[i]);
    }
  }
}
