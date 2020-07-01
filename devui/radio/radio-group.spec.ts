import { Component, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed, async, fakeAsync, flush, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RadioModule } from './radio.module';
import { DomHelper } from '../utils/testing/dom-helper';
import { RadioGroupComponent } from './radio-group.component';

@Component({
  template: `
    <d-radio-group
      [name]="'season'"
      [values]="values"
      [(ngModel)]="choose"
      (change)="mockChange($event)"
      [cssStyle]="direction"
      [disabled]="isDisabled"
    >
    </d-radio-group>
  `,
})
class TestRadioGroupComponent {
  values = ['Spring', 'Summer', 'Autumn', 'Winter'];
  choose = 'Spring';
  direction = 'column';
  isDisabled = false;
  constructor() {}

  mockChange = jasmine.createSpy('value change');
}

describe('radio-group', () => {
  let fixture: ComponentFixture<TestRadioGroupComponent>;
  let debugEl: DebugElement;
  let testComponent: TestRadioGroupComponent;
  let radios: DebugElement[];
  let domHelper: DomHelper<TestRadioGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RadioModule, FormsModule],
      declarations: [TestRadioGroupComponent],
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
});
