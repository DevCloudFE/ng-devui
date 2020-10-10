import { By } from '@angular/platform-browser';
import { InputNumberModule } from './input-number.module';
import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { createKeyBoardEvent } from '../utils/testing/event-helper';

@Component({
  template: `
    <d-input-number
      #comp
      [size]="size"
      [min]="min"
      [max]="max"
      [step]="step"
      [allowEmpty]="allowEmpty"
      [(ngModel)]="value"
      (whileValueChanging)="valueChanging($event)"
    ></d-input-number>
  `,
})
class TestInputNumberComponent {
  disabled = false;
  size = 'sm';
  min = -100;
  max = 1000;
  step = 1;
  value = 2;
  allowEmpty = false;
  @ViewChild('comp') comp;
  valueChanging = jasmine.createSpy('value changing');
}

@Component({
  template: ` <d-input-number [disabled]="disabled" [(ngModel)]="value"></d-input-number> `,
})
class TestInputNumberDisabledComponent {
  value = 2;
  disabled = false;
}

describe('input-number', () => {
  describe('normal', () => {
    let fixture: ComponentFixture<TestInputNumberComponent>;
    let debugEl: DebugElement;
    let component: TestInputNumberComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule, InputNumberModule],
        declarations: [TestInputNumberComponent],
      });
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TestInputNumberComponent);
      debugEl = fixture.debugElement;
      component = fixture.componentInstance;
    });

    describe('basic', () => {
      it('should create correctly', () => {
        expect(component).toBeTruthy();
      });

      it('should have correct classes', () => {
        fixture.detectChanges();
        let inputContainerEL = debugEl.query(By.css('.input-container')).nativeElement;
        expect(inputContainerEL.classList).toContain('devui-input-number-sm');

        component.size = 'lg';
        fixture.detectChanges();
        inputContainerEL = debugEl.query(By.css('.input-container')).nativeElement;
        expect(inputContainerEL.classList).toContain('devui-input-number-lg');
      });

      it('should bind value null work', fakeAsync(() => {
        component.value = null;

        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        const inputEl = debugEl.query(By.css('.input-container .input-box')).nativeElement;
        expect(inputEl.value).toEqual('0');
      }));

      it('should have correctly bind number', fakeAsync(() => {
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        const inputEl = debugEl.query(By.css('.input-container .input-box')).nativeElement;
        expect(inputEl.value).toEqual('2');
      }));
    });

    describe('initial value is empty', () => {
      it('should value can be empty', fakeAsync(() => {
        component.allowEmpty = true;
        component.value = null;
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        const inputEl = debugEl.query(By.css('.input-container .input-box')).nativeElement;
        expect(inputEl.value).toEqual('');
      }));

      it('should empty increase work', fakeAsync(() => {
        component.allowEmpty = true;
        component.value = null;
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        const incBtn = debugEl.query(By.css('.input-control-button.input-control-inc')).nativeElement;
        incBtn.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        const inputEl = debugEl.query(By.css('.input-container .input-box')).nativeElement;
        expect(inputEl.value).toEqual('0');
      }));

      it('should not min value bigger than max value', () => {
        component.min = 100;
        component.max = -100;
        expect(() => {
          fixture.detectChanges();
        }).toThrowError('max value must be greater than or equal to min value');
      });

      it('should empty decrease work', fakeAsync(() => {
        component.allowEmpty = true;
        component.value = null;
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        const descBtn = debugEl.query(By.css('.input-control-button.input-control-dec')).nativeElement;
        descBtn.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        const inputEl = debugEl.query(By.css('.input-container .input-box')).nativeElement;
        expect(inputEl.value).toEqual('0');
      }));

      it('should input empty value blur work', fakeAsync(() => {
        let inputEl = debugEl.query(By.css('.input-container .input-box')).nativeElement;
        inputEl.value = '';
        inputEl.dispatchEvent(new Event('blur'));
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        expect(inputEl.value).toEqual('2');

        component.allowEmpty = true;
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        inputEl = debugEl.query(By.css('.input-container .input-box')).nativeElement;
        inputEl.value = '';
        inputEl.dispatchEvent(new Event('blur'));
        fixture.detectChanges();
        expect(inputEl.value).toEqual('');
      }));

      it('should backspace work', fakeAsync(() => {
        component.value = 12;
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        let inputEl = debugEl.query(By.css('.input-container .input-box')).nativeElement;
        inputEl.focus();
        fixture.detectChanges();
        const backSpaceKeyboard = createKeyBoardEvent('keydown', {
          key: 'Backspace',
        });
        inputEl.dispatchEvent(backSpaceKeyboard);
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        inputEl = debugEl.query(By.css('.input-container .input-box')).nativeElement;
        inputEl.dispatchEvent(new Event('blur'));
        fixture.detectChanges();
        expect(component.valueChanging).toHaveBeenCalled();
      }));
    });

    describe('advanced', () => {
      it('should input value changing emiter work', fakeAsync(() => {
        const inputEl = debugEl.query(By.css('.input-container .input-box')).nativeElement;
        inputEl.value = '5';
        const keyBoardEvent = createKeyBoardEvent('input', { data: '5' });
        inputEl.dispatchEvent(keyBoardEvent);
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        expect(component.valueChanging).toHaveBeenCalled();
      }));

      it('should blur change the value', fakeAsync(() => {
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        let inputEl = debugEl.query(By.css('.input-container .input-box')).nativeElement;
        inputEl.focus();
        inputEl.value = 10;

        inputEl.dispatchEvent(new Event('blur'));
        fixture.detectChanges();
        inputEl = debugEl.query(By.css('.input-container .input-box')).nativeElement;
        expect(inputEl.value).toEqual('10');
      }));

      it('should increase/decrease number work', fakeAsync(() => {
        let inputEl = debugEl.query(By.css('.input-container .input-box')).nativeElement;
        inputEl.focus();
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        const incBtn = debugEl.query(By.css('.input-control-button.input-control-inc')).nativeElement;
        incBtn.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        inputEl = debugEl.query(By.css('.input-container .input-box')).nativeElement;
        expect(inputEl.value).toEqual('3');

        const descBtn = debugEl.query(By.css('.input-control-button.input-control-dec')).nativeElement;
        descBtn.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        inputEl = debugEl.query(By.css('.input-container .input-box')).nativeElement;
        expect(inputEl.value).toEqual('2');
      }));

      it('should not increase when exceed max number', fakeAsync(() => {
        component.value = component.max;

        let inputEl = debugEl.query(By.css('.input-container .input-box')).nativeElement;
        inputEl.focus();
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        const incBtn = debugEl.query(By.css('.input-control-button.input-control-inc')).nativeElement;
        incBtn.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        inputEl = debugEl.query(By.css('.input-container .input-box')).nativeElement;
        expect(inputEl.value).toEqual(component.max + '');
      }));

      it('should not decrease when less than min number', fakeAsync(() => {
        component.value = component.min;

        let inputEl = debugEl.query(By.css('.input-container .input-box')).nativeElement;
        inputEl.focus();
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        const descBtn = debugEl.query(By.css('.input-control-button.input-control-dec')).nativeElement;
        descBtn.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        inputEl = debugEl.query(By.css('.input-container .input-box')).nativeElement;
        expect(inputEl.value).toEqual(component.min + '');
      }));

      // TODO float number & data from clipBoard
      it('should float number can be parsed', fakeAsync(() => {
        fixture.detectChanges();
        tick();
        fixture.detectChanges();

        let inputEl = debugEl.query(By.css('.input-container .input-box')).nativeElement;
        inputEl.focus();
        inputEl.value = '1.20';
        inputEl.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        inputEl.dispatchEvent(new Event('blur'));
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        inputEl = debugEl.query(By.css('.input-container .input-box')).nativeElement;
        expect(inputEl.value).toEqual('1.2');
      }));

      it('should value from clip board work', fakeAsync(() => {
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        let inputEl = debugEl.query(By.css('.input-container .input-box')).nativeElement;
        expect(inputEl.value).toEqual('2');

        const pasteData = new DataTransfer();
        pasteData.setData('text', '2.5');
        const clipBoardEvent = new ClipboardEvent('paste', {
          clipboardData: pasteData
        } as any);

        inputEl.focus();
        inputEl.dispatchEvent(clipBoardEvent);
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        inputEl = debugEl.query(By.css('.input-container .input-box')).nativeElement;
        expect(inputEl.value).toEqual('22.5');
      }));
    });
  });

  describe('disabled work', () => {
    let fixture: ComponentFixture<TestInputNumberDisabledComponent>;
    let debugEl: DebugElement;
    let component: TestInputNumberDisabledComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule, InputNumberModule],
        declarations: [TestInputNumberDisabledComponent],
      });
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TestInputNumberDisabledComponent);
      debugEl = fixture.debugElement;
      component = fixture.componentInstance;
    });

    it('should disabled work', fakeAsync(() => {
      fixture.detectChanges();
      tick(); // get initial value
      fixture.detectChanges();
      tick(); // change bind value
      fixture.detectChanges();

      let inputEl = debugEl.query(By.css('.input-container .input-box')).nativeElement;
      expect(inputEl.value).toEqual('2');

      component.disabled = true;
      fixture.detectChanges();

      inputEl = debugEl.query(By.css('.input-container .input-box')).nativeElement;
      expect(inputEl.classList).toContain('disabled');
    }));
  });
});
