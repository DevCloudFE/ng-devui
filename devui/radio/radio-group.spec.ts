import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { DomHelper } from '../utils/testing/dom-helper';
import { RadioGroupComponent } from './radio-group.component';
import { RadioComponent } from './radio.component';
import { RadioModule } from './radio.module';

@Component({
    template: `
    <d-radio-group
      [name]="'season'"
      [values]="values"
      [(ngModel)]="choose"
      (change)="mockChange($event)"
      [direction]="direction"
      [disabled]="isDisabled"
      [beforeChange]="beforeChange"
    >
    </d-radio-group>
  `,
    standalone: false
})
class TestRadioGroupComponent {
  values = ['Spring', 'Summer', 'Autumn', 'Winter'];
  choose = 'Spring';
  direction = 'column';
  isDisabled = false;
  beforeChange: (values: any[]) => any;
  constructor() {}

  mockChange = jasmine.createSpy('value change');
}

@Component({
    template: `
  <d-radio-group [direction]="'row'" [(ngModel)]="choose2" (change)="mockChange($event)">
    <d-radio [name]="'customized-city'" *ngFor="let value of values2" [value]="value"> The Radio value is: {{ value }} </d-radio>
  </d-radio-group>
  `,
    standalone: false
})
class TestRadioItemGroupComponent {
  values2 = ['Item1', 'Item2', 'Item3'];
  choose2 = 'Item3';

  mockChange = jasmine.createSpy('value change');
}

describe('radio-group', () => {
  let fixture: ComponentFixture<TestRadioGroupComponent | TestRadioItemGroupComponent>;
  let debugEl: DebugElement;
  let testComponent: TestRadioGroupComponent;
  let radios: DebugElement[];
  let domHelper: DomHelper<TestRadioGroupComponent | TestRadioItemGroupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RadioModule, FormsModule],
      declarations: [TestRadioGroupComponent, TestRadioItemGroupComponent],
      providers: [RadioGroupComponent],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestRadioGroupComponent);
    fixture.detectChanges();
    domHelper = new DomHelper(fixture);
    debugEl = fixture.debugElement;
    testComponent = debugEl.componentInstance;

    radios = fixture.debugElement.queryAll(By.css('.devui-radio'));
  });

  describe('basic', () => {
    it('should have been created', () => {
      expect(testComponent).toBeTruthy();
    });

    it('should have correct value number', () => {
      expect(radios.length).toEqual(4);
    });

    it('should have correct content', () => {
      expect(radios[0].nativeElement.textContent.trim()).toEqual(testComponent.values[0]);
    });

    it('should have correct className', fakeAsync(() => {
      const nativeEl: HTMLElement = debugEl.nativeElement;
      const radioClassList: string[] = [
        '.devui-radio-group',
        '.devui-radio',
        '.devui-radio-list-item',
        '.devui-radio-input',
        '.devui-radio-label',
      ];
      expect(domHelper.judgeStyleClasses(radioClassList)).toBeTruthy();

      testComponent.direction = 'row';
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      expect(nativeEl.querySelector('.devui-radio-horizontal')).toBeTruthy();
    }));

    it('should have correct initial status', () => {
      fixture.detectChanges();
      expect(testComponent.choose).toBe('Spring');
      expect(testComponent.mockChange).toHaveBeenCalledTimes(0);
    });
  });

  describe('click and disabled', () => {
    it('should click work', fakeAsync(() => {
      radios[1].nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect((<HTMLElement>radios[0].nativeElement).classList).not.toContain('active');
      expect((<HTMLElement>radios[1].nativeElement).classList).toContain('active');
      expect(testComponent.choose).toBe(testComponent.values[1]);
      expect(testComponent.mockChange).toHaveBeenCalledTimes(1);

      radios[1].nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.choose).toBe(testComponent.values[1]);
      expect(testComponent.mockChange).toHaveBeenCalledTimes(1);
    }));

    it('should can be disabled', fakeAsync(() => {
      testComponent.isDisabled = true;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(testComponent.choose).toBe(testComponent.values[0]);
      expect(testComponent.mockChange).toHaveBeenCalledTimes(0);

      radios[1].nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect((<HTMLElement>radios[1].nativeElement).classList).not.toContain('active');
      expect(testComponent.choose).toBe(testComponent.values[0]);
      expect(testComponent.mockChange).toHaveBeenCalledTimes(0);
    }));
  });

  describe('should radios number change shown on the page', () => {
    it('number increase', () => {
      testComponent.values.push('AfterWinter');
      fixture.detectChanges();
      radios = fixture.debugElement.queryAll(By.css('.devui-radio'));
      expect(radios.length).toEqual(testComponent.values.length);
    });
  });

  describe('d-radio as children', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TestRadioItemGroupComponent);
      fixture.detectChanges();
      debugEl = fixture.debugElement;
      testComponent = debugEl.componentInstance;
      radios = fixture.debugElement.queryAll(By.directive(RadioComponent));
    });

    it('should have been created', () => {
      expect(testComponent).toBeTruthy();
    });

    it('should have correct value number', () => {
      expect(radios.length).toEqual(3);
    });
  });

  describe('beforechange', () => {
    beforeEach((() => {
      fixture = TestBed.createComponent(TestRadioGroupComponent);
      testComponent = fixture.debugElement.componentInstance;
    }));

    it('select should be avoid by beforechange', () => {
      testComponent.beforeChange = (values) => false;
      fixture.detectChanges();
      radios = fixture.debugElement.queryAll(By.css('.devui-radio'));
      const radioElement = radios[3].nativeElement;
      expect(radioElement.classList).not.toContain('active');

      fixture.detectChanges();
      radioElement.click();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(radios[0].nativeElement.classList).toContain('active');
        expect(radioElement.classList).not.toContain('active');
      });
    });

    it('promise should work', () => {
      testComponent.beforeChange = (values) => Promise.resolve(false);
      fixture.detectChanges();
      radios = fixture.debugElement.queryAll(By.css('.devui-radio'));
      const radioElement = radios[3].nativeElement;
      expect(radioElement.classList).not.toContain('active');

      fixture.detectChanges();
      radioElement.click();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(radios[0].nativeElement.classList).toContain('active');
        expect(radioElement.classList).not.toContain('active');
      });
    });

    it('observable should work', () => {
      testComponent.beforeChange = (values) => of(false);
      fixture.detectChanges();
      radios = fixture.debugElement.queryAll(By.css('.devui-radio'));
      const radioElement = radios[3].nativeElement;
      expect(radioElement.classList).not.toContain('active');

      fixture.detectChanges();
      radioElement.click();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(radios[0].nativeElement.classList).toContain('active');
        expect(radioElement.classList).not.toContain('active');
      });
    });
  });
});
