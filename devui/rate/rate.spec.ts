import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RateComponent } from './rate.component';
import { RateModule } from './rate.module';
@Component({
    template: `
    <d-rate [(ngModel)]="value" [icon]="'icon-star-o'"></d-rate>
    <div>当前有{{ value }}颗星</div>
  `,
    standalone: false
})
class TestRateComponent {
  value = 2;
}

@Component({
    template: `
    <d-rate [(ngModel)]="value" [icon]="'icon-star-o'" [read]="true"></d-rate>
  `,
    standalone: false
})
class TestRateReadOnlyComponent {
  value = 2.5;
}

describe('rate', () => {

  describe('rate basic', () => {
    let testComponent: TestRateComponent;
    let rateElement: HTMLElement;
    let fixture: ComponentFixture<TestRateComponent>;
    let debugEle: DebugElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RateModule, FormsModule],
        declarations: [TestRateComponent]
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TestRateComponent);
      testComponent = fixture.componentInstance;
      debugEle = fixture.debugElement;
      rateElement = debugEle.query(By.directive(RateComponent)).nativeElement;
      fixture.detectChanges();
    });

    describe('Rate demo has created successfully', () => {

      it('Rate should create alert testComponent', () => {
        expect(testComponent).toBeTruthy();
      });

      it('Rate should create alert container ', () => {
        expect(rateElement).toBeTruthy();
      });

      it('Rate should have content', () => {
        expect(rateElement.querySelector('.devui-star-container')).not.toBe(null);
      });

      it('Rate can be changed', () => {
        const eleList = debugEle.queryAll(By.css('.devui-star-align'));
        const firstStarEle = eleList[0].nativeElement;
        const thirdStarEle = eleList[2].nativeElement;
        const fourthStarEle = eleList[3].nativeElement;

        testComponent.value = 0;
        fixture.detectChanges();
        fourthStarEle.dispatchEvent(new Event('mouseover'));
        fixture.detectChanges();
        expect(fourthStarEle.querySelector('.devui-star-color-active').getAttribute('style')).toBe('width: 100%;');
        expect(testComponent.value).toBe(0);

        rateElement.querySelector('.devui-star-container').dispatchEvent(new Event('mouseleave'));
        fixture.detectChanges();
        expect(fourthStarEle.querySelector('.devui-star-color-active').getAttribute('style')).toBe('width: 0px;');
        expect(testComponent.value).toBe(0);

        firstStarEle.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(testComponent.value).toBe(1);

        thirdStarEle.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(testComponent.value).toBe(3);

        fourthStarEle.dispatchEvent(new Event('mouseover'));
        fixture.detectChanges();
        expect(fourthStarEle.querySelector('.devui-star-color-active').getAttribute('style')).toBe('width: 100%;');
        expect(testComponent.value).toBe(3);

        rateElement.querySelector('.devui-star-container').dispatchEvent(new Event('mouseleave'));
        fixture.detectChanges();
        expect(fourthStarEle.querySelector('.devui-star-color-active').getAttribute('style')).toBe('width: 0px;');
        expect(testComponent.value).toBe(3);
      });

    });
  });

  describe('read only', () => {
    let testComponent: TestRateReadOnlyComponent;
    let rateElement: HTMLElement;
    let debugEle: DebugElement;
    let fixture: ComponentFixture<TestRateComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RateModule, FormsModule],
        declarations: [TestRateReadOnlyComponent]
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TestRateReadOnlyComponent);
      testComponent = fixture.componentInstance;
      debugEle = fixture.debugElement;
      rateElement = debugEle.query(By.directive(RateComponent)).nativeElement;
      fixture.detectChanges();
    });

    describe('Rate demo has created successfully', () => {

      it('Rate should create alert testComponent', () => {
        expect(testComponent).toBeTruthy();
      });

      it('Rate should create alert container ', () => {
        expect(rateElement).toBeTruthy();
      });

      it('Rate should have content', () => {
        expect(rateElement.querySelector('.devui-star-container')).not.toBe(null);
      });

      it('Rate should not be changed', () => {
        const eleList = debugEle.queryAll(By.css('.devui-star-align'));
        const firstStarEle = eleList[0].nativeElement;
        const thirdStarEle = eleList[2].nativeElement;
        const fourthStarEle = eleList[3].nativeElement;

        firstStarEle.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(testComponent.value).toBe(2.5);

        thirdStarEle.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(testComponent.value).toBe(2.5);

        fourthStarEle.dispatchEvent(new Event('mouseover'));
        fixture.detectChanges();
        expect(fourthStarEle.querySelector('.devui-star-color-active').getAttribute('style')).toBe('width: 0px;');
        expect(testComponent.value).toBe(2.5);
      });
    });
  });
});
