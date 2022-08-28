import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { DomHelper } from '../utils/testing/dom-helper';
import { TabsComponent } from './tabs.component';
import { TabsModule } from './tabs.module';
@Component({
  template: `<d-tabs #tabs [type]="'tabs'" [(activeTab)]="activeTab" [beforeChange]="beforeChange"
    (activeTabChange)="activeTabChange($event)">
    <d-tab [id]="Tab1.id" [title]="Tab1.title">
      <p>
        这是Tab1的内容
      </p>
    </d-tab>

    <d-tab [id]="Tab2.id" [title]="Tab2.title" [disabled]="true">
      <p>
        这是Tab2的内容
      </p>
    </d-tab>

    <d-tab [id]="Tab3.id" [title]="Tab3.title">
      <p>
        这是Tab3的内容
      </p>
    </d-tab>
    <d-tab [id]="Tab4.id" [title]="Tab4.title">
      <p>
        这是Tab4的内容
      </p>
    </d-tab>
  </d-tabs>`,
})

class TestTabsComponent {
  @ViewChild('tabs') tabs: TabsComponent;
  activeTab = 'tab3';
  Tab1 = {
    id: 'tab1',
    title: 'Tab1'
  };
  Tab2 = {
    id: 'tab2',
    title: 'Tab2'
  };
  Tab3 = {
    id: 'tab3',
    title: 'Tab3'
  };
  Tab4 = {
    id: 'tab4',
    title: 'Tab4'
  };
  activeTabChange = jasmine.createSpy('tab changed');
  beforeChange = () => {
    return undefined;
  };
}

@Component({
  template: `<d-tabs #pills [(activeTab)]="tabActiveId" [type]="type">
    <d-tab *ngFor="let item of tabItems" [id]="item.id">
      <ng-template dTabTitle>
        {{ item.title }}
      </ng-template>
      {{ item.content }}
    </d-tab>
  </d-tabs>`,
})

class TestTabsTypeComponent {
  @ViewChild('pills') pills: TabsComponent;
  tabActiveId = 'tab1';
  type = 'pills';
  tabItems = [
    {
      id: 'tab1',
      title: 'Tab1',
      disabled: true,
      content: `这是Tab1的内容`
    },
    {
      id: 'tab2',
      title: 'Tab2',
      content: `这是Tab2的内容`
    },
    {
      id: 'tab3',
      title: 'Tab3',
      content: `这是Tab3的内容`
    },
  ];
}

describe('tabs', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TabsModule],
      declarations: [TestTabsComponent]
    }).compileComponents();
  });

  describe('tabs display', () => {
    let fixture: ComponentFixture<TestTabsComponent>;
    let component: TestTabsComponent;
    let debugEl: DebugElement;
    let domHelper: DomHelper<TestTabsComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestTabsComponent);
      component = fixture.componentInstance;
      debugEl = fixture.debugElement;
      domHelper = new DomHelper(fixture);
      fixture.detectChanges();
    });

    describe('should tabs display correctly', () => {
      it('should activeTab and tabContent display correctly', () => {
        expect(debugEl.nativeElement.querySelector('#' + component.activeTab).classList).toContain('active');
        expect(debugEl.nativeElement.querySelector('#' + component.activeTab + ' a span').textContent).toBe(component.Tab3.title);
        expect(debugEl.nativeElement.querySelector('#tab2').classList).toContain('disabled');
        const classes = [
          '.devui-tab-content',
          '.devui-nav-tabs',
        ];
        expect(domHelper.judgeStyleClasses(classes)).toBeTruthy();

      });

      it('should tab click event trigger', fakeAsync(() => {
        const tabEl: HTMLElement = debugEl.query(By.css('#tab1')).nativeElement;
        tabEl.dispatchEvent(new Event('click'));
        tick(300);
        expect(component.activeTabChange).toHaveBeenCalled();
        fixture.detectChanges();
        expect(component.activeTab).toBe('tab1');
      }));

      it('should beforeChange influence result', fakeAsync(() => {
        const tabEl: HTMLElement = debugEl.query(By.css('#tab4')).nativeElement;
        component.beforeChange = () => {
          return false;
        };
        fixture.detectChanges();
        tabEl.dispatchEvent(new Event('click'));
        tick(300);
        activeTabTest(component, 'tab4',  false);

        component.beforeChange = () => {
          return true;
        };
        fixture.detectChanges();
        tabEl.dispatchEvent(new Event('click'));
        tick(300);
        activeTabTest(component, 'tab4');

      }));
      it('should beforeChange work as observable', fakeAsync(() => {
        const tabEl: HTMLElement = debugEl.query(By.css('#tab4')).nativeElement;
        component.beforeChange = () => {
          return of(false);
        };
        fixture.detectChanges();
        tabEl.dispatchEvent(new Event('click'));
        tick(300);
        activeTabTest(component, 'tab4',  false);
        component.beforeChange = () => {
          return of(true);
        };
        fixture.detectChanges();
        tabEl.dispatchEvent(new Event('click'));
        tick(300);
        activeTabTest(component, 'tab4');
      }));
      it('should beforeChange work as promise', fakeAsync(() => {
        const tabEl: HTMLElement = debugEl.query(By.css('#tab4')).nativeElement;
        component.beforeChange = () => {
          return Promise.resolve(false);
        };
        fixture.detectChanges();
        tabEl.dispatchEvent(new Event('click'));
        tick(300);
        activeTabTest(component, 'tab4',  false);
        component.beforeChange = () => {
          return Promise.resolve(true);
        };
        fixture.detectChanges();
        tabEl.dispatchEvent(new Event('click'));
        tick(300);
        activeTabTest(component, 'tab4');
      }));

    });

  });

});

describe('should different type has different class', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TabsModule],
      declarations: [TestTabsTypeComponent]
    }).compileComponents();
  });
  describe('should tabs display differently accordion to type', () => {
    let fixture: ComponentFixture<TestTabsTypeComponent>;
    let component: TestTabsTypeComponent;
    let debugEl: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestTabsTypeComponent);
      component = fixture.componentInstance;
      debugEl = fixture.debugElement;
      fixture.detectChanges();
    });

    describe('should pills display correctly', () => {
      it('should pills display with devui-navs-pills', () => {
        expect(debugEl.query(By.css('.devui-nav')).nativeElement.classList).toContain('devui-nav-' + component.type);
      });
      it('should class change with type', () => {
        component.type = 'options';
        fixture.detectChanges();
        expect(debugEl.query(By.css('.devui-nav')).nativeElement.classList).toContain('devui-nav-' + component.type);
      });

    });

  });

});

function activeTabTest(component, itemClicked, canChange = true) {
  if (canChange) {
    expect(component.activeTabChange).toHaveBeenCalled();
    expect(component.activeTab).toBe(itemClicked);
  } else {
    expect(component.activeTabChange).toHaveBeenCalledTimes(0);
    expect(component.activeTab).not.toBe(itemClicked);
  }
}
