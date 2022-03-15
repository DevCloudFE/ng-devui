import { ApplicationRef, Component, DebugElement, NgZone } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { take } from 'rxjs/operators';

import { DomHelper } from '../utils/testing/dom-helper';
import { SearchModule } from './search.module';

@Component({
  template: ` <d-search [size]="size" [(ngModel)]="searchText" [maxLength]="maxLen" (searchFn)="onSearch($event)"></d-search> `,
})
class TestSearchComponent {
  size = '';
  searchText = '';
  maxLen = Number.MAX_SAFE_INTEGER;

  testSearchText = '';
  onSearch($event) {
    this.testSearchText = $event;
  }
}

describe('search', () => {
  let fixture: ComponentFixture<TestSearchComponent>;
  let debugEl: DebugElement;
  let searchInputEl: HTMLInputElement;
  let testComponent: TestSearchComponent;
  let dh: DomHelper<TestSearchComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [SearchModule, FormsModule],
        declarations: [TestSearchComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSearchComponent);
    fixture.detectChanges();
    debugEl = fixture.debugElement;
    testComponent = debugEl.componentInstance;
    dh = new DomHelper(fixture);
  });

  describe('default', () => {
    it('should have been created successfully', () => {
      expect(testComponent).toBeTruthy();
    });

    it('should have correct className', () => {
      const classList = ['.devui-search', '.devui-search-icon'];
      expect(dh.judgeStyleClasses(classList)).toBeTruthy();
    });

    it('should have correct placeholder', () => {
      fixture.detectChanges();
      searchInputEl = debugEl.query(By.css('input')).nativeElement;
      expect(searchInputEl.placeholder).toEqual('请输入关键字');
    });
  });

  describe('size', () => {
    it('change should be effective', () => {
      testComponent.size = 'sm';
      fixture.detectChanges();
      const classListSm = ['.devui-input-sm', '.devui-search-icon-sm'];
      expect(dh.judgeStyleClasses(classListSm)).toBeTruthy();

      testComponent.size = 'lg';
      fixture.detectChanges();
      const classListLg = ['.devui-input-lg', '.devui-search-icon-lg'];
      expect(dh.judgeStyleClasses(classListLg)).toBeTruthy();
    });
  });

  describe('search function', () => {
    let testText;

    beforeEach(() => {
      testText = 'customized key word';
      searchInputEl = debugEl.query(By.css('input')).nativeElement;
    });

    it('should input value can be searched by click icon', fakeAsync(() => {
      const searchIcon: HTMLElement = debugEl.query(By.css('.devui-search-icon')).nativeElement;

      searchInputEl.value = testText;
      searchInputEl.dispatchEvent(new Event('input'));
      tick(1000);

      searchIcon.click();
      fixture.detectChanges();
      expect(testComponent.testSearchText).toBe(testText);
    }));

    it('should can be searched by enter key', fakeAsync(() => {
      const enterEvent: KeyboardEvent = createKeyBoardEvent('keydown', 'Enter');

      searchInputEl.value = testText;
      searchInputEl.dispatchEvent(new Event('input'));
      tick(1000);

      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      searchInputEl.dispatchEvent(enterEvent);
      tick(300);
      fixture.detectChanges();
      expect(testComponent.testSearchText).toBe(testText);
    }));
  });

  describe('change detection behavior', () => {
    it('should not trigger change detection of `keydown` events if this is not an `Enter` button', (done) => {
      const ngZone = TestBed.inject(NgZone);
      const appRef = TestBed.inject(ApplicationRef);
      spyOn(appRef, 'tick');

      const input: HTMLInputElement = debugEl.query(By.css('input')).nativeElement;

      input.dispatchEvent(createKeyBoardEvent('keydown', 'Shift'));
      expect(appRef.tick).not.toHaveBeenCalled();

      input.dispatchEvent(createKeyBoardEvent('keydown', 'q'));
      expect(appRef.tick).not.toHaveBeenCalled();

      input.dispatchEvent(createKeyBoardEvent('keydown', 'Enter'));

      ngZone.onMicrotaskEmpty.pipe(take(1)).subscribe(() => {
        expect(appRef.tick).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });
});

function createKeyBoardEvent(type: string, key: string, keyCode?: string): KeyboardEvent {
  const event = new KeyboardEvent(type, {
    key: key,
    code: keyCode,
  });

  return event;
}
