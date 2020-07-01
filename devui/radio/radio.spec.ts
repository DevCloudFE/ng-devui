import { RadioComponent } from './radio.component';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, flush, fakeAsync, async, tick } from '@angular/core/testing';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RadioModule } from './radio.module';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <section>
      <d-radio
        [name]="'independent-city'"
        [(ngModel)]="choose"
        *ngFor="let value of values"
        [value]="value"
        [disabled]="isDisabled"
        (ngModelChange)="valueChange($event)"
      >
        {{ value }}
      </d-radio>
    </section>
  `,
})
class TestRadioComponent {
  values = ['Item1', 'Item2', 'Item3'];
  choose = 'Item1';
  isDisabled = false;
  constructor() {}

  valueChange = jasmine.createSpy('value change');
}

describe('radio', () => {
  let fixture: ComponentFixture<TestRadioComponent>;
  let testComponent: TestRadioComponent;
  let radios: DebugElement[];
  let firstRadioLabel: HTMLElement;
  let secondRadioLabel: HTMLElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RadioModule, FormsModule],
      declarations: [TestRadioComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestRadioComponent);
    fixture.detectChanges();
    testComponent = fixture.debugElement.componentInstance;
    radios = fixture.debugElement.queryAll(By.directive(RadioComponent));
    firstRadioLabel = radios[0].nativeElement.querySelector('label');
    secondRadioLabel = radios[1].nativeElement.querySelector('label');
  });
  describe('basic', () => {
    it('should have been created successfully', () => {
      expect(testComponent).toBeTruthy();
    });

    it('should have correct radios number', () => {
      expect(radios.length).toEqual(3);
    });

    it('should have correct radios content', () => {
      expect(firstRadioLabel.textContent.trim()).toEqual('Item1');
    });

    it('should have correct className', () => {
      const singleRadio: HTMLElement = radios[0].nativeElement;
      expect(singleRadio.querySelector('.devui-radio')).not.toBe(null);
      expect(singleRadio.querySelector('.devui-radio-input')).not.toBe(null);
      expect(singleRadio.querySelector('.devui-radio-material')).not.toBe(null);
      expect(singleRadio.querySelector('.devui-radio-label')).not.toBe(null);
    });

    it('should have correct initial status', () => {
      fixture.detectChanges();
      expect(testComponent.choose).toBe('Item1');
      expect(testComponent.valueChange).toHaveBeenCalledTimes(0);
    });
  });

  describe('click and disabled', () => {
    it('should can be selected by click', fakeAsync(() => {
      secondRadioLabel.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(firstRadioLabel.classList).not.toContain('active');
      expect(secondRadioLabel.classList).toContain('active');
      expect(testComponent.choose).toBe('Item2');
      expect(testComponent.valueChange).toHaveBeenCalledTimes(1);

      secondRadioLabel.click();
      fixture.detectChanges();
      expect(testComponent.choose).toBe('Item2');
      expect(testComponent.valueChange).toHaveBeenCalledTimes(1);
    }));

    it('shoud can be disabled', fakeAsync(() => {
      testComponent.isDisabled = true;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(testComponent.choose).toBe('Item1');
      expect(testComponent.valueChange).toHaveBeenCalledTimes(0);
      secondRadioLabel.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(secondRadioLabel.classList).not.toContain('active');
      expect(testComponent.choose).toBe('Item1');
      expect(testComponent.valueChange).toHaveBeenCalledTimes(0);
    }));
  });
});
