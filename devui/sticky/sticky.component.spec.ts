import { CommonModule } from '@angular/common';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ButtonModule } from '../button';
import { StickyComponent } from './sticky.component';
import { StickyModule } from './sticky.module';

@Component({
    template: `
    <div class="container" #scrollTarget>
      <div class="section-block">
        <d-sticky
          [view]="stickyView"
          [container]="scrollTarget"
          [zIndex]="zIndex"
          [scrollTarget]="scrollTarget"
          (statusChange)="onStatusChange($event)"
        >
          <div class="tip-content">Set sticky content here.</div>
        </d-sticky>
      </div>
      <div class="main-content">
        <div class="section-block">
          <h3>基本信息</h3>
          这里显示基本信息。
          <div class="tips">
            <d-sticky [view]="stickyView" [scrollTarget]="scrollTarget">
              <div class="tip-content">
                <h4>小贴士</h4>
                滚动页面的时候，sticky会随着滚动。
              </div>
            </d-sticky>
          </div>
        </div>
        <div class="section-block">
          <h3>需求列表</h3>
          这里显示需求列表。
          <div class="tips">
            <d-sticky [view]="stickyView" [scrollTarget]="scrollTarget">
              <div class="tip-content">
                <h4>小贴士</h4>
                段落滚动到的时候，sticky会跟着被托走。
              </div>
            </d-sticky>
          </div>
        </div>
      </div>
    </div>
  `,
    styleUrls: ['./demo/scroll-target/scroll-target.component.scss'],
    standalone: false
})
class TestStickyComponent {
  zIndex = 1000;

  stickyView = {
    top: 10,
    bottom: 0,
  };

  @ViewChild('scrollTarget') scrollTarget;

  onStatusChange(status) {}
}

@Component({
    template: `
    <div class="container">
      <div class="section-block">
        <d-sticky [view]="stickyView" [zIndex]="1000">
          <div class="tip-content">全局文本，需要更改容器为滚动条所在容器。出现后，可以一直贴着屏幕顶部。</div>
        </d-sticky>
      </div>
      <div class="main-content">
        <div class="section-block">
          <h3>基本信息</h3>
          这里显示基本信息。
          <div class="tips">
            <d-sticky [view]="stickyView">
              <div class="tip-content">
                <h4>小贴士</h4>
                滚动页面的时候，sticky会随着滚动。
              </div>
            </d-sticky>
          </div>
        </div>
        <div class="section-block">
          <h3>需求列表</h3>
          这里显示需求列表。
          <div class="tips">
            <d-sticky [view]="stickyView">
              <div class="tip-content">
                <h4>小贴士</h4>
                段落滚动到的时候，sticky会跟着被托走。
              </div>
            </d-sticky>
          </div>
        </div>
      </div>
    </div>
  `,
    styleUrls: ['./demo/basic/basic.component.scss'],
    standalone: false
})
class TestStickyWindowComponent {
  stickyView = {
    top: 60,
    bottom: 0,
  };
}

describe('sticky', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, StickyModule, ButtonModule],
      declarations: [TestStickyComponent, TestStickyWindowComponent],
    });
  });

  describe('basic', () => {
    let component: TestStickyComponent;
    let stickyElement: DebugElement;
    let stickyNativeElement: HTMLElement;
    let smallStickyElement: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestStickyComponent);
      component = fixture.debugElement.componentInstance;
      stickyElement = fixture.debugElement.query(By.directive(StickyComponent));
      stickyNativeElement = stickyElement.nativeElement;
      smallStickyElement = fixture.debugElement.queryAll(By.directive(StickyComponent))[1].nativeElement;
      fixture.detectChanges();
    });

    it('should created successfully', () => {
      expect(component).toBeTruthy();
      expect(stickyElement).toBeTruthy();
    });

    it('should ng-content set correctly', () => {
      const text = 'Set sticky content here.';
      expect(stickyNativeElement.querySelector('div').textContent).toEqual(text);
    });

    it('should set scrollTarget successfully', () => {
      expect(component.scrollTarget.nativeElement.classList[0]).toEqual('container');
    });

    it('should sticky have default position relative', () => {
      expect(stickyElement.nativeElement.style.position).toEqual('relative');
    });

    it('should zIndex be set correctly', () => {
      expect(stickyNativeElement.querySelector('div').style.zIndex).toEqual('1000');
      component.zIndex = 900;
      fixture.detectChanges();
      expect(stickyNativeElement.querySelector('div').style.zIndex).toEqual('900');
    });

    it('should sticky position change to fixed when scroll', fakeAsync(() => {
      stickyNativeElement.dispatchEvent(new Event('scroll', { bubbles: true, cancelable: false }));
      fixture.detectChanges();
      tick(100);
      expect(stickyNativeElement.querySelector('div').style.position).toEqual('fixed');
    }));

    it('test fixed status', fakeAsync(() => {
      stickyNativeElement.dispatchEvent(new Event('scroll', { bubbles: true, cancelable: false }));
      fixture.detectChanges();
      tick(100);
      stickyNativeElement.dispatchEvent(new Event('scroll', { bubbles: true, cancelable: false }));
      fixture.detectChanges();
      tick(100);
      expect(stickyNativeElement.querySelector('div').style.position).toEqual('fixed');
    }));

    it('should emit status when status changed', fakeAsync(() => {
      spyOn(component, 'onStatusChange');
      stickyNativeElement.dispatchEvent(new Event('scroll', { bubbles: true, cancelable: false }));
      fixture.detectChanges();
      tick(100);
      expect(component.onStatusChange).toHaveBeenCalled();
    }));
    // TODO: 补充测试status为remain的情况
  });

  describe('window scroll target', () => {
    let component: TestStickyWindowComponent;
    let stickyElement: DebugElement;
    let stickyNativeElement: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestStickyWindowComponent);
      component = fixture.debugElement.componentInstance;
      stickyElement = fixture.debugElement.query(By.directive(StickyComponent));
      stickyNativeElement = stickyElement.nativeElement;
      fixture.detectChanges();
    });

    it('should created successfully', () => {
      expect(component).toBeTruthy();
      expect(stickyElement).toBeTruthy();
    });
  });
});
