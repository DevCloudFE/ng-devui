import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nService } from 'ng-devui/i18n';
import { RelativeTimeModule } from './relative-time.module';
@Component({
    template: `
    <span class="display">{{ source | dRelativeTime: limit: compareTime | async }}</span>
  `,
    standalone: false
})
class TestRelativeTimePipeComponent {
  limit = 3 * 12 * 30 * 24 * 60 * 60; // 转换阈值设为三年
  compareTime = '2020-5-20 12:00:00';
  source: string | number | Date = new Date('2018-5-20 12:00:00');
}

describe('relative time', () => {
  let fixture: ComponentFixture<TestRelativeTimePipeComponent>;
  let debugEl: DebugElement;
  let testComponent: TestRelativeTimePipeComponent;
  let displayEl: HTMLInputElement;
  let srv: I18nService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestRelativeTimePipeComponent],
      imports: [RelativeTimeModule]
    }).compileComponents();
    fixture = TestBed.createComponent(TestRelativeTimePipeComponent);
    fixture.detectChanges();
    debugEl = fixture.debugElement;
    testComponent = debugEl.componentInstance;
    displayEl = debugEl.query(By.css('.display')).nativeElement;
  });

  beforeEach(inject([I18nService], (s: I18nService) => {
    srv = s;
  }));

  describe('pipe default', () => {
    beforeEach(() => {
      srv.toggleLang('zh-cn');
      fixture.detectChanges();
    });
    it('should correct when input years ago', () => {
      expect(displayEl.innerText).toEqual('2年前');
      testComponent.source = new Date('2022-5-20 12:00:00');
      fixture.detectChanges();
      expect(displayEl.innerText).toEqual('2年后');
    });
    it('should correct when input mounths ago', () => {
      testComponent.source = new Date('2020-3-20 12:00:00');
      fixture.detectChanges();
      expect(displayEl.innerText).toEqual('2个月前');

      testComponent.source = new Date('2020-7-20 12:00:00');
      fixture.detectChanges();
      expect(displayEl.innerText).toEqual('2个月后');
    });
    it('should correct when input weeks ago', () => {
      testComponent.source = new Date('2020-5-13 12:00:00');
      fixture.detectChanges();
      expect(displayEl.innerText).toEqual('上周');

      testComponent.source = new Date('2020-5-27 12:00:00');
      fixture.detectChanges();
      expect(displayEl.innerText).toEqual('下周');
    });
    it('should correct when input days ago', () => {
      testComponent.source = new Date('2020-5-16 12:00:00');
      fixture.detectChanges();
      expect(displayEl.innerText).toEqual('4天前');

      testComponent.source = new Date('2020-5-24 12:00:00');
      fixture.detectChanges();
      expect(displayEl.innerText).toEqual('4天后');
    });
    it('should correct when input minutes ago', () => {
      testComponent.source = new Date('2020-5-20 14:00:00');
      fixture.detectChanges();
      expect(displayEl.innerText).toEqual('2小时后');

      testComponent.source = new Date('2020-5-20 10:00:00');
      fixture.detectChanges();
      expect(displayEl.innerText).toEqual('2小时前');
    });
    it('should correct when input minutes ago', () => {
      testComponent.source = new Date('2020-5-20 12:43:00');
      fixture.detectChanges();
      expect(displayEl.innerText).toEqual('43分钟后');

      testComponent.source = new Date('2020-5-20 11:17:00');
      fixture.detectChanges();
      expect(displayEl.innerText).toEqual('43分钟前');
    });
    it('should correct when input seconds ago', () => {
      testComponent.source = new Date('2020-5-20 11:59:50');
      fixture.detectChanges();
      expect(displayEl.innerText).toEqual('刚刚');

      testComponent.source = new Date('2020-5-20 12:00:20');
      fixture.detectChanges();
      expect(displayEl.innerText).toEqual('稍后');
    });
    it('should correct when input time over limit', () => {
      testComponent.source = new Date('2015-5-20 12:00:00');
      const dateStr = String(new Date(testComponent.source));
      fixture.detectChanges();
      expect(displayEl.innerText).toEqual(dateStr);
    });
    it('should correct when input null', () => {
      testComponent.source = null;
      fixture.detectChanges();
      expect(displayEl.innerText).toEqual('');
    });
    it('should correct when input wrong data', () => {
      testComponent.source = 'something wrong';
      fixture.detectChanges();
      expect(displayEl.innerText).toEqual('');
    });
  });

  describe('i18n work', () => {
    beforeEach(() => {
      srv.toggleLang('en-us');
      fixture.detectChanges();
    });

    it('should correct when input years ago', () => {
      expect(displayEl.innerText).toEqual('2 years ago');
    });
    it('should correct when input mounths ago', () => {
      testComponent.source = new Date('2020-3-20 12:00:00');
      fixture.detectChanges();
      expect(displayEl.innerText).toEqual('2 months ago');
    });
    it('should correct when input days ago', () => {
      testComponent.source = new Date('2020-5-16 12:00:00');
      fixture.detectChanges();
      expect(displayEl.innerText).toEqual('4 days ago');
    });
    it('should correct when input minutes ago', () => {
      testComponent.source = new Date('2020-5-20 12:43:00');
      fixture.detectChanges();
      expect(displayEl.innerText).toEqual('43 minutes later');
    });
    it('should correct when input seconds ago', () => {
      testComponent.source = new Date('2020-5-20 11:59:30');
      fixture.detectChanges();
      expect(displayEl.innerText).toEqual('just now');
    });
  });

  afterAll(() => {
    localStorage.removeItem('lang');
  });
});
