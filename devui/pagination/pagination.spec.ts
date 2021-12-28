import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DomHelper } from '../utils/testing/dom-helper';
import { createKeyBoardEvent } from '../utils/testing/event-helper';
import { PaginationComponent } from './pagination.component';
import { PaginationModule } from './pagination.module';
@Component({
  template: `
    <d-pagination
    #pagination
    [size]="'sm'"
    [total]="pager.total"
    [(pageSize)]="pager.pageSize"
    [(pageIndex)]="pager.pageIndex"
    [canViewTotal]="true"
    [canChangePageSize]="true"
    [canJumpPage]="true"
    [maxItems]="5"
  >
  </d-pagination>`,
})
class TestPaginationComponent {
  @ViewChild('pagination') pagination: PaginationComponent;
  pager = {
    total: 306,
    pageIndex: 5,
    pageSize: 10
  };
}

@Component({
  template: `
    <d-pagination
      [total]="pager3.total"
      [(pageSize)]="pager3.pageSize"
      [totalItemText]="'总条数'"
      [(pageIndex)]="pager3.pageIndex"
      [canViewTotal]="true"
      [canChangePageSize]="true"
      [lite]="true"
    >
    </d-pagination>`,
})
class TestLitePaginationComponent {
  @ViewChild('pagination') pagination: PaginationComponent;
  pager3 = {
    total: 0,
    pageIndex: 1,
    pageSize: 10
  };
}

describe('pagination basic', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PaginationModule],
      declarations: [TestPaginationComponent, TestLitePaginationComponent]
    }).compileComponents();
  });

  describe('pagination display', () => {
    let fixture: ComponentFixture<TestPaginationComponent>;
    let component: TestPaginationComponent;
    let debugEl: DebugElement;
    let domHelper: DomHelper<TestPaginationComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestPaginationComponent);
      component = fixture.componentInstance;
      debugEl = fixture.debugElement;
      fixture.detectChanges();
      domHelper = new DomHelper(fixture);
    });

    describe('basic pagination', () => {
      it('should pagination display correctly', () => {
        expect(component).toBeTruthy();
        const classes = [
          '.devui-pagination',
          '.devui-page-size',
          '.devui-total-size',
          '.devui-pagination-list',
          '.devui-jump-container'
        ];
        expect(domHelper.judgeStyleClasses(classes)).toBeTruthy();
      });
      it('should pagination jump correctly', fakeAsync(() => {
        const pageEl: HTMLElement = debugEl.nativeElement
          .querySelector('.devui-pagination-list.devui-pagination-sm li:nth-child(2)');
        pageEl.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(debugEl.nativeElement.querySelector('.devui-pagination-list.devui-pagination-sm li:nth-child(2)').classList)
          .toContain('active');
        expect(debugEl.nativeElement.querySelector('.devui-pagination-list.devui-pagination-sm li:nth-child(1)').classList)
          .toContain('disabled');

        const nextLink = debugEl.nativeElement
          .querySelector('.devui-pagination-list.devui-pagination-sm li:nth-child(7) .devui-pagination-link');
        nextLink.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(debugEl.nativeElement.querySelector('.devui-pagination-list.devui-pagination-sm li:nth-child(3)').classList)
          .toContain('active');

        const preLink = debugEl.nativeElement
          .querySelector('.devui-pagination-list.devui-pagination-sm li:nth-child(1) .devui-pagination-link');
        preLink.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(debugEl.nativeElement.querySelector('.devui-pagination-list.devui-pagination-sm li:nth-child(2)').classList)
          .toContain('active');

        const lastPageEl: HTMLElement = debugEl.nativeElement
          .querySelector('.devui-pagination-list.devui-pagination-sm li:nth-child(6)');
        lastPageEl.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(debugEl.nativeElement.querySelector('.devui-pagination-list.devui-pagination-sm li:nth-child(6)').classList)
          .toContain('active');
        expect(debugEl.nativeElement.querySelector('.devui-pagination-list.devui-pagination-sm li:nth-child(7)').classList)
          .toContain('disabled');
      }));

      it('should jump correctly when click ellipsis', fakeAsync(() => {
        component.pager.total = 306;
        tick(300);
        fixture.detectChanges();

        const prevEllipsis = debugEl.nativeElement.querySelector('.devui-pagination-list.devui-pagination-sm li:nth-child(3)');
        prevEllipsis.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(component.pager.pageIndex).toBe(3);

        const nextEllipsis = debugEl.nativeElement.querySelector('.devui-pagination-list.devui-pagination-sm li:nth-child(6)');
        nextEllipsis.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(component.pager.pageIndex).toBe(5);
      }));

      it('should total to be 0 when not set total value', fakeAsync(() => {
        component.pager.total = undefined;
        tick(300);
        fixture.detectChanges();
        expect(component.pagination.total).toEqual(0);
      }));

      it('should change input to jump', fakeAsync(() => {
        const inputEl = debugEl.query(By.css('.devui-pagination .devui-jump-container input.devui-input')).nativeElement;
        inputEl.dispatchEvent(new Event('focus'));
        inputEl.value = '1';
        inputEl.dispatchEvent(new Event('input'));
        tick();
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
        expect(inputEl.value).toBe('1');
        const enterEvent = createKeyBoardEvent('keyup', {
          key: 'Enter',
          code: 'Enter'
        });

        inputEl.dispatchEvent(enterEvent);
        fixture.detectChanges();
        tick(50);
        fixture.detectChanges();
        expect(debugEl.nativeElement.querySelector('.devui-pagination-list.devui-pagination-sm li:nth-child(2)').classList)
          .toContain('active');
      }));
    });
  });

  describe('pagination display', () => {
    let fixture: ComponentFixture<TestLitePaginationComponent>;
    let component: TestLitePaginationComponent;
    let debugEl: DebugElement;
    let domHelper: DomHelper<TestLitePaginationComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestLitePaginationComponent);
      component = fixture.componentInstance;
      debugEl = fixture.debugElement;
      fixture.detectChanges();
      domHelper = new DomHelper(fixture);
    });

    describe('should lite pagination display correctly', () => {
      it('should lite pagination display correctly', () => {
        expect(component).toBeTruthy();
        const classes = [
          '.devui-pagination',
          '.devui-lite-paginator',
          '.devui-pagination-link-lite'
        ];
        expect(domHelper.judgeStyleClasses(classes)).toBeTruthy();
      });
    });
  });

});
