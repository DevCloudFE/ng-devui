import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

import { PanelModule } from './panel.module';
import { PanelComponent } from './panel.component';

@Component({
  template: `
  <d-panel #panel [type]="type" [cssClass]="cssClass" [isCollapsed]="isCollapsed" (toggle)="togglePanel($event)">
    <d-panel-header>Panel with header and footer</d-panel-header>
    <d-panel-body>This is body</d-panel-body>
    <d-panel-footer>This is footer</d-panel-footer>
  </d-panel>
  `
})
class TestPanelComponent {
  type = 'primary';
  cssClass = '';
  isCollapsed = true;
  panelState: any;
  togglePanel($event) {
    this.panelState = $event;
  }
}

describe('panel', () => {
  describe('panel basic', () => {
    let testComponent: TestPanelComponent;
    let panelElement: HTMLElement;
    let fixture: ComponentFixture<TestPanelComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PanelModule],
        declarations: [TestPanelComponent]
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TestPanelComponent);
      testComponent = fixture.componentInstance;
      panelElement = fixture.debugElement.query(By.directive(PanelComponent)).nativeElement;
      fixture.detectChanges();
    });

    describe('Panel demo has created successfully', () => {
      it('Panel should create panel testComponent', () => {
        expect(testComponent).toBeTruthy();
      });

      it('Panel should create panel container', () => {
        expect(panelElement).toBeTruthy();
      });

      it('Panel should have content', () => {
        expect(panelElement.querySelector('d-panel-header').textContent).toBe('Panel with header and footer');
        expect(panelElement.querySelector('.devui-panel-body').textContent).toBe('This is body');
        expect(panelElement.querySelector('.devui-panel-footer').textContent).toBe('This is footer');
      });
    });

    describe('panel type', () => {
      it('Panel should has primary type', () => {
        expect(panelElement.querySelector('.devui-panel-primary')).not.toBe(null);
      });

      it('Panel should has success type', () => {
        testComponent.type = 'success';
        fixture.detectChanges();
        expect(panelElement.querySelector('.devui-panel-success')).not.toBe(null);
      });

      it('Panel should has danger type', () => {
        testComponent.type = 'danger';
        fixture.detectChanges();
        expect(panelElement.querySelector('.devui-panel-danger')).not.toBe(null);
      });

      it('Panel should has warning type', () => {
        testComponent.type = 'warning';
        fixture.detectChanges();
        expect(panelElement.querySelector('.devui-panel-warning')).not.toBe(null);
      });

      it('Panel should has info type', () => {
        testComponent.type = 'info';
        fixture.detectChanges();
        expect(panelElement.querySelector('.devui-panel-info')).not.toBe(null);
      });
    });

    describe('panel cssClass', () => {
      it('Panel should append cssClass', () => {
        testComponent.cssClass = 'cssClass';
        fixture.detectChanges();
        expect(panelElement.querySelector('.devui-panel').classList).toContain('cssClass');
      });
    });

    describe('panel isCollapsed', () => {
      it('Panel should close', () => {
        const closeElement = panelElement.querySelector('.devui-panel-heading');
        closeElement.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(panelElement.querySelector('.devui-panel-body')).toEqual(null);
      });

      it('Panel should activate closeEvent', () => {
        const closeElement = panelElement.querySelector('.devui-panel-heading');
        closeElement.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(testComponent.panelState).toBe(false);
      });

      it('isCollapsed could be undefined', () => {
        testComponent.isCollapsed = undefined;
        fixture.detectChanges();

        const closeElement = panelElement.querySelector('.devui-panel-heading');
        closeElement.dispatchEvent(new Event('click'));
        fixture.detectChanges();

        expect(panelElement.querySelector('.devui-panel-body')).not.toEqual(null);
      });
    });
  });
});
