import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AccordionComponent } from './accordion.component';
import { AccordionModule } from './accordion.module';

@Component({
  template: `
    <d-accordion
      [data]="menu"
      class="menu"
      [restrictOneOpen]="restrictOneOpen"
      (itemClick)="itemClick($event)"
      (menuToggle)="menuToggle($event)"
      (activeItemChange)="activeItemChange($event)"
      [accordionType]="accordionTypeEmbed ? 'embed' : 'normal'"
    ></d-accordion>
  `,
})
class TestAccordionComponent {
  restrictOneOpen = false;
  accordionTypeEmbed = false;
  menu = [
    {
      title: 'Content 1',
      children: [{ title: 'Child Content 1' }, { title: 'Child Content 2' }, { title: 'Child Content ' }],
    },
    {
      title: 'Content 2（This is a long sentence for option display.）',
      children: [
        { title: 'Child Content 1 (This is a long sentence for option display.)' },
        { title: 'Child Content 2' },
        { title: 'Child Content 3' },
      ],
    },
    {
      title: 'Content 3 (Default Open)',
      open: true,
      children: [
        { title: 'Child Content 1 (Disabled)', disabled: true },
        { title: 'Child Content 2 (Default Active)', active: true },
        { title: 'Child Content 3' },
      ],
    },
    {
      title: 'Content 4 (No Child)',
      children: [],
    },
    {
      title: 'Content 5 (Disabled)',
      disabled: true,
      children: [],
    },
    {
      title: 'Content 6 (Dynamic Content)',
      needLoadChildren: true,
      loading: false,
      children: [],
    },
  ];

  menuToggle = jasmine.createSpy('menu toggled');

  itemClick = jasmine.createSpy('item clicked');

  activeItemChange = jasmine.createSpy('active item Changed');
}

@Component({
  template: `
    <d-accordion
      [data]="menu"
      class="menu"
      [restrictOneOpen]="restrictOneOpen"
      [accordionType]="accordionTypeEmbed ? 'embed' : 'normal'"
      [itemTemplate]="itemTemplate"
      [menuItemTemplate]="menuItemTemplate"
      [loadingTemplate]="loadingTemplate"
    ></d-accordion>
    <ng-template #itemTemplate let-item="item">
      <div class="custom-item-template">
        {{ item.title }}
      </div>
      <ng-template #menuItemTemplate let-item="item">
        <div class="custom-menu-item-template">
          {{ item.title }}
        </div>
      </ng-template>
      <ng-template #loadingTemplate let-item="item">
        <div class="custom-loading-template">Loading...</div>
      </ng-template>
    </ng-template>
  `,
})
class TestAccordionTemplateComponent {
  restrictOneOpen = false;
  accordionTypeEmbed = false;
  menu = [
    {
      title: 'Content 1',
      children: [{ title: 'Child Content 1' }, { title: 'Child Content 2' }, { title: 'Child Content ' }],
    },
    {
      title: 'Content 2（This is a long sentence for option display.）',
      children: [
        { title: 'Child Content 1 (This is a long sentence for option display.)' },
        { title: 'Child Content 2' },
        { title: 'Child Content 3' },
      ],
    },
    {
      title: 'Content 3 (Default Open)',
      open: true,
      children: [
        { title: 'Child Content 1 (Disabled)', disabled: true },
        { title: 'Child Content 2 (Default Active)', active: true },
        { title: 'Child Content 3' },
      ],
    },
    {
      title: 'Content 4 (No Child)',
      children: [],
    },
    {
      title: 'Content 5 (Disabled)',
      disabled: true,
      children: [],
    },
    {
      title: 'Content 6 (Dynamic Content)',
      needLoadChildren: true,
      loading: false,
      children: [],
    },
  ];
}

@Component({
  template: ` <d-accordion [data]="menu" class="menu" [linkType]="'routerLink'"></d-accordion> `,
})
class TestAccordionLinkComponent {
  constructor(private router: Router) {}
  menu = [
    { title: 'Accordion', link: '/components/zh-cn/accordion', disabled: true },
    { title: 'Anchor', link: '/components/zh-cn/anchor?demo#basic' },
    { title: 'Button', link: '/components/zh-cn/button' },
  ];

  get path() {
    return this.router.url;
  }
}

@Component({
  template: ` <d-accordion [data]="menu" class="menu" [linkType]="'hrefLink'" [linkDefaultTarget]="'self'"></d-accordion> `,
})
class TestAccordionHrefLinkComponent {
  menu = [
    { title: 'Accordion', link: '/components/zh-cn/accordion', disabled: true },
    { title: 'Anchor', link: '/components/zh-cn/anchor' },
    { title: 'Button', link: '/components/zh-cn/button' },
  ];
}

describe('Accordion', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AccordionModule, RouterTestingModule.withRoutes([]), BrowserAnimationsModule],
      declarations: [TestAccordionComponent, TestAccordionLinkComponent, TestAccordionHrefLinkComponent, TestAccordionTemplateComponent],
    }).compileComponents();
  }));

  describe('Accordion', () => {
    let testComponent: TestAccordionComponent;
    let accordionDebugElement: DebugElement;
    let accordionNativeElement: HTMLElement;
    let fixture: ComponentFixture<TestAccordionComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestAccordionComponent);
      testComponent = fixture.componentInstance;
      accordionDebugElement = fixture.debugElement.query(By.directive(AccordionComponent));
      accordionNativeElement = accordionDebugElement.nativeElement;
      fixture.detectChanges();
    });

    describe('accordion default behavior', () => {
      it('accordion demo has created successfully', () => {
        expect(testComponent).toBeTruthy();
      });

      it('accordion item click', fakeAsync(() => {
        const accordionItems = accordionNativeElement.querySelectorAll('.devui-accordion-item');
        (accordionItems[0].querySelector('d-accordion-menu .devui-accordion-item-title') as HTMLElement).click();
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        expect(testComponent.menuToggle).toHaveBeenCalled();
        expect(accordionItems[0].querySelector('.devui-accordion-item-title').classList).toContain('open');
      }));

      it('accordion item click', () => {
        const accordionItems = accordionNativeElement.querySelectorAll('.devui-accordion-item');
        (accordionItems[11].querySelector('d-accordion-item') as HTMLElement).click();
        fixture.detectChanges();
        expect(accordionItems[11].querySelector('.devui-accordion-item-title').classList).toContain('active');
        expect(testComponent.itemClick).toHaveBeenCalled();
      });
    });
  });

  describe('Accordion Template', () => {
    let testComponent: TestAccordionTemplateComponent;
    let accordionDebugElement: DebugElement;
    let accordionNativeElement: HTMLElement;
    let fixture: ComponentFixture<TestAccordionTemplateComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestAccordionTemplateComponent);
      testComponent = fixture.componentInstance;
      accordionDebugElement = fixture.debugElement.query(By.directive(AccordionComponent));
      accordionNativeElement = accordionDebugElement.nativeElement;
      fixture.detectChanges();
    });

    describe('accordion default behavior', () => {
      it('accordion demo has created successfully', () => {
        expect(testComponent).toBeTruthy();
      });

      it('accordion item custom template render correctly', () => {
        const accordionItems = accordionNativeElement.querySelectorAll('.devui-accordion-item');
        const customItem = accordionItems[0].querySelector('.custom-item-template');
        expect(customItem).toBeTruthy();
      });
    });
  });

  describe('Accordion Link', () => {
    let testComponent: TestAccordionLinkComponent;
    let accordionDebugElement: DebugElement;
    let accordionNativeElement: HTMLElement;
    let fixture: ComponentFixture<TestAccordionLinkComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestAccordionLinkComponent);
      testComponent = fixture.componentInstance;
      accordionDebugElement = fixture.debugElement.query(By.directive(AccordionComponent));
      accordionNativeElement = accordionDebugElement.nativeElement;
      fixture.detectChanges();
    });

    describe('accordion link default behavior', () => {
      it('accordion link demo has created successfully', () => {
        expect(testComponent).toBeTruthy();
      });

      it('accordion should be routerLink', () => {
        const links = accordionNativeElement.querySelectorAll('d-accordion-item-routerlink');
        expect(links.length).toEqual(testComponent.menu.length);
      });
    });
  });
  describe('Accordion HrefLink', () => {
    let testComponent: TestAccordionHrefLinkComponent;
    let accordionDebugElement: DebugElement;
    let accordionNativeElement: HTMLElement;
    let fixture: ComponentFixture<TestAccordionHrefLinkComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestAccordionHrefLinkComponent);
      testComponent = fixture.componentInstance;
      accordionDebugElement = fixture.debugElement.query(By.directive(AccordionComponent));
      accordionNativeElement = accordionDebugElement.nativeElement;
      fixture.detectChanges();
    });

    describe('accordion link default behavior', () => {
      it('accordion link demo has created successfully', () => {
        expect(testComponent).toBeTruthy();
      });

      it('accordion should be href', () => {
        const links = accordionNativeElement.querySelectorAll('d-accordion-item-hreflink');
        expect(links.length).toEqual(testComponent.menu.length);
      });
    });
  });
});
