import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
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
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Mode, NavMenu, SpriteOption } from './nav-sprite.type';
import { scrollAnimate } from './utils';

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

  @Input() mode: Mode = 'default'; // 模式

  @Input() maxLevel = 3; // 最大层级

  @Input() title = 'menu';

  @Input() indent = 2; // 缩进

  @Input() width = 300; // 高度

  @Input() height = 400; // 高度

  @Input() isOpen = true;

  // mode 为sprite模式下的初始位置
  @Input() spriteOption: SpriteOption;

  @Input() navItemTemplate: TemplateRef<any>; // 单条导航目录的传入模板

  @ViewChild('spriteTemp', { static: true }) spriteTemp: TemplateRef<any>;

  @ViewChild('defaultTemp', { static: true }) defaultTemp: TemplateRef<any>;

  @ViewChild('defaultNavItemTemplate', { static: true }) defaultNavItemTemplate: TemplateRef<any>; // 单条导航目录的默认模板

  @ViewChildren('items', { read: ElementRef })
  items!: QueryList<ElementRef>;

  @Output() afterNavInit = new EventEmitter(); // 组件初始化后返回组件实例

  currentTemp: TemplateRef<any>;

  navData: NavMenu[] = [];

  activeMenu = 0;

  isToViewByNav = false;

  contents;

  scrollSub: Subscription;

  isDragging = false;

  constructor(private render: Renderer2, private element: ElementRef) {}

  ngOnInit() {
    this.createNav();
  }

  ngAfterViewInit(): void {
    this.scrollSub = fromEvent(this.target, 'scroll')
      .pipe(debounceTime(100))
      .subscribe(() => {
        this.setActiveByScroll();
      });
    this.initStyles();
  }

  // 生成导航
  createNav() {
    this.getNavData();
    this.currentTemp = this.mode === 'default' ? this.defaultTemp : this.spriteTemp;
    this.navItemTemplate = this.navItemTemplate || this.defaultNavItemTemplate;
  }

  // 获取导航数据
  getNavData() {
    if (!this.target) {
      return;
    }
    const search = [];
    for (let i = 0; i < this.maxLevel; i++) {
      search.push(`h${i + 1}`);
    }
    this.contents = Array.from(this.target.querySelectorAll(search.join(',')));
    this.navData = this.contents.map((i: HTMLElement) => {
      return {
        originEle: i,
        level: i.tagName.match(/\d+/)[0],
        label: i.innerText,
        scrollPosition: this.getScrollPosition(i),
      };
    });
    this.setDefaultActiveMenu();
  }

  // 设置每个导航目录的可视范围
  getScrollPosition(ele) {
    const containerTop = this.target.getBoundingClientRect().top;
    const containerScrollTop = this.target.scrollTop;
    const top = ele.getBoundingClientRect().bottom - containerTop + containerScrollTop;
    const startLine = ele.getBoundingClientRect().top - containerTop + containerScrollTop;
    return [top, startLine];
  }

  // 根据滚动位置设置匹配选中目录
  setActiveByScroll() {
    if (this.isToViewByNav) {
      return;
    }
    this.setDefaultActiveMenu();
  }

  // 设置默认选中
  setDefaultActiveMenu() {
    const target = this.navData.filter((i) => {
      const scrollTop = this.target.scrollTop;
      return scrollTop < i.scrollPosition[0];
    });
    if (target.length) {
      this.setActiveMenu(target[0].originEle);
    }
  }

  // 点击导航
  navTo(e, item) {
    e.preventDefault();
    this.isToViewByNav = true;
    const index: number = this.navData.findIndex((menu: NavMenu) => {
      return menu.originEle === item.originEle;
    });
    const target = this.navData[index];
    if (target) {
      this.activeMenu = index;
      scrollAnimate(this.target, this.target.scrollTop, target.scrollPosition[1], undefined, undefined, () => {
        setTimeout(() => {
          this.isToViewByNav = false;
        }, 150);
      });
    }
  }

  setActiveMenu(originEle) {
    if (!this.items) { return; }
    const index = this.navData.findIndex((i) => {
      return i.originEle === originEle;
    });
    this.activeMenu = index;
    const item = this.items.toArray()[index];
    if (!item) {
      return;
    }
    const menuContainer = this.element.nativeElement.querySelector('.devui-nav-sprite-menus');
    const start = menuContainer?.scrollTop;
    const end = item?.nativeElement.getBoundingClientRect().top - menuContainer.getBoundingClientRect().top;
    scrollAnimate(menuContainer, start, end);
  }

  // 设置样式
  initStyles() {
    if (this.mode === 'sprite') {
      const content = this.element.nativeElement.querySelector('.devui-nav-sprite-content');
      const spriteOptions = Object.assign({}, DEFAULT_OPTIONS, this.spriteOption);
      this.render.addClass(content, 'devui-is-sprite');
      this.render.setStyle(content, 'position', 'fixed');
      this.render.setStyle(content, 'top', spriteOptions.top);
      this.render.setStyle(content, 'left', spriteOptions.left);
      this.render.setStyle(content, 'z-index', spriteOptions.zIndex);
    }
    this.render.setStyle(this.element.nativeElement, 'height', this.height + 'px');
    this.render.setStyle(this.element.nativeElement, 'width', this.width + 'px');
    this.afterNavInit.emit(this);
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

  ngOnDestroy() {
    if (this.scrollSub) {
      this.scrollSub.unsubscribe();
    }
  }
}
