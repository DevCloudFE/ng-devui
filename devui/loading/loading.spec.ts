import { Component, DebugElement, OnInit } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { timer } from 'rxjs';
import { LoadingDirective } from './loading.directive';
import { LoadingModule } from './loading.module';
import { LoadingType } from './loading.types';
@Component({
    template: `
    <div
      dLoading
      [backdrop]="showBackDrop"
      [view]="view"
      [message]="message"
      [positionType]="positionType"
      [showLoading]="showLoading"
      style="height: 150px;"
    ></div>
  `,
    standalone: false
})
class TestLoadingComponent {
  showLoading = true;
  positionType = 'relative';
  showBackDrop = true;
  view = {
    top: '50px',
    left: '50%',
  };
  message = '测试信息';
}

@Component({
    template: `
    <div dLoading [loadingTemplateRef]="loadingTemplateRef" [loading]="loading" [style.height.px]="150"></div>
    <ng-template #loadingTemplateRef>
      <div class="test-template-loading">
        测试自定义loading
      </div>
    </ng-template>
  `,
    standalone: false
})
class TestLoadingTemplateComponent implements OnInit {
  loading: LoadingType;
  ngOnInit(): void {
    this.loading = timer(3000);
  }
}

describe('loading', () => {
  let fixture: ComponentFixture<any>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoadingModule, NoopAnimationsModule],
      declarations: [TestLoadingComponent, TestLoadingTemplateComponent]
    }).compileComponents();
  });

  describe('loading basic', () => {
    let testComponent: TestLoadingComponent;
    let divDebugElement: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestLoadingComponent);
      testComponent = fixture.debugElement.componentInstance;
      divDebugElement = fixture.debugElement;
      fixture.detectChanges();
    });

    describe('loading default behavior', () => {
      it('loading demo should created success', () => {
        expect(testComponent).toBeTruthy();
      });

      it('showLoading and backdrop param should work', () => {
        const dLoadingDebugEl = divDebugElement.query(By.css('d-loading'));
        const loadingBackdropDebugEl = divDebugElement.query(By.css('d-loading-backdrop'));
        expect(dLoadingDebugEl).toBeTruthy();
        expect(loadingBackdropDebugEl).toBeTruthy();

        testComponent.showLoading = false;
        fixture.detectChanges();
        expect(divDebugElement.nativeElement.querySelector('d-loading-backdrop')).not.toBeTruthy();
        expect(divDebugElement.query(By.css('d-loading'))).not.toBeTruthy();

        testComponent.showLoading = true;
        testComponent.showBackDrop = false;
        fixture.detectChanges();

        expect(divDebugElement.nativeElement.querySelector('d-loading-backdrop')).not.toBeTruthy();
        expect(divDebugElement.query(By.css('d-loading'))).toBeTruthy();
      });

      it('positionType param should work', () => {
        expect(divDebugElement.query(By.directive(LoadingDirective)).styles.position).toEqual('relative');

        testComponent.showLoading = false;
        testComponent.positionType = 'absolute';
        fixture.detectChanges();
        testComponent.showLoading = true;
        fixture.detectChanges();

        expect(divDebugElement.query(By.directive(LoadingDirective)).styles.position).toEqual('absolute');
      });

      it('view param should work', () => {
        expect(divDebugElement.query(By.css('.devui-spinner-wrapper')).styles.top).toEqual('50px');
        expect(divDebugElement.query(By.css('.devui-spinner-wrapper')).styles.left).toEqual('50%');
      });

      it('message param should work', () => {
        expect(divDebugElement.query(By.css('.devui-busy-default-text')).nativeElement.innerText).toEqual('测试信息');
      });
    });
  });

  describe('loading special behavior', () => {
    let testComponent: TestLoadingTemplateComponent;
    let divDebugElement: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestLoadingTemplateComponent);
      testComponent = fixture.debugElement.componentInstance;
      divDebugElement = fixture.debugElement;
    });

    describe('template loading', () => {
      it('shoud render template', () => {
        fixture.detectChanges();
        expect(divDebugElement.query(By.css('.devui-spinner-wrapper'))).not.toBeTruthy(); // 默认的loading不渲染
        expect(divDebugElement.query(By.css('.test-template-loading'))).toBeTruthy(); // 渲染自定义loading
      });
    });

    describe('promise loading', () => {
      it('should destory in 3000ms', fakeAsync(() => {
        fixture.detectChanges();
        expect(divDebugElement.nativeElement.querySelector('d-loading')).not.toBeNull();
        tick(3000);
        fixture.detectChanges();
        expect(divDebugElement.nativeElement.querySelector('d-loading')).toBeNull();
      }));

      it('should work in subscription type', fakeAsync(() => {
        fixture.detectChanges();
        testComponent.loading = timer(3000).subscribe();
        fixture.detectChanges();
        expect(divDebugElement.nativeElement.querySelector('d-loading')).not.toBeNull();
        tick(3000);
        fixture.detectChanges();
        expect(divDebugElement.nativeElement.querySelector('d-loading')).toBeNull();
      }));

      it('should work in array type', fakeAsync(() => {
        fixture.detectChanges();
        testComponent.loading = [timer(1000).toPromise(), timer(1000).toPromise(), timer(1000).toPromise()];
        fixture.detectChanges();
        expect(divDebugElement.nativeElement.querySelector('d-loading')).not.toBeNull();
        tick(3000);
        fixture.detectChanges();
        expect(divDebugElement.nativeElement.querySelector('d-loading')).toBeNull();
      }));
    });
  });
});
