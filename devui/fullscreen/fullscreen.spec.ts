import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ESC_KEYCODE } from './fullscreen.config';
import { ButtonModule } from '../button/button.module';
import { DomHelper } from '../utils/testing/dom-helper';
import { FullscreenComponent } from './fullscreen.component';
import { FullscreenModule } from './fullscreen.module';

@Component({
  template: `
    <d-fullscreen #fullscreen [mode]="fullscreenMode" (fullscreenLaunch)="launchFullscreen($event)" [zIndex]="100">
      <div fullscreen-target>
        <d-button fullscreen-launch class="fullscreen-button" [icon]="btnIcon" bsStyle="text-dark"> </d-button>
      </div>
    </d-fullscreen>
  `,
})
class TestFullscreenComponent {
  @ViewChild('fullscreen', { static: true }) fullscreen: FullscreenComponent;
  fullscreenMode = 'normal';
  btnIcon = 'icon-frame-expand';

  launchFullscreen({ isFullscreen }) {
    if (isFullscreen) {
      this.btnIcon = 'icon-frame-contract';
    } else {
      this.btnIcon = 'icon-frame-expand';
    }
  }
}

describe('fullscreen', () => {
  let fixture: ComponentFixture<TestFullscreenComponent>;
  let debugEl: DebugElement;
  let component: TestFullscreenComponent;
  let domHelper: DomHelper<TestFullscreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FullscreenModule, ButtonModule],
      declarations: [TestFullscreenComponent],
    });
    fixture = TestBed.createComponent(TestFullscreenComponent);
    domHelper = new DomHelper(fixture);
    debugEl = fixture.debugElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('fullscreen normal mode', () => {
    it('Fullscreen should display correctly', () => {
      const classes = ['.fullscreen-container', '.fullscreen-button', '.devui-btn', '.icon-frame-expand'];
      expect(domHelper.judgeStyleClasses(classes)).toBeTruthy();
    });

    /* 初始状态不显示 */
    it('Fullscreen should not display at original state ', () => {
      expect(debugEl.query(By.css('.fullscreen'))).toBeNull();
    });

    it('Click can full-screen display content', () => {
      const buttonEle = debugEl.query(By.css('.fullscreen-button')).nativeElement;
      buttonEle.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      // 点击后全屏显示
      const classes = ['.fullscreen-container', '.fullscreen', '.devui-btn', '.icon-frame-contract'];
      expect(domHelper.judgeStyleClasses(classes)).toBeTruthy();
      expect(document.fullscreenElement !== null).toBe(false);
      buttonEle.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      expect(debugEl.query(By.css('.fullscreen'))).toBeNull();
      expect(document.fullscreenElement !== null).toBe(false);
    });

    it('should exit full-screen when the `Esc` button is clicked', () => {
      const launchFullscreenButton = debugEl.query(By.css('.fullscreen-button')).nativeElement;
      launchFullscreenButton.click();
      fixture.detectChanges();

      const classes = ['.fullscreen-container', '.fullscreen', '.devui-btn', '.icon-frame-contract'];
      expect(component.fullscreen['isFullscreen']).toEqual(true);
      expect(domHelper.judgeStyleClasses(classes)).toBeTruthy();

      document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: ESC_KEYCODE }));

      expect(component.fullscreen['isFullscreen']).toEqual(false);
      expect(debugEl.query(By.css('.fullscreen'))).toBeNull();
    });
  });
  describe('fullscreen immersive mode', () => {
    beforeEach(() => {
      component.fullscreenMode = 'immersive';
      fixture.detectChanges();
    });
    it('Fullscreen normal should create correctly', () => {
      const classes = ['.fullscreen-container', '.fullscreen-button', '.devui-btn', '.icon-frame-expand'];
      expect(domHelper.judgeStyleClasses(classes)).toBeTruthy();
    });

    /* 初始状态不显示 */
    it('Fullscreen should not display at original state ', () => {
      expect(debugEl.query(By.css('.fullscreen'))).toBeNull();
      expect(document.fullscreenElement !== null).toBe(false);
    });

    // fullscreen无法自动触发浏览器原生全屏，该用例无法测试
    xit('Click can immersive full-screen display content', fakeAsync(() => {
      fixture.detectChanges();
      const buttonEle = debugEl.query(By.css('.fullscreen-button'));
      buttonEle.triggerEventHandler('click', {}); // 未生效
      // buttonEle.nativeElement.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      // 点击后全屏显示
      const classes = ['.fullscreen-container', '.fullscreen', '.icon-frame-contract'];
      expect(domHelper.judgeStyleClasses(classes)).toBeTruthy();
      expect(document.fullscreenElement !== null).toBe(false);
      buttonEle.triggerEventHandler('click', {});
      fixture.detectChanges();
      expect(debugEl.query(By.css('.fullscreen'))).toBeNull();
      const closeClasses = ['.fullscreen-container', '.icon-frame-expand'];
      expect(domHelper.judgeStyleClasses(closeClasses)).toBeTruthy();
      expect(document.fullscreenElement !== null).toBe(false);
    }));
  });
});
