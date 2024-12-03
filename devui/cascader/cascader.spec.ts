import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DropDownToggleDirective } from 'ng-devui/dropdown';
import { of } from 'rxjs';
import { CascaderLiComponent } from './cascader-li.component';
import { CascaderComponent } from './cascader.component';
import { CascaderModule } from './cascader.module';
import { CascaderItem } from './cascader.type';

const OPTION = [
  {
    label: '测试1',
    value : 1,
    children: [
      {
        label: '测试1-1',
        value : 4,
        children: [
          {
            label: '测试1-1-1',
            value : 8,
            isLeaf: true
          },
          {
            label: '测试1-1-2',
            value : 9,
            children: [
              {
                label: '测试1-1-2-1',
                value : 81,
                isLeaf: true
              }
            ],
          }
        ]
      },
      {
        label: '测试1-2',
        value : 41,
        isLeaf: true
      },
      {
        label: '测试1-3',
        value : 42,
        isLeaf: true
      },
      {
        label: '测试1-4',
        value : 43,
        isLeaf: true
      }
    ],
  },
  {
    label: '测试2',
    value : 2,
    children: [
      {
        label: '测试2-1',
        value : 5,
        children: [
          {
            label: '测试2-1-1',
            value : 51,
            isLeaf: true
          },
          {
            label: '测试2-1-2',
            value : 61,
            isLeaf: true,
            disabled: true
          }
        ]
      },
      {
        label: '测试2-2',
        value : 6,
        children: [
          {
            label: '测试2-2-1',
            value : 512,
            isLeaf: true
          },
          {
            label: '测试2-2-2',
            value : 611,
            isLeaf: true
          }
        ]
      },
      {
        label: '测试2-3',
        value : 712,
        isLeaf: true
      }
    ]
  },
  {
    label: '测试3',
    value : 3,
    children: [],
    isLeaf: true,
    disabled: true
  },
  {
    label: '测试4',
    value : 95,
    children: [],
    isLeaf: true,
  }
];

@Component({
  template: `
    <d-cascader
      #cascaderCmp
      [options]="options"
      [placeholder]="placeholder"
      [ngModel]="value"
      [trigger]="triggerType"
      (ngModelChange)="onChanges($event)"
      [showPath]="showPath"
      [allowClear]="allowClear"
      [dropdownWidth]="dropdownWidth"
      [width]="width"
      [allowSearch]="allowSearch"
      [canSelectParent]="canSelectParent"
    ></d-cascader>
  `
})
class BasicComponent {
  @ViewChild('cascaderCmp', {static: true}) cascaderCmp: CascaderComponent;
  width = 250;
  options = [...OPTION];

  triggerType = 'click';
  dropdownWidth = 120;
  allowClear = true;
  showPath = true;
  placeholder = '请选择';
  allowSearch = false;
  value: Array<string | number>;
  canSelectParent = false;

  onChanges = jasmine.createSpy('onChanges');
}

@Component({
  template: `
    <d-cascader
      #cascaderCmp
      [options]="options"
      [ngModel]="value"
      (ngModelChange)="onChanges($event)"
      [allowSearch]="allowSearch"
    ></d-cascader>
  `
})
class SearchComponent {
  @ViewChild('cascaderCmp', {static: true}) cascaderCmp: CascaderComponent;
  options = [...OPTION];
  allowSearch = true;
  value: Array<string | number>;

  onChanges = jasmine.createSpy('onChanges');
}

@Component({
  template: `
    <d-cascader
      #cascaderCmp
      [options]="options"
      [ngModel]="value"
      (ngModelChange)="onChanges($event)"
      [allowSearch]="allowSearch"
      [multiple]="true"
      [allowClear]="true"
      [loadChildrenFn]="null"
    ></d-cascader>
  `
})
class MultipleComponent {
  @ViewChild('cascaderCmp', {static: true}) cascaderCmp: CascaderComponent;
  options = [...OPTION];
  allowSearch = true;
  value: Array<string | number>[] = [];

  onChanges = jasmine.createSpy('onChanges');
}

@Component({
  template: `
    <d-cascader
      [options]="options"
      [placeholder]="'请选择'"
      [(ngModel)]="value"
      [trigger]="'click'"
      (ngModelChange)="onChanges($event)"
      [showPath]="true"
      [allowClear]="true"
      [dropdownWidth]="120"
      [loadChildrenFn]="loadChildren"
    ></d-cascader>
  `
})
class LazyLoadComponent {
  options = [
    {
      label: '测试1',
      value : 1,
    },
    {
      label: '测试2',
      value : 2,
    },
    {
      label: '测试3',
      value : 3,
    }
  ];

  children1 = [
    {
      label: '测试1-1',
      value : 4,
      isLeaf: true
    },
    {
      label: '测试1-2',
      value : 41,
      isLeaf: true
    },
    {
      label: '测试1-3',
      value : 42,
      isLeaf: true
    },
    {
      label: '测试1-4',
      value : 43,
      isLeaf: true
    }
  ];

  children2 = [
    {
      label: '测试2-1',
      value : 5,
    },
    {
      label: '测试2-2',
      value : 6,
      isLeaf: true
    },
    {
      label: '测试2-3',
      value : 712,
      isLeaf: true
    }
  ];

  children3 = [
    {
      label: '测试2-1-1',
      value : 51,
      isLeaf: true
    },
    {
      label: '测试2-1-2',
      value : 61,
      isLeaf: true,
      disabled: true
    }
  ];
  allowSearch = true;
  value: Array<string | number> = [];

  onChanges = jasmine.createSpy('onChanges');
  loadChildren = (val: CascaderItem) => {
    if (val.value === 1) {
      return new Promise((resolve, rject) => {
        setTimeout(() => {
          resolve(this.children1);
        }, 1000);
      });
    } else if (val.value === 2) {
      return new Promise((resolve, rject) => {
        setTimeout(() => {
          resolve(this.children2);
        }, 1000);
      });
    } else {
      return of(this.children3);
    }
  };
}

describe('cascader', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CascaderModule, NoopAnimationsModule, FormsModule],
      declarations: [BasicComponent, SearchComponent, MultipleComponent, LazyLoadComponent]
    }).compileComponents();
  });

  describe('cascader basic', () => {
    let testComponent: BasicComponent;
    let debugElement: DebugElement;
    let insideNativeElement: HTMLElement;
    let dropdownToggleEle: HTMLElement;
    let secondLeafNodeEle: HTMLElement;
    let fixture: ComponentFixture<BasicComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(BasicComponent);
      testComponent = fixture.componentInstance;
      debugElement = fixture.debugElement.query(By.directive(CascaderComponent));
      insideNativeElement = debugElement.nativeElement;
      fixture.detectChanges();
    });

    // toggle事件
    const clickDropDownToggle = () => {
      dropdownToggleEle = debugElement.query(By.directive(DropDownToggleDirective)).nativeElement;
      dropdownToggleEle.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
    };

    // 选择第二层叶子节点事件
    const clickSecondLeaf = () => {
      clickDropDownToggle();
      const firstNodeItemEle = fixture.debugElement.queryAll(By.directive(CascaderLiComponent))[0].query(By.css('li')).nativeElement;
      firstNodeItemEle.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      secondLeafNodeEle = fixture.debugElement.queryAll(By.css('ul'))[1]
        .queryAll(By.directive(CascaderLiComponent))[1]
        .query(By.css('li')).nativeElement;
      secondLeafNodeEle.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
    };

    describe('default behavior', () => {
      it('cascader demo has created successfully', () => {
        expect(testComponent).toBeTruthy();
      });

      it('placeholder param should work', () => {
        const inputElement = debugElement.query(By.css('input')).nativeElement;
        expect(inputElement.attributes.placeholder.value).toBe('请选择');
      });

      it('width param should work', () => {
        const inputElement = debugElement.query(By.css('input')).nativeElement;
        expect(getComputedStyle(inputElement).width).toBe('250px');
        testComponent.width = 200;
        fixture.detectChanges();
        expect(getComputedStyle(inputElement).width).toBe('200px');
      });

      it('allowClear param should work', () => {
        testComponent.allowClear = false;
        fixture.detectChanges();
        expect(debugElement.query(By.css('.dropdown-show-clear'))).toBeFalsy();
      });

      it('dropdown toggle should work', fakeAsync(() => {
        expect(fixture.debugElement.query(By.css('.devui-drop-menu-wrapper'))).toBeFalsy();
        clickDropDownToggle();
        expect(fixture.debugElement.query(By.css('.devui-drop-menu-wrapper'))).toBeTruthy();
        clickDropDownToggle();
        expect(fixture.debugElement.query(By.css('.devui-drop-menu-wrapper'))).toBeFalsy();
      }));

      it('click trigger should work', fakeAsync(() => {
        clickDropDownToggle();
        expect(fixture.debugElement.queryAll(By.css('.devui-cascader-list')).length).toBe(1);
        // 选中下拉第一个li点击
        const liElement = fixture.debugElement.queryAll(By.directive(CascaderLiComponent))[0].query(By.css('li'));
        liElement.nativeElement.dispatchEvent(new Event('click'));
        tick();
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css('.devui-cascader-list')).length).toBe(2);
      }));

      it('hover trigger should work', fakeAsync(() => {
        testComponent.triggerType = 'hover';
        fixture.detectChanges();
        clickDropDownToggle();
        expect(fixture.debugElement.queryAll(By.css('.devui-cascader-list')).length).toBe(1);
        // 选中下拉第一个li执行鼠标移入
        const liElement = fixture.debugElement.queryAll(By.directive(CascaderLiComponent))[0].query(By.css('li'));
        liElement.nativeElement.dispatchEvent(new Event('mouseenter', { bubbles: true, cancelable: true }));
        tick();
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css('.devui-cascader-list')).length).toBe(2);
      }));

      it('dropdown should display correct data', fakeAsync(() => {
        clickDropDownToggle();
        const debugLiList =  fixture.debugElement.queryAll(By.directive(CascaderLiComponent));
        expect(debugLiList.length).toBe(4); // 数量对
        debugLiList.forEach((ele, index) => {
          expect(ele.query(By.css('li')).nativeElement.innerText).toEqual(testComponent.options[index].label); // label显示对
          expect(!!ele.query(By.css('.devui-cascader-icon-right'))).toBe(!testComponent.options[index].isLeaf); // isLeaf参数生效
          expect(!!ele.query(By.css('.disabled'))).toBe(!!testComponent.options[index].disabled); // disable参数生效
        });
      }));

      it('document click should close dropdown', fakeAsync(() => {
        clickDropDownToggle();
        expect(fixture.debugElement.query(By.css('.devui-drop-menu-wrapper'))).toBeTruthy();

        document.dispatchEvent(new Event('click'));
        tick();
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.devui-drop-menu-wrapper'))).toBeFalsy();
      }));

      it('click leaf node should close dropdown', fakeAsync(() => {
        clickDropDownToggle();
        expect(fixture.debugElement.query(By.css('.devui-drop-menu-wrapper'))).toBeTruthy();
        const leafNodeItemEle = fixture.debugElement.queryAll(By.directive(CascaderLiComponent))[3].query(By.css('li')).nativeElement;
        leafNodeItemEle.dispatchEvent(new Event('click'));
        tick();
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.devui-drop-menu-wrapper'))).toBeFalsy();
      }));

      it('click leaf node should change value', fakeAsync(() => {
        expect(fixture.debugElement.query(By.css('input')).nativeElement.value).toBe('');
        clickDropDownToggle();
        const leafNodeItemEle = fixture.debugElement.queryAll(By.directive(CascaderLiComponent))[3].query(By.css('li')).nativeElement;
        leafNodeItemEle.dispatchEvent(new Event('click'));
        // 一层关闭事件，一层值刷新的事件监听，两个tick才能跳过
        tick();
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('input')).nativeElement.value).toBe('测试4');
        expect(testComponent.onChanges).toHaveBeenCalledTimes(1);
      }));

      it('showPath param should work', fakeAsync(() => {
        expect(fixture.debugElement.query(By.css('input')).nativeElement.value).toBe('');
        clickSecondLeaf();
        expect(fixture.debugElement.query(By.css('input')).nativeElement.value).toBe('测试1 / 测试1-2');

        testComponent.showPath = false;
        fixture.detectChanges();

        clickSecondLeaf();
        expect(fixture.debugElement.query(By.css('input')).nativeElement.value).toBe('测试1-2');
      }));

      it('dropdownWidth param should work', fakeAsync(() => {
        clickDropDownToggle();
        const dropdownItemEle = fixture.debugElement.query(By.css('.devui-drop-menu-wrapper')).nativeElement;
        expect(getComputedStyle(dropdownItemEle).width).toBe('120px');
      }));

      it('set value should work', fakeAsync(() => {
        testComponent.value = [1, 41];
        // 两层ngmodel的传递
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('input')).nativeElement.value).toBe('测试1 / 测试1-2');

        clickDropDownToggle();
        const dropdownUlList = fixture.debugElement.queryAll(By.css('ul'));
        expect(dropdownUlList.length).toBe(2);
      }));

      it('click clear button should clear value', fakeAsync(() => {
        testComponent.value = [1, 41];
        // 两层ngmodel的传递
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('input')).nativeElement.value).toBe('测试1 / 测试1-2');

        // 单测无法模拟hover，直接调用clear函数测试功能
        testComponent.cascaderCmp.clearTags();
        tick();
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('input')).nativeElement.value).toBe('');
      }));

      it('option change should work', fakeAsync(() => {
        testComponent.options = testComponent.options.splice(0, 1);
        fixture.detectChanges();
        clickDropDownToggle();

        expect(fixture.debugElement.queryAll(By.directive(CascaderLiComponent)).length).toBe(1);
      }));

      it('canSelectParent param should work', fakeAsync(() => {
        testComponent.canSelectParent = true;
        fixture.detectChanges();

        clickDropDownToggle();
        const firstNodeItemEle = fixture.debugElement.queryAll(By.directive(CascaderLiComponent))[0].query(By.css('li')).nativeElement;
        firstNodeItemEle.dispatchEvent(new Event('click'));
        tick();
        fixture.detectChanges();
      }));
    });
  });

  describe('search cascader', () => {
    let testComponent: SearchComponent;
    let debugElement: DebugElement;
    let insideNativeElement: HTMLElement;
    let fixture: ComponentFixture<SearchComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(SearchComponent);
      testComponent = fixture.componentInstance;
      debugElement = fixture.debugElement.query(By.directive(CascaderComponent));
      insideNativeElement = debugElement.nativeElement;
      fixture.detectChanges();
    });

    it('allowSearch param should work', () => {
      const inputEle = fixture.debugElement.query(By.css('input')).nativeElement;

      expect(inputEle.getAttribute('readonly')).toBeNull();

      testComponent.allowSearch = false;
      fixture.detectChanges();

      expect(inputEle.getAttribute('readonly')).not.toBeNull();
    });

    it('search function should work', fakeAsync(() => {
      const inputElement = fixture.debugElement.query(By.css('.devui-input')).nativeElement;
      inputElement.value = '1-1';
      inputElement.dispatchEvent(new Event('input', {}));
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      const resultDebuglist = fixture.debugElement.queryAll(By.css('.devui-cascader-list-item'));
      // 应搜索到三条数据
      expect(resultDebuglist.length).toBe(3);
      // 每条数据对应的值正确
      expect(resultDebuglist[0].nativeElement.innerText).toBe('测试1 / 测试1-1 / 测试1-1-1');
      expect(resultDebuglist[1].nativeElement.innerText).toBe('测试1 / 测试1-1 / 测试1-1-2 / 测试1-1-2-1');
      expect(resultDebuglist[2].nativeElement.innerText).toBe('测试2 / 测试2-1 / 测试2-1-1');
      resultDebuglist[0].nativeElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      // 点击更新数据成功
      expect(inputElement.value).toBe('测试1-1-1');
    }));

    it('cancel search should correct', fakeAsync(() => {
      const inputElement = fixture.debugElement.query(By.css('.devui-input')).nativeElement;
      inputElement.value = '1-1';
      inputElement.dispatchEvent(new Event('input', {}));
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();

      expect(inputElement.value).toBe('1-1');
      document.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      tick();

      // 取消搜索值会回归初始
      expect(inputElement.value).toBe('');
    }));

    it('search empty should correct', fakeAsync(() => {
      const inputElement = fixture.debugElement.query(By.css('.devui-input')).nativeElement;
      inputElement.value = 'test';
      inputElement.dispatchEvent(new Event('input', {}));
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.devui-drop-no-data'))).toBeTruthy();
    }));
  });

  describe('multiple cascader', () => {
    let testComponent: MultipleComponent;
    let debugElement: DebugElement;
    let insideNativeElement: HTMLElement;
    let fixture: ComponentFixture<MultipleComponent>;
    let dropdownToggleEle: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(MultipleComponent);
      testComponent = fixture.componentInstance;
      debugElement = fixture.debugElement.query(By.directive(CascaderComponent));
      insideNativeElement = debugElement.nativeElement;
      fixture.detectChanges();
    });

    const clickDropDownToggle = () => {
      dropdownToggleEle = debugElement.query(By.directive(DropDownToggleDirective)).nativeElement;
      dropdownToggleEle.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
    };

    const selectChildItem = () => {
      clickDropDownToggle();
      const fourthItemEle = fixture.debugElement.queryAll(By.directive(CascaderLiComponent))[3].query(By.css('d-checkbox')).nativeElement;

      fourthItemEle.dispatchEvent(new Event('click'));
      tick(200);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
    };

    const selectParentItem = () => {
      clickDropDownToggle();
      const firstItemEle = fixture.debugElement.queryAll(By.directive(CascaderLiComponent))[0].query(By.css('d-checkbox')).nativeElement;

      firstItemEle.dispatchEvent(new Event('click'));
      tick(200);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
    };

    it('multiple input should render', fakeAsync(() => {
      expect(fixture.debugElement.query(By.css('.devui-tags-input'))).toBeTruthy();
      clickDropDownToggle();
      expect(fixture.debugElement.queryAll(By.css('.devui-checkbox')).length).toBeGreaterThan(0);
    }));

    it('select will update tag list', fakeAsync(() => {
      expect(fixture.debugElement.queryAll(By.css('d-tag')).length).toBe(0);
      selectChildItem();
      expect(fixture.debugElement.queryAll(By.css('d-tag')).length).toBe(1);
      expect(fixture.debugElement.query(By.css('d-tag > .devui-tag-item > span')).nativeElement.innerText).toBe('测试4');
      const fourthItemEle = fixture.debugElement.queryAll(By.directive(CascaderLiComponent))[3].query(By.css('d-checkbox')).nativeElement;
      fourthItemEle.dispatchEvent(new Event('click'));
      tick(200);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('d-tag')).length).toBe(0);
    }));

    it('click clear button should work', fakeAsync(() => {
      selectChildItem();
      expect(fixture.debugElement.queryAll(By.css('d-tag')).length).toBe(1);

      // 单测无法模拟hover，直接调用clear函数测试功能
      testComponent.cascaderCmp.clearTags();
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(fixture.debugElement.queryAll(By.css('d-tag')).length).toBe(0);
    }));

    it('select parent item children should checked', fakeAsync(() => {
      selectParentItem();
      const firstNodeItemEle = fixture.debugElement.queryAll(By.directive(CascaderLiComponent))[0].query(By.css('li')).nativeElement;
      firstNodeItemEle.dispatchEvent(new Event('click'));
      tick(200);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const secondUlCheckList = fixture.debugElement.queryAll(By.css('ul'))[1].queryAll(By.css('d-checkbox'));
      // 子项全部被选中
      secondUlCheckList.forEach(debugChecked => {
        expect(debugChecked.query(By.css('.devui-checkbox,.active'))).toBeTruthy();
      });

      expect(fixture.debugElement.queryAll(By.css('d-tag')).length).toBe(5);
      expect(testComponent.onChanges).toHaveBeenCalledTimes(5);
    }));

    it('click tag delete should work', fakeAsync(() => {
      selectChildItem();
      expect(fixture.debugElement.queryAll(By.css('d-tag')).length).toBe(1);
      const closeIconEle = fixture.debugElement.query(By.css('.remove-button')).nativeElement;
      clickDropDownToggle();
      closeIconEle.dispatchEvent(new Event('click'));
      tick(200);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('d-tag')).length).toBe(0);
    }));

    it('multiple search should work', fakeAsync(() => {
      clickDropDownToggle();
      const searchInputEle = fixture.debugElement.query(By.css('.inner-input')).nativeElement;
      expect(searchInputEle).toBeTruthy();
    }));

    it ('multiple search result should work', fakeAsync(() => {
      clickDropDownToggle();
      const searchInputEle = fixture.debugElement.query(By.css('.inner-input')).nativeElement;
      searchInputEle.value = '1-1';
      searchInputEle.dispatchEvent(new Event('input', {}));
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();

      const liList = fixture.debugElement.query(By.css('.devui-cascader-list')).queryAll(By.css('.devui-cascader-list-item'));
      expect(liList.length).toBe(3);
      liList[0].nativeElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();

      expect(fixture.debugElement.queryAll(By.css('d-tag')).length).toBe(1);
      expect(fixture.debugElement.query(By.css('d-tag > .devui-tag-item > span')).nativeElement.innerText).toBe('测试1-1-1');
    }));

    it ('click active result should not work', fakeAsync(() => {
      clickDropDownToggle();
      const searchInputEle = fixture.debugElement.query(By.css('.inner-input')).nativeElement;
      searchInputEle.value = '1-1';
      searchInputEle.dispatchEvent(new Event('input', {}));
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      let liList = fixture.debugElement.query(By.css('.devui-cascader-list')).queryAll(By.css('.devui-cascader-list-item'));
      liList[0].nativeElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      searchInputEle.value = '1-1';
      searchInputEle.dispatchEvent(new Event('input', {}));
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();

      // 在此点击已激活的搜索项无效
      liList = fixture.debugElement.query(By.css('.devui-cascader-list')).queryAll(By.css('.devui-cascader-list-item'));
      liList[0].nativeElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();

      expect(fixture.debugElement.queryAll(By.css('d-tag')).length).toBe(1);
      expect(fixture.debugElement.queryAll(By.css('ul')).length).toBe(1);
    }));

    it('select disable should not work', fakeAsync(() => {
      clickDropDownToggle();
      const disableItemEle = fixture.debugElement.queryAll(By.directive(CascaderLiComponent))[2].query(By.css('d-checkbox')).nativeElement;
      disableItemEle.dispatchEvent(new Event('click'));
      tick(200);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(fixture.debugElement.queryAll(By.css('d-tag')).length).toBe(0);
    }));

    it('click halfchecked should correct', fakeAsync(() => {
      clickDropDownToggle();
      const firstItemEle = fixture.debugElement.queryAll(By.directive(CascaderLiComponent))[0].query(By.css('li'));
      firstItemEle.nativeElement.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();

      const checkedItemEle = fixture.debugElement.queryAll(By.css('ul'))[1].query(By.css('d-checkbox')).nativeElement;
      checkedItemEle.dispatchEvent(new Event('click'));
      tick(200);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('d-tag')).length).toBe(2);

      const halfCheckButton = firstItemEle.query(By.css('.devui-checkbox,.halfchecked'));
      expect(halfCheckButton).toBeTruthy();
      firstItemEle.query(By.css('d-checkbox')).nativeElement.dispatchEvent(new Event('click'));
      tick(200);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(firstItemEle.query(By.css('.halfchecked'))).toBeFalsy();
      expect(fixture.debugElement.queryAll(By.css('ul'))[1].query(By.css('.checked'))).toBeFalsy();
      expect(fixture.debugElement.queryAll(By.css('d-tag')).length).toBe(0);
    }));

  });

  describe('lazyload cascader', () => {
    let testComponent: LazyLoadComponent;
    let debugElement: DebugElement;
    let insideNativeElement: HTMLElement;
    let fixture: ComponentFixture<LazyLoadComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(LazyLoadComponent);
      testComponent = fixture.componentInstance;
      debugElement = fixture.debugElement.query(By.directive(CascaderComponent));
      insideNativeElement = debugElement.nativeElement;
      fixture.detectChanges();
    });

    it('promise lazyload function should work', fakeAsync(() => {
      const dropdownToggleEle = debugElement.query(By.directive(DropDownToggleDirective)).nativeElement;
      dropdownToggleEle.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      const thirdLiEle = fixture.debugElement.queryAll(By.directive(CascaderLiComponent))[0].query(By.css('li')).nativeElement;
      thirdLiEle.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('.devui-cascader-loading'))).toBeTruthy();
      expect(fixture.debugElement.queryAll(By.css('ul')).length).toBe(1);
      tick(1000);
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('.devui-cascader-loading'))).toBeFalsy();
      expect(fixture.debugElement.queryAll(By.css('ul')).length).toBe(2);
    }));

    it('observable lazyload function should work', fakeAsync(() => {
      const dropdownToggleEle = debugElement.query(By.directive(DropDownToggleDirective)).nativeElement;
      dropdownToggleEle.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      expect(fixture.debugElement.queryAll(By.css('ul')).length).toBe(1);
      const thirdLiEle = fixture.debugElement.queryAll(By.directive(CascaderLiComponent))[2].query(By.css('li')).nativeElement;
      thirdLiEle.dispatchEvent(new Event('click'));
      tick(200);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('.devui-cascader-loading'))).toBeFalsy();
      expect(fixture.debugElement.queryAll(By.css('ul')).length).toBe(2);
    }));

  });
});
