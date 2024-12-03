import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SelectModule } from 'ng-devui';
import { animationFrameScheduler, of } from 'rxjs';
import { CheckBoxComponent } from './../checkbox/checkbox.component';
import { SelectComponent } from './select.component';
@Component({
  template: `
    <div
      [ngClass]="{
        'absolute-top': absolutePosition === 'top',
        'absolute-bottom': absolutePosition === 'bottom'
      }"
    >
      <d-select
        [placeholder]="placeholder"
        [multiple]="multiple"
        [overview]="overview"
        [options]="options"
        [filterKey]="filterKey"
        [(ngModel)]="option"
        [size]="size"
        [isSearch]="isSearch"
        [searchPlaceholder]="searchPlaceholder"
        [disabled]="disabled"
        [optionImmutableKey]="optionImmutableKey"
        [optionDisabledKey]="optionDisabledKey"
        [isSelectAll]="isSelectAll"
        [allowClear]="allowClear"
        [extraConfig]="extraConfig"
        [searchFn]="searchFn"
        [keepMultipleOrder]="keepMultipleOrder"
        [noResultItemTemplate]="enableNoDataTemplate ? noDataTemplate : undefined"
        [direction]="direction"
      ></d-select>
      <ng-template #noDataTemplate>没有自定义数据</ng-template>
    </div>
  `,
  styles: [
    `
      .absolute-top,
      .absolute-bottom {
        position: fixed;
      }
      .absolute-top {
        top: 0;
        left: 0;
      }
      .absolute-bottom {
        bottom: 0;
        left: 0;
      }
    `,
  ],
})
class TestSelectComponent {
  option;
  options: Array<Object | string> = ['选项1', '选项2', '选项3'];
  objectOptions = [
    { id: 1, title: '选项1', immutable: true },
    { id: 2, title: '选项2' },
    { id: 3, title: '选项3', disabled: true },
  ];
  optionsHundred = new Array(300).fill('').map((item, index) => '选项' + (index + 1));
  multiple = false;
  placeholder = '占位符';
  size = '';
  filterKey = '';
  overview: 'border' | 'underlined' = 'border';
  isSearch = false;
  searchPlaceholder = '搜索选项';
  disabled = false;
  optionDisabledKey = undefined;
  optionImmutableKey = undefined;
  isSelectAll = false;
  allowClear = false;
  extraConfig;
  searchFn;
  keepMultipleOrder: 'user-selected' | 'origin';
  enableNoDataTemplate = false;
  direction: 'up' | 'down' | 'auto';
  absolutePosition: 'top' | 'bottom';
  searchFnObservable = (term: string) => {
    return of(this.optionsHundred.filter((option) => option.indexOf(term) > -1).map((option, index) => ({ id: index, option: option })));
  };
}
@Component({
  template: `
    <d-select
      [options]="options"
      [(ngModel)]="option"
      [appendToBody]="true"
      [appendToBodyDirections]="appendToBodyDirections"
      [width]="width"
    ></d-select>
  `,
})
class TestSelectAppendToBodyComponent {
  option;
  options: Array<Object | string> = ['选项1', '选项2', '选项3'];
  objectOptions = [
    { id: 1, title: '选项1', immutable: true },
    { id: 2, title: '选项2' },
    { id: 3, title: '选项3', disabled: true },
  ];
  appendToBodyDirections: Array<string | any> = ['rightDown'];
  customDirection = [
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'top',
    },
  ];
  width = undefined;
}
@Component({
  template: `
    <d-select
      [options]="options"
      [(ngModel)]="option"
      [virtualScroll]="virtualScroll"
      [enableLazyLoad]="enableLazyLoad"
      (loadMore)="loadMore($event)"
    >
    </d-select>
  `,
})
class TestSelectLazyLoadVirtualScrollComponent {
  @ViewChild(SelectComponent) selectComponent: SelectComponent;
  option;
  options;
  optionsFew = new Array(3).fill('').map((item, index) => '选项' + (index + 1));
  optionsHundred = new Array(300).fill('').map((item, index) => '选项' + (index + 1));
  width = undefined;
  virtualScroll: boolean;
  enableLazyLoad: boolean;
  PAGE_SIZE = 15;
  templateItemSize: number;
  initLazyLoad() {
    this.options = this.optionsHundred.filter((v, i) => i < this.PAGE_SIZE); // 第一页15个确保能触发scroll事件
  }
  loadMore: () => void = () => {
    if (this.options.length < this.optionsHundred.length) {
      this.options = [
        ...this.options,
        ...this.optionsHundred.filter((v, i) => i >= this.options.length && i < this.options.length + this.PAGE_SIZE),
      ];
      this.selectComponent.loadFinish();
      if (this.options.length >= this.optionsHundred.length) {
        this.enableLazyLoad = false;
      }
    } else {
      this.enableLazyLoad = false;
      this.selectComponent.loadFinish();
    }
  };
}

@Component({
  template: `
    <d-select [options]="options" [(ngModel)]="option" [virtualScroll]="virtualScroll" [templateItemSize]="templateItemSize">
      <ng-template let-option="option"
        ><div class="my-option">{{ option }}</div></ng-template
      >
    </d-select>
  `,
  styles: [
    `
      .my-option {
        height: 30px; /* 上下各有padding 8px */
      }
    `,
  ],
})
class TestSelectVirtualScrollItemSizeComponent extends TestSelectLazyLoadVirtualScrollComponent {}

@Component({
  template: `
    <d-select *ngIf="init" [options]="options" [(ngModel)]="option" [autoFocus]="autoFocus" [toggleOnFocus]="toggleOnFocus"></d-select>
  `,
})
class TestSelecAutoFocusNToggleOnFocusComponent {
  init = false;
  option;
  options: Array<Object | string> = ['选项1', '选项2', '选项3'];
  autoFocus: boolean;
  toggleOnFocus: boolean;
}
@Component({
  template: `
    <d-select
      [options]="options"
      [(ngModel)]="option"
      [multiple]="true"
      [customViewTemplate]="myTemplate"
      [customViewDirection]="customViewDirection"
    ></d-select>
    <ng-template #myTemplate let-choose="choose">
      <div class="custom-wrapper">
        <div class="custom-title">最近选择</div>
        <ul class="custom-box">
          <li class="custom-item" *ngFor="let recent of recently; let i = index" (click)="choose(recent, getIndex(recent), $event)">
            <div class="custom-single">
              {{ recent }}
            </div>
          </li>
        </ul>
      </div>
    </ng-template>
  `,
  styles: [
    `
      .custom-wrapper {
        padding: 5px;
      }

      .custom-title {
        padding: 5px;
        color: #adb0b8;
      }

      .custom-item {
        padding: 5px;
      }

      .custom-single {
        background: #5e7ce0;
        color: #fff;
        border-radius: 2px;
        text-align: center;
        padding: 8px;
        display: inline-block;
      }

      .custom-list:hover .custom-single {
        background: #7693f5;
      }
    `,
  ],
})
class TestSelectCustomAreaComponent {
  option;
  options: Array<Object | string> = ['选项1', '选项2', '选项3'];
  recently = ['选项1'];
  customViewDirection: 'right' | 'left' | 'bottom';
  getIndex(option: string) {
    return this.options.indexOf(option);
  }
}
@Component({
  template: `
    <d-select
      [options]="options"
      [(ngModel)]="option"
      [multiple]="multiple"
      [inputItemTemplate]="inputItemTemplateEnable ? inputItemTemplate : null"
      [extraConfig]="{
        selectedItemWithTemplate: {
          enable: templateMode === 'result' || templateMode === 'both'
        }
      }"
    >
      <ng-template let-option="option" let-position="position" let-template="template">
        <ng-container *ngIf="position === 'result'">
          <div *ngIf="!multiple">single-result: {{ option }}</div>
          <div *ngIf="multiple">
            multiple-result:
            <ng-container *ngFor="let op of option; let first = first">
              <ng-container *ngIf="!first">,</ng-container>{{ op }}
            </ng-container>
          </div>
        </ng-container>
        <ng-container *ngIf="position === 'list'">
          <ng-container *ngIf="templateMode === 'list' || templateMode === 'both'">
            <div *ngIf="!multiple">single-item: {{ option }}</div>
            <div *ngIf="multiple">multiple-item: {{ option }}</div>
          </ng-container>
          <ng-template
            *ngIf="templateMode === 'result'"
            [ngTemplateOutlet]="template"
            [ngTemplateOutletContext]="{
              option: option,
              checked: checked,
              filterKey: filterKey
            }"
          ></ng-template>
        </ng-container>
      </ng-template>
    </d-select>
    <ng-template #inputItemTemplate let-option="option" let-position="position" let-template="template">
      <ng-container *ngIf="position === 'result'">
        <div *ngIf="!multiple">input-single-result: {{ option }}</div>
        <div *ngIf="multiple">
          input-multiple-result:
          <ng-container *ngFor="let op of option; let first = first"> <ng-container *ngIf="!first">,</ng-container>{{ op }} </ng-container>
        </div>
      </ng-container>
      <ng-container *ngIf="position === 'list'">
        <ng-container *ngIf="templateMode === 'list' || templateMode === 'both'">
          <div *ngIf="!multiple">input-single-item: {{ option }}</div>
          <div *ngIf="multiple">input-multiple-item: {{ option }}</div>
        </ng-container>
        <ng-template
          *ngIf="templateMode === 'result'"
          [ngTemplateOutlet]="template"
          [ngTemplateOutletContext]="{
            option: option,
            checked: checked,
            filterKey: filterKey
          }"
        ></ng-template>
      </ng-container>
    </ng-template>
  `,
})
class TestSelectTemplateComponent {
  option;
  options: Array<Object | string> = ['选项1', '选项2', '选项3'];
  multiple: boolean;
  inputItemTemplateEnable: boolean;
  templateMode: 'result' | 'list' | 'both';
  initSingle() {
    this.option = this.options[1];
  }
  initMultiple() {
    this.option = [...this.options];
  }
}

describe('Select', () => {
  let fixture: ComponentFixture<any>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SelectModule, FormsModule, NoopAnimationsModule],
      declarations: [
        TestSelectComponent,
        TestSelectAppendToBodyComponent,
        TestSelectLazyLoadVirtualScrollComponent,
        TestSelecAutoFocusNToggleOnFocusComponent,
        TestSelectCustomAreaComponent,
        TestSelectVirtualScrollItemSizeComponent,
        TestSelectTemplateComponent,
      ],
    }).compileComponents();
  });

  describe('basic', () => {
    let debugEl: DebugElement;
    let component: TestSelectComponent;
    let toggleElement: DebugElement;
    let menuElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestSelectComponent);
      debugEl = fixture.debugElement;
      component = debugEl.componentInstance;
      toggleElement = debugEl.query(By.css('d-select > div > div.devui-form-group'));
      fixture.detectChanges();
    });
    const openMenu = () => {
      toggleElement.nativeElement.click(); // 展开菜单
      fixture.detectChanges();
      tick(); // animation time
      fixture.detectChanges();
      tick(100); // searchFn的订阅
      fixture.detectChanges();
    };

    it('component has created successfully', () => {
      expect(component).toBeTruthy();
      expect(toggleElement).toBeTruthy();
    });

    describe('single', () => {
      describe('open', () => {
        it('click should open', fakeAsync(() => {
          menuElement = debugEl.query(By.css('d-select > div >div.devui-dropdown-menu'));
          expect(menuElement.nativeElement.getBoundingClientRect().height).toBe(0);
          openMenu();
          expect(menuElement.nativeElement.getBoundingClientRect().height).toBeGreaterThan(0);
        }));
      });
      describe('after open', () => {
        beforeEach(fakeAsync(() => {
          menuElement = debugEl.query(By.css('d-select > div >div.devui-dropdown-menu'));
          openMenu();
        }));
        describe('open-select', () => {
          it('click option should close', fakeAsync(() => {
            const optionElement = debugEl.queryAll(By.css('d-select > div >div.devui-dropdown-menu li.devui-dropdown-item'))[1];
            optionElement.nativeElement.click(); // 选择其中一个选项
            fixture.detectChanges();
            tick(); // animation time
            fixture.detectChanges();
            tick(); // beforeChange
            fixture.detectChanges();
            expect(component.option).toBe('选项2'); // 选择后ngModel改变
            expect(menuElement.nativeElement.getBoundingClientRect().height).toBe(0); // 面板合起来
          }));
        });
        describe('open-close', () => {
          it('click select control element', fakeAsync(() => {
            toggleElement.nativeElement.click(); // 再次点击
            fixture.detectChanges();
            tick(); // animation time
            fixture.detectChanges();
            expect(menuElement.nativeElement.getBoundingClientRect().height).toBe(0); // 面板合起来
          }));
          it('click outside', fakeAsync(() => {
            document.documentElement.click();
            fixture.detectChanges();
            tick(); // animation time
            fixture.detectChanges();
            expect(menuElement.nativeElement.getBoundingClientRect().height).toBe(0);
          }));
        });
      });
    });

    describe('multiple', () => {
      beforeEach(fakeAsync(() => {
        component.multiple = true;
        fixture.detectChanges();
        tick();
        fixture.detectChanges(); // TODO: 这里的tick是怎么回事? 去掉了这行会报有3个timmer
      }));
      describe('open', () => {
        it('click should open', fakeAsync(() => {
          menuElement = debugEl.query(By.css('d-select > div >div.devui-dropdown-menu'));
          expect(menuElement.nativeElement.getBoundingClientRect().height).toBe(0);
          openMenu();
          expect(menuElement.nativeElement.getBoundingClientRect().height).toBeGreaterThan(0);
        }));
      });
      describe('after open', () => {
        beforeEach(fakeAsync(() => {
          menuElement = debugEl.query(By.css('d-select > div >div.devui-dropdown-menu'));
          openMenu();
        }));
        describe('open-select', () => {
          it('click option should not close', fakeAsync(() => {
            const optionElement = debugEl.queryAll(By.css('d-select > div >div.devui-dropdown-menu li.devui-dropdown-item'))[1];
            optionElement.nativeElement.click(); // 选择其中一个选项
            fixture.detectChanges();
            tick(); // animation time
            fixture.detectChanges();
            expect(component.option).toEqual(['选项2']); // 选择后ngModel改变
            expect(menuElement.nativeElement.getBoundingClientRect().height).toBeGreaterThan(0); // 面板不会合起来
          }));
        });
        describe('open-close', () => {
          it('click option should not close', fakeAsync(() => {
            const optionElement = debugEl.queryAll(By.css('d-select > div >div.devui-dropdown-menu li.devui-dropdown-item'))[1];
            optionElement.nativeElement.click(); // 选择其中一个选项
            fixture.detectChanges();
            tick(); // animation time
            fixture.detectChanges();
            expect(component.option).toEqual(['选项2']); // 选择后ngModel改变
            expect(menuElement.nativeElement.getBoundingClientRect().height).toBeGreaterThan(0); // 面板不合起来
          }));
          it('click outside', fakeAsync(() => {
            document.documentElement.click();
            fixture.detectChanges();
            tick(); // animation time
            fixture.detectChanges();
            expect(menuElement.nativeElement.getBoundingClientRect().height).toBe(0);
          }));
        });
      });
    });
    describe('size', () => {
      it('size = empty, height should equal 26px', fakeAsync(() => {
        component.size = '';
        fixture.detectChanges();
        expect(toggleElement.nativeElement.getBoundingClientRect().height).toBe(26);
      }));
      it('size = lg, height should equal 44px', fakeAsync(() => {
        component.size = 'lg';
        fixture.detectChanges();
        expect(toggleElement.nativeElement.getBoundingClientRect().height).toBe(44);
      }));
      it('size = sm, height should equal 24px', fakeAsync(() => {
        component.size = 'sm';
        fixture.detectChanges();
        expect(toggleElement.nativeElement.getBoundingClientRect().height).toBe(24);
      }));
    });
    describe('placeholder', () => {
      it('placeholder text is right', fakeAsync(() => {
        const placeholderElement = debugEl.query(By.css('d-select > div >div.devui-form-group > input'));
        expect(placeholderElement.nativeElement.getAttribute('placeholder')).toBe('占位符');
      }));
      it('change placeholder', fakeAsync(() => {
        component.placeholder = '改变占位符文本';
        fixture.detectChanges();
        const placeholderElement = debugEl.query(By.css('d-select > div >div.devui-form-group > input'));
        expect(placeholderElement.nativeElement.getAttribute('placeholder')).toBe('改变占位符文本');
      }));
    });
    describe('overview', () => {
      it('should apply underline-border class', fakeAsync(() => {
        component.overview = 'border';
        fixture.detectChanges();
        const selectDivElement = debugEl.query(By.css('d-select > div'));
        expect(selectDivElement.classes['devui-select-underlined-border']).toBeFalsy();
      }));
      it('should apply underline-border class', fakeAsync(() => {
        component.overview = 'underlined';
        fixture.detectChanges();
        const selectDivElement = debugEl.query(By.css('d-select > div'));
        expect(selectDivElement.classes['devui-select-underlined-border']).toBeTruthy();
      }));
    });
    describe('object + filterKey', () => {
      beforeEach(fakeAsync(() => {
        component.options = component.objectOptions;
        component.filterKey = 'title';
        fixture.detectChanges();
      }));
      describe('single', () => {
        beforeEach(fakeAsync(() => {
          openMenu();
        }));
        it('option display correct', fakeAsync(() => {
          const optionElement = debugEl.queryAll(By.css('d-select > div >div.devui-dropdown-menu li.devui-dropdown-item'))[1];
          expect(optionElement.nativeElement.innerText).toBe('选项2');
        }));
        it('option select, ngModel should be correct', fakeAsync(() => {
          const optionElement = debugEl.queryAll(By.css('d-select > div >div.devui-dropdown-menu li.devui-dropdown-item'))[1];
          optionElement.nativeElement.click(); // 选择其中一个选项
          tick(); // animation time
          fixture.detectChanges();
          tick(); // animation end setTimeout
          fixture.detectChanges();
          expect(component.option).toEqual({ id: 2, title: '选项2' }); // 选择后ngModel改变
        }));
      });
      describe('multiple', () => {
        beforeEach(fakeAsync(() => {
          component.multiple = true;
          fixture.detectChanges();
          tick();
          fixture.detectChanges(); // TODO: 不知道为何需要这个
          openMenu();
        }));
        it('option display correct', fakeAsync(() => {
          const optionElement = debugEl.queryAll(By.css('d-select > div >div.devui-dropdown-menu li.devui-dropdown-item'))[1];
          expect(optionElement.nativeElement.innerText).toBe('选项2');
        }));
        it('option select, ngModel should be correct', fakeAsync(() => {
          const optionElement = debugEl.queryAll(By.css('d-select > div >div.devui-dropdown-menu li.devui-dropdown-item'))[1];
          optionElement.nativeElement.click(); // 选择其中一个选项
          tick(); // animation time
          fixture.detectChanges();
          tick(); // animation end setTimeout
          fixture.detectChanges();
          expect(component.option).toEqual([{ id: 2, title: '选项2' }]); // 选择后ngModel改变
        }));
      });
    });
    describe('search', () => {
      beforeEach(fakeAsync(() => {
        component.isSearch = true;
        fixture.detectChanges();
      }));
      describe('isSearch', () => {
        it('while true, should show search input', fakeAsync(() => {
          openMenu();
          const searchElement = debugEl.query(By.css('d-select input.devui-select-search')).parent.parent;
          expect(searchElement.styles.display).toBe('block');
        }));
        it('while false, should hide search input', fakeAsync(() => {
          component.isSearch = false;
          fixture.detectChanges();
          openMenu();
          const searchElement = debugEl.query(By.css('d-select input.devui-select-search')).parent.parent;
          expect(searchElement.styles.display).toBe('none');
        }));
        it('clear icon', fakeAsync(() => {
          openMenu();
          const searchInputElement = debugEl.query(By.css('d-select input.devui-select-search'));
          const noSearchInputClearIconElement = debugEl.query(By.css('d-select span.devui-search-clear'));
          expect(noSearchInputClearIconElement).toBeFalsy();
          searchInputElement.nativeElement.value = '选项';
          searchInputElement.nativeElement.dispatchEvent(new Event('input'));
          fixture.detectChanges();
          tick(300);
          fixture.detectChanges();
          const searchInputClearIconElement = debugEl.query(By.css('d-select span.devui-search-clear'));
          expect(searchInputClearIconElement).toBeTruthy();
          searchInputClearIconElement.nativeElement.click();
          fixture.detectChanges();
          tick();
          fixture.detectChanges();
          expect(searchInputElement.nativeElement.value).toBe('');
        }));
      });
      describe('searchPlaceholder', () => {
        it('searchPlaceholder', fakeAsync(() => {
          openMenu();
          const searchInputElement = debugEl.query(By.css('d-select input.devui-select-search'));
          expect(searchInputElement.nativeElement.getAttribute('placeholder')).toBe('搜索选项');
        }));
        it('searchPlaceholder change', fakeAsync(() => {
          component.searchPlaceholder = '搜索内容';
          fixture.detectChanges();
          openMenu();
          const searchInputElement = debugEl.query(By.css('d-select input.devui-select-search'));
          expect(searchInputElement.nativeElement.getAttribute('placeholder')).toBe('搜索内容');
        }));
      });
      describe('searchFn', () => {
        it('no searchFn', fakeAsync(() => {
          openMenu();
          const searchInputElement = debugEl.query(By.css('d-select input.devui-select-search'));
          searchInputElement.nativeElement.value = '1';
          searchInputElement.nativeElement.dispatchEvent(new Event('input', {}));
          fixture.detectChanges();
          tick(300);
          fixture.detectChanges();
          const optionElements = debugEl.queryAll(By.css('d-select > div >div.devui-dropdown-menu li.devui-dropdown-item'));
          expect(optionElements.length).toBe(1);
          expect(optionElements[0].nativeElement.innerText).toBe('选项1');
        }));
        it('searchFn', fakeAsync(() => {
          component.searchFn = component.searchFnObservable;
          openMenu();
          const searchInputElement = debugEl.query(By.css('d-select input.devui-select-search'));
          searchInputElement.nativeElement.value = '1';
          searchInputElement.nativeElement.dispatchEvent(new Event('input', {}));
          fixture.detectChanges();
          tick(300);
          fixture.detectChanges();
          const optionElements = debugEl.queryAll(By.css('d-select > div >div.devui-dropdown-menu li.devui-dropdown-item'));
          expect(optionElements.length).toBe(138); // 1-300  138个含有1
        }));
      });
    });
    describe('disabled & immutable', () => {
      describe('disabled control', () => {
        beforeEach(fakeAsync(() => {
          component.disabled = true;
          fixture.detectChanges();
          menuElement = debugEl.query(By.css('d-select > div >div.devui-dropdown-menu'));
        }));
        describe('single', () => {
          it('disabled should not open menu', fakeAsync(() => {
            openMenu();
            expect(menuElement.nativeElement.getBoundingClientRect().height).toBe(0);
          }));
        });
        describe('multiple', () => {
          it('disabled should not open menu', fakeAsync(() => {
            component.multiple = true;
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            openMenu();
            expect(menuElement.nativeElement.getBoundingClientRect().height).toBe(0);
          }));
        });
      });
      describe('disabled single item', () => {
        beforeEach(fakeAsync(() => {
          component.optionDisabledKey = 'disabled';
          component.options = component.objectOptions;
          component.filterKey = 'title';
          fixture.detectChanges();
          menuElement = debugEl.query(By.css('d-select > div >div.devui-dropdown-menu'));
        }));
        describe('single', () => {
          beforeEach(fakeAsync(() => {
            openMenu();
          }));
          it('option should apply disabled class', fakeAsync(() => {
            const disabledOption = menuElement.queryAll(By.css('li.devui-dropdown-item'))[2];
            expect(disabledOption.classes.disabled).toBe(true); // 禁用类
          }));
          it('option should not response to click', fakeAsync(() => {
            const disabledOption = menuElement.queryAll(By.css('li.devui-dropdown-item'))[2];
            disabledOption.nativeElement.click();
            tick(); // animation time
            fixture.detectChanges();
            tick(); // animation end setTimeout
            fixture.detectChanges();
            expect(menuElement.nativeElement.getBoundingClientRect().height).toBeGreaterThan(0); // 面板不合起来
            expect(component.option).toEqual(undefined); // 选择后ngModel不改变
          }));
        });
        describe('multiple', () => {
          beforeEach(fakeAsync(() => {
            component.multiple = true;
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            openMenu();
          }));
          it('option should apply disabled classes', fakeAsync(() => {
            const disabledOption = menuElement.queryAll(By.css('li.devui-dropdown-item'))[2];
            expect(disabledOption.classes.disabled).toBe(true); // 禁用类
            const disabledOptionCheckbox = disabledOption.query(By.css('d-checkbox > div'));
            expect(disabledOptionCheckbox.classes.disabled).toBe(true); // checkbox禁用类
          }));
          it('option should not response to click', fakeAsync(() => {
            const disabledOption = menuElement.queryAll(By.css('li.devui-dropdown-item'))[2];
            disabledOption.nativeElement.click();
            tick(); // animation time
            fixture.detectChanges();
            tick(); // animation end setTimeout
            fixture.detectChanges();
            expect(menuElement.nativeElement.getBoundingClientRect().height).toBeGreaterThan(0); // 面板不合起来
            expect(component.option).toEqual(undefined); // 选择后ngModel不改变
          }));
        });
      });
      describe('immutable', () => {
        beforeEach(fakeAsync(() => {
          component.optionDisabledKey = 'disabled';
          component.optionImmutableKey = 'immutable';
          component.options = component.objectOptions;
          component.filterKey = 'title';
          fixture.detectChanges();
          menuElement = debugEl.query(By.css('d-select > div >div.devui-dropdown-menu'));
        }));
        describe('single', () => {
          beforeEach(fakeAsync(() => {
            openMenu();
          }));
          it('option should not apply disabled class', fakeAsync(() => {
            const disabledOption = menuElement.queryAll(By.css('li.devui-dropdown-item'))[0];
            expect(disabledOption.classes.disabled).toBeFalsy(); // 禁用类
          }));
          it('option should not response to click', fakeAsync(() => {
            const disabledOption = menuElement.queryAll(By.css('li.devui-dropdown-item'))[0];
            disabledOption.nativeElement.click();
            tick(); // animation time
            fixture.detectChanges();
            tick(); // animation end setTimeout
            fixture.detectChanges();
            expect(menuElement.nativeElement.getBoundingClientRect().height).toBeGreaterThan(0); // 面板不合起来
            expect(component.option).toEqual(undefined); // 选择后ngModel不改变
          }));
        });
        describe('multiple', () => {
          beforeEach(fakeAsync(() => {
            component.multiple = true;
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            openMenu();
          }));
          it('option should apply disabled classes', fakeAsync(() => {
            const disabledOption = menuElement.queryAll(By.css('li.devui-dropdown-item'))[0];
            expect(disabledOption.classes.disabled).toBeFalsy(); // 禁用类
            const disabledOptionCheckbox = disabledOption.query(By.css('d-checkbox > div'));
            expect(disabledOptionCheckbox.classes.disabled).toBeFalsy(); // checkbox禁用类
          }));
          it('option should not response to click', fakeAsync(() => {
            const disabledOption = menuElement.queryAll(By.css('li.devui-dropdown-item'))[2];
            disabledOption.nativeElement.click();
            tick(); // animation time
            fixture.detectChanges();
            tick(); // animation end setTimeout
            fixture.detectChanges();
            expect(menuElement.nativeElement.getBoundingClientRect().height).toBeGreaterThan(0); // 面板不合起来
            expect(component.option).toEqual(undefined); // 选择后ngModel不改变
          }));
          it('select All should not select immutable， but select disable', fakeAsync(() => {
            component.isSelectAll = true;
            fixture.detectChanges();
            const selectAllElement = menuElement.queryAll(By.css('li.devui-dropdown-item'))[0];
            selectAllElement.nativeElement.click();
            tick(); // animation time
            fixture.detectChanges();
            tick(); // animation end setTimeout
            fixture.detectChanges();
            expect(component.option).toEqual(component.options.filter((item, index) => index !== 0));
          }));
        });
      });
    });
    describe('direction', () => {
      it('up', fakeAsync(() => {
        component.absolutePosition = 'bottom';
        component.direction = 'up';
        fixture.detectChanges();
        openMenu();
        menuElement = debugEl.query(By.css('d-select > div >div.devui-dropdown-menu'));
        const toggleRect = toggleElement.nativeElement.parentElement.getBoundingClientRect();
        const menuRect = menuElement.nativeElement.getBoundingClientRect();
        const verticalBorderOverlayWidth = 3; // 有个间距
        expect(menuRect.y + menuRect.height).toEqual(toggleRect.y - verticalBorderOverlayWidth);
        expect(menuRect.x).toEqual(toggleRect.x);
      }));
      it('down', fakeAsync(() => {
        component.absolutePosition = 'top';
        component.direction = 'down';
        fixture.detectChanges();
        openMenu();
        menuElement = debugEl.query(By.css('d-select > div >div.devui-dropdown-menu'));
        const toggleRect = toggleElement.nativeElement.parentElement.getBoundingClientRect();
        const menuRect = menuElement.nativeElement.getBoundingClientRect();
        const verticalBorderOverlayWidth = 3; // 有个间距
        expect(menuRect.y).toEqual(toggleRect.y + toggleRect.height + verticalBorderOverlayWidth);
        expect(menuRect.x).toEqual(toggleRect.x);
      }));
      describe('auto', () => {
        beforeEach(fakeAsync(() => {
          component.direction = 'auto';
        }));
        it('auto down', fakeAsync(() => {
          component.absolutePosition = 'top';
          fixture.detectChanges();
          openMenu();
          menuElement = debugEl.query(By.css('d-select > div >div.devui-dropdown-menu'));
          const toggleRect = toggleElement.nativeElement.parentElement.getBoundingClientRect();
          const menuRect = menuElement.nativeElement.getBoundingClientRect();
          const verticalBorderOverlayWidth = 3; // 有个间距
          expect(menuRect.y).toEqual(toggleRect.y + toggleRect.height + verticalBorderOverlayWidth);
          expect(menuRect.x).toEqual(toggleRect.x);
        }));
        it('auto up', fakeAsync(() => {
          component.absolutePosition = 'bottom';
          fixture.detectChanges();
          openMenu();
          menuElement = debugEl.query(By.css('d-select > div >div.devui-dropdown-menu'));
          const toggleRect = toggleElement.nativeElement.parentElement.getBoundingClientRect();
          const menuRect = menuElement.nativeElement.getBoundingClientRect();
          const verticalBorderOverlayWidth = 3; // 有个间距
          expect(menuRect.y + menuRect.height).toEqual(toggleRect.y - verticalBorderOverlayWidth);
          expect(menuRect.x).toEqual(toggleRect.x);
        }));
      });
    });
    describe('feature only on single ', () => {
      describe('allow clear', () => {
        let clearIcon: DebugElement;
        beforeEach(fakeAsync(() => {
          component.allowClear = true;
          fixture.detectChanges();
          tick();
          fixture.detectChanges();
          clearIcon = toggleElement.query(By.css('.devui-select-clear-icon'));
        }));

        // js无法触发css的hover，所以该用例无法测试
        xit('has selected option, hover show clear icon', fakeAsync(() => {
          component.option = component.options[0];
          fixture.detectChanges();
          expect(window.getComputedStyle(clearIcon.nativeElement).display).toBe('none');
          toggleElement.triggerEventHandler('mouseover', {}); // 无法模拟鼠标hover
          fixture.detectChanges();
          expect(window.getComputedStyle(clearIcon.nativeElement).display).toBe('block');
        }));

        it('has selected option, hover and click clear icon, ', fakeAsync(() => {
          component.option = component.options[0];
          fixture.detectChanges();
          clearIcon.nativeElement.click();
          fixture.detectChanges();
          expect(component.option).toBe(undefined);
        }));

        // js无法触发css的hover，所以该用例无法测试
        xit('has no selected option, hover should not show clear icon', fakeAsync(() => {
          toggleElement.triggerEventHandler('mouseover', {}); // 无法模拟鼠标hover
          fixture.detectChanges();
          expect(window.getComputedStyle(clearIcon.nativeElement).display).toBe('none');
        }));
      });
    });
    describe('feature only on multiple ', () => {
      beforeEach(fakeAsync(() => {
        component.multiple = true;
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
      }));
      describe('select all', () => {
        beforeEach(fakeAsync(() => {
          component.isSelectAll = true;
          fixture.detectChanges();
          tick();
          fixture.detectChanges();
        }));
        describe('isSelectAll', () => {
          it('show select all option', fakeAsync(() => {
            openMenu();
            const selectAllElement = debugEl.queryAll(By.css('d-select > div >div.devui-dropdown-menu li.devui-dropdown-item'))[0];
            const label = selectAllElement.query(By.css('label'));
            expect(label.nativeElement.innerText).toBe('全选');
          }));
          it('click select all option select all, click again select none', fakeAsync(() => {
            openMenu();
            const selectAllElement = debugEl.queryAll(By.css('d-select > div >div.devui-dropdown-menu li.devui-dropdown-item'))[0];
            selectAllElement.nativeElement.click();
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(component.option).toEqual(component.options);
            selectAllElement.nativeElement.click();
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(component.option).toEqual([]);
          }));
          it('All selected, select all checkbox should checked', fakeAsync(() => {
            component.option = [...component.options];
            fixture.detectChanges();
            openMenu();
            const selectAllElement = debugEl.queryAll(By.css('d-select > div >div.devui-dropdown-menu li.devui-dropdown-item'))[0];
            const checkboxComponent = selectAllElement.query(By.directive(CheckBoxComponent));
            expect((<CheckBoxComponent>checkboxComponent.componentInstance).checked).toBe(true);
            expect((<CheckBoxComponent>checkboxComponent.componentInstance).halfchecked).toBe(false);
          }));
          it('partial selected, select all checkbox should half-checked', fakeAsync(() => {
            component.option = component.options.filter((item, index) => index !== 0);
            fixture.detectChanges();
            openMenu();
            const selectAllElement = debugEl.queryAll(By.css('d-select > div >div.devui-dropdown-menu li.devui-dropdown-item'))[0];
            const checkboxComponent = selectAllElement.query(By.directive(CheckBoxComponent));
            expect((<CheckBoxComponent>checkboxComponent.componentInstance).halfchecked).toBe(true);
          }));
          it('partial selected => all selected', fakeAsync(() => {
            component.option = component.options.filter((item, index) => index !== 0);
            fixture.detectChanges();
            openMenu();
            const firstOptionElement = debugEl.queryAll(By.css('d-select > div >div.devui-dropdown-menu li.devui-dropdown-item'))[1];
            firstOptionElement.nativeElement.click();
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(component.option).toEqual([...component.options.filter((item, index) => index !== 0), component.options[0]]);
            const selectAllElement = debugEl.queryAll(By.css('d-select > div >div.devui-dropdown-menu li.devui-dropdown-item'))[0];
            const checkboxComponent = selectAllElement.query(By.directive(CheckBoxComponent));
            expect((<CheckBoxComponent>checkboxComponent.componentInstance).checked).toBe(true);
            expect((<CheckBoxComponent>checkboxComponent.componentInstance).halfchecked).toBe(false);
          }));
        });
      });
      describe('labelization', () => {
        beforeEach(fakeAsync(() => {
          component.extraConfig = {
            labelization: {
              enable: true,
              overflow: 'normal',
              containnerMaxHeight: undefined,
              labelMaxWidth: undefined,
            },
          };
          component.option = [...component.options];
          fixture.detectChanges();
          tick();
          fixture.detectChanges(); // 这个不提示错误但是是必须
        }));
        describe('enable labelization', () => {
          it('should show in label', fakeAsync(() => {
            const labelElements = debugEl.queryAll(By.css('.devui-select-tag-list .devui-tag-item'));
            expect(labelElements.length).toEqual(component.option.length);
          }));
          it('option should remove by clicking remove icon', fakeAsync(() => {
            const secondLabelElement = debugEl.queryAll(By.css('.devui-select-tag-list .devui-tag-item'))[1];
            const removeButton = secondLabelElement.query(By.css('.remove-button'));
            removeButton.nativeElement.click();
            tick();
            fixture.detectChanges();
            expect(component.option).toEqual(component.options.filter((item, index) => index !== 1));
          }));
          it('add option should add new label', fakeAsync(() => {
            component.option = [...component.options.filter((item, index) => index !== 1)];
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            const optionElement = debugEl.queryAll(By.css('d-select > div >div.devui-dropdown-menu li.devui-dropdown-item'))[1];
            optionElement.nativeElement.click();
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(component.option).toEqual([...component.options.filter((item, index) => index !== 1), component.options[1]]);
          }));
        });
        describe('label max-width', () => {
          it('long option label width should not be greater than label max-width', fakeAsync(() => {
            const longOption = ['选项1234567890长选项1234567890长选项1234567890'];
            component.options.push(longOption);
            component.option.unshift(longOption);
            component.extraConfig.labelization.labelMaxWidth = '20px';
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            const LabelElement = debugEl.queryAll(By.css('.devui-select-tag-list .devui-select-tag-item'))[0];
            expect(LabelElement.nativeElement.getBoundingClientRect().width).toEqual(20);
          }));
        });
        describe('overflow normal / scroll-y / multiple-line', () => {
          beforeEach(fakeAsync(() => {
            component.options = component.optionsHundred;
            component.option = [...component.options];
          }));
          it('normal', fakeAsync(() => {
            component.extraConfig.labelization.overflow = 'normal';
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            const listElement = debugEl.query(By.css('.devui-select-tag-list'));
            const containerHeight = listElement.nativeElement.getBoundingClientRect().height;
            expect(containerHeight).toEqual(26);
            expect(window.getComputedStyle(listElement.nativeElement).overflowY).toEqual('hidden');
          }));
          it('scroll-y', fakeAsync(() => {
            component.extraConfig.labelization.overflow = 'scroll-y';
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            const listElement = debugEl.query(By.css('.devui-select-tag-list'));
            const containerHeight = listElement.nativeElement.getBoundingClientRect().height;
            expect(containerHeight).toEqual(26);
            expect(window.getComputedStyle(listElement.nativeElement).overflowY).toEqual('auto');
          }));
          describe('multiple-line', () => {
            beforeEach(fakeAsync(() => {
              component.extraConfig.labelization.overflow = 'multiple-line';
              fixture.detectChanges();
              tick();
              fixture.detectChanges();
            }));
            it('default 2 line', fakeAsync(() => {
              // 多行 自动撑高 默认撑高成两行
              const listElement = debugEl.query(By.css('.devui-select-tag-list'));
              const containerHeight = listElement.nativeElement.getBoundingClientRect().height;
              expect(containerHeight).toEqual(48);
            }));
            it('no containerMaxHeight constrain', fakeAsync(() => {
              // 多行 自动撑高
              component.extraConfig.labelization.containerMaxHeight = 'unset';
              fixture.detectChanges();
              tick();
              fixture.detectChanges();
              const listElement = debugEl.query(By.css('.devui-select-tag-list'));
              const containerBottom = listElement.nativeElement.getBoundingClientRect().bottom;
              const lastTag = debugEl.query(By.css('.devui-select-tag-list > li.devui-select-tag-item:last-of-type'));
              const lastTagBottom = lastTag.nativeElement.getBoundingClientRect().bottom;
              expect(containerBottom).toBeGreaterThanOrEqual(lastTagBottom);
            }));
          });
        });
        describe('containerMaxHeight', () => {
          it('containerMaxHeight should work', fakeAsync(() => {
            component.options = component.optionsHundred;
            component.option = [...component.options];
            component.extraConfig.labelization.containerMaxHeight = '321px';
            component.extraConfig.labelization.overflow = 'multiple-line';
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            const listElement = debugEl.query(By.css('.devui-select-tag-list'));
            expect(listElement.nativeElement.getBoundingClientRect().height).toEqual(321);
          }));
        });
      });
      describe('keep multiple selected order', () => {
        const chooseByOrder = (order: number[], offset = 0) => {
          const optionElements = debugEl.queryAll(By.css('d-select > div > div.devui-dropdown-menu li.devui-dropdown-item'));
          order.forEach((index) => {
            optionElements[index + offset].nativeElement.click();
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
          });
        };
        it('keep order = user-selected, should order by user select', fakeAsync(() => {
          component.keepMultipleOrder = 'user-selected';
          fixture.detectChanges();
          openMenu();
          chooseByOrder([1, 2, 0]);
          expect(component.option).toEqual([component.options[1], component.options[2], component.options[0]]);
        }));
        it('keep order = origin, should order by origin array ', fakeAsync(() => {
          component.keepMultipleOrder = 'origin';
          fixture.detectChanges();
          openMenu();
          chooseByOrder([1, 2, 0]);
          expect(component.option).toEqual([component.options[0], component.options[1], component.options[2]]);
        }));
      });
    });
    describe('keyboard navigation', () => {
      describe('after open, if has selected option keyboard navigated to first selected option', () => {
        describe('single', () => {
          beforeEach(fakeAsync(() => {
            component.option = component.options[1];
            fixture.detectChanges();
            menuElement = debugEl.query(By.css('d-select > div >div.devui-dropdown-menu'));
            openMenu();
          }));
          it('option active', fakeAsync(() => {
            const optionElement = debugEl.queryAll(By.css('d-select > div > div.devui-dropdown-menu li.devui-dropdown-item'))[1];
            expect(optionElement.classes.active).toBeTruthy();
          }));
          it('keydown.ArrowDown & keydown.ArrowUp, expected option next to selected option to be navigated', fakeAsync(() => {
            const optionElementNext = debugEl.queryAll(By.css('d-select > div > div.devui-dropdown-menu li.devui-dropdown-item'))[2];
            expect(optionElementNext.classes.selected).toBeFalsy();
            toggleElement.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(optionElementNext.classes.selected).toBeTruthy();
            toggleElement.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(optionElementNext.classes.selected).toBeFalsy();
          }));
          it('keydown.Enter', fakeAsync(() => {
            const optionElementNext = debugEl.queryAll(By.css('d-select > div > div.devui-dropdown-menu li.devui-dropdown-item'))[2];
            expect(optionElementNext.classes.active).toBeFalsy();
            toggleElement.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            toggleElement.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            flush();
            expect(optionElementNext.classes.active).toBeTruthy();
            expect(component.option).toEqual(component.options[2]);
            expect(menuElement.nativeElement.getBoundingClientRect().height).toBe(0); // 选择完面板会关闭
          }));
          it('keydown.Escape', fakeAsync(() => {
            expect(menuElement.nativeElement.getBoundingClientRect().height).toBeGreaterThan(0);
            toggleElement.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(menuElement.nativeElement.getBoundingClientRect().height).toBe(0);
          }));
        });
        describe('multiple', () => {
          beforeEach(fakeAsync(() => {
            component.multiple = true;
            component.option = [component.options[1]];
            fixture.detectChanges();
            menuElement = debugEl.query(By.css('d-select > div >div.devui-dropdown-menu'));
            openMenu();
          }));
          it('option active', fakeAsync(() => {
            const optionElement = debugEl.queryAll(By.css('d-select > div > div.devui-dropdown-menu li.devui-dropdown-item'))[1];
            expect(optionElement.classes.active).toBeTruthy();
          }));
          it('keydown.ArrowDown & keydown.ArrowUp, expected first option to be navigated', fakeAsync(() => {
            // 多选目前与单选不一样，多选键盘事件命中列表的第一项， 单选命中选中项的后一项
            const optionElementNext = debugEl.queryAll(By.css('d-select > div > div.devui-dropdown-menu li.devui-dropdown-item'))[0];
            expect(optionElementNext.classes.selected).toBeFalsy();
            toggleElement.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(optionElementNext.classes.selected).toBeTruthy();
            toggleElement.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(optionElementNext.classes.selected).toBeFalsy();
          }));
          it('keydown.Enter', fakeAsync(() => {
            const optionElementNext = debugEl.queryAll(By.css('d-select > div > div.devui-dropdown-menu li.devui-dropdown-item'))[0];
            expect(optionElementNext.classes.active).toBeFalsy();
            toggleElement.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            toggleElement.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(optionElementNext.classes.active).toBeTruthy();
            expect(component.option).toEqual([component.options[1], component.options[0]]);
            expect(menuElement.nativeElement.getBoundingClientRect().height).toBeGreaterThan(0);
          }));
          // escape 与单选是一样的，不测了
        });
      });
      describe('after open, if has no selected option keyboard navigated to -1 position', () => {
        describe('single', () => {
          it('keydown.ArrowDown & keydown.ArrowUp, expected first option to be navigated', fakeAsync(() => {
            openMenu();
            const optionElementNext = debugEl.queryAll(By.css('d-select > div > div.devui-dropdown-menu li.devui-dropdown-item'))[0];
            expect(optionElementNext.classes.selected).toBeFalsy();
            toggleElement.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(optionElementNext.classes.selected).toBeTruthy();
          }));
        });
        describe('multiple', () => {
          it('keydown.ArrowDown & keydown.ArrowUp, expected first option to be navigated', fakeAsync(() => {
            component.multiple = true;
            fixture.detectChanges();
            openMenu();
            const optionElementNext = debugEl.queryAll(By.css('d-select > div > div.devui-dropdown-menu li.devui-dropdown-item'))[0];
            expect(optionElementNext.classes.selected).toBeFalsy();
            toggleElement.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(optionElementNext.classes.selected).toBeTruthy();
          }));
        });
      });
      describe('after search, keyboard navigated to first option', () => {
        beforeEach(fakeAsync(() => {
          component.options = component.optionsHundred;
          component.isSearch = true;
          fixture.detectChanges();
        }));
        describe('single', () => {
          let searchInputElement: DebugElement;
          beforeEach(fakeAsync(() => {
            openMenu();
            searchInputElement = debugEl.query(By.css('d-select input.devui-select-search'));
            searchInputElement.nativeElement.value = '1';
            searchInputElement.nativeElement.dispatchEvent(new Event('input', {}));
            fixture.detectChanges();
            tick(300);
            fixture.detectChanges();
          }));
          it('expected first option in search list to be navigated', fakeAsync(() => {
            const optionElementNext = debugEl.queryAll(By.css('d-select > div > div.devui-dropdown-menu li.devui-dropdown-item'))[0];
            expect(optionElementNext.classes.selected).toBeTruthy();
          }));
          it('expected enter to select first option', fakeAsync(() => {
            const optionElementNext = debugEl.queryAll(By.css('d-select > div > div.devui-dropdown-menu li.devui-dropdown-item'))[0];
            expect(optionElementNext.classes.active).toBeFalsy();
            searchInputElement.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(optionElementNext.classes.active).toBeTruthy();
          }));
        });
        describe('multiple', () => {
          let searchInputElement: DebugElement;
          beforeEach(fakeAsync(() => {
            component.multiple = true;
            fixture.detectChanges();
            openMenu();
            searchInputElement = debugEl.query(By.css('d-select input.devui-select-search'));
            searchInputElement.nativeElement.value = '1';
            searchInputElement.nativeElement.dispatchEvent(new Event('input', {}));
            fixture.detectChanges();
            tick(300);
            fixture.detectChanges();
          }));
          it('expect first option in search list to be not navigated', fakeAsync(() => {
            // 多选和单选不一样 搜索后不会自动导航到第一个项
            const optionElementNext = debugEl.queryAll(By.css('d-select > div > div.devui-dropdown-menu li.devui-dropdown-item'))[0];
            expect(optionElementNext.classes.selected).toBeFalsy();
          }));
        });
      });
      describe('toggle element focus, keydown.Enter', () => {
        it('after focus on toggleElement, keydown enter should open menu', fakeAsync(() => {
          toggleElement = debugEl.query(By.css('d-select > div > div.devui-form-group'));
          toggleElement.nativeElement.dispatchEvent(new MouseEvent('focus', { bubbles: false, cancelable: false }));
          fixture.detectChanges();
          toggleElement.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
          fixture.detectChanges();
          tick();
          fixture.detectChanges();
          tick(100);
          fixture.detectChanges();
          menuElement = debugEl.query(By.css('d-select > div >div.devui-dropdown-menu'));
          expect(menuElement.nativeElement.getBoundingClientRect().height).toBeGreaterThan(0);
        }));
      });
    });
    describe('no data', () => {
      describe('no option data', () => {
        it('no option data should show no data tips', fakeAsync(() => {
          component.options = [];
          fixture.detectChanges();
          openMenu();
          const itemElements = debugEl.queryAll(By.css('d-select > div > div.devui-dropdown-menu li.devui-dropdown-item'));
          const nodataElement = debugEl.query(By.css('d-select > div > div.devui-dropdown-menu div.devui-no-data-tip'));
          expect(itemElements.length).toBe(0);
          expect(nodataElement.nativeElement.innerText).toBe('没有数据');
        }));
      });
      describe('search no data found', () => {
        it('search no data found show no data tips', fakeAsync(() => {
          component.isSearch = true;
          fixture.detectChanges();
          openMenu();
          const searchInputElement = debugEl.query(By.css('d-select input.devui-select-search'));
          searchInputElement.nativeElement.value = '4';
          searchInputElement.nativeElement.dispatchEvent(new Event('input', {}));
          fixture.detectChanges();
          tick(300);
          fixture.detectChanges();
          const itemElements = debugEl.queryAll(By.css('d-select > div > div.devui-dropdown-menu li.devui-dropdown-item'));
          const nodataElement = debugEl.query(By.css('d-select > div > div.devui-dropdown-menu div.devui-no-data-tip'));
          expect(itemElements.length).toBe(0);
          expect(nodataElement.nativeElement.innerText).toBe('找不到相关记录');
        }));
      });
      describe('no data template', () => {
        it('show custom data tips', fakeAsync(() => {
          component.enableNoDataTemplate = true;
          component.isSearch = true;
          fixture.detectChanges();
          openMenu();
          const searchInputElement = debugEl.query(By.css('d-select input.devui-select-search'));
          searchInputElement.nativeElement.value = '4';
          searchInputElement.nativeElement.dispatchEvent(new Event('input', {}));
          fixture.detectChanges();
          tick(300);
          fixture.detectChanges();
          const itemElements = debugEl.queryAll(By.css('d-select > div > div.devui-dropdown-menu li.devui-dropdown-item'));
          const nodataElement = debugEl.query(By.css('d-select > div > div.devui-dropdown-menu div.devui-no-data-tip'));
          expect(itemElements.length).toBe(0);
          expect(nodataElement.nativeElement.innerText).toBe('没有自定义数据');
        }));
      });
    });
  });
  describe('append to body', () => {
    let debugEl: DebugElement;
    let toggleElement: DebugElement;
    let menuElement: HTMLElement;
    let component: TestSelectAppendToBodyComponent;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestSelectAppendToBodyComponent);
      debugEl = fixture.debugElement;
      component = debugEl.componentInstance;
      toggleElement = debugEl.query(By.css('d-select > div > div.devui-form-group'));
      fixture.detectChanges();
    });
    const openMenu = () => {
      toggleElement.nativeElement.click(); // 展开菜单
      fixture.detectChanges();
      tick(); // animation time
      fixture.detectChanges();
      tick(100); // searchFn的订阅
      fixture.detectChanges();
    };
    describe('basic', () => {
      it('show menu in body', fakeAsync(() => {
        menuElement = document.querySelector('div.devui-dropdown-menu');
        expect(menuElement).toBeFalsy();
        openMenu();
        menuElement = document.querySelector('div.devui-dropdown-menu');
        expect(menuElement).toBeTruthy();
        expect(menuElement.getBoundingClientRect().height).toBeGreaterThan(0);
      }));
      describe('after open', () => {
        beforeEach(fakeAsync(() => {
          openMenu();
        }));
        describe('open-select', () => {
          it('click option should close', fakeAsync(() => {
            menuElement = document.querySelector('div.devui-dropdown-menu');
            const optionElement = menuElement.querySelectorAll('li.devui-dropdown-item')[1] as HTMLElement;
            optionElement.click(); // 选择其中一个选项
            fixture.detectChanges();
            tick(); // animation time
            fixture.detectChanges();
            tick(); // beforeChange
            fixture.detectChanges();
            menuElement = document.querySelector('div.devui-dropdown-menu');
            expect(menuElement).toBeFalsy(); // 面板合起来
          }));
        });
        describe('open-close', () => {
          it('click select control element', fakeAsync(() => {
            toggleElement.nativeElement.click(); // 再次点击
            fixture.detectChanges();
            tick(); // animation time
            fixture.detectChanges();
            menuElement = document.querySelector('div.devui-dropdown-menu');
            expect(menuElement).toBeFalsy();
          }));
          it('click outside', fakeAsync(() => {
            document.documentElement.click();
            fixture.detectChanges();
            tick(); // animation time
            fixture.detectChanges();
            menuElement = document.querySelector('div.devui-dropdown-menu');
            expect(menuElement).toBeFalsy();
          }));
        });
      });
    });
    describe('appendToBodyDirections', () => {
      beforeEach(fakeAsync(() => {
        component.width = '500px';
        fixture.detectChanges();
      }));
      it('rightDown should in the right place', fakeAsync(() => {
        component.appendToBodyDirections = ['rightDown'];
        fixture.detectChanges();
        openMenu();
        menuElement = document.querySelector('div.devui-dropdown-menu');
        const originRect = toggleElement.nativeElement.parentElement.getBoundingClientRect();
        const menuRect = menuElement.getBoundingClientRect();
        const verticalBorderOverlayWidth = 4; // 有个间距
        expect(originRect.x === menuRect.x).toBe(true);
        expect(originRect.y + originRect.height + verticalBorderOverlayWidth).toBeCloseTo(menuRect.y, 1);
      }));
      it('leftDown should in the right place', fakeAsync(() => {
        component.appendToBodyDirections = ['leftDown'];
        fixture.detectChanges();
        openMenu();
        menuElement = document.querySelector('div.devui-dropdown-menu');
        const originRect = toggleElement.nativeElement.parentElement.getBoundingClientRect();
        const menuRect = menuElement.getBoundingClientRect();
        const verticalBorderOverlayWidth = 4; // 有个间距
        expect(originRect.x + originRect.width).toBeCloseTo(menuRect.x + menuRect.width, 0);
        expect(originRect.y + originRect.height + verticalBorderOverlayWidth).toBeCloseTo(menuRect.y, 1);
      }));
      it('centerDown should in the right place', fakeAsync(() => {
        component.appendToBodyDirections = ['centerDown'];
        fixture.detectChanges();
        openMenu();
        menuElement = document.querySelector('div.devui-dropdown-menu');
        const originRect = toggleElement.nativeElement.parentElement.getBoundingClientRect();
        const menuRect = menuElement.getBoundingClientRect();
        const verticalBorderOverlayWidth = 4; // 有个间距
        expect(originRect.x + originRect.width / 2 - (menuRect.x + menuRect.width / 2)).toBeLessThan(1);
        expect(originRect.y + originRect.height + verticalBorderOverlayWidth).toBeCloseTo(menuRect.y);
      }));
      it('rightUp should in the right place', fakeAsync(() => {
        component.appendToBodyDirections = ['rightUp'];
        fixture.detectChanges();
        openMenu();
        menuElement = document.querySelector('div.devui-dropdown-menu');
        const originRect = toggleElement.nativeElement.parentElement.getBoundingClientRect();
        const menuRect = menuElement.getBoundingClientRect();
        const verticalBorderOverlayWidth = 4; // 有个间距
        expect(originRect.x === menuRect.x).toBe(true);
        expect(originRect.y).toBeCloseTo(menuRect.y + menuRect.height + verticalBorderOverlayWidth);
      }));
      it('leftUp should in the right place', fakeAsync(() => {
        component.appendToBodyDirections = ['leftUp'];
        fixture.detectChanges();
        openMenu();
        menuElement = document.querySelector('div.devui-dropdown-menu');
        const originRect = toggleElement.nativeElement.parentElement.getBoundingClientRect();
        const menuRect = menuElement.getBoundingClientRect();
        const verticalBorderOverlayWidth = 4; // 有个间距
        expect(originRect.x + originRect.width).toBeCloseTo(menuRect.x + menuRect.width, 0);
        expect(originRect.y).toBeCloseTo(menuRect.y + menuRect.height + verticalBorderOverlayWidth, 0);
      }));
      it('centerUp should in the right place', fakeAsync(() => {
        component.appendToBodyDirections = ['centerUp'];
        fixture.detectChanges();
        openMenu();
        menuElement = document.querySelector('div.devui-dropdown-menu');
        const originRect = toggleElement.nativeElement.parentElement.getBoundingClientRect();
        const menuRect = menuElement.getBoundingClientRect();
        const verticalBorderOverlayWidth = 4; // 有个间距
        expect(originRect.x + originRect.width / 2 - (menuRect.x + menuRect.width / 2)).toBeLessThan(1);
        expect(originRect.y).toBeCloseTo(menuRect.y + menuRect.height + verticalBorderOverlayWidth);
      }));
      it('custom direction should placed to the left of toggle element', fakeAsync(() => {
        // 完全自定义方向
        component.appendToBodyDirections = component.customDirection;
        fixture.detectChanges();
        openMenu();
        menuElement = document.querySelector('div.devui-dropdown-menu');
        const originRect = toggleElement.nativeElement.parentElement.getBoundingClientRect();
        const menuRect = menuElement.getBoundingClientRect();
        const verticalBorderOverlayWidth = 4; // 有个间距
        expect(originRect.y).toBeCloseTo(menuRect.y - verticalBorderOverlayWidth, 1);
        expect(originRect.x).toBeCloseTo(menuRect.x + menuRect.width, 1);
      }));
    });
    describe('width', () => {
      it('centerUp should in the right place', fakeAsync(() => {
        const customWidth = 412; // 用一个特定的数字方便测试
        component.width = customWidth + 'px';
        fixture.detectChanges();
        openMenu();
        menuElement = document.querySelector('div.devui-dropdown-menu');
        const menuRect = menuElement.getBoundingClientRect();
        expect(menuRect.width).toBeCloseTo(customWidth);
      }));
    });
  });
  describe('big data', () => {
    let debugEl: DebugElement;
    let component: TestSelectLazyLoadVirtualScrollComponent;
    let toggleElement: DebugElement;
    let menuElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestSelectLazyLoadVirtualScrollComponent);
      debugEl = fixture.debugElement;
      component = debugEl.componentInstance;
      toggleElement = debugEl.query(By.css('d-select > div > div.devui-form-group'));
      fixture.detectChanges();
    });
    const openMenu = () => {
      toggleElement.nativeElement.click(); // 展开菜单
      fixture.detectChanges();
      tick(); // animation time
      fixture.detectChanges();
      tick(100); // searchFn的订阅
      fixture.detectChanges();
    };

    describe('lazy load', () => {
      beforeEach(fakeAsync(() => {
        component.enableLazyLoad = true;
        component.initLazyLoad();
        fixture.detectChanges();
        openMenu();
        menuElement = debugEl.query(By.css('d-select > div >div.devui-dropdown-menu'));
      }));
      describe('scroll to the end, auto load more', () => {
        it('scroll to the end, load one more page', fakeAsync(() => {
          const listElement = menuElement.query(By.css('.devui-select-list-unstyled'));
          expect(listElement.nativeElement.children.length).toEqual(15);
          listElement.nativeElement.scrollTop = listElement.nativeElement.scrollHeight;
          fixture.detectChanges();
          listElement.nativeElement.dispatchEvent(new Event('scroll', { bubbles: true, cancelable: false }));
          fixture.detectChanges();
          tick();
          fixture.detectChanges();
          tick(300);
          fixture.detectChanges();
          expect(listElement.nativeElement.children.length).toEqual(30);
        }));
      });
      describe('public api loadStart/loadFinish', () => {
        let loadingElement;
        it('manually trigger loadStart, loading should show', fakeAsync(() => {
          loadingElement = menuElement.nativeElement.querySelector('.devui-loading-wrapper');
          expect(loadingElement).toBeFalsy();
          component.selectComponent.loadStart();
          fixture.detectChanges();
          tick();
          fixture.detectChanges();
          tick(300);
          fixture.detectChanges();
          loadingElement = menuElement.nativeElement.querySelector('.devui-loading-wrapper');
          expect(loadingElement).toBeTruthy();
        }));
        it('after trigger loadStart, manually trigger loadFinish, loading should hide', fakeAsync(() => {
          component.selectComponent.loadStart();
          fixture.detectChanges();
          tick();
          fixture.detectChanges();
          tick(300);
          fixture.detectChanges();
          component.selectComponent.loadFinish();
          fixture.detectChanges();
          tick();
          fixture.detectChanges();
          tick(300);
          fixture.detectChanges();
          loadingElement = menuElement.nativeElement.querySelector('.devui-loading-wrapper');
          expect(loadingElement).toBeFalsy();
        }));
      });
    });
    describe('virtual scroll', () => {
      // virtualScrollFlush 函数参考了cdk scrolling 的 virtual-scroll-viewport.spec.ts 的finishInit 方法
      const virtualScrollFlush = () => {
        fixture.detectChanges();
        flush();

        // On the second cycle we render the items.
        fixture.detectChanges();
        flush();

        // Flush the initial fake scroll event.
        animationFrameScheduler.flush();
        flush();
        fixture.detectChanges();
        fixture.detectChanges();
      };
      describe('big data', () => {
        beforeEach(fakeAsync(async () => {
          component.virtualScroll = true;
          component.options = component.optionsHundred;
          fixture.detectChanges();
          openMenu();
          await fixture.whenStable();
          menuElement = debugEl.query(By.css('d-select > div >div.devui-dropdown-menu'));
        }));
        it('big data, few DOM', fakeAsync(() => {
          const listElement = menuElement.nativeElement.querySelector('.devui-select-list-unstyled > .cdk-virtual-scroll-content-wrapper');
          expect(listElement.children.length).toBeLessThan(50);
        }));
        it('scroll to specificated position, first options right', fakeAsync(() => {
          const listElement = menuElement.nativeElement.querySelector('.devui-select-list-unstyled');
          const innerList = menuElement.nativeElement.querySelector('.devui-select-list-unstyled > .cdk-virtual-scroll-content-wrapper');
          const singleHeight = 36;
          const listItemSpace = 4;
          listElement.scrollTop = (singleHeight + listItemSpace) * 100;
          listElement.dispatchEvent(new Event('scroll', { bubbles: true, cancelable: false }));
          virtualScrollFlush();
          const option11th = [...innerList.children].filter((el) => el.innerText.trim() === '选项101').pop();
          expect(option11th).toBeTruthy();
          expect(option11th.getBoundingClientRect().top).toBeCloseTo(listElement.getBoundingClientRect().top);
        }));
      });
      describe('little data', () => {
        beforeEach(fakeAsync(() => {
          component.virtualScroll = true;
          component.options = component.optionsFew;
          fixture.detectChanges();
          openMenu();
          menuElement = debugEl.query(By.css('d-select > div >div.devui-dropdown-menu'));
        }));
        it('auto height', fakeAsync(() => {
          const listElement = menuElement.nativeElement.querySelector('.devui-select-list-unstyled > .cdk-virtual-scroll-content-wrapper');
          expect(listElement.children.length).toEqual(3);
          const singleHeight = 36;
          const listItemSpace = 4;
          const expectHeight = singleHeight * component.options.length + listItemSpace * (component.options.length - 1);
          expect(listElement.getBoundingClientRect().height).toBeCloseTo(expectHeight, 1);
        }));
      });
      describe('templateItemSize', () => {
        const templateItemSize = 46;
        const listItemSpace = 4;
        beforeEach(fakeAsync(async () => {
          fixture = TestBed.createComponent(TestSelectVirtualScrollItemSizeComponent);
          debugEl = fixture.debugElement;
          component = debugEl.componentInstance;
          toggleElement = debugEl.query(By.css('d-select > div > div.devui-form-group'));
          fixture.detectChanges();

          component.virtualScroll = true;
          component.options = component.optionsHundred;
          component.templateItemSize = templateItemSize;
          fixture.detectChanges();
          tick();
          fixture.detectChanges();
          openMenu();
          await fixture.whenStable();
          menuElement = debugEl.query(By.css('d-select > div >div.devui-dropdown-menu'));
        }));
        it('scrollHeight correct', fakeAsync(() => {
          const listElement = menuElement.nativeElement.querySelector('.devui-select-list-unstyled');
          const expectHeight = (templateItemSize + listItemSpace) * component.options.length;
          expect(listElement.scrollHeight).toBeCloseTo(expectHeight);
        }));
        it('scroll to specificated position, first options correct', fakeAsync(() => {
          const listElement = menuElement.nativeElement.querySelector('.devui-select-list-unstyled');
          const innerList = menuElement.nativeElement.querySelector('.devui-select-list-unstyled > .cdk-virtual-scroll-content-wrapper');
          listElement.scrollTop = (templateItemSize + listItemSpace) * 100;
          listElement.dispatchEvent(new Event('scroll', { bubbles: true, cancelable: false }));
          virtualScrollFlush();
          const option11th = [...innerList.children].filter((el) => el.innerText.trim() === '选项101').pop();
          expect(option11th).toBeTruthy();
          expect(option11th.getBoundingClientRect().top).toBeCloseTo(listElement.getBoundingClientRect().top);
        }));
      });
    });
  });

  describe('custom area', () => {
    let debugEl: DebugElement;
    let component: TestSelectCustomAreaComponent;
    let toggleElement: DebugElement;
    const openMenu = () => {
      toggleElement.nativeElement.click(); // 展开菜单
      fixture.detectChanges();
      tick(); // animation time
      fixture.detectChanges();
      tick(100); // searchFn的订阅
      fixture.detectChanges();
    };
    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(TestSelectCustomAreaComponent);
      debugEl = fixture.debugElement;
      component = debugEl.componentInstance;
      toggleElement = debugEl.query(By.css('d-select > div > div.devui-form-group'));
      openMenu();
    }));
    describe('custom area content', () => {
      it('show custom area', fakeAsync(() => {
        const customAreaElement = debugEl.query(By.css('.devui-select-custom-area'));
        expect(customAreaElement).toBeTruthy();
      }));
      it('show custom content text', fakeAsync(() => {
        const customContentElement = debugEl.query(By.css('.custom-wrapper'));
        expect(customContentElement).toBeTruthy();
        const customTitle = customContentElement.query(By.css('.custom-title'));
        expect(customTitle).toBeTruthy();
        expect(customTitle.nativeElement.innerText.trim()).toEqual('最近选择');
      }));
    });
    describe('custom area position', () => {
      it('position bottom', fakeAsync(() => {
        component.customViewDirection = 'bottom';
        fixture.detectChanges();
        const listElement = debugEl.query(By.css('.devui-dropdown-menu-wrap'));
        const customAreaElement = debugEl.query(By.css('.devui-select-custom-area'));
        const listRect = listElement.nativeElement.getBoundingClientRect();
        const customRect = customAreaElement.nativeElement.getBoundingClientRect();
        expect(listRect.x).toEqual(customRect.x);
        expect(listRect.y).toBeLessThan(customRect.y);
      }));
      it('position right', fakeAsync(() => {
        component.customViewDirection = 'right';
        fixture.detectChanges();
        const listElement = debugEl.query(By.css('.devui-dropdown-menu-wrap'));
        const customAreaElement = debugEl.query(By.css('.devui-select-custom-area'));
        const listRect = listElement.nativeElement.getBoundingClientRect();
        const customRect = customAreaElement.nativeElement.getBoundingClientRect();
        expect(listRect.y).toEqual(customRect.y);
        expect(listRect.x).toBeLessThan(customRect.x);
      }));
      it('position left', fakeAsync(() => {
        component.customViewDirection = 'left';
        fixture.detectChanges();
        const listElement = debugEl.query(By.css('.devui-dropdown-menu-wrap'));
        const customAreaElement = debugEl.query(By.css('.devui-select-custom-area'));
        const listRect = listElement.nativeElement.getBoundingClientRect();
        const customRect = customAreaElement.nativeElement.getBoundingClientRect();
        expect(listRect.y).toEqual(customRect.y);
        expect(listRect.x).toBeGreaterThan(customRect.x);
      }));
    });
    describe('public api choose', () => {
      it('choose it should add', fakeAsync(() => {
        const customOptionElements = debugEl.queryAll(By.css('.custom-box .custom-item'));
        customOptionElements[0].nativeElement.click();
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        tick(100);
        fixture.detectChanges();
        expect(component.option).toEqual(['选项1']);
        customOptionElements[0].nativeElement.click();
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        tick(100);
        fixture.detectChanges();
        expect(component.option).toEqual([]);
      }));
    });
  });
  describe('auto focus and toggle', () => {
    let debugEl: DebugElement;
    let component: TestSelecAutoFocusNToggleOnFocusComponent;
    let toggleElement: DebugElement;
    let menuElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestSelecAutoFocusNToggleOnFocusComponent);
      debugEl = fixture.debugElement;
      component = debugEl.componentInstance;
      fixture.detectChanges();
    });
    describe('autoFocus', () => {
      it('after init, toggleElement has been focus', fakeAsync(() => {
        component.autoFocus = true;
        component.init = true;
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        toggleElement = debugEl.query(By.css('d-select > div > div.devui-form-group'));
        expect(document.activeElement).toEqual(toggleElement.nativeElement);
      }));
    });
    describe('toggle on focus', () => {
      it('after focus, menu should open', fakeAsync(() => {
        component.toggleOnFocus = true;
        component.init = true;
        fixture.detectChanges();
        tick(); // init
        fixture.detectChanges();
        toggleElement = debugEl.query(By.css('d-select > div > div.devui-form-group'));
        toggleElement.nativeElement.dispatchEvent(new MouseEvent('focus', { bubbles: false, cancelable: false }));
        tick(); // animation
        fixture.detectChanges();
        tick(100); // searchFn
        fixture.detectChanges();
        menuElement = debugEl.query(By.css('d-select > div >div.devui-dropdown-menu'));
        expect(menuElement.nativeElement.getBoundingClientRect().height).toBeGreaterThan(0);
      }));
      it('mouse down then focus on toggleElement, not trigger toggle on focus', fakeAsync(() => {
        component.toggleOnFocus = true;
        component.init = true;
        fixture.detectChanges();
        tick(); // init
        fixture.detectChanges();
        toggleElement = debugEl.query(By.css('d-select > div > div.devui-form-group'));
        toggleElement.nativeElement.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
        fixture.detectChanges();
        toggleElement.nativeElement.dispatchEvent(new MouseEvent('focus', { bubbles: false, cancelable: false }));
        fixture.detectChanges();
        toggleElement.nativeElement.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true }));
        tick(); // animation
        fixture.detectChanges();
        tick(100); // searchFn
        fixture.detectChanges();
        menuElement = debugEl.query(By.css('d-select > div >div.devui-dropdown-menu'));
        expect(menuElement.nativeElement.getBoundingClientRect().height).toEqual(0);
      }));
    });
    describe('autoFocus and toggle on focus', () => {
      xit('after init, menu should open', fakeAsync(() => {
        // TODO: 用例有问题执行不通过
        component.toggleOnFocus = true;
        component.autoFocus = true;
        component.init = true;
        fixture.detectChanges();
        tick(); // init
        fixture.detectChanges();
        tick(); // animation
        fixture.detectChanges();
        tick(100); // searchFn
        fixture.detectChanges();
        tick(100);
        fixture.detectChanges();
        menuElement = debugEl.query(By.css('d-select > div >div.devui-dropdown-menu'));
        expect(menuElement.nativeElement.getBoundingClientRect().height).toBeGreaterThan(0);
      }));
    });
  });
  describe('option template', () => {
    let debugEl: DebugElement;
    let component: TestSelectTemplateComponent;
    let toggleElement: DebugElement;
    const openMenu = () => {
      toggleElement.nativeElement.click(); // 展开菜单
      fixture.detectChanges();
      tick(); // animation time
      fixture.detectChanges();
      tick(100); // searchFn的订阅
      fixture.detectChanges();
    };
    beforeEach(() => {
      fixture = TestBed.createComponent(TestSelectTemplateComponent);
      debugEl = fixture.debugElement;
      component = debugEl.componentInstance;
      toggleElement = debugEl.query(By.css('d-select > div > div.devui-form-group'));
      fixture.detectChanges();
    });
    describe('single - list template', () => {
      beforeEach(fakeAsync(() => {
        component.option = component.options[0];
        component.templateMode = 'list';
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
      }));
      it('should show result item without any prefix', fakeAsync(() => {
        const inputElement = debugEl.query(By.css('d-select > div > div.devui-form-group > input.devui-select-input'));
        expect(inputElement.nativeElement.value).toEqual(component.options[0]);
      }));
      it('should show list item with "single-item" prefix', fakeAsync(() => {
        openMenu();
        const optionElements = debugEl.queryAll(By.css('.devui-select-list-unstyled .devui-dropdown-item'));
        expect(optionElements[0].nativeElement.innerText.trim()).toEqual('single-item: ' + component.options[0]);
      }));
    });
    describe('multiple - list template', () => {
      beforeEach(fakeAsync(() => {
        component.option = [component.options[0]];
        component.templateMode = 'list';
        component.multiple = true;
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
      }));
      it('should show result item without any prefix', fakeAsync(() => {
        const inputElement = debugEl.query(By.css('d-select > div > div.devui-form-group > input.devui-select-input'));
        expect(inputElement.nativeElement.value).toEqual(component.options[0]);
      }));
      it('should show list item with "multiple-item" prefix', fakeAsync(() => {
        openMenu();
        const optionElements = debugEl.queryAll(By.css('.devui-select-list-unstyled .devui-dropdown-item'));
        expect(optionElements[0].nativeElement.innerText.trim()).toEqual('multiple-item: ' + component.options[0]);
      }));
    });
    describe('single - result template', () => {
      beforeEach(fakeAsync(() => {
        component.option = component.options[0];
        component.templateMode = 'result';
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
      }));
      it('should show result item with "single-result" prefix', fakeAsync(() => {
        expect(toggleElement.nativeElement.innerText.trim()).toEqual('single-result: ' + component.options[0]);
      }));
      it('should not show list item with any prefix', fakeAsync(() => {
        openMenu();
        const optionElements = debugEl.queryAll(By.css('.devui-select-list-unstyled .devui-dropdown-item'));
        expect(optionElements[0].nativeElement.innerText.trim()).toEqual(component.options[0]);
      }));
    });
    describe('multiple - result template', () => {
      beforeEach(fakeAsync(() => {
        component.option = [component.options[0]];
        component.templateMode = 'result';
        component.multiple = true;
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
      }));
      it('should show result item with "multi-result" prefix', fakeAsync(() => {
        expect(toggleElement.nativeElement.innerText.trim()).toEqual('multiple-result: ' + component.options[0]);
      }));
      it('should  show list item without any prefix', fakeAsync(() => {
        openMenu();
        const optionElements = debugEl.queryAll(By.css('.devui-select-list-unstyled .devui-dropdown-item'));
        expect(optionElements[0].nativeElement.innerText.trim()).toEqual(component.options[0]);
      }));
    });
    describe('single - both template', () => {
      beforeEach(fakeAsync(() => {
        component.option = component.options[0];
        component.templateMode = 'both';
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
      }));
      it('should show result item with "single-result" prefix', fakeAsync(() => {
        expect(toggleElement.nativeElement.innerText.trim()).toEqual('single-result: ' + component.options[0]);
      }));
      it('should show list item with "single-item" prefix', fakeAsync(() => {
        openMenu();
        const optionElements = debugEl.queryAll(By.css('.devui-select-list-unstyled .devui-dropdown-item'));
        expect(optionElements[0].nativeElement.innerText.trim()).toEqual('single-item: ' + component.options[0]);
      }));
    });
    describe('multiple - both template', () => {
      beforeEach(fakeAsync(() => {
        component.option = [component.options[0]];
        component.templateMode = 'both';
        component.multiple = true;
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
      }));
      it('should show result item with "multi-result" prefix', fakeAsync(() => {
        expect(toggleElement.nativeElement.innerText.trim()).toEqual('multiple-result: ' + component.options[0]);
      }));
      it('should show list item with "multiple-item" prefix', fakeAsync(() => {
        openMenu();
        const optionElements = debugEl.queryAll(By.css('.devui-select-list-unstyled .devui-dropdown-item'));
        expect(optionElements[0].nativeElement.innerText.trim()).toEqual('multiple-item: ' + component.options[0]);
      }));
    });
    describe('inputItemTemplate', () => {
      beforeEach(fakeAsync(() => {
        component.inputItemTemplateEnable = true;
        fixture.detectChanges();
      }));
      describe('single - list template', () => {
        beforeEach(fakeAsync(() => {
          component.option = component.options[0];
          component.templateMode = 'list';
          fixture.detectChanges();
          tick();
          fixture.detectChanges();
        }));
        it('should show result item without any prefix', fakeAsync(() => {
          const inputElement = debugEl.query(By.css('d-select > div > div.devui-form-group > input.devui-select-input'));
          expect(inputElement.nativeElement.value).toEqual(component.options[0]);
        }));
        it('should show list item with "input-single-item" prefix', fakeAsync(() => {
          openMenu();
          const optionElements = debugEl.queryAll(By.css('.devui-select-list-unstyled .devui-dropdown-item'));
          expect(optionElements[0].nativeElement.innerText.trim()).toEqual('input-single-item: ' + component.options[0]);
        }));
      });
      describe('multiple - list template', () => {
        beforeEach(fakeAsync(() => {
          component.option = [component.options[0]];
          component.templateMode = 'list';
          component.multiple = true;
          fixture.detectChanges();
          tick();
          fixture.detectChanges();
        }));
        it('should show result item without any prefix', fakeAsync(() => {
          const inputElement = debugEl.query(By.css('d-select > div > div.devui-form-group > input.devui-select-input'));
          expect(inputElement.nativeElement.value).toEqual(component.options[0]);
        }));
        it('should show list item with "input-multiple-item" prefix', fakeAsync(() => {
          openMenu();
          const optionElements = debugEl.queryAll(By.css('.devui-select-list-unstyled .devui-dropdown-item'));
          expect(optionElements[0].nativeElement.innerText.trim()).toEqual('input-multiple-item: ' + component.options[0]);
        }));
      });
      describe('single - result template', () => {
        beforeEach(fakeAsync(() => {
          component.option = component.options[0];
          component.templateMode = 'result';
          fixture.detectChanges();
          tick();
          fixture.detectChanges();
        }));
        it('should show result item with "input-single-result" prefix', fakeAsync(() => {
          expect(toggleElement.nativeElement.innerText.trim()).toEqual('input-single-result: ' + component.options[0]);
        }));
        it('should not show list item with any prefix', fakeAsync(() => {
          openMenu();
          const optionElements = debugEl.queryAll(By.css('.devui-select-list-unstyled .devui-dropdown-item'));
          expect(optionElements[0].nativeElement.innerText.trim()).toEqual(component.options[0]);
        }));
      });
      describe('multiple - result template', () => {
        beforeEach(fakeAsync(() => {
          component.option = [component.options[0]];
          component.templateMode = 'result';
          component.multiple = true;
          fixture.detectChanges();
          tick();
          fixture.detectChanges();
        }));
        it('should show result item with "input-multi-result" prefix', fakeAsync(() => {
          expect(toggleElement.nativeElement.innerText.trim()).toEqual('input-multiple-result: ' + component.options[0]);
        }));
        it('should  show list item without any prefix', fakeAsync(() => {
          openMenu();
          const optionElements = debugEl.queryAll(By.css('.devui-select-list-unstyled .devui-dropdown-item'));
          expect(optionElements[0].nativeElement.innerText.trim()).toEqual(component.options[0]);
        }));
      });
      describe('single - both template', () => {
        beforeEach(fakeAsync(() => {
          component.option = component.options[0];
          component.templateMode = 'both';
          fixture.detectChanges();
          tick();
          fixture.detectChanges();
        }));
        it('should show result item with "input-single-result" prefix', fakeAsync(() => {
          expect(toggleElement.nativeElement.innerText.trim()).toEqual('input-single-result: ' + component.options[0]);
        }));
        it('should show list item with "input-single-item" prefix', fakeAsync(() => {
          openMenu();
          const optionElements = debugEl.queryAll(By.css('.devui-select-list-unstyled .devui-dropdown-item'));
          expect(optionElements[0].nativeElement.innerText.trim()).toEqual('input-single-item: ' + component.options[0]);
        }));
      });
      describe('multiple - both template', () => {
        beforeEach(fakeAsync(() => {
          component.option = [component.options[0]];
          component.templateMode = 'both';
          component.multiple = true;
          fixture.detectChanges();
          tick();
          fixture.detectChanges();
        }));
        it('should show result item with "input-multi-result" prefix', fakeAsync(() => {
          expect(toggleElement.nativeElement.innerText.trim()).toEqual('input-multiple-result: ' + component.options[0]);
        }));
        it('should show list item with "input-multiple-item" prefix', fakeAsync(() => {
          openMenu();
          const optionElements = debugEl.queryAll(By.css('.devui-select-list-unstyled .devui-dropdown-item'));
          expect(optionElements[0].nativeElement.innerText.trim()).toEqual('input-multiple-item: ' + component.options[0]);
        }));
      });
    });
  });
});
