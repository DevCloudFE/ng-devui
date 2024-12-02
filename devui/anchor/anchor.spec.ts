import { CommonModule } from '@angular/common';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ButtonModule } from '../button';
import { StickyModule } from '../sticky';
import { AnchorBoxHashSupportDirective } from './anchor-box-hash.directive';
import { AnchorBoxDirective } from './anchor-box.directive';
import { AnchorLinkDirective } from './anchor-link.directive';
import { AnchorDirective } from './anchor.directive';
import { AnchorModule } from './anchor.module';

@Component({
  template: `
    <div class="my-container">
      <div dAnchorBox [view]="view" [defaultAnchor]="'base-info'" class="mymain" style="position: relative">
        <div class="mysidebar">
          <d-sticky [view]="view">
            <ul class="step-nav">
              <li [dAnchorLink]="dAnchorLink" anchorActive="active">基本信息</li>
              <li [dAnchorLink]="'issue-list'" anchorActive="active">需求列表</li>
              <li [dAnchorLink]="'case-list'" anchorActive="active">用例列表</li>
              <li [dAnchorLink]="'quarlity-result'" anchorActive="active">质量评估</li>
            </ul>
          </d-sticky>
        </div>
        <div class="mycontent">
          <div [dAnchor]="anchor" class="section-block">
            <h3>基本信息</h3>
            这里显示基本信息。
          </div>
          <div [dAnchor]="'issue-list'" class="section-block">
            <h3>需求列表</h3>
            这里显示需求列表。
          </div>
          <div [dAnchor]="'case-list'" class="section-block">
            <h3>用例列表</h3>
            这里显示用例列表。
          </div>
          <div [dAnchor]="'quarlity-result'" class="section-block">
            <h3>质量评估</h3>
            这里显示质量评估。
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./demo/scroll-target/scroll-target.component.scss'],
})
class TestAnchorComponent {
  view = { top: 60, bottom: 0 };
  anchor = 'base-info';
  dAnchorLink;
}

@Component({
  template: `
    <section>
      <div
        dAnchorBox
        dAnchorHashSupport
        [view]="{ top: 140, bottom: 0 }"
        class="mymain"
        style="position: relative"
        [updateUrlWhenAnchorActive]="updateUrlWhenAnchorActive"
        [scrollToAnchorByHashOnlyInit]="scrollToAnchorByHashOnlyInit"
      >
        <div class="mysidebar">
          <d-sticky [view]="{ top: 140, bottom: 0 }">
            <ul class="step-nav">
              <li [dAnchorLink]="'base-info'" anchorActive="active">基本信息</li>
              <li [dAnchorLink]="'issue-list'" anchorActive="active">需求列表</li>
              <li [dAnchorLink]="'case-list'" anchorActive="active" id="case_list_anchor">用例列表</li>
              <li [dAnchorLink]="'quality-result'" anchorActive="active">质量评估</li>
            </ul>
          </d-sticky>
        </div>
        <div class="mycontent">
          <div [dAnchor]="'base-info'" class="section-block">
            <h3>基本信息</h3>
            这里显示基本信息。
          </div>
          <div [dAnchor]="'issue-list'" class="section-block">
            <h3>需求列表</h3>
            这里显示需求列表。
          </div>
          <div [dAnchor]="'case-list'" class="section-block">
            <h3>用例列表</h3>
            这里显示用例列表。
          </div>
          <div [dAnchor]="'quality-result'" class="section-block" id="quality_result">
            <h3>质量评估</h3>
            这里显示质量评估。
          </div>
        </div>
      </div>
    </section>
  `,
})
class TestHashAnchorComponent {
  constructor(private router: Router) {}
  updateUrlWhenAnchorActive = true;
  scrollToAnchorByHashOnlyInit = false;

  get path() {
    return this.router.url;
  }

  set path(url: string) {
    this.router.navigateByUrl(url);
  }
}

describe('anchor', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, AnchorModule, StickyModule],
      declarations: [TestAnchorComponent],
    });
  });

  describe('basic', () => {
    let component: TestAnchorComponent;
    let anchorElements: DebugElement[];
    let anchorLinkElements: DebugElement[];
    let anchorBoxElement: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestAnchorComponent);
      component = fixture.debugElement.componentInstance;
      anchorElements = fixture.debugElement.queryAll(By.directive(AnchorDirective));
      anchorLinkElements = fixture.debugElement.queryAll(By.directive(AnchorLinkDirective));
      anchorBoxElement = fixture.debugElement.query(By.directive(AnchorBoxDirective));
      fixture.detectChanges();
    });

    it('should created successfully', () => {
      expect(component).toBeTruthy();
      expect(anchorElements.length).toEqual(4);
      expect(anchorLinkElements.length).toEqual(4);
      expect(anchorBoxElement).toBeTruthy();
    });

    describe('anchor directive', () => {
      it('should anchor directive has default style', () => {
        expect(anchorElements[0].classes['section-block']).toBe(true);
        expect(anchorElements[1].classes['section-block']).toBe(true);
        expect(anchorElements[2].classes['section-block']).toBe(true);
        expect(anchorElements[3].classes['section-block']).toBe(true);
      });

      it('should anchor be activated by click', fakeAsync(() => {
        anchorElements[0].nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
        fixture.detectChanges();
        tick();
        expect(anchorElements[0].classes['anchor-active-by-click-inside']).toBe(true);
      }));

      it('should scroll to avtive anchor', fakeAsync(() => {
        const boxElement: HTMLElement = anchorBoxElement.nativeElement;
        boxElement.dispatchEvent(new Event('scroll', { bubbles: true, cancelable: false }));
        fixture.detectChanges();
        tick(100);
        expect(anchorElements[0].classes['anchor-active-by-scroll']).toBe(true);
      }));

      it('should one anchor be deactivated when another anchor clicked', fakeAsync(() => {
        anchorElements[0].nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
        fixture.detectChanges();
        tick();
        expect(anchorElements[0].classes['anchor-active-by-click-inside']).toBe(true);
        anchorElements[1].nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
        fixture.detectChanges();
        tick();
        expect(anchorElements[0].classes['anchor-active-by-click-inside']).toBeUndefined();
      }));
    });

    describe('anchor link directive', () => {
      it('click anchor link to scroll to the target', fakeAsync(() => {
        component.dAnchorLink = 'base-info';
        fixture.detectChanges();
        tick();
        const linkElement: HTMLElement = anchorLinkElements[0].nativeElement;
        const dir = anchorBoxElement.injector.get(AnchorBoxDirective) as AnchorBoxDirective;
        linkElement.click();
        fixture.detectChanges();
        expect(dir.isScrollingToTarget).toBe(true);
        linkElement.click();
        fixture.detectChanges();
        tick(650);
        expect(dir.isScrollingToTarget).toBe(false);
      }));

      it('should highlight anchor link', fakeAsync(() => {
        component.dAnchorLink = 'base-info';
        fixture.detectChanges();
        tick();
        const linkElement: HTMLElement = anchorLinkElements[0].nativeElement;
        expect(anchorElements[0].classes.active).toBeUndefined();
        linkElement.click();
        fixture.detectChanges();
        tick(650);
        expect(anchorElements[0].classes.active).toBe(true);
      }));

      it('should not set scrolling to target when there is no anchorblock', fakeAsync(() => {
        const linkElement: HTMLElement = anchorLinkElements[0].nativeElement;
        linkElement.click();
        const dir = anchorLinkElements[0].injector.get(AnchorLinkDirective) as AnchorLinkDirective;
        expect(dir.anchorBlock).toBeUndefined();
      }));
    });
  });
});

describe('anchor hash box', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, AnchorModule, StickyModule, RouterTestingModule, ButtonModule],
      declarations: [TestHashAnchorComponent],
    });
  });

  describe('basic', () => {
    let component: TestHashAnchorComponent;
    let anchorElements: DebugElement[];
    let anchorLinkElements: DebugElement[];
    let anchorHashBoxElement: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestHashAnchorComponent);
      component = fixture.debugElement.componentInstance;
      anchorElements = fixture.debugElement.queryAll(By.directive(AnchorDirective));
      anchorLinkElements = fixture.debugElement.queryAll(By.directive(AnchorLinkDirective));
      anchorHashBoxElement = fixture.debugElement.query(By.directive(AnchorBoxHashSupportDirective));
      fixture.detectChanges();
    });

    it('should created successfully', () => {
      expect(component).toBeTruthy();
      expect(anchorElements.length).toEqual(4);
      expect(anchorLinkElements.length).toEqual(4);
      expect(anchorHashBoxElement).toBeTruthy();
    });

    it('click anchor to change hash', fakeAsync(() => {
      anchorElements[1].nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
      fixture.detectChanges();
      tick(650);
      expect(component.path).toEqual('/#issue-list');
    }));

    it('should hash change when click another anchor', fakeAsync(() => {
      anchorElements[0].nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
      fixture.detectChanges();
      tick(650);
      expect(component.path).toEqual('/#base-info');
      anchorElements[2].nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
      fixture.detectChanges();
      tick(650);
      expect(component.path).toEqual('/#case-list');
    }));

    // TODO: Check whether scrollToFragment has been executed correctly.
    it('should anchor activated by fragment', fakeAsync(() => {
      fixture.ngZone.run(() => {
        component.path = '/#case-list';
      });
      tick();
      const dir = anchorHashBoxElement.injector.get(AnchorBoxHashSupportDirective) as AnchorBoxHashSupportDirective;
      spyOn(dir, 'scrollToFragment');
      dir.ngAfterViewInit();
      tick(120);
      expect(dir.scrollToFragment).toHaveBeenCalled();
    }));

    it('should not update url hash when updateUrlWhenAnchorActive is false', fakeAsync(() => {
      component.updateUrlWhenAnchorActive = false;
      fixture.detectChanges();
      anchorElements[0].nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
      fixture.detectChanges();
      tick(650);
      expect(component.path).toEqual('/');
    }));
  });
});
