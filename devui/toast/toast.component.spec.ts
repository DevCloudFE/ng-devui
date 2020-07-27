import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';

import { ToastModule } from './toast.module';
import { ToastComponent } from './toast.component';

@Component({
  template: `
    <d-toast [sticky]="sticky" [life]="life" [value]="msgs" [style]="style" [styleClass]="styleClass"></d-toast>
  `
})
class TestToastComponent {
  msgs = [];
  sticky = false;
  life = null;
  style = '';
  styleClass = '';
}

describe('toast', () => {
  describe('toast basic', () => {
    let testComponent: TestToastComponent;
    let toastElement: DebugElement;
    let fixture: ComponentFixture<TestToastComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ToastModule],
        declarations: [TestToastComponent]
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TestToastComponent);
      testComponent = fixture.componentInstance;
      toastElement = fixture.debugElement.query(By.directive(ToastComponent));
      fixture.detectChanges();
    });

    describe('toast severity', () => {
      it('Toast should has common severity', fakeAsync(() => {
        testComponent.msgs = [{ severity: 'common', summary: 'common', detail: 'common content' }];
        fixture.detectChanges();
        expect(toastElement.query(By.css('.devui-toast-title')).nativeElement.textContent).toBe('common');
        expect(toastElement.query(By.css('.devui-toast-message>p')).nativeElement.textContent).toBe('common content');
        expect(toastElement.query(By.css('div.devui-toast-message-common'))).toBeTruthy();
        expect(toastElement.query(By.css('span.devui-toast-image'))).toBeNull();
        tick();
        fixture.detectChanges();
        const containerElement = toastElement.query(By.css('.devui-toast-item-container')).nativeElement;
        expect(getComputedStyle(containerElement).getPropertyValue('left')).toBe('0px');
        tick(5300);
        fixture.detectChanges();
        expect(toastElement.query(By.css('.devui-toast-item-container'))).toBeNull();
        flush();
      }));

      it('Toast should has success severity', fakeAsync(() => {
        testComponent.msgs = [{ severity: 'success', summary: 'success', detail: 'success content' }];
        fixture.detectChanges();
        expect(toastElement.query(By.css('.devui-toast-title')).nativeElement.textContent).toBe('success');
        expect(toastElement.query(By.css('.devui-toast-message>p')).nativeElement.textContent).toBe('success content');
        expect(toastElement.query(By.css('div.devui-toast-message-success'))).toBeTruthy();
        expect(toastElement.query(By.css('span.devui-toast-image-success'))).toBeTruthy();
        tick();
        fixture.detectChanges();
        const containerElement = toastElement.query(By.css('.devui-toast-item-container')).nativeElement;
        expect(getComputedStyle(containerElement).getPropertyValue('left')).toBe('0px');
        tick(5000);
        fixture.detectChanges();
        expect(toastElement.query(By.css('.devui-toast-item-container'))).toBeTruthy();
        tick(300);
        fixture.detectChanges();
        expect(toastElement.query(By.css('.devui-toast-item-container'))).toBeNull();
        flush();
      }));

      it('Toast should has error severity', fakeAsync(() => {
        testComponent.msgs = [{ severity: 'error', summary: 'error', detail: 'error content' }];
        fixture.detectChanges();
        expect(toastElement.query(By.css('.devui-toast-title')).nativeElement.textContent).toBe('error');
        expect(toastElement.query(By.css('.devui-toast-message>p')).nativeElement.textContent).toBe('error content');
        expect(toastElement.query(By.css('div.devui-toast-message-error'))).toBeTruthy();
        expect(toastElement.query(By.css('span.devui-toast-image-error'))).toBeTruthy();
        tick();
        fixture.detectChanges();
        const containerElement = toastElement.query(By.css('.devui-toast-item-container')).nativeElement;
        expect(getComputedStyle(containerElement).getPropertyValue('left')).toBe('0px');
        tick(10000);
        fixture.detectChanges();
        expect(toastElement.query(By.css('.devui-toast-item-container'))).toBeTruthy();
        tick(300);
        fixture.detectChanges();
        expect(toastElement.query(By.css('.devui-toast-item-container'))).toBeNull();
        flush();
      }));

      it('Toast should has warn severity', fakeAsync(() => {
        testComponent.msgs = [{ severity: 'warn', summary: 'warn', detail: 'warn content' }];
        fixture.detectChanges();
        expect(toastElement.query(By.css('.devui-toast-title')).nativeElement.textContent).toBe('warn');
        expect(toastElement.query(By.css('.devui-toast-message>p')).nativeElement.textContent).toBe('warn content');
        expect(toastElement.query(By.css('div.devui-toast-message-warn'))).toBeTruthy();
        expect(toastElement.query(By.css('span.devui-toast-image-warning'))).toBeTruthy();
        tick();
        fixture.detectChanges();
        const containerElement = toastElement.query(By.css('.devui-toast-item-container')).nativeElement;
        expect(getComputedStyle(containerElement).getPropertyValue('left')).toBe('0px');
        tick(10000);
        fixture.detectChanges();
        expect(toastElement.query(By.css('.devui-toast-item-container'))).toBeTruthy();
        tick(300);
        fixture.detectChanges();
        expect(toastElement.query(By.css('.devui-toast-item-container'))).toBeNull();
        flush();
      }));

      it('Toast should has info severity', fakeAsync(() => {
        testComponent.msgs = [{ severity: 'info', summary: 'info', detail: 'info content' }];
        fixture.detectChanges();
        expect(toastElement.query(By.css('.devui-toast-title')).nativeElement.textContent).toBe('info');
        expect(toastElement.query(By.css('.devui-toast-message>p')).nativeElement.textContent).toBe('info content');
        expect(toastElement.query(By.css('div.devui-toast-message-info'))).toBeTruthy();
        expect(toastElement.query(By.css('span.devui-toast-image-info'))).toBeTruthy();
        tick();
        fixture.detectChanges();
        const containerElement = toastElement.query(By.css('.devui-toast-item-container')).nativeElement;
        expect(getComputedStyle(containerElement).getPropertyValue('left')).toBe('0px');
        tick(5000);
        fixture.detectChanges();
        expect(toastElement.query(By.css('.devui-toast-item-container'))).toBeTruthy();
        tick(300);
        fixture.detectChanges();
        expect(toastElement.query(By.css('.devui-toast-item-container'))).toBeNull();
        flush();
      }));
    });

    describe('toast title、sticky and life', () => {
      it('has life, no title, no close button', fakeAsync(() => {
        testComponent.life = 3000;
        testComponent.msgs = [{ severity: 'info', detail: 'no title content' }];
        fixture.detectChanges();
        expect(toastElement.query(By.css('.devui-toast-title'))).toBeNull();
        expect(toastElement.query(By.css('.devui-toast-icon-close'))).toBeNull();
        expect(toastElement.query(By.css('.devui-toast-message>p')).nativeElement.textContent).toBe('no title content');
        tick();
        fixture.detectChanges();
        const boxElement = toastElement.query(By.css('.devui-toast-item-container')).nativeElement;
        expect(getComputedStyle(boxElement).getPropertyValue('left')).toBe('0px');
        tick(3000);
        fixture.detectChanges();
        expect(toastElement.query(By.css('.devui-toast-item-container'))).toBeTruthy();
        tick(300);
        fixture.detectChanges();
        expect(toastElement.query(By.css('.devui-toast-item-container'))).toBeNull();
        flush();
      }));

      it('has life and sticky, not dismiss, should close', fakeAsync(() => {
        testComponent.life = 6000;
        testComponent.sticky = true;
        testComponent.msgs = [{ severity: 'info', summary: 'info', detail: 'info content' }];
        fixture.detectChanges();
        expect(toastElement.query(By.css('.devui-toast-title')).nativeElement.textContent).toBe('info');
        expect(toastElement.query(By.css('.devui-toast-message>p')).nativeElement.textContent).toBe('info content');
        expect(toastElement.query(By.css('div.devui-toast-message-info'))).toBeTruthy();
        expect(toastElement.query(By.css('span.devui-toast-image-info'))).toBeTruthy();
        const closeButton = toastElement.query(By.css('.devui-toast-icon-close')).nativeElement;
        expect(closeButton).toBeTruthy();
        tick();
        fixture.detectChanges();
        const containerElement = toastElement.query(By.css('.devui-toast-item-container')).nativeElement;
        expect(getComputedStyle(containerElement).getPropertyValue('left')).toBe('0px');
        tick(10000);
        fixture.detectChanges();
        expect(toastElement.query(By.css('.devui-toast-item-container'))).toBeTruthy();
        closeButton.dispatchEvent(new Event('click'));
        tick(300);
        fixture.detectChanges();
        expect(toastElement.query(By.css('.devui-toast-item-container'))).toBeNull();
        flush();
      }));
    });

    describe('toast multiple', () => {
      it('mouse over, not dismiss. mouse out, dismiss', fakeAsync(() => {
        testComponent.life = 5000;
        testComponent.sticky = false;
        testComponent.msgs = [
          { severity: 'info', summary: 'info', detail: 'info content' },
          { severity: 'success', summary: 'success', detail: 'success content' }
        ];
        fixture.detectChanges();
        const infoElement = toastElement.query(By.css('div.devui-toast-message-info')).nativeElement;
        const successElement = toastElement.query(By.css('div.devui-toast-message-success')).nativeElement;
        expect(infoElement).toBeTruthy();
        expect(successElement).toBeTruthy();
        tick();
        fixture.detectChanges();
        infoElement.dispatchEvent(new Event('mouseenter'));
        fixture.detectChanges();
        tick(6000);
        fixture.detectChanges();
        expect(infoElement).toBeTruthy();
        expect(getComputedStyle(successElement).getPropertyValue('left')).toBe('360px');
        infoElement.dispatchEvent(new Event('mouseleave'));
        flush();
        fixture.detectChanges();
        expect(toastElement.query(By.css('.devui-toast-item-container'))).toBeNull();
      }));
    });
  });
});
