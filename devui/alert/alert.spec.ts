import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AlertComponent } from './alert.component';
import { AlertModule } from './alert.module';
@Component({
  template: `
  <d-alert [type]="type" [showIcon]= "showIcon" (closeEvent)="handleClose($event)" [cssClass]="cssClass">
    <span>成功。devcloud一站式云端DevOps平台。</span>
  </d-alert>
  `
})
class TestAlertComponent {
  type = 'success';
  clickCount = 0;
  showIcon = true;
  cssClass = '';
  handleClose($event) {
    this.clickCount++;
  }
}

@Component({
  template: `
  <d-alert [type]="'success'" [closeable]="false" [dismissTime]="3000">
    success
  </d-alert>
  `
})
class TestAlertDissmissTimeComponent {

}
describe('alert', () => {
  describe('alert basic', () => {
    let testComponent: TestAlertComponent;
    let alertElement: HTMLElement;
    let fixture: ComponentFixture<TestAlertComponent>;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AlertModule],
        declarations: [TestAlertComponent],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TestAlertComponent);
      testComponent = fixture.componentInstance;
      alertElement = fixture.debugElement.query(By.directive(AlertComponent)).nativeElement;
      fixture.detectChanges();
    });
    describe('Alert demo has created successfully', () => {
      it('Alert should create alert testComponent', () => {
        expect(testComponent).toBeTruthy();
      });

      it('Alert should create alert container ', () => {
        expect(alertElement).toBeTruthy();
      });

      it('Alert should have content', () => {
        expect(alertElement.querySelector('.devui-alert').textContent).toBe('成功。devcloud一站式云端DevOps平台。');
      });
    });
    describe('alert type', () => {
      it('Alert should has success type', () => {
        expect(alertElement.querySelector('.devui-icon-success')).not.toBe(null);
      });

      it('Alert should has danger type', () => {
        testComponent.type = 'danger';
        fixture.detectChanges();
        expect(alertElement.querySelector('.devui-icon-error')).not.toBe(null);
      });

      it('Alert should has warning type', () => {
        testComponent.type = 'warning';
        fixture.detectChanges();
        expect(alertElement.querySelector('.devui-icon-warning')).not.toBe(null);
      });

      it('Alert should has info type', () => {
        testComponent.type = 'info';
        fixture.detectChanges();
        expect(alertElement.querySelector('.devui-icon-info')).not.toBe(null);
      });
    });

    describe('alert cssClass', () => {
      it('Alert should append cssClass', () => {
        testComponent.cssClass = 'cssClass';
        fixture.detectChanges();
        expect(alertElement.querySelector('.devui-alert').classList).toContain('cssClass');
      });
    });

    describe('alert icon', () => {
      it('Alert should show icon ', () => {
        expect(alertElement.querySelector('.devui-alert-icon')).not.toBe(null);
      });

      it('Alert should not show icon ', () => {
        testComponent.showIcon = false;
        fixture.detectChanges();
        expect(alertElement.querySelector('.devui-alert-icon')).toBe(null);
      });
    });

    describe('alert close', () => {
      it('Alert should close', () => {
        const closeButton = alertElement.querySelector('.devui-close');
        closeButton.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(alertElement.querySelector('.devui-alert')).toBe(null);
      });

      it('Alert should activate closeEvent', () => {
        const closeButton = alertElement.querySelector('.devui-close');
        closeButton.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(testComponent.clickCount).toBe(1);
      });
    });

  });

  describe('alert dissmiss', () => {
    let testComponent: TestAlertDissmissTimeComponent;
    let alertElement: HTMLElement;
    let fixture: ComponentFixture<TestAlertDissmissTimeComponent>;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AlertModule],
        declarations: [TestAlertDissmissTimeComponent]
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TestAlertDissmissTimeComponent);
      testComponent = fixture.componentInstance;
      alertElement = fixture.debugElement.query(By.directive(AlertComponent)).nativeElement;
    });
    describe('Alert demo has created successfully', () => {
      it('Alert should create alert testComponent', () => {
        expect(testComponent).toBeTruthy();
      });

      it('Alert should create alert container ', () => {
        expect(alertElement).toBeTruthy();
      });

      it('Alert should have content', () => {
        fixture.detectChanges();
        expect(alertElement.querySelector('.devui-alert').textContent).toBe(' success ');
      });
    });
    describe('alert dismiss', () => {
      it('Alert should not dismiss before 3000ms', fakeAsync(() => {
        fixture.detectChanges();
        tick(2500);
        fixture.detectChanges();
        expect(alertElement.querySelector('.devui-alert')).not.toBe(null);
        tick(500);
        fixture.detectChanges();
      }));

      it('Alert should dismiss in 3000ms', fakeAsync(() => {
        fixture.detectChanges();
        tick(3000);
        fixture.detectChanges();
        expect(alertElement.querySelector('.devui-alert')).toBe(null);
      }));
    });
  });
});
