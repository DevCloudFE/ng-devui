import { CommonModule } from '@angular/common';
import { Component, DebugElement, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DropDownMenuDirective } from './dropdown-menu.directive';
import { DropDownToggleDirective } from './dropdown-toggle.directive';
import { DropDownDirective } from './dropdown.directive';
import { DropDownModule } from './dropdown.module';
@Component({
  template: `
    <div class="height-expand" *ngIf="expand"></div>
    <div
      dDropDown
      [trigger]="trigger"
      (toggleEvent)="onToggle($event)"
      [disabled]="disabled"
      [isOpen]="defaultOpen"
      [closeScope]="closeScope"
      [closeOnMouseLeaveMenu]="closeOnMouseLeaveMenu"
      #dropdown="d-dropdown"
    >
      <a dDropDownToggle class="devui-dropdown-default devui-dropdown-origin">
        更多操作
        <span class="icon icon-chevron-down"></span>
      </a>
      <ul dDropDownMenu>
        <li role="menuitem">
          <a dDropDownMenuItem>菜单一</a>
        </li>
        <li class="disabled" role="menuitem">
          <a dDropDownMenuItem class="disabled">菜单二(禁用)</a>
        </li>
        <li role="menuitem">
          <a dDropDownMenuItem>菜单三</a>
        </li>
        <li role="menuitem">
          <a dDropDownMenuItem>菜单四</a>
        </li>
        <li role="menuitem">
          <input type="text" class="devui-input devui-input-sm devui-search-in-dropdown" placeholder="输入框" />
          <div class="icon-in-search">
            <i class="icon icon-search"></i>
          </div>
        </li>
        <li role="menuitem">
          <textarea class="devui-input devui-input-sm devui-search-in-dropdown" placeholder="输入框"></textarea>
        </li>
        <li role="menuitem">
          <a id="close" dDropDownMenuItem (click)="dropdown.toggle()">关闭</a>
        </li>
      </ul>
    </div>
    <div class="toggle" (click)="dropdown.toggle()">打开/关闭</div>
  `,
  styles: [
    `
      .height-expand {
        height: calc(100vh - 100px);
      }
    `,
  ],
})
class TestDropdownComponent {
  trigger: 'hover' | 'click' | 'manually' = 'click';
  count = 0;
  isOpen: boolean;
  disabled: boolean;
  defaultOpen;
  closeScope;
  closeOnMouseLeaveMenu;
  expand = false;
  onToggle(event) {
    this.count++;
    this.isOpen = event;
  }
}

@Component({
  template: `
    <div class="area" #areaItem [ngClass]="{ 'devui-dropdown-origin': alignOriginFlag }">
      <div
        dDropDown
        appendToBody
        [trigger]="trigger"
        [appendToBodyDirections]="directions"
        [alignOrigin]="alignOriginFlag ? area : undefined"
        [closeOnMouseLeaveMenu]="closeOnMouseLeaveMenu"
      >
        <a dDropDownToggle class="devui-dropdown-default" [ngClass]="{ 'devui-dropdown-origin': !alignOriginFlag }">
          更多操作
          <span class="icon icon-chevron-down"></span>
        </a>
        <ul dDropDownMenu>
          <li role="menuitem">
            <a dDropDownMenuItem>菜单一</a>
          </li>
          <li class="disabled" role="menuitem">
            <a dDropDownMenuItem class="disabled">菜单二(禁用)</a>
          </li>
          <li role="menuitem">
            <a dDropDownMenuItem>菜单三</a>
          </li>
          <li role="menuitem">
            <a dDropDownMenuItem>菜单四</a>
          </li>
        </ul>
      </div>
    </div>
  `,
  styles: [
    `
      .area {
        width: 500px;
        height: 600px;
      }
    `,
  ],
})
class TestDropdownAppendToBodyComponent {
  @ViewChild('areaItem', { static: true }) area: ElementRef;
  trigger: 'hover' | 'click' | 'manually' = 'click';
  alignOriginFlag = false;
  directions = ['rightDown'];
  closeOnMouseLeaveMenu;
}

@Component({
  template: `
    <div class="area" *ngIf="init">
      <div dDropDown>
        <a dDropDownToggle class="devui-dropdown-default devui-dropdown-origin" [autoFocus]="autoFocus" [toggleOnFocus]="toggleOnFocus">
          更多操作
          <span class="icon icon-chevron-down"></span>
        </a>
        <ul dDropDownMenu>
          <li role="menuitem">
            <a dDropDownMenuItem>菜单一</a>
          </li>
          <li class="disabled" role="menuitem">
            <a dDropDownMenuItem class="disabled">菜单二(禁用)</a>
          </li>
          <li role="menuitem">
            <a dDropDownMenuItem>菜单三</a>
          </li>
          <li role="menuitem">
            <a dDropDownMenuItem>菜单四</a>
          </li>
        </ul>
      </div>
    </div>
  `,
})
class TestDropdownToggleComponent {
  autoFocus = false;
  toggleOnFocus = false;
  init = true;
}

@Component({
  template: `<section>
    <div class="btn-group g-dropdown" dDropDown appendToBody [trigger]="trigger1" [closeOnMouseLeaveMenu]="closeOnMouseLeaveMenu">
      <a id="item-0" dDropDownToggle class="devui-dropdown-default devui-dropdown-origin">
        更多选择
        <span class="icon icon-chevron-down"></span>
      </a>

      <ul id="menu1" dDropDownMenu class="devui-dropdown-menu devui-scrollbar" role="menu">
        <li role="menuitem" dDropDown appendToBody [trigger]="trigger2" [appendToBodyDirections]="subMenuDirections">
          <a dDropDownMenuItem dDropDownToggle id="item-1">内容1 <span class="icon icon-chevron-right"></span></a>
          <ul id="menu2" dDropDownMenu class="devui-dropdown-menu devui-scrollbar" role="menu">
            <li role="menuitem" dDropDown appendToBody [trigger]="trigger2" [appendToBodyDirections]="subMenuDirections">
              <a dDropDownMenuItem dDropDownToggle id="item-11">内容1-1 <span class="icon icon-chevron-right"></span></a>
              <ul id="menu3" dDropDownMenu class="devui-dropdown-menu devui-scrollbar" role="menu">
                <li role="menuitem">
                  <a dDropDownMenuItem id="item-111">内容1-1-1</a>
                </li>
                <li role="menuitem">
                  <a dDropDownMenuItem id="item-112">内容1-1-2</a>
                </li>
                <li role="menuitem">
                  <a dDropDownMenuItem id="item-113">内容1-1-3</a>
                </li>
              </ul>
            </li>
            <li role="menuitem" dDropDown appendToBody [trigger]="trigger2" [appendToBodyDirections]="subMenuDirections">
              <a dDropDownMenuItem dDropDownToggle id="item-12">内容1-2 <span class="icon icon-chevron-right"></span></a>
              <ul id="menu5" dDropDownMenu class="devui-dropdown-menu devui-scrollbar" role="menu">
                <li role="menuitem">
                  <a dDropDownMenuItem id="item-121">内容1-2-1</a>
                </li>
              </ul>
            </li>
            <li role="menuitem">
              <a dDropDownMenuItem id="item-13">内容1-3</a>
            </li>
          </ul>
        </li>
        <li role="menuitem" dDropDown appendToBody [trigger]="trigger2" [appendToBodyDirections]="subMenuDirections">
          <a dDropDownMenuItem dDropDownToggle id="item-2">内容2 <span class="icon icon-chevron-right"></span></a>
          <ul id="menu4" dDropDownMenu class="devui-dropdown-menu devui-scrollbar" role="menu">
            <li role="menuitem">
              <a dDropDownMenuItem id="item-21">内容2-1</a>
            </li>
          </ul>
        </li>
        <li role="menuitem">
          <a dDropDownMenuItem id="item-3">内容2</a>
        </li>
      </ul>
    </div>
  </section> `,
})
class TestMultiLevelComponent {
  trigger1 = 'click';
  trigger2 = 'click';
  closeOnMouseLeaveMenu = false;
  subMenuDirections = [
    {
      originX: 'end',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'top',
    },
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'bottom',
      offsetY: 5, // 菜单底部有个padding: 5px，刚好让菜单对齐父菜单
    },
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'top',
    },
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'bottom',
      offsetY: 5,
    },
  ];
}

describe('dropdown', () => {
  let fixture: ComponentFixture<any>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, DropDownModule, NoopAnimationsModule],
      declarations: [TestDropdownComponent, TestDropdownAppendToBodyComponent, TestDropdownToggleComponent, TestMultiLevelComponent],
    });
  });

  describe('basic', () => {
    let debugEl: DebugElement;
    let component: TestDropdownComponent;
    let dropdownElement: DebugElement;
    let dropdownToggleElement: DebugElement;
    let dropdownMenuElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestDropdownComponent);
      debugEl = fixture.debugElement;
      component = debugEl.componentInstance;
      dropdownElement = debugEl.query(By.directive(DropDownDirective));
      dropdownToggleElement = debugEl.query(By.directive(DropDownToggleDirective));
      dropdownMenuElement = debugEl.query(By.directive(DropDownMenuDirective));
      fixture.detectChanges();
    });

    it('component has created successfully', () => {
      expect(component).toBeTruthy();
      expect(dropdownElement).toBeTruthy();
      expect(dropdownToggleElement).toBeTruthy();
      expect(dropdownMenuElement).toBeTruthy();
    });
    describe('dropdown static style', () => {
      it('dropdown directives should exist', () => {
        expect(dropdownElement.classes['devui-dropdown']).toBe(true);
      });
      it('dropdown toggle directive should exist', () => {
        expect(dropdownToggleElement.classes['devui-dropdown-toggle']).toBe(true);
      });
      it('dropdown menu directive should ', () => {
        expect(dropdownMenuElement.classes['devui-dropdown-menu']).toBe(true);
      });
    });
    describe('dropdown trigger', () => {
      it('click show menu', fakeAsync(() => {
        expect(dropdownMenuElement.styles.display).toBe('none');
        dropdownToggleElement.nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
        fixture.detectChanges();
        tick(); // animation time, NOTICE：NoopAnimation animation squash to 0 million second
        expect(dropdownMenuElement.styles.display).toBe('block');
      }));
      describe('after click show menu', () => {
        beforeEach(fakeAsync(() => {
          dropdownToggleElement.nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
          fixture.detectChanges();
          tick(); // animation time
        }));
        it('click menu hide', fakeAsync(() => {
          dropdownMenuElement.nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
          fixture.detectChanges();
          tick(); // animation time
          expect(dropdownMenuElement.styles.display).toBe('none');
        }));
        it('click outside hide', fakeAsync(() => {
          document.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
          fixture.detectChanges();
          tick(); // animation time
          expect(dropdownMenuElement.styles.display).toBe('none');
        }));
      });
      it('hover show menu', fakeAsync(() => {
        component.trigger = 'hover';
        fixture.detectChanges();
        expect(dropdownMenuElement.styles.display).toBe('none');
        dropdownElement.nativeElement.dispatchEvent(new MouseEvent('mouseenter', { bubbles: false, cancelable: false }));
        fixture.detectChanges();
        tick(250); // debounce time
        fixture.detectChanges();
        tick(); // animation time
        fixture.detectChanges();
        expect(dropdownMenuElement.styles.display).toBe('block');
      }));
      describe('after hover show menu', () => {
        beforeEach(fakeAsync(() => {
          component.trigger = 'hover';
          fixture.detectChanges();
          dropdownElement.nativeElement.dispatchEvent(new MouseEvent('mouseenter', { bubbles: false, cancelable: false }));
          fixture.detectChanges();
          tick(250); // debounce time
          fixture.detectChanges();
          tick(); // animation time
          fixture.detectChanges();
        }));
        it('mouseleave dropdown to others hide', fakeAsync(() => {
          dropdownElement.nativeElement.dispatchEvent(
            new MouseEvent('mouseleave', {
              relatedTarget: document,
              bubbles: false,
              cancelable: false,
            })
          );
          fixture.detectChanges();
          tick(250); // debounce time
          fixture.detectChanges();
          tick(); // animation time
          fixture.detectChanges();
          expect(dropdownMenuElement.styles.display).toBe('none');
        }));
      });
      describe('complete manually control', () => {
        beforeEach(fakeAsync(() => {
          component.trigger = 'manually';
          fixture.detectChanges();
        }));
        it('click should not show menu', fakeAsync(() => {
          expect(dropdownMenuElement.styles.display).toBe('none');
          dropdownToggleElement.nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
          fixture.detectChanges();
          tick(); // animation time
          expect(dropdownMenuElement.styles.display).toBe('none');
        }));
        it('set isOpen should show menu', fakeAsync(() => {
          component.defaultOpen = true;
          fixture.detectChanges();
          tick(); // animation time
          fixture.detectChanges();
          expect(dropdownMenuElement.styles.display).toBe('block');
          component.defaultOpen = false;
          fixture.detectChanges();
          tick(); // animation time
          fixture.detectChanges();
          expect(dropdownMenuElement.styles.display).toBe('none');
        }));
      });
    });
    describe('dropdown isOpen', () => {
      it('isOpen true, should open menu, set to false should close', fakeAsync(() => {
        expect(dropdownMenuElement.styles.display).toBe('none');
        component.defaultOpen = true;
        fixture.detectChanges();
        tick(); // animation time
        fixture.detectChanges();
        expect(dropdownMenuElement.styles.display).toBe('block');
        component.defaultOpen = false;
        fixture.detectChanges();
        tick(); // animation time
        fixture.detectChanges();
        expect(dropdownMenuElement.styles.display).toBe('none');
      }));
      it('disabled, isOpen true, should not toggle', fakeAsync(() => {
        expect(dropdownMenuElement.styles.display).toBe('none');
        component.disabled = true;
        fixture.detectChanges();
        component.defaultOpen = true;
        fixture.detectChanges();
        tick(); // animation time
        fixture.detectChanges();
        expect(dropdownMenuElement.styles.display).toBe('none');
      }));
    });
    describe('dropdown disabled', () => {
      it('disabled should not trigger, change to not disabled should recover', fakeAsync(() => {
        const count = component.count;
        component.disabled = true;
        fixture.detectChanges();
        dropdownToggleElement.nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
        fixture.detectChanges();
        tick(); // animation time
        fixture.detectChanges();
        expect(dropdownMenuElement.styles.display).toBe('none');
        expect(component.count).toBe(count);

        component.disabled = false;
        fixture.detectChanges();
        dropdownToggleElement.nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
        fixture.detectChanges();
        tick(); // animation time
        fixture.detectChanges();
        expect(dropdownMenuElement.styles.display).toBe('block');
        expect(component.count).toBe(count + 1);
        expect(component.isOpen).toBe(true);
      }));
    });
    describe('dropdown closeScope', () => {
      const clickToggle = () => {
        dropdownToggleElement.nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
        fixture.detectChanges();
        tick(); // animation time
      };

      describe('default, click input textarea not close', () => {
        it('click input textarea not close', fakeAsync(() => {
          clickToggle();
          const input = dropdownMenuElement.nativeElement.querySelector('input');
          input.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
          fixture.detectChanges();
          tick(); // animation time
          fixture.detectChanges();
          expect(dropdownMenuElement.styles.display).toBe('block');

          const textarea = dropdownMenuElement.nativeElement.querySelector('textarea');
          textarea.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
          fixture.detectChanges();
          tick(); // animation time
          fixture.detectChanges();
          expect(dropdownMenuElement.styles.display).toBe('block');
        }));
      });
      describe('closeScope = all, same as default', () => {
        it('click input textarea not close', fakeAsync(() => {
          component.closeScope = 'all';
          fixture.detectChanges();
          clickToggle();
          const input = dropdownMenuElement.nativeElement.querySelector('input');
          input.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
          fixture.detectChanges();
          tick(); // animation time
          fixture.detectChanges();
          expect(dropdownMenuElement.styles.display).toBe('block');

          const textarea = dropdownMenuElement.nativeElement.querySelector('textarea');
          textarea.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
          fixture.detectChanges();
          tick(); // animation time
          fixture.detectChanges();
          expect(dropdownMenuElement.styles.display).toBe('block');
        }));
      });
      describe('closeScope = blank, click outside to close', () => {
        beforeEach(fakeAsync(() => {
          component.closeScope = 'blank';
          fixture.detectChanges();
          clickToggle();
        }));

        it('click inside not to close', fakeAsync(() => {
          dropdownMenuElement.nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
          fixture.detectChanges();
          tick(); // animation time
          expect(dropdownMenuElement.styles.display).toBe('block');
        }));
        it('click outside to close', fakeAsync(() => {
          document.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
          fixture.detectChanges();
          tick(); // animation time
          expect(dropdownMenuElement.styles.display).toBe('none');
        }));
      });
      describe('closeScope = none, manually handle close', () => {
        beforeEach(fakeAsync(() => {
          component.closeScope = 'none';
          fixture.detectChanges();
          clickToggle();
        }));
        it('click inside not to close', fakeAsync(() => {
          dropdownMenuElement.nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
          fixture.detectChanges();
          tick(); // animation time
          expect(dropdownMenuElement.styles.display).toBe('block');
        }));
        it('click outside not to close', fakeAsync(() => {
          document.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
          fixture.detectChanges();
          tick(); // animation time
          expect(dropdownMenuElement.styles.display).toBe('block');
        }));
        it('manually handle close', fakeAsync(() => {
          const closeBtn = dropdownMenuElement.nativeElement.querySelector('#close');
          closeBtn.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
          fixture.detectChanges();
          tick(); // animation time
          expect(dropdownMenuElement.styles.display).toBe('none');
        }));
      });
    });
    describe('dropdown closeOnMouseLeaveMenu', () => {
      const clickToggle = () => {
        dropdownToggleElement.nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
        fixture.detectChanges();
        tick(); // animation time
      };
      beforeEach(fakeAsync(() => {
        component.closeOnMouseLeaveMenu = true;
        fixture.detectChanges();
        clickToggle();
        fixture.detectChanges();
      }));
      it('trigger = click && closeOnMouseLeaveMenu = true, menu should close after leaving menu', fakeAsync(() => {
        expect(dropdownMenuElement.styles.display).toBe('block');
        dropdownMenuElement.nativeElement.dispatchEvent(
          new MouseEvent('mouseleave', {
            relatedTarget: document,
            bubbles: false,
            cancelable: false,
          })
        );
        fixture.detectChanges();
        tick(250); // debounce time
        fixture.detectChanges();
        tick(); // animation time
        fixture.detectChanges();
        expect(dropdownMenuElement.styles.display).toBe('none');
      }));
    });
    describe('dropdown toggleEvent', () => {
      it('toggle should trigger count++', fakeAsync(() => {
        const count = component.count;
        dropdownToggleElement.nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
        fixture.detectChanges();
        tick(); // animation time
        fixture.detectChanges();
        expect(component.count).toBe(count + 1);
        expect(component.isOpen).toBe(true);
        dropdownMenuElement.nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
        fixture.detectChanges();
        tick(); // animation time
        fixture.detectChanges();
        expect(component.count).toBe(count + 2);
        expect(component.isOpen).toBe(false);
      }));
    });
    describe('dropdown public api function toggle', () => {
      it('toggle api should toggle dropdown', fakeAsync(() => {
        expect(dropdownMenuElement.styles.display).toBe('none');
        const toggleElement = debugEl.nativeElement.querySelector('.toggle');

        toggleElement.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
        fixture.detectChanges();
        tick(); // animation time
        fixture.detectChanges();
        expect(dropdownMenuElement.styles.display).toBe('block');

        toggleElement.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
        fixture.detectChanges();
        tick(); // animation time
        fixture.detectChanges();
        expect(dropdownMenuElement.styles.display).toBe('none');
      }));
      it('disabled, toggle api should not toggle dropdown', fakeAsync(() => {
        expect(dropdownMenuElement.styles.display).toBe('none');
        component.disabled = true;
        fixture.detectChanges();
        const toggleElement = debugEl.nativeElement.querySelector('.toggle');
        toggleElement.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
        fixture.detectChanges();
        tick(); // animation time
        fixture.detectChanges();
        expect(dropdownMenuElement.styles.display).toBe('none');
      }));
    });
  });
  describe('dropdownToggle', () => {
    let debugEl: DebugElement;
    let component: TestDropdownToggleComponent;
    let dropdownToggleElement: DebugElement;
    let dropdownMenuElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestDropdownToggleComponent);
      debugEl = fixture.debugElement;
      component = debugEl.componentInstance;
      fixture.detectChanges();
    });
    describe('dropdownToggle toggleOnFocus', () => {
      it('toggleOnFocus true, when focus, menu should show', fakeAsync(() => {
        component.toggleOnFocus = true;
        fixture.detectChanges();
        dropdownToggleElement = debugEl.query(By.directive(DropDownToggleDirective));
        dropdownToggleElement.nativeElement.dispatchEvent(new MouseEvent('focus', { bubbles: false, cancelable: false }));
        fixture.detectChanges();
        tick(); // animation time
        fixture.detectChanges();
        dropdownMenuElement = debugEl.query(By.directive(DropDownMenuDirective));
        expect(dropdownMenuElement).toBeTruthy();
        expect(dropdownMenuElement.styles.display).toBe('block');
      }));
    });
    describe('dropdownToggle autoFocus', () => {
      it('autoFocus true, when init, toggle should focus', fakeAsync(() => {
        component.init = false;
        fixture.detectChanges();
        tick(); // wait dropdown destroy
        component.autoFocus = true;
        component.init = true;
        fixture.detectChanges();
        tick(); // wait dropdown init
        fixture.detectChanges();
        dropdownToggleElement = debugEl.query(By.directive(DropDownToggleDirective));
        expect(document.activeElement).toEqual(dropdownToggleElement.nativeElement);
      }));
    });
    describe('dropdownToggle autoFocus combine toggleOnFocus', () => {
      // 并发会有问题，目前屏蔽
      xit('autoFocus true, when init, menu should show', fakeAsync(() => {
        component.init = false;
        fixture.detectChanges();
        tick(); // wait dropdown destroy
        component.autoFocus = true;
        component.toggleOnFocus = true;
        fixture.detectChanges();
        component.init = true;
        fixture.detectChanges();
        tick(200); // wait dropdown init
        fixture.detectChanges();
        dropdownToggleElement = debugEl.query(By.directive(DropDownToggleDirective));
        expect(document.activeElement).toEqual(dropdownToggleElement.nativeElement);
        dropdownMenuElement = debugEl.query(By.directive(DropDownMenuDirective));
        expect(dropdownMenuElement).toBeTruthy();
        expect(dropdownMenuElement.styles.display).toBe('block'); // 这行不稳定，需要浏览器处于激活状态
      }));
    });
  });

  describe('dropdown append to body', () => {
    let debugEl: DebugElement;
    let component: TestDropdownAppendToBodyComponent;
    let dropdownElement: DebugElement;
    let dropdownToggleElement: DebugElement;
    let dropdownMenuElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestDropdownAppendToBodyComponent);
      debugEl = fixture.debugElement;
      component = debugEl.componentInstance;
      dropdownElement = debugEl.query(By.directive(DropDownDirective));
      dropdownToggleElement = debugEl.query(By.directive(DropDownToggleDirective));
      fixture.detectChanges();
    });
    describe('dropdown basic trigger', () => {
      it('click show menu', fakeAsync(() => {
        dropdownMenuElement = debugEl.query(By.directive(DropDownMenuDirective));
        expect(dropdownMenuElement).toBeNull();
        dropdownToggleElement.nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
        fixture.detectChanges();
        tick();
        dropdownMenuElement = debugEl.query(By.directive(DropDownMenuDirective));
        expect(dropdownMenuElement).toBeTruthy();
        expect(dropdownMenuElement.styles.display).toBe('block');
      }));
      describe('after click show menu', () => {
        beforeEach(fakeAsync(() => {
          dropdownToggleElement.nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
          fixture.detectChanges();
          tick();
        }));
        it('click menu hide', fakeAsync(() => {
          dropdownMenuElement = debugEl.query(By.directive(DropDownMenuDirective));
          dropdownMenuElement.nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
          fixture.detectChanges();
          tick();
          dropdownMenuElement = debugEl.query(By.directive(DropDownMenuDirective));
          expect(dropdownMenuElement).toBe(null);
        }));
        it('click outside hide', fakeAsync(() => {
          document.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
          fixture.detectChanges();
          tick();
          dropdownMenuElement = debugEl.query(By.directive(DropDownMenuDirective));
          expect(dropdownMenuElement).toBe(null);
        }));
      });
      it('hover show menu', fakeAsync(() => {
        component.trigger = 'hover';
        fixture.detectChanges();
        dropdownMenuElement = debugEl.query(By.directive(DropDownMenuDirective));
        expect(dropdownMenuElement).toBeNull();
        dropdownElement.nativeElement.dispatchEvent(new MouseEvent('mouseenter', { bubbles: false, cancelable: false }));
        fixture.detectChanges();
        tick(250); // hoverDebounceTimetime
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        dropdownMenuElement = debugEl.query(By.directive(DropDownMenuDirective));
        expect(dropdownMenuElement).toBeTruthy();
        expect(dropdownMenuElement.styles.display).toBe('block');
        expect(document.contains(dropdownMenuElement.nativeElement)).toBe(true);
      }));
      describe('after hover show menu', () => {
        beforeEach(fakeAsync(() => {
          component.trigger = 'hover';
          fixture.detectChanges();
          dropdownElement.nativeElement.dispatchEvent(new MouseEvent('mouseenter', { bubbles: false, cancelable: false }));
          fixture.detectChanges();
          tick(250);
          fixture.detectChanges();
          tick();
          fixture.detectChanges();
        }));
        it('mouseleave dropdown to others hide', fakeAsync(() => {
          dropdownElement.nativeElement.dispatchEvent(
            new MouseEvent('mouseleave', {
              relatedTarget: document,
              bubbles: false,
              cancelable: false,
            })
          );
          fixture.detectChanges();
          tick(250); // hoverDebounceTimetime
          fixture.detectChanges();
          tick(); // animationTime
          fixture.detectChanges();
          dropdownMenuElement = debugEl.query(By.directive(DropDownMenuDirective));
          expect(dropdownMenuElement).toBe(null);
        }));
        it('mouseleave toggle to menu show', fakeAsync(() => {
          dropdownMenuElement = debugEl.query(By.directive(DropDownMenuDirective));
          dropdownElement.nativeElement.dispatchEvent(
            new MouseEvent('mouseleave', {
              relatedTarget: dropdownMenuElement.nativeElement,
              bubbles: false,
              cancelable: false,
            })
          );
          fixture.detectChanges();
          tick(250); // hoverDebounceTimetime
          fixture.detectChanges();
          tick(); // animationTime
          fixture.detectChanges();
          dropdownMenuElement = debugEl.query(By.directive(DropDownMenuDirective));
          expect(dropdownMenuElement).toBeTruthy();
          expect(dropdownMenuElement.styles.display).toBe('block');
          expect(document.contains(dropdownMenuElement.nativeElement)).toBe(true);
        }));
        describe('after mouseleave toggle to menu show', () => {
          beforeEach(fakeAsync(() => {
            dropdownMenuElement = debugEl.query(By.directive(DropDownMenuDirective));
            dropdownElement.nativeElement.dispatchEvent(
              new MouseEvent('mouseleave', {
                relatedTarget: dropdownMenuElement.nativeElement,
                bubbles: false,
                cancelable: false,
              })
            );
            fixture.detectChanges();
            tick(250); // hoverDebounceTimetime
            fixture.detectChanges();
            tick(); // animationTime
            fixture.detectChanges();
          }));
          it('mouseleave menu to others hide', fakeAsync(() => {
            dropdownMenuElement.nativeElement.dispatchEvent(
              new MouseEvent('mouseleave', {
                relatedTarget: document,
                bubbles: false,
                cancelable: false,
              })
            );
            fixture.detectChanges();
            tick(250); // hoverDebounceTimetime
            fixture.detectChanges();
            tick(); // animationTime
            fixture.detectChanges();
            dropdownMenuElement = debugEl.query(By.directive(DropDownMenuDirective));
            expect(dropdownMenuElement).toBe(null);
          }));
          it('mouseleave menu to toggle show', fakeAsync(() => {
            dropdownMenuElement = debugEl.query(By.directive(DropDownMenuDirective));
            dropdownMenuElement.nativeElement.dispatchEvent(
              new MouseEvent('mouseleave', {
                relatedTarget: dropdownToggleElement.nativeElement,
                bubbles: false,
                cancelable: false,
              })
            );
            fixture.detectChanges();
            tick(250); // hoverDebounceTimetime
            fixture.detectChanges();
            tick(); // animationTime
            fixture.detectChanges();
            dropdownMenuElement = debugEl.query(By.directive(DropDownMenuDirective));
            expect(dropdownMenuElement).toBeTruthy();
            expect(dropdownMenuElement.styles.display).toBe('block');
            expect(document.contains(dropdownMenuElement.nativeElement)).toBe(true);
          }));
        });
      });
    });
    describe('dropdown basic closeOnMouseLeaveMenu', () => {
      const clickToggle = () => {
        dropdownToggleElement.nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
        fixture.detectChanges();
        tick(); // animation time
      };
      beforeEach(fakeAsync(() => {
        component.closeOnMouseLeaveMenu = true;
        fixture.detectChanges();
        clickToggle();
        fixture.detectChanges();
      }));
      it('trigger = click && closeOnMouseLeaveMenu = true, menu should close after leaving menu', fakeAsync(() => {
        dropdownMenuElement = debugEl.query(By.directive(DropDownMenuDirective));
        expect(dropdownMenuElement).toBeTruthy();
        expect(dropdownMenuElement.styles.display).toBe('block');
        expect(document.contains(dropdownMenuElement.nativeElement)).toBe(true);
        // appendToBody的 需要mouseleave dropdown menu
        dropdownMenuElement.nativeElement.dispatchEvent(
          new MouseEvent('mouseleave', {
            relatedTarget: document,
            bubbles: false,
            cancelable: false,
          })
        );
        fixture.detectChanges();
        tick(250); // debounce time
        fixture.detectChanges();
        tick(); // animation time
        fixture.detectChanges();
        expect(document.contains(dropdownMenuElement.nativeElement)).toBe(false);
      }));
      it('trigger = click && closeOnMouseLeaveMenu = true, menu should not close after leaving menu to toggle', fakeAsync(() => {
        dropdownMenuElement = debugEl.query(By.directive(DropDownMenuDirective));
        expect(dropdownMenuElement).toBeTruthy();
        expect(dropdownMenuElement.styles.display).toBe('block');
        expect(document.contains(dropdownMenuElement.nativeElement)).toBe(true);
        dropdownMenuElement.nativeElement.dispatchEvent(
          new MouseEvent('mouseleave', {
            relatedTarget: dropdownToggleElement.nativeElement,
            bubbles: false,
            cancelable: false,
          })
        );
        fixture.detectChanges();
        tick(250); // debounce time
        fixture.detectChanges();
        tick(); // animation time
        fixture.detectChanges();
        expect(document.contains(dropdownMenuElement.nativeElement)).toBe(true);
      }));
    });
    describe('dropdown alignOrigin', () => {
      const clickToggle = () => {
        dropdownToggleElement.nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
        fixture.detectChanges();
        tick(); // animation time
      };
      it('normal case should align to toggle element', fakeAsync(() => {
        clickToggle();
        fixture.detectChanges();
        dropdownMenuElement = debugEl.query(By.directive(DropDownMenuDirective));
        const originRect = dropdownToggleElement.nativeElement.getBoundingClientRect();
        const menuRect = dropdownMenuElement.nativeElement.getBoundingClientRect();
        const verticalBorderOverlayWidth = 4; // 有个间距
        expect(originRect.x === menuRect.x).toBe(true);
        expect(originRect.y + originRect.height + verticalBorderOverlayWidth).toBeCloseTo(menuRect.y);
      }));
      it('align to area', fakeAsync(() => {
        component.alignOriginFlag = true;
        fixture.detectChanges();
        clickToggle();
        fixture.detectChanges();
        dropdownMenuElement = debugEl.query(By.directive(DropDownMenuDirective));
        const originRect = debugEl.nativeElement.querySelector('.area').getBoundingClientRect();
        const menuRect = dropdownMenuElement.nativeElement.getBoundingClientRect();
        const verticalBorderOverlayWidth = 4; // 有个间距
        expect(originRect.x === menuRect.x).toBe(true);
        expect(originRect.y + originRect.height + verticalBorderOverlayWidth).toBeCloseTo(menuRect.y);
      }));
    });
    describe('dropdown appendToBodyDirections', () => {
      const clickToggle = () => {
        dropdownToggleElement.nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
        fixture.detectChanges();
        tick(); // animation time
      };
      it('rightDown should in the right place', fakeAsync(() => {
        component.directions = ['rightDown'];
        fixture.detectChanges();
        clickToggle();
        fixture.detectChanges();
        dropdownMenuElement = debugEl.query(By.directive(DropDownMenuDirective));
        const originRect = dropdownToggleElement.nativeElement.getBoundingClientRect();
        const menuRect = dropdownMenuElement.nativeElement.getBoundingClientRect();
        const verticalBorderOverlayWidth = 4; // 有个间距
        expect(originRect.x === menuRect.x).toBe(true);
        expect(originRect.y + originRect.height + verticalBorderOverlayWidth).toBeCloseTo(menuRect.y);
      }));
      it('leftDown should in the right place', fakeAsync(() => {
        component.directions = ['leftDown'];
        fixture.detectChanges();
        clickToggle();
        fixture.detectChanges();
        dropdownMenuElement = debugEl.query(By.directive(DropDownMenuDirective));
        const originRect = dropdownToggleElement.nativeElement.getBoundingClientRect();
        const menuRect = dropdownMenuElement.nativeElement.getBoundingClientRect();
        const verticalBorderOverlayWidth = 4; // 有个间距
        expect(originRect.x + originRect.width).toBeCloseTo(menuRect.x + menuRect.width, 0);
        expect(originRect.y + originRect.height + verticalBorderOverlayWidth).toBeCloseTo(menuRect.y);
      }));
      it('centerDown should in the right place', fakeAsync(() => {
        component.directions = ['centerDown'];
        fixture.detectChanges();
        clickToggle();
        fixture.detectChanges();
        dropdownMenuElement = debugEl.query(By.directive(DropDownMenuDirective));
        const originRect = dropdownToggleElement.nativeElement.getBoundingClientRect();
        const menuRect = dropdownMenuElement.nativeElement.getBoundingClientRect();
        const verticalBorderOverlayWidth = 4; // 有个间距
        expect(originRect.x + originRect.width / 2 - (menuRect.x + menuRect.width / 2)).toBeLessThan(1);
        expect(originRect.y + originRect.height + verticalBorderOverlayWidth).toBeCloseTo(menuRect.y);
      }));
      it('rightUp should in the right place', fakeAsync(() => {
        component.directions = ['rightUp'];
        fixture.detectChanges();
        clickToggle();
        fixture.detectChanges();
        dropdownMenuElement = debugEl.query(By.directive(DropDownMenuDirective));
        const originRect = dropdownToggleElement.nativeElement.getBoundingClientRect();
        const menuRect = dropdownMenuElement.nativeElement.getBoundingClientRect();
        const verticalBorderOverlayWidth = 4; // 有个间距
        expect(originRect.x === menuRect.x).toBe(true);
        expect(originRect.y).toBeCloseTo(menuRect.y + menuRect.height + verticalBorderOverlayWidth);
      }));
      it('leftUp should in the right place', fakeAsync(() => {
        component.directions = ['leftUp'];
        fixture.detectChanges();
        clickToggle();
        fixture.detectChanges();
        dropdownMenuElement = debugEl.query(By.directive(DropDownMenuDirective));
        const originRect = dropdownToggleElement.nativeElement.getBoundingClientRect();
        const menuRect = dropdownMenuElement.nativeElement.getBoundingClientRect();
        const verticalBorderOverlayWidth = 4; // 有个间距
        expect(originRect.x + originRect.width).toBeCloseTo(menuRect.x + menuRect.width, 0);
        expect(originRect.y).toBeCloseTo(menuRect.y + menuRect.height + verticalBorderOverlayWidth, 0);
      }));
      it('centerUp should in the right place', fakeAsync(() => {
        component.directions = ['centerUp'];
        fixture.detectChanges();
        clickToggle();
        fixture.detectChanges();
        dropdownMenuElement = debugEl.query(By.directive(DropDownMenuDirective));
        const originRect = dropdownToggleElement.nativeElement.getBoundingClientRect();
        const menuRect = dropdownMenuElement.nativeElement.getBoundingClientRect();
        const verticalBorderOverlayWidth = 4; // 有个间距
        expect(originRect.x + originRect.width / 2 - (menuRect.x + menuRect.width / 2)).toBeLessThan(1);
        expect(originRect.y).toBeCloseTo(menuRect.y + menuRect.height + verticalBorderOverlayWidth);
      }));
    });
  });

  describe('dropdown Advance feature', () => {
    describe('dropdown cascade dropdown', () => {
      let debugEl: DebugElement;
      let component: TestMultiLevelComponent;
      beforeEach(fakeAsync(() => {
        fixture = TestBed.createComponent(TestMultiLevelComponent);
        debugEl = fixture.debugElement;
        component = debugEl.componentInstance;
        fixture.detectChanges();
      }));
      const clickToggle = (id) => {
        const clickElement = document.querySelector(`#${id}`);
        clickElement.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
        fixture.detectChanges();
        tick();
        return clickElement;
      };
      const hoverToggle = (id) => {
        const mouseenterElement = document.querySelector(`#${id}`).parentElement;
        mouseenterElement.dispatchEvent(new MouseEvent('mouseenter', { bubbles: false, cancelable: false }));
        fixture.detectChanges();
        tick(250);
        fixture.detectChanges();
        tick();
        return mouseenterElement;
      };
      const leaveToggle = (id, relatedTarget?) => {
        const toggleElement = document.querySelector(`#${id}`).parentElement;
        toggleElement.dispatchEvent(
          new MouseEvent('mouseleave', {
            relatedTarget: relatedTarget,
            bubbles: false,
            cancelable: false,
          })
        );
        fixture.detectChanges();
        tick(250);
        fixture.detectChanges();
        tick();
        return toggleElement;
      };
      const leaveMenu = (id, relatedTarget?) => {
        const menuElement = document.querySelector(`#${id}`);
        menuElement.dispatchEvent(
          new MouseEvent('mouseleave', {
            relatedTarget: relatedTarget,
            bubbles: false,
            cancelable: false,
          })
        );
        fixture.detectChanges();
        tick(250);
        fixture.detectChanges();
        tick();
        return menuElement;
      };
      const getRelatedTarget = (id) => {
        return document.querySelector(`#${id}`);
      };
      const isMenuShow = (id) => {
        fixture.detectChanges();
        const menuElement = document.querySelector(`#${id}`);
        return document.contains(menuElement);
      };
      describe('click', () => {
        beforeEach(fakeAsync(() => {
          component.trigger1 = 'click';
          component.trigger2 = 'click';
          fixture.detectChanges();
        }));
        describe('cascade child show, ancestor still display', () => {
          // 单击toggle 单击菜单一， 展开菜单二
          it('cascade display', fakeAsync(() => {
            clickToggle('item-0');
            fixture.detectChanges();
            expect(isMenuShow('menu1')).toBe(true);
            clickToggle('item-1');
            fixture.detectChanges();
            expect(isMenuShow('menu1')).toBe(true);
            expect(isMenuShow('menu2')).toBe(true);
            clickToggle('item-11');
            fixture.detectChanges();
            expect(isMenuShow('menu1')).toBe(true);
            expect(isMenuShow('menu2')).toBe(true);
            expect(isMenuShow('menu3')).toBe(true);
          }));
        });
        describe('click menu hide，ancestor hide, children hide', () => {
          beforeEach(fakeAsync(() => {
            // 全部展开
            clickToggle('item-0');
            fixture.detectChanges();
            clickToggle('item-1');
            fixture.detectChanges();
            clickToggle('item-11');
            fixture.detectChanges();
          }));
          it('click outside should hide all', fakeAsync(() => {
            // 单击外部全部隐藏
            document.body.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
            fixture.detectChanges();
            tick();
            fixture.detectChanges();
            expect(isMenuShow('menu1')).toBe(false);
            expect(isMenuShow('menu2')).toBe(false);
            expect(isMenuShow('menu3')).toBe(false);
          }));
          it('top parent close, all children close', fakeAsync(() => {
            // 单击toggle全隐藏
            clickToggle('item-0');
            fixture.detectChanges();
            expect(isMenuShow('menu1')).toBe(false);
            expect(isMenuShow('menu2')).toBe(false);
            expect(isMenuShow('menu3')).toBe(false);
          }));
          it('first menu parent close, children close', fakeAsync(() => {
            // 单击菜单一选项全隐藏
            clickToggle('item-3');
            fixture.detectChanges();
            expect(isMenuShow('menu1')).toBe(false);
            expect(isMenuShow('menu2')).toBe(false);
            expect(isMenuShow('menu3')).toBe(false);
          }));
          it('second menu parent close, children close', fakeAsync(() => {
            // 单击菜单二的选项
            clickToggle('item-13');
            fixture.detectChanges();
            expect(isMenuShow('menu1')).toBe(false);
            expect(isMenuShow('menu2')).toBe(false);
            expect(isMenuShow('menu3')).toBe(false);
          }));
          it('third menu parent close, children close', fakeAsync(() => {
            // 单击菜单三的选项
            clickToggle('item-111');
            fixture.detectChanges();
            expect(isMenuShow('menu1')).toBe(false);
            expect(isMenuShow('menu2')).toBe(false);
            expect(isMenuShow('menu3')).toBe(false);
          }));
        });
        describe('switch menu, old menu hide, new menu display, ancestor still display', () => {
          beforeEach(fakeAsync(() => {
            // 全部展开
            clickToggle('item-0');
            fixture.detectChanges();
            clickToggle('item-1');
            fixture.detectChanges();
            clickToggle('item-11');
            fixture.detectChanges();
          }));
          it('first menu switch, children close， new menu show', fakeAsync(() => {
            // 菜单一切换 老的菜单二三隐藏 新的菜单二出现
            clickToggle('item-2');
            fixture.detectChanges();
            expect(isMenuShow('menu1')).toBe(true);
            expect(isMenuShow('menu2')).toBe(false);
            expect(isMenuShow('menu3')).toBe(false);
            expect(isMenuShow('menu4')).toBe(true);
          }));
          it('second menu parent close, children close', fakeAsync(() => {
            // 菜单二切换 老的菜单三隐藏， 新的菜单三出现， 老的菜单一仍然在
            clickToggle('item-12');
            fixture.detectChanges();
            expect(isMenuShow('menu1')).toBe(true);
            expect(isMenuShow('menu2')).toBe(true);
            expect(isMenuShow('menu3')).toBe(false);
            expect(isMenuShow('menu5')).toBe(true);
          }));
        });
      });
      describe('hover', () => {
        beforeEach(fakeAsync(() => {
          component.trigger1 = 'hover';
          component.trigger2 = 'hover';
          fixture.detectChanges();
        }));
        describe('cascade child show, ancestor still display', () => {
          // 悬停toggle 悬停菜单一， 悬停菜单二
          it('cascade display', fakeAsync(() => {
            hoverToggle('item-0');
            fixture.detectChanges();
            expect(isMenuShow('menu1')).toBe(true);
            hoverToggle('item-1');
            fixture.detectChanges();
            expect(isMenuShow('menu1')).toBe(true);
            expect(isMenuShow('menu2')).toBe(true);
            hoverToggle('item-11');
            fixture.detectChanges();
            expect(isMenuShow('menu1')).toBe(true);
            expect(isMenuShow('menu2')).toBe(true);
            expect(isMenuShow('menu3')).toBe(true);
          }));
        });
        describe('click menu hide，ancestor hide, children hide', () => {
          beforeEach(fakeAsync(() => {
            // 全部展开
            hoverToggle('item-0');
            fixture.detectChanges();
            hoverToggle('item-1');
            fixture.detectChanges();
            hoverToggle('item-11');
            fixture.detectChanges();
          }));
          it('top parent close, all children close', fakeAsync(() => {
            // 单击toggle全隐藏
            clickToggle('item-0');
            fixture.detectChanges();
            expect(isMenuShow('menu1')).toBe(false);
            expect(isMenuShow('menu2')).toBe(false);
            expect(isMenuShow('menu3')).toBe(false);
          }));
          it('second menu parent close, children close', fakeAsync(() => {
            // 单击菜单一选项全隐藏
            clickToggle('item-3');
            fixture.detectChanges();
            expect(isMenuShow('menu1')).toBe(false);
            expect(isMenuShow('menu2')).toBe(false);
            expect(isMenuShow('menu3')).toBe(false);
          }));
          it('third menu parent close, children close', fakeAsync(() => {
            // 单击菜单二的选项
            clickToggle('item-13');
            fixture.detectChanges();
            expect(isMenuShow('menu1')).toBe(false);
            expect(isMenuShow('menu2')).toBe(false);
            expect(isMenuShow('menu3')).toBe(false);
          }));
          it('second menu parent close, children close', fakeAsync(() => {
            // 单击菜单三的选项
            clickToggle('item-111');
            fixture.detectChanges();
            expect(isMenuShow('menu1')).toBe(false);
            expect(isMenuShow('menu2')).toBe(false);
            expect(isMenuShow('menu3')).toBe(false);
          }));
        });
        describe('mouseleave to ancestor normal option, menu hide', () => {
          beforeEach(fakeAsync(() => {
            // 全部展开
            hoverToggle('item-0');
            fixture.detectChanges();
            hoverToggle('item-1');
            fixture.detectChanges();
            hoverToggle('item-11');
            fixture.detectChanges();
          }));
          it('mouse leave to second menu', fakeAsync(() => {
            leaveMenu('menu3', getRelatedTarget('item-13'));
            hoverToggle('item-13');
            fixture.detectChanges();
            expect(isMenuShow('menu1')).toBe(true);
            expect(isMenuShow('menu2')).toBe(true);
            expect(isMenuShow('menu3')).toBe(false);
          }));
        });
        describe('switch menu, old menu hide, new menu display, ancestor still display', () => {
          beforeEach(fakeAsync(() => {
            // 全部展开
            hoverToggle('item-0');
            fixture.detectChanges();
            hoverToggle('item-1');
            fixture.detectChanges();
            hoverToggle('item-11');
            fixture.detectChanges();
          }));
          it('first menu switch, children close，new menu show', fakeAsync(() => {
            // 菜单一切换 老的菜单二三隐藏 新的菜单二出现
            leaveMenu('menu3', getRelatedTarget('item-2'));
            hoverToggle('item-2');
            fixture.detectChanges();
            tick(250);
            fixture.detectChanges();
            expect(isMenuShow('menu1')).toBe(true);
            expect(isMenuShow('menu2')).toBe(false);
            expect(isMenuShow('menu3')).toBe(false);
            expect(isMenuShow('menu4')).toBe(true);
          }));
          it('second menu parent close, children close', fakeAsync(() => {
            // 菜单二切换 老的菜单三隐藏， 新的菜单三出现， 老的菜单一仍然在
            leaveMenu('menu3', getRelatedTarget('item-12'));
            hoverToggle('item-12');
            fixture.detectChanges();
            expect(isMenuShow('menu1')).toBe(true);
            expect(isMenuShow('menu2')).toBe(true);
            expect(isMenuShow('menu3')).toBe(false);
            expect(isMenuShow('menu5')).toBe(true);
          }));
        });
      });
      describe('first click width closeOnMouseLeaveMenu, second hover', () => {
        beforeEach(fakeAsync(() => {
          component.trigger1 = 'click';
          component.trigger2 = 'hover';
          component.closeOnMouseLeaveMenu = true;
          fixture.detectChanges();
        }));
        describe('cascade display', () => {
          describe('cascade child show, ancestor still display', () => {
            // 点击toggle 悬停菜单一， 悬停菜单二
            it('cascade display', fakeAsync(() => {
              clickToggle('item-0');
              fixture.detectChanges();
              expect(isMenuShow('menu1')).toBe(true);
              hoverToggle('item-1');
              fixture.detectChanges();
              expect(isMenuShow('menu1')).toBe(true);
              expect(isMenuShow('menu2')).toBe(true);
              hoverToggle('item-11');
              fixture.detectChanges();
              expect(isMenuShow('menu1')).toBe(true);
              expect(isMenuShow('menu2')).toBe(true);
              expect(isMenuShow('menu3')).toBe(true);
            }));
          });
          describe('mouseleave close menu1', () => {
            // 离开子菜单，top菜单为click的也关闭
            it('mouseleave hide menu1', fakeAsync(() => {
              clickToggle('item-0');
              fixture.detectChanges();
              hoverToggle('item-1');
              fixture.detectChanges();
              hoverToggle('item-11');
              fixture.detectChanges();
              leaveMenu('menu3', document);
              fixture.detectChanges();
              tick(250);
              fixture.detectChanges();
              tick();
              fixture.detectChanges();
              expect(isMenuShow('menu1')).toBe(false);
              expect(isMenuShow('menu2')).toBe(false);
              expect(isMenuShow('menu3')).toBe(false);
            }));
            it('mouseleave to menu2, menu1 still display', fakeAsync(() => {
              clickToggle('item-0');
              fixture.detectChanges();
              hoverToggle('item-1');
              fixture.detectChanges();
              hoverToggle('item-11');
              fixture.detectChanges();
              leaveMenu('menu3', getRelatedTarget('item-12'));
              fixture.detectChanges();
              tick(250);
              fixture.detectChanges();
              tick();
              fixture.detectChanges();
              expect(isMenuShow('menu1')).toBe(true);
              expect(isMenuShow('menu2')).toBe(true);
              expect(isMenuShow('menu3')).toBe(false);
            }));
          });
        });
      });
    });
  });
  describe('dropdown implied feature', () => {
    describe('dropdown auto direction', () => {
      let debugEl: DebugElement;
      let component: TestDropdownComponent;
      let dropdownToggleElement: DebugElement;
      let dropdownMenuElement: DebugElement;
      const clickToggle = () => {
        dropdownToggleElement.nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
        fixture.detectChanges();
        tick(); // animation time
      };
      beforeEach(() => {
        fixture = TestBed.createComponent(TestDropdownComponent);
        debugEl = fixture.debugElement;
        component = debugEl.componentInstance;
        dropdownToggleElement = debugEl.query(By.directive(DropDownToggleDirective));
        dropdownMenuElement = debugEl.query(By.directive(DropDownMenuDirective));
        fixture.detectChanges();
      });
      it('bottom enough, render down', fakeAsync(() => {
        component.expand = false;
        fixture.detectChanges();
        clickToggle();
        fixture.detectChanges();
        const originRect = dropdownToggleElement.nativeElement.getBoundingClientRect();
        const menuRect = dropdownMenuElement.nativeElement.getBoundingClientRect();
        const verticalBorderOverlayWidth = 4; // 有个间距
        expect(originRect.x === menuRect.x).toBe(true);
        expect(originRect.y + originRect.height + verticalBorderOverlayWidth === menuRect.y).toBe(true);
        clickToggle();
        expect(dropdownMenuElement.styles.display).toBe('none');
      }));
      it('bottom not enough, render up', fakeAsync(() => {
        component.expand = true;
        fixture.detectChanges();
        clickToggle();
        fixture.detectChanges();
        const originRect = dropdownToggleElement.nativeElement.getBoundingClientRect();
        const menuRect = dropdownMenuElement.nativeElement.getBoundingClientRect();
        const verticalBorderOverlayWidth = 4; // 有个间距
        expect(originRect.x === menuRect.x).toBe(true);
        expect(originRect.y === menuRect.y + menuRect.height + verticalBorderOverlayWidth).toBe(true);
        clickToggle(); // to test fadeout function (Branches coverage)
        expect(dropdownMenuElement.styles.display).toBe('none');
      }));
    });
    describe('dropdown keyboard event', () => {
      let debugEl: DebugElement;
      let dropdownToggleElement: DebugElement;
      let dropdownMenuElement: DebugElement;
      const clickToggle = () => {
        dropdownToggleElement.nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
        fixture.detectChanges();
        tick(); // animation time
      };
      beforeEach(() => {
        fixture = TestBed.createComponent(TestDropdownComponent);
        debugEl = fixture.debugElement;
        dropdownToggleElement = debugEl.query(By.directive(DropDownToggleDirective));
        dropdownMenuElement = debugEl.query(By.directive(DropDownMenuDirective));
        fixture.detectChanges();
      });
      it('toggle Element focus，press enter toggle menu open', fakeAsync(() => {
        expect(dropdownMenuElement.styles.display).toBe('none');
        dropdownToggleElement.nativeElement.dispatchEvent(new MouseEvent('focus', { bubbles: false, cancelable: false }));
        fixture.detectChanges();
        dropdownToggleElement.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        expect(dropdownMenuElement.styles.display).toBe('block');
        dropdownToggleElement.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        expect(dropdownMenuElement.styles.display).toBe('none');
      }));
      it('menu open， press escape close menu', fakeAsync(() => {
        clickToggle();
        fixture.detectChanges();
        expect(dropdownMenuElement.styles.display).toBe('block');
        document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        fixture.detectChanges();
        tick(); // animation time
        fixture.detectChanges();
        expect(dropdownMenuElement.styles.display).toBe('none');
      }));
    });

    describe('dropdown mouse enter and leave ( debounce time < gap < animation time) should normally open and close', () => {
      let debugEl: DebugElement;
      let dropdownElement: DebugElement;
      let dropdownMenuElement: DebugElement;
      beforeEach(() => {
        fixture = TestBed.createComponent(TestDropdownComponent);
        debugEl = fixture.debugElement;
        dropdownElement = debugEl.query(By.directive(DropDownDirective));
        dropdownMenuElement = debugEl.query(By.directive(DropDownMenuDirective));
        fixture.detectChanges();
      });
      it('menu open， press escape close menu', fakeAsync(() => {
        dropdownElement.nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
        fixture.detectChanges();
        tick(100); // gap time
        dropdownElement.nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
        fixture.detectChanges();
        tick(100);
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        expect(dropdownMenuElement.styles.display).toBe('none');
      }));
    });
  });
});
