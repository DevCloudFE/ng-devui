import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { RadioComponent } from './radio.component';
import { RadioModule } from './radio.module';
@Component({
  template: `
    <section>
      <d-radio
        [name]="'independent-city'"
        [(ngModel)]="choose"
        *ngFor="let value of values"
        [value]="value"
        [disabled]="isDisabled"
        [beforeChange]="beforeChange"
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
  beforeChange: (value: any) => any;
  constructor() {}

  valueChange = jasmine.createSpy('value change');

}

describe('radio', () => {
  let fixture: ComponentFixture<TestRadioComponent>;
  let testComponent: TestRadioComponent;
  let radios: DebugElement[];
  let firstRadioLabel: HTMLElement;
  let secondRadioLabel: HTMLElement;
  let thirdRadioLabel: HTMLElement;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RadioModule, FormsModule],
      declarations: [TestRadioComponent]
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
      tick();
      fixture.detectChanges();
      expect(firstRadioLabel.classList).not.toContain('active');
      tick();
      fixture.detectChanges();
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

  describe('beforechange', () => {
    beforeEach((() => {
      fixture = TestBed.createComponent(TestRadioComponent);
      testComponent = fixture.debugElement.componentInstance;
    }));

    it('select third should be avoid by beforechange', fakeAsync(() => {
      testComponent.beforeChange = (value) => {
        return value !== 'Item3';
      };
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      radios = fixture.debugElement.queryAll(By.directive(RadioComponent));
      firstRadioLabel = radios[0].nativeElement.querySelector('label');
      thirdRadioLabel = radios[2].nativeElement.querySelector('label');
      expect(thirdRadioLabel.classList).not.toContain('active');

      fixture.detectChanges();
      thirdRadioLabel.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      expect(firstRadioLabel.classList).toContain('active');
      expect(thirdRadioLabel.classList).not.toContain('active');
    }));

    it('promise type should work', fakeAsync(() => {
      testComponent.beforeChange = (value) => {
        return  Promise.resolve(value !== 'Item3');
      };
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      radios = fixture.debugElement.queryAll(By.directive(RadioComponent));
      firstRadioLabel = radios[0].nativeElement.querySelector('label');
      thirdRadioLabel = radios[2].nativeElement.querySelector('label');
      expect(thirdRadioLabel.classList).not.toContain('active');

      fixture.detectChanges();
      thirdRadioLabel.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      expect(firstRadioLabel.classList).toContain('active');
      expect(thirdRadioLabel.classList).not.toContain('active');
    }));

    it('observable type should work', fakeAsync(() => {
      testComponent.beforeChange = (value) => {
        return of(value !== 'Item3');
      };
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      radios = fixture.debugElement.queryAll(By.directive(RadioComponent));
      firstRadioLabel = radios[0].nativeElement.querySelector('label');
      thirdRadioLabel = radios[2].nativeElement.querySelector('label');
      expect(thirdRadioLabel.classList).not.toContain('active');

      fixture.detectChanges();
      thirdRadioLabel.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      expect(firstRadioLabel.classList).toContain('active');
      expect(thirdRadioLabel.classList).not.toContain('active');
    }));
  });
});
