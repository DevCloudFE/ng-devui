import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  ConnectedOverlayPositionChange,
  ConnectedPosition,
  ScrollStrategy,
  ScrollStrategyOptions,
  VerticalConnectionPos,
} from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  AppendToBodyDirection,
  AppendToBodyDirectionsConfig,
  AppendToBodyScrollStrategyType,
  DevConfigService,
  WithConfig,
  addClassToOrigin,
  fadeInOut,
  formWithDropDown,
  removeClassFromOrigin,
} from 'ng-devui/utils';
import { WindowRef } from 'ng-devui/window-ref';
import { ToggleMenuListComponent } from './toggle-menu-list.component';

@Component({
  selector: 'd-toggle-menu-container',
  templateUrl: './toggle-menu-container.component.html',
  styleUrls: [`./toggle-menu-container.component.scss`],
  animations: [fadeInOut],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class ToggleMenuContainerComponent implements OnInit, OnChanges {
  @Input() set isOpen(value) {
    if (this._isOpen === value) {
      // 如果toggle-container自身触发开关，父级组件的isOpen随toggleChange改变，会通过input再次返回导致重复触发，通过值是否变化屏蔽该次触发
      return;
    }
    this._isOpen = value;
    this.toggleChange.emit(value);
    this.setDocumentClickListener();
    if (this.selectWrapper) {
      this.dropDownWidth = this.width ? this.width : this.selectWrapper.nativeElement.offsetWidth;
    }
    if (value) {
      addClassToOrigin(this.selectWrapper);
      setTimeout(() => {
        this.startAnimation = true;
        this.changeDetectorRef.detectChanges();
      });
    } else {
      removeClassFromOrigin(this.selectWrapper);
    }
  }

  get isOpen() {
    return this._isOpen;
  }
  /**
   * 【可选】是否appendToBody
   */
  @Input() appendToBody = false;
  @Input() appendToBodyDirections: Array<AppendToBodyDirection | ConnectedPosition> = ['rightDown', 'leftDown', 'rightUp', 'leftUp'];
  @Input() @WithConfig() appendToBodyScrollStrategy: AppendToBodyScrollStrategyType;
  /**
   * 【可选】cdk模式origin width
   */
  @Input() width: number;
  @Input() size: '' | 'sm' | 'lg';
  /**
   * auto-complete 参数
   */
  @Input() overview: string;
  @Input() position: any;
  /**
   * 【可选】是否禁用下拉框
   */
  @Input() disabled = false;
  /**
   * 【可选】暂停使用下拉功能，不添加禁用效果
   */
  @Input() paused = false;
  /**
   * 【可选】是否展示动效
   */
  @Input() @WithConfig() showAnimation = true;
  /**
   * 【可选】是否支持聚焦自动展开下拉
   */
  @Input() toggleOnFocus = false;
  @Input() closeScope: 'all' | 'blank' | 'none' = 'all';
  @Input() direction: 'up' | 'down' | 'auto' = 'down';
  @Input() selectWrapper: ElementRef;

  /**
   * select下拉toggle事件，值为true或false
   */
  @Output() toggleChange = new EventEmitter<any>();
  @Output() passEvent = new EventEmitter<any>();
  @ViewChild('selectBox', { static: true }) selectBoxElement: ElementRef;
  @ViewChild('selectMenu', { static: true }) selectMenuElement: ElementRef;
  @ViewChild(CdkConnectedOverlay) connectedOverlay: CdkConnectedOverlay;
  @ContentChild(ToggleMenuListComponent) listInstance: ToggleMenuListComponent;

  _isOpen = false;
  isInit = true;
  isMouseEvent = false;
  startAnimation = false;
  labelMinHeight = 20; // position.top小于20px时候，表示光标在第一行
  popDirection: 'top' | 'bottom' = 'bottom';
  menuPosition: VerticalConnectionPos = 'bottom';
  scrollStrategy: ScrollStrategy;
  cdkConnectedOverlayOrigin: CdkOverlayOrigin;
  overlayPositions: Array<ConnectedPosition>;
  dropDownWidth: number;
  document: Document;

  constructor(
    @Inject(DOCUMENT) private doc: any,
    public element: ElementRef,
    private windowRef: WindowRef,
    private ngZone: NgZone,
    private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    private devConfigService: DevConfigService,
    private scrollStrategyOption: ScrollStrategyOptions
  ) {
    this.document = this.doc;
    this.scrollStrategy = this.scrollStrategyOption.reposition();
  }

  ngOnInit() {
    this.isInit = false;
    this.setPositions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { appendToBodyDirections, appendToBodyScrollStrategy } = changes;
    const globalScrollStrategy = this.devConfigService.getConfigForApi('appendToBodyScrollStrategy');
    if (appendToBodyDirections) {
      this.setPositions();
    }
    if (this.appendToBodyScrollStrategy && (appendToBodyScrollStrategy || globalScrollStrategy)) {
      const func = this.scrollStrategyOption[this.appendToBodyScrollStrategy];
      this.scrollStrategy = func();
    }
  }

  animationEnd() {
    if (!this.isOpen && this.selectMenuElement && this.showAnimation) {
      const targetElement = this.selectMenuElement.nativeElement;
      this.startAnimation = false;
      setTimeout(() => {
        // 动画会覆盖导致display还是block， 所以要等动画覆盖完
        this.renderer.setStyle(targetElement, 'display', 'none');
      });
    }
  }

  setPositions() {
    if (this.appendToBodyDirections && this.appendToBodyDirections.length > 0) {
      this.overlayPositions = this.appendToBodyDirections
        .map((position) => {
          if (typeof position === 'string') {
            return AppendToBodyDirectionsConfig[position];
          } else {
            return position;
          }
        })
        .filter((position) => position !== undefined);
    } else {
      this.overlayPositions = undefined;
    }
  }

  updatePosition() {
    if (this.appendToBody) {
      setTimeout(() => {
        if (this.connectedOverlay && this.connectedOverlay.overlayRef) {
          this.connectedOverlay.overlayRef.updatePosition();
        }
      });
    }
  }

  setPassEvent(event, type) {
    if (this.isOpen || this.paused) {
      this.passEvent.emit({ event, type });
    }
  }

  onPositionChange(position: ConnectedOverlayPositionChange) {
    this.menuPosition = position.connectionPair.originY;
  }

  setDocumentClickListener() {
    this.ngZone.runOutsideAngular(() => {
      if (this.isOpen) {
        this.document.addEventListener('click', this.onDocumentClick);
      } else {
        this.document.removeEventListener('click', this.onDocumentClick);
      }
    });
  }

  onDocumentClick = (event: Event) => {
    if (this.listInstance && this.isOpen && this.selectBoxElement && !this.selectBoxElement.nativeElement.contains(event.target)) {
      this.isOpen = false;
      this.listInstance.selectIndex = this.listInstance.activeIndex ? this.listInstance.activeIndex : -1;
      this.changeDetectorRef.detectChanges();
    }
  };

  // mousedown mouseup解决focus与click冲突问题
  @HostListener('mousedown', ['$event'])
  public setMouseEventTrue(event) {
    this.isMouseEvent = true;
  }
  @HostListener('mouseup', ['$event'])
  public setMouseEventFalse(event) {
    this.isMouseEvent = false;
  }

  autoToggle(event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.toggleOnFocus && !this.disabled && !this.paused && !this.isOpen && !this.isMouseEvent) {
      this.toggle();
    }
  }

  toggle(event?: Event) {
    if (this.disabled || this.paused) {
      this.isOpen = false;
      return;
    }
    if (!this.isOpen) {
      if (!this.appendToBody) {
        let direction = '';
        switch (this.direction) {
        case 'auto':
          direction = this.isBottomRectEnough() ? 'bottom' : 'top';
          break;
        case 'down':
          direction = 'bottom';
          break;
        case 'up':
          direction = 'top';
          break;
        default:
          direction = 'bottom';
        }
        this.popDirection = <any>direction;
      } else {
        this.updateCdkConnectedOverlayOrigin();
      }
    } else {
      if (!this.showAnimation) {
        this.startAnimation = false;
      }
      if (this.closeScope === 'none' || (this.closeScope === 'blank' && this.element.nativeElement.contains(event.target))) {
        return;
      }
    }
    this.isOpen = !this.isOpen;
  }

  isBottomRectEnough() {
    const selectMenuElement = this.selectWrapper.nativeElement;
    const selectInputElement = this.selectBoxElement;
    const displayStyle = selectMenuElement.style.display || (<any>window).getComputedStyle(selectMenuElement).display;
    let tempStyle;
    if (displayStyle === 'none') {
      // 必要， 否则首次展开必有问题， 如果animationEnd之后设置为none也会有问题
      tempStyle = {
        visibility: selectMenuElement.style.visibility,
        display: selectMenuElement.style.display,
        transform: selectMenuElement.style.transform,
      };
      this.renderer.setStyle(selectMenuElement, 'visibility', 'hidden');
      this.renderer.setStyle(selectMenuElement, 'display', 'block');
      this.renderer.setStyle(selectMenuElement, 'transform', 'translate(0, -9999)');
    }
    const elementHeight = selectMenuElement.offsetHeight;
    const bottomDistance = this.windowRef.innerHeight - selectInputElement.nativeElement.getBoundingClientRect().bottom;
    const isBottomEnough = bottomDistance >= elementHeight;
    if (displayStyle === 'none') {
      this.renderer.setStyle(selectMenuElement, 'visibility', tempStyle.visibility);
      this.renderer.setStyle(selectMenuElement, 'display', tempStyle.display);
      this.renderer.setStyle(selectMenuElement, 'transform', tempStyle.transform);
    }
    return isBottomEnough;
  }

  updateCdkConnectedOverlayOrigin() {
    if (this.selectWrapper?.nativeElement) {
      this.cdkConnectedOverlayOrigin = new CdkOverlayOrigin(formWithDropDown(this.selectWrapper) || this.selectWrapper.nativeElement);
    }
  }
}
