import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { scrollAnimate } from 'ng-devui/utils';
import { fromEvent, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { NavMenu, SpriteMode, SpriteOption } from './nav-sprite.type';

const DEFAULT_OPTIONS = {
  top: '30%',
  left: '80%',
  zIndex: 1,
};

@Component({
  selector: 'd-nav-sprite',
  templateUrl: './nav-sprite.component.html',
  styleUrls: ['./nav-sprite.component.scss'],
})
export class NavSpriteComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() target: HTMLElement; // 爬取目录的容器

  @Input() scrollTarget: HTMLElement; // 指定滚动的DOM

  @Input() view: {
    top?: number;
    bottom?: number;
  } = { top: 0, bottom: 0 }; // 矫正参数

  @Input() hashSupport = false; // 支持锚点

  @Input() mode: SpriteMode = 'default'; // 模式

  @Input() maxLevel = 3; // 最大层级

  @Input() title; // 名称

  @Input() indent = 2; // 缩进

  @Input() width = 300; // 高度

  @Input() height = 400; // 高度

  @Input() isOpen = true; // sprite模式下的初始状态

  @Input() spriteOption: SpriteOption; // sprite模式下的初始位置

  @Input() navItemTemplate: TemplateRef<any>; // 导航目录模板

  @ViewChild('spriteTemp', { static: true }) spriteTemp: TemplateRef<any>;

  @ViewChild('defaultTemp', { static: true }) defaultTemp: TemplateRef<any>;

  @ViewChild('defaultNavItemTemplate', { static: true }) defaultNavItemTemplate: TemplateRef<any>; // 单条导航目录的默认模板

  @ViewChildren('items', { read: ElementRef })
  items!: QueryList<ElementRef>;

  @Output() afterNavInit = new EventEmitter(); // 组件初始化后返回组件实例

  currentTemp: TemplateRef<any>;

  menus: NavMenu[] = [];

  activeIndex = -1;

  isToViewByNav = false; // 区分是页面滚动还是点击目录事件

  itemsInit = false;

  contents;

  targetContainer: HTMLElement;

  scrollSub: Subscription;

  isDragging = false;

  mouseenterSub: Subscription;

  itemsSub: Subscription;

  timeGap = 60;

  throttleTimeGap = 300;

  document: Document;

  get baseUrl() {
    if (typeof window === 'undefined') {
      return '';
    }
    return window.location.href.replace(window.location.hash, '');
  }

  constructor(
    private render: Renderer2,
    private element: ElementRef,
    private router: Router,
    private activeRout: ActivatedRoute,
    private render2: Renderer2,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private doc: any
  ) {
    this.document = this.doc;
  }

  ngOnInit() {
    this.currentTemp = this.mode === 'default' ? this.defaultTemp : this.spriteTemp; // 设置当前的模式
    this.navItemTemplate = this.navItemTemplate || this.defaultNavItemTemplate; // 设置当前的目录模板
    this.targetContainer = this.scrollTarget || this.target;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const container = this.targetContainer === this.document.documentElement ? window : this.targetContainer;
      this.scrollSub = fromEvent(container, 'scroll')
        .pipe(throttleTime(this.throttleTimeGap))
        .subscribe(() => {
          this.scrollEventHandler();
        });
      this.itemsSub = this.items.changes.subscribe((items) => {
        if (!this.itemsInit) {
          this.itemsInit = true;
          this.setActiveMenu();
        }
      });
      this.initStyles();
    }, 0);
  }

  setActiveIndex() {
    if (this.hashSupport && this.activeRout.snapshot.fragment) {
      this.activeIndex = this.menus.findIndex((menu) => {
        return menu.label === this.activeRout.snapshot.fragment;
      });
      this.isToViewByNav = true;
      scrollAnimate(
        this.targetContainer,
        this.targetContainer.scrollTop,
        this.menus[this.activeIndex]?.scrollPosition?.startLine + 1,
        undefined,
        undefined,
        () => {
          setTimeout(() => {
            this.isToViewByNav = false;
          }, 160);
        }
      );
    } else {
      this.activeIndex = this.menus.findIndex((i) => {
        const scrollTop = this.targetContainer.scrollTop;
        return scrollTop < i?.scrollPosition.top;
      });
    }
    this.cdr.detectChanges();
  }

  getNavData(setActive = true) {
    const search = [];
    for (let i = 0; i < this.maxLevel; i++) {
      search.push(`h${i + 1}`);
    }
    this.contents = Array.from(this.target.querySelectorAll(search.join(',')));
    this.menus = this.contents.map((i: HTMLElement) => {
      return {
        originEle: i,
        level: i.tagName.match(/\d+/)[0],
        label: i.innerText,
        href: this.baseUrl + '#' + i.innerText,
        element: i,
        scrollPosition: this.getScrollPosition(i),
      };
    });
    if (setActive) {
      this.setActiveIndex();
    }
  }

  // 设定目录范围
  getScrollPosition(ele) {
    const containerTop = Math.max(this.targetContainer.getBoundingClientRect().top, 0);
    const containerScrollTop = this.targetContainer.scrollTop;
    const top = ele.getBoundingClientRect().bottom - containerTop + containerScrollTop - this.view.top + this.view.bottom;
    const startLine = ele.getBoundingClientRect().top - containerTop + containerScrollTop - this.view.top + this.view.bottom;
    return { top, startLine };
  }

  // 监听页面滚动
  scrollEventHandler() {
    if (!this.isToViewByNav) {
      const scrollTop = this.targetContainer.scrollTop;
      const index = this.menus.findIndex((ele, i) => {
        if (this.menus[i + 1]) {
          this.menus[i + 1].scrollPosition = this.getScrollPosition(this.menus[i + 1].element);
          return scrollTop >= ele.scrollPosition.startLine && scrollTop < this.menus[i + 1]?.scrollPosition.startLine;
        } else {
          return false;
        }
      });
      if (index !== -1 && this.activeIndex !== index) {
        this.activeIndex = index;
        this.menuScrollToTarget();
      }
    }
  }

  menuScrollToTarget() {
    const item = this.items.toArray()[this.activeIndex];
    const menuContainer = this.element.nativeElement.querySelector('.devui-nav-sprite-menus');
    const start = menuContainer?.scrollTop;
    const end = item?.nativeElement?.getBoundingClientRect().top + start - menuContainer?.getBoundingClientRect().top;
    scrollAnimate(menuContainer, start, end, undefined, undefined, () => {
      if (this.hashSupport) {
        this.setUrlHash();
      }
    });
  }

  setActiveMenu() {
    const item = this.items.toArray()[this.activeIndex];
    const menuContainer = this.element.nativeElement.querySelector('.devui-nav-sprite-menus');
    const top = item?.nativeElement.getBoundingClientRect().top - menuContainer.getBoundingClientRect().top;
    scrollAnimate(menuContainer, menuContainer.scrollTop, top, undefined, undefined);
  }

  initStyles() {
    if (this.mode === 'sprite') {
      const content = this.element.nativeElement.querySelector('.devui-nav-sprite-content');
      const spriteOptions = { ...DEFAULT_OPTIONS, ...this.spriteOption };
      this.render.addClass(content, 'devui-is-sprite');
      this.render.setStyle(content, 'position', 'fixed');
      this.render.setStyle(content, 'top', spriteOptions.top);
      this.render.setStyle(content, 'left', spriteOptions.left);
      this.render.setStyle(content, 'z-index', spriteOptions.zIndex);
      this.render.setStyle(content, 'height', this.height + 'px');
      this.render.setStyle(content, 'width', this.width + 'px');
    }
    this.render.setStyle(this.element.nativeElement, 'height', this.height + 'px');
    this.render.setStyle(this.element.nativeElement, 'width', this.width + 'px');
    this.afterNavInit.emit(this);
  }

  // 设置hash
  setUrlHash() {
    const activeMenu = this.menus[this.activeIndex];
    this.router.navigate([], { fragment: activeMenu.label, replaceUrl: true });
  }

  // addClass
  setTargetActive() {
    const target = this.menus[this.activeIndex];
    this.menus.forEach((i) => {
      if (i.originEle) {
        this.render2.removeClass(i.originEle, 'nav-active');
      }
    });
    this.render2.addClass(target?.originEle, 'nav-active');
  }

  navTo(index) {
    if (this.activeIndex !== index) {
      this.activeIndex = index;
      const target = this.menus[index];
      target.scrollPosition = this.getScrollPosition(target.element);
      scrollAnimate(
        this.targetContainer, this.targetContainer.scrollTop, target?.scrollPosition.startLine + 1, undefined, undefined, () => {
          this.setUrlHash();
          this.setTargetActive();
          setTimeout(() => {
            this.isToViewByNav = false;
          }, this.timeGap);
        });
      this.isToViewByNav = true;
    }
  }

  cdkDragStarted() {
    this.isDragging = true;
  }

  cdkDragEnded() {
    setTimeout(() => {
      this.isDragging = false;
    }, 100);
  }

  hide() {
    this.isOpen = false;
  }

  open() {
    if (this.isDragging) {
      return;
    }
    this.isOpen = true;
  }

  constrainPosition(userPointerPosition, dragRef, dimensions, pickupPositionInElement) {
    const point = {
      x: userPointerPosition.x - pickupPositionInElement.x,
      y: userPointerPosition.y - pickupPositionInElement.y,
    };

    if (point.y < 0) {
      point.y = 0;
    }

    if (point.x < 0) {
      point.x = 0;
    }

    if (point.x > window.innerWidth - dimensions.width) {
      point.x = window.innerWidth - dimensions.width;
    }

    if (point.y > window.innerHeight - dimensions.height) {
      point.y = window.innerHeight - dimensions.height;
    }

    return point;
  }

  ngOnDestroy() {
    if (this.scrollSub) {
      this.scrollSub.unsubscribe();
    }

    if (this.mouseenterSub) {
      this.mouseenterSub.unsubscribe();
    }

    if (this.itemsSub) {
      this.itemsSub.unsubscribe();
    }
  }
}
