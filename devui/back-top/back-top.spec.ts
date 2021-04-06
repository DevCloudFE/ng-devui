import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BackTopModule } from 'ng-devui/back-top';
import { BackTopComponent } from './back-top.component';
@Component({
  template: `
    <div class="container"></div>
    <d-back-top #basicBackTop [bottom]="bottom" [right]="right" [visibleHeight]="visibleHeight"></d-back-top>
  `,
  styles: [
    `.container {
      height: 1500px;
      width: 300px;
    }`
  ]
})
class TestBackTopComponent {
  @ViewChild('basicBackTop') basicBackTop: BackTopComponent;
  bottom = '50px';
  right = '30px';
  visibleHeight = 300;
}

@Component({
  template: `
  <div class="scroll-container">
    <d-back-top #targetBackTop [scrollTarget]="target" [visibleHeight]="visibleHeight"></d-back-top>
    <div class="scroll-content">
      <div class="text"></div>
    </div>
  </div>
  `,
  styles: [
    `.scroll-container {
        width: 600px;
      }
      .scroll-content {
        width: 100%;
        height: 1500px;
        overflow: auto;
      }
      .text {
        height: 1900px;
      }
    `
  ]
})
class TestTargetBackTopComponent {
  @ViewChild('targetBackTop') targetBackTop: BackTopComponent;
  visibleHeight = 200;
  target: HTMLElement | null = null;
}

@Component({
  template: `
  <d-back-top [customTemplate]="customTemplate">
    <ng-template #customTemplate>
      <div class="devui-backtop-custom">
        <span class="icon-chevron-up"></span>
      </div>
    </ng-template>
  </d-back-top>
  `,
  styles: [
    `.devui-backtop-custom {
      text-align: center;
      border-radius: 50%;
      background-color: #859bff;
      width: 40px;
      height: 40px;
    }
    .icon-chevron-up {
      font-size: 16px;
      color: #ffffff;
      line-height: 40px;
    }
    `
  ]
})
class TestCustomBackTopComponent {
}

describe('back-top', () => {
  let fixture: ComponentFixture<any>;
  beforeEach(() => {
      TestBed.configureTestingModule({
          imports: [BackTopModule],
          declarations: [TestBackTopComponent, TestTargetBackTopComponent, TestCustomBackTopComponent]
      });
  });

  const triggerScroll = (target) => {
    target.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();
    tick(100);
    fixture.detectChanges();
  };

  describe('basic', () => {
    let component: TestBackTopComponent;
    let debugEl: DebugElement;
    let backTopBtn: HTMLElement;
    beforeEach((() => {
      fixture = TestBed.createComponent(TestBackTopComponent);
      debugEl = fixture.debugElement;
      component = debugEl.componentInstance;
      backTopBtn =  debugEl.query(By.css('.devui-backtop')).nativeElement;
      fixture.detectChanges();
    }));

    it('should create correctly', () => {
      expect(component).toBeTruthy();
      expect(backTopBtn).toBeTruthy();
    });
    it('should position be correct', () => {
      expect(backTopBtn.style.bottom).toBe('50px');
      expect(backTopBtn.style.right).toBe('30px');
      component.bottom = '75px';
      component.right = '75px';
      fixture.detectChanges();
      expect(backTopBtn.style.bottom).toBe('75px');
      expect(backTopBtn.style.right).toBe('75px');
    });

    describe('window', () => {
      describe('visibleHeight', () => {
        it('should button hide when scrollTop < visibleHeight', fakeAsync(() => {
          document.documentElement.scrollTop = component.visibleHeight - 100;
          fixture.detectChanges();
          triggerScroll(window);
          expect(backTopBtn.style.display).toBe('none');
        }));

        it('should button show when scrollTop = visibleHeight', fakeAsync(() => {
          document.documentElement.scrollTop = component.visibleHeight;
          fixture.detectChanges();
          triggerScroll(window);
          expect(backTopBtn.style.display).toBe('block');
        }));

        it('should button show when scrollTop > visibleHeight', fakeAsync(() => {
          document.documentElement.scrollTop = component.visibleHeight + 100;
          fixture.detectChanges();
          triggerScroll(window);
          expect(backTopBtn.style.display).toBe('block');
        }));
      });

      describe('click', () => {
        beforeEach(fakeAsync(() => {
          document.documentElement.scrollTop = component.visibleHeight + 100;
          fixture.detectChanges();
          triggerScroll(window);
        }));
        it(`when clicked`, fakeAsync(() => {
          component.basicBackTop.backTopEvent.subscribe((value: boolean) => {
            expect(value).toBe(true);
          });
          backTopBtn.dispatchEvent(new Event('click'));
        }));
      });
    });
  });

  describe('scrollTarget', () => {
    let debugEl: DebugElement;
    let component: TestTargetBackTopComponent;
    let backTopBtn: HTMLElement;
    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(TestTargetBackTopComponent);
      debugEl = fixture.debugElement;
      component = debugEl.componentInstance;
      backTopBtn =  debugEl.query(By.css('.devui-backtop')).nativeElement;
      component.target = debugEl.query(By.css('.scroll-content')).nativeElement;
      fixture.detectChanges();
    }));

    it('should create correctly', () => {
      expect(component).toBeTruthy();
      expect(backTopBtn).toBeTruthy();
    });

    describe('visibleHeight', () => {
      it('should button position be absolute', () => {
        expect(backTopBtn.style.position).toBe('absolute');
        expect(component.target.parentElement.style.position).toBe('relative');
      });

      it('should button show when element scroll exceed visibleHeight', fakeAsync(() => {
        component.target.scrollTop = component.visibleHeight + 100;
        fixture.detectChanges();
        triggerScroll(component.target);
        expect(backTopBtn.style.display).toBe('block');
      }));

      it('should button hide when window scroll', fakeAsync(() => {
        document.documentElement.scrollTop = component.visibleHeight + 100;
        fixture.detectChanges();
        triggerScroll(window);
        expect(backTopBtn.style.display).toBe('none');
      }));
    });
    describe('click', () => {
      beforeEach(fakeAsync(() => {
        component.target.scrollTop = component.visibleHeight + 100;
        fixture.detectChanges();
        triggerScroll(component.target);
      }));

      it(`when clicked`, fakeAsync(() => {
        component.targetBackTop.backTopEvent.subscribe((value: boolean) => {
          expect(value).toBe(true);
        });
        backTopBtn.dispatchEvent(new Event('click'));
      }));
    });
  });

  describe('customTemplate', () => {
    let debugEl: DebugElement;
    let component: TestCustomBackTopComponent;
    beforeEach((() => {
      fixture = TestBed.createComponent(TestCustomBackTopComponent);
      debugEl = fixture.debugElement;
      component = debugEl.componentInstance;
      fixture.detectChanges();
    }));

    it('should create correctly', () => {
      expect(component).toBeTruthy();
      expect(debugEl.query(By.css('.devui-backtop-custom'))).toBeTruthy();
    });
  });
});
