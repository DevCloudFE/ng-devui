import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { DomHelper } from '../utils/testing/dom-helper';
import { createKeyBoardEvent } from '../utils/testing/event-helper';
import { BreadCrumbItemComponent } from './breadcrumb-item/breadcrumb-item.component';
import { BreadCrumbComponent } from './breadcrumb.component';
import { BreadcrumbModule } from './breadcrumb.module';
@Component({
  template: `<d-breadcrumb #breadcrumb>
    <d-breadcrumb-item #breadcrumbItem>
      <a routerLink="/components/zh-cn/get-start">DevUI</a>
    </d-breadcrumb-item>
    <d-breadcrumb-item>
      <span>面包屑</span>
    </d-breadcrumb-item>
  </d-breadcrumb>
  <d-breadcrumb #breadcrumbWithSource [source]="source"></d-breadcrumb>
  `,
})
class TestBreadCrumbComponent {
  @ViewChild('breadcrumb') breadcrumb: BreadCrumbComponent;
  @ViewChild('breadcrumbItem') breadcrumbItem: BreadCrumbItemComponent;
  source = [{ title: 'DevUI', showMenu: false, link: '/components/zh-cn/get-start' },
    {
      title: '面包屑', showMenu: true, link: '/components/zh-cn/breadcrumb/demo', noNavigation: true, isSearch: true,
      menuList: [
        { name: '锚点', link: '/components/anchor/demo', target: '_blank' },
        { name: '按钮', link: '/', linkType: 'routerLink' } // 测试是否进入navigateTo方法处理routerLink的情况
      ]
    }];
}

describe('breadcrumb basic', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BreadcrumbModule, RouterTestingModule.withRoutes([]), NoopAnimationsModule],
      declarations: [TestBreadCrumbComponent],
    }).compileComponents();
  });

  describe('breadcrumb display', () => {
    let fixture: ComponentFixture<TestBreadCrumbComponent>;
    let component: TestBreadCrumbComponent;
    let debugEl: DebugElement;
    let domHelper: DomHelper<TestBreadCrumbComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestBreadCrumbComponent);
      component = fixture.componentInstance;
      debugEl = fixture.debugElement;
      domHelper = new DomHelper(fixture);
      fixture.detectChanges();
    });

    describe('should breadcrumb work correctly', () => {
      it('should breadcrumb display correctly', () => {
        const classes = [
          '.devui-breadcrumb-item',
          '.devui-breadcrumb-separator',
        ];
        expect(domHelper.judgeStyleClasses(classes)).toBeTruthy();
      });
      it('should jump to link correctly', fakeAsync(() => {
        const toggleEl: HTMLElement = debugEl.query(By.css('.devui-breadcrumb-item-with-menu')).nativeElement;
        toggleEl.dispatchEvent(new Event('mouseenter'));
        tick(300);
        fixture.detectChanges();
        expect(document.querySelector('.cdk-overlay-container .devui-dropdown-menu')).toBeTruthy();
        const targetEl = debugEl.query(By.css('.cdk-overlay-pane .devui-dropdown-menu ul > li:nth-child(2) > a')).nativeElement;
        targetEl.click();
        tick(300);
        fixture.detectChanges();
      }));
      it('should show search result correctly', fakeAsync(() => {
        const toggleEl: HTMLElement = debugEl.query(By.css('.devui-breadcrumb-item-with-menu')).nativeElement;
        toggleEl.dispatchEvent(new Event('mouseenter'));
        tick(300);
        fixture.detectChanges();
        const inputEl = debugEl.query(By.css('.cdk-overlay-pane > div > div > div > d-search > div > input')).nativeElement;
        inputEl.dispatchEvent(new Event('focus'));
        inputEl.value = '按钮';
        inputEl.dispatchEvent(new Event('input'));
        tick(500);
        fixture.detectChanges();
        expect(inputEl.value).toBe('按钮');
        const enterEvent = createKeyBoardEvent('keydown', {
          key: 'Enter',
          code: 'Enter'
        });
        inputEl.dispatchEvent(enterEvent);
        tick(300);
        fixture.detectChanges();
        const resultEl = debugEl.queryAll(By.css('.cdk-overlay-container .devui-dropdown-menu > ul > li'));
        resultEl.forEach(ele => {
          expect(ele.nativeElement.querySelector('a').textContent).toContain('按钮');
        });
      }));
    });
  });

});
