import { ComponentFixture, TestBed, tick, fakeAsync, flush } from '@angular/core/testing';
import { DebugElement, Component, ViewChild } from '@angular/core';
import { CheckBoxComponent } from './checkbox.component';
import { DomHelper } from '../utils/testing/dom-helper';
import { By } from '@angular/platform-browser';
import { CheckBoxModule } from './checkbox.module';
import { FormsModule } from '@angular/forms';

@Component({
  template: `
  <d-checkbox-group
      [(ngModel)]="values"
      [name]="'City'"
      [options]="options"
      [direction]="'row'"
      [isShowTitle]="true"
    >
  </d-checkbox-group>
  `,
})
class TestCheckBoxGroupComponent {
  options = ['data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7'];
  values = [];

  constructor() {}
}

@Component({
  template: `
  <d-checkbox-group
      [(ngModel)]="values"
      [name]="'City'"
      [options]="options"
      [direction]="'row'"
      [isShowTitle]="true"
      [filterKey]="'name'"
    >
  </d-checkbox-group>
  `,
})
class TestCheckBoxGroupObjComponent {
  options = [
    { name: 'data1', disabled: 'true', value: 1, id: 1 },
    { name: 'data2', value: 2, id: 2 },
    { name: 'data3', value: 3, id: 3 },
  ];
  values = [{ name: 'data2', value: 2, id: 2 }];

  constructor() {}
}

describe('checkbox-group', () => {
  let fixture: ComponentFixture<TestCheckBoxGroupComponent | TestCheckBoxGroupObjComponent>;
  let debugEl: DebugElement;
  let testComponent: TestCheckBoxGroupComponent;
  let domHelper: DomHelper<TestCheckBoxGroupComponent | TestCheckBoxGroupObjComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CheckBoxModule, FormsModule],
      declarations: [TestCheckBoxGroupComponent, TestCheckBoxGroupObjComponent],
    });
  });
  describe('basic', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TestCheckBoxGroupComponent);
      fixture.detectChanges();
      debugEl = fixture.debugElement;
      testComponent = debugEl.componentInstance;

      domHelper = new DomHelper(fixture);
    });

    it('should have correct classes', () => {
      const classList = [
        '.devui-checkbox', '.devui-checkbox-input', '.devui-checkbox-material', '.devui-checkbox-tick', '.devui-checkbox-group',
      ];
      expect(domHelper.judgeStyleClasses(classList)).toBeTruthy();
    });

    it('should click can change checked status', fakeAsync(() => {
      fixture.detectChanges();
      const labelDatas = debugEl.queryAll(By.css('label'));

      labelDatas[0].nativeElement.click();

      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.values).toContain('data1');

      labelDatas[0].nativeElement.click();

      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.values).not.toContain('data1');
    }));
  });

  describe('object option', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TestCheckBoxGroupObjComponent);
      fixture.detectChanges();
      debugEl = fixture.debugElement;
      testComponent = debugEl.componentInstance;

      domHelper = new DomHelper(fixture);
    });

    it('should created success', () => {
      expect(testComponent).toBeTruthy();
    });

    it('should have correct classes', () => {
      const classList = [
        '.devui-checkbox', '.devui-checkbox-input', '.devui-checkbox-material', '.devui-checkbox-tick', '.devui-checkbox-group',
      ];
      expect(domHelper.judgeStyleClasses(classList)).toBeTruthy();
    });
  });
});
