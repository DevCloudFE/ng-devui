import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FullscreenModule } from './fullscreen.module';
import { ButtonModule } from '../button/button.module';
import { By } from '@angular/platform-browser';
import { DomHelper } from '../utils/testing/dom-helper';
import { FullscreenComponent } from './fullscreen.component';
@Component({
  template: `
    <d-fullscreen
        #fullscreen
        [mode]="fullcreenMode"
        (fullscreenLaunch)="launchFullscreen($event)"
        [zIndex]="100">
      <div fullscreen-target>
        <d-button fullscreen-launch class="fullscreen-button" [icon]="btnIcon" bsStyle="text-dark"> </d-button>
      </div>
    </d-fullscreen>
  `
})
class TestFullscreenComponent {
  @ViewChild('fullscreen') fullscreen: FullscreenComponent;
  fullcreenMode = 'normal';
  btnIcon = 'icon-frame-expand';

  launchFullscreen({isFullscreen}) {
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
      declarations: [TestFullscreenComponent]
    });
    fixture = TestBed.createComponent(TestFullscreenComponent);
    domHelper = new DomHelper(fixture);
    debugEl = fixture.debugElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('fullscreen normal mode', () => {
    it('Fullscreen should display correctly', () => {
      const classes = [
        '.fullscreen-container',
        '.fullscreen-button',
        '.devui-btn',
        '.icon-frame-expand'
      ];
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
      const classes = [
        '.fullscreen-container',
        '.fullscreen',
        '.devui-btn',
        '.icon-frame-contract'
      ];
      expect(domHelper.judgeStyleClasses(classes)).toBeTruthy();
      expect(document.fullscreenElement !== null).toBe(false);
      buttonEle.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      expect(debugEl.query(By.css('.fullscreen'))).toBeNull();
      expect(document.fullscreenElement !== null).toBe(false);
    });
  });
  describe('fullscreen immersive mode', () => {
    beforeEach(() => {
      component.fullcreenMode = 'immersive';
      fixture.detectChanges();
    });
    it('Fullscreen normal should create correctly', () => {
      const classes = [
        '.fullscreen-container',
        '.fullscreen-button',
        '.devui-btn',
        '.icon-frame-expand'
      ];
      expect(domHelper.judgeStyleClasses(classes)).toBeTruthy();
    });

    /* 初始状态不显示 */
    it('Fullscreen should not display at original state ', () => {
      expect(debugEl.query(By.css('.fullscreen'))).toBeNull();
      expect(document.fullscreenElement !== null).toBe(false);
    });

    // TODO: fullscreen无法触发浏览器原生全屏，待解决
  });
});
