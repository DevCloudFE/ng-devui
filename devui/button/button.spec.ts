import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ButtonModule } from 'ng-devui/button';
import { LoadingComponent } from './../loading/loading.component';
import { ButtonComponent } from './button.component';

@Component({
  template: `
    <d-button
      [bsStyle]="bsStyle"
      [bsPosition]="bsPosition"
      (btnClick)="increment()"
      [disabled]="isDisabled"
      [icon]="icon"
      [showLoading]="loading"
    >
      {{text}}
    </d-button>
  `
})
class TestButtonComponent {
  bsStyle = 'primary';
  bsPosition = 'default';
  clickCount = 0;
  isDisabled = false;
  icon = '';

  text = '确定';
  loading = false;

  increment() {
    this.clickCount++;
  }
}
@Component({
  template: `
    <d-button [autofocus]="true" *ngIf="show">{{text}}</d-button>
  `
})
class TestButtonAutoFocusComponent {
  show = false;
}

describe('Button', () => {
  let fixture: ComponentFixture<any>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ButtonModule],
      declarations: [TestButtonComponent, TestButtonAutoFocusComponent],
    }).compileComponents();
  }));

  describe('Button Core', () => {
    let testComponent: TestButtonComponent;
    let buttonDebugElement: DebugElement;
    let buttonInsideNativeElement: HTMLElement;
    beforeEach((() => {
      fixture = TestBed.createComponent(TestButtonComponent);
      testComponent = fixture.debugElement.componentInstance;
      buttonDebugElement = fixture.debugElement.query(By.directive(ButtonComponent));
      buttonInsideNativeElement = buttonDebugElement.query(By.css('button')).nativeElement;
      fixture.detectChanges();
    }));
    describe('button default behavior', () => {
      it('Button demo has created successfully', () => {
        expect(testComponent).toBeTruthy();
      });

      it('Button should apply css classes', () => {
        expect(buttonInsideNativeElement.classList.contains('devui-btn')).toBe(true);
        expect(buttonInsideNativeElement.classList.contains('devui-btn-primary')).toBe(true);
        expect(buttonInsideNativeElement.classList.contains('devui-btn-default')).toBe(true);
      });

      it('Button should render text', () => {
        expect(buttonInsideNativeElement.innerText).toBe('确定');
      });

      describe('button default function', () => {
        it('Button click', () => {
          buttonInsideNativeElement.click();
          fixture.detectChanges();
          expect(testComponent.clickCount).toBe(1);
        });
      });
    });

    describe('button text', () => {
      it('Button click', () => {
        testComponent.text = '取消';
        fixture.detectChanges();
        expect(buttonInsideNativeElement.innerText).toBe('取消');
      });
    });

    describe('button disabled', () => {
      beforeEach(() => {
        testComponent.isDisabled = true;
        fixture.detectChanges();
      });

      it('Button disabled should have disabled attribute', () => {
        expect(buttonInsideNativeElement.hasAttribute('disabled')).toBe(true);
      });

      it('Button disabled should not response to click', () => {
        buttonInsideNativeElement.click();
        fixture.detectChanges();
        expect(testComponent.clickCount).toBe(0, 'Expected not response to click');
      });
    });

    describe('button bsStyle common', () => {
      beforeEach(() => {
        testComponent.bsStyle = 'common';
        fixture.detectChanges();
      });

      it('Button should apply css classes', () => {
        expect(buttonInsideNativeElement.classList.contains('devui-btn-common')).toBe(true);
      });
    });

    describe('button bsStyle text and text-dark', () => {
      it('Button should apply css classes text', () => {
        testComponent.bsStyle = 'text';
        fixture.detectChanges();
        expect(buttonInsideNativeElement.classList.contains('devui-btn-text')).toBe(true);
      });
      it('Button should apply css classes text-dark', () => {
        testComponent.bsStyle = 'text-dark';
        fixture.detectChanges();
        expect(buttonInsideNativeElement.classList.contains('devui-btn-text-dark')).toBe(true);
      });
    });

    describe('button icon', () => {
      let iconDebugElement;
      let iconElement;
      beforeEach(() => {
        testComponent.icon = 'icon-add';
        fixture.detectChanges();
        iconDebugElement = buttonDebugElement.query(By.css('.icon'));
      });

      it('Button should have icon span element', () => {
        expect(iconDebugElement).toBeTruthy();
      });
      it('Button should apply css classes to icon element', () => {
        iconElement = iconDebugElement.nativeElement;
        expect(iconElement.classList.contains('devui-icon-fix')).toBe(true, 'should have devui-icon-fix');
        expect(iconElement.classList.contains('icon-add')).toBe(true);
      });
    });

    describe('button loading', () => {
      let loadingDebugElement;
      beforeEach(() => {
        testComponent.loading = true;
        fixture.detectChanges();
        loadingDebugElement = buttonDebugElement.query(By.directive(LoadingComponent));
      });

      it('Button should have loading component', () => {
        expect(loadingDebugElement).toBeTruthy();
      });
      it('Button should have apply loading css class', () => {
        const loadingElement: HTMLElement = loadingDebugElement.nativeElement.firstElementChild;
        expect(loadingElement.classList.contains('devui-loading-wrapper')).toBe(true);
      });
      it('Button loading should not response to click', () => {
        buttonInsideNativeElement.click();
        fixture.detectChanges();
        expect(testComponent.clickCount).toBe(0, 'loading Expected not response to click');
      });
    });

    describe('button position', () => {
      it('Button position should be left', () => {
        testComponent.bsStyle = 'left';
        fixture.detectChanges();
        expect(buttonInsideNativeElement.classList.contains('devui-btn-left')).toBe(true);
      });
      it('Button position should be right', () => {
        testComponent.bsPosition = 'right';
        fixture.detectChanges();
        expect(buttonInsideNativeElement.classList.contains('devui-btn-right')).toBe(true);
      });
    });
  });

  describe('button autoFocus', () => {
    let testComponent: TestButtonAutoFocusComponent;
    let testComponentElement: HTMLElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestButtonAutoFocusComponent);
      testComponent = fixture.debugElement.componentInstance;
      testComponentElement = fixture.debugElement.nativeElement;
      fixture.detectChanges();
      document.body.appendChild(testComponentElement);
    });
    afterEach(() => {
      document.body.removeChild(testComponentElement);
    });
    it('Button should have pseudo-class :focus', fakeAsync(() => {
      testComponent.show = true;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(document.activeElement).toBeTruthy();
    }));
  });

});
