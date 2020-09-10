import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

import { StatusModule } from './status.module';
import { StatusComponent } from './status.component';

@Component({
  template: `
  <d-status [type]="type"></d-status>
  `
})
class TestStatusComponent {
  type = 'success';
}

describe('status', () => {
  describe('status basic', () => {
    let testComponent: TestStatusComponent;
    let panelElement: HTMLElement;
    let fixture: ComponentFixture<TestStatusComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StatusModule],
        declarations: [TestStatusComponent]
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TestStatusComponent);
      testComponent = fixture.componentInstance;
      panelElement = fixture.debugElement.query(By.directive(StatusComponent)).nativeElement;
      fixture.detectChanges();
    });

    describe('Status demo has created successfully', () => {
      it('Status should create status testComponent', () => {
        expect(testComponent).toBeTruthy();
      });

      it('Status should create status container', () => {
        expect(panelElement).toBeTruthy();
      });
    });

    describe('status type', () => {
      it('Status should has success type', () => {
        expect(panelElement.querySelector('.devui-status-bg-success')).not.toBe(null);
      });

      it('Status should has error type', () => {
        testComponent.type = 'error';
        fixture.detectChanges();
        expect(panelElement.querySelector('.devui-status-bg-error')).not.toBe(null);
      });

      it('Status should has initial type', () => {
        testComponent.type = 'initial';
        fixture.detectChanges();
        expect(panelElement.querySelector('.devui-status-bg-initial')).not.toBe(null);
      });

      it('Status should has waiting type', () => {
        testComponent.type = 'waiting';
        fixture.detectChanges();
        expect(panelElement.querySelector('.devui-status-bg-waiting')).not.toBe(null);
      });

      it('Status should has running type', () => {
        testComponent.type = 'running';
        fixture.detectChanges();
        expect(panelElement.querySelector('.devui-status-bg-running')).not.toBe(null);
      });

      it('Status should has invalid type', () => {
        testComponent.type = 'invalid';
        fixture.detectChanges();
        expect(panelElement.querySelector('.devui-status-bg-invalid')).not.toBe(null);
      });
    });
  });
});
