import { CommonModule } from '@angular/common';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AfterViewInit, Component, DebugElement, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { OverlayContainerRef } from '../overlay-container';
import { TextInputModule } from '../text-input';
import { DocumentRef } from '../window-ref';
import { DCommonModule } from './common.module';
import { DatePipe } from './date-pipe';
import { HelperUtils } from './helper-utils';
import { IframeEventPropagateDirective } from './iframe-event-propagate.directive';

@Component({
  template: `
    <button dSimulateATag [href]="'//angular.io'" [target]="target">Open Angualr website</button>
    <button class="btn-func" (click)="goto()">Open Angualr website</button>
  `,
})
class TestSimulateTagComponent {
  target = '_blank';

  goto() {
    HelperUtils.jumpOuterUrl('//angular.io');
  }
}

@Component({
  template: `
    <button class="btn-1" (click)="download()">Download File</button>
    <button class="btn-2" (click)="download2()">Download File with Header</button>
  `,
})
class TestDownloadComponent {
  downError: string;
  method: 'POST' | 'GET' | 'post' | 'get';
  iframename: string;
  responseOption: 'response' | 'body' | 'json';
  params: { [property: string]: string };
  constructor(private httpClient: HttpClient) {}

  download() {
    HelperUtils.downloadFile(
      'assets/Frameworks.png',
      {
        method: this.method,
        params: { name: 'frameworks', mycode: '3344' },
        iframename: this.iframename,
      },
      this.downloadError
    );
  }

  download2() {
    HelperUtils.downloadFileByHttpClient(
      this.httpClient,
      'assets/Frameworks.png',
      { method: this.method, params: this.params, header: { 'X-lang': 'en' }, responseOption: this.responseOption },
      this.downloadError
    );
  }

  downloadError = (response) => {
    this.downError = response;
  };
}

@Component({
  template: `
    <div>
      <div class="input-group">
        <input dTextInput type="text" [(ngModel)]="value" />
        <button
          class="icon icon-copy"
          type="button"
          dClipboard
          [content]="value"
          [position]="position"
          (copyResultEvent)="copyResultEvent($event)"
        ></button>
      </div>
    </div>
  `,
})
class TestClipBoardComponent {
  value = 'Copied Content';
  position = 'right';
  result: any;

  copyResultEvent(event) {
    this.result = event;
  }
}

@Component({
  template: `
    <div class="host-box" (click)="hostClick($event)" dIframeEventPropagate>
      <div><h2>Parent container</h2></div>
      <iframe class="content-box"></iframe>
    </div>
  `,
})
class TestIframeComponent implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const divElement = document.createElement('div');
    divElement.innerHTML = `
        <p>Child container: iframe</p>
        <p>Click iframe to trigger parent's click event, which will change the background color</p>
    `;
    this.el.nativeElement.querySelector('iframe.content-box').contentDocument.body.appendChild(divElement);
  }

  hostClick(event) {
    event.target.style.background = '#56c3f6';
  }
}

describe('Date Pipe', () => {
  const pipe = new DatePipe();
  const date = new Date(2014, 1, 11, 13, 1, 22);
  const date1 = new Date(2015, 4, 5);

  it('transform yMMdd', () => {
    expect(pipe.transform(date, 'y/MM/dd')).toBe('2014/02/11');
  });

  it('transform yyMMdd', () => {
    expect(pipe.transform(date, 'yy/MM/dd')).toBe('14/02/11');
  });

  it('transform yyyyMMdd', () => {
    expect(pipe.transform(date, 'yyyy/MM/dd')).toBe('2014/02/11');
  });

  it('transform yMdd', () => {
    expect(pipe.transform(date, 'y/M/dd')).toBe('2014/2/11');
  });

  it('transform MMM dd,y', () => {
    expect(pipe.transform(date, 'MMM dd, y')).toBe('Feb 11, 2014');
  });

  it('transform MMMM dd, y', () => {
    expect(pipe.transform(date, 'MMMM dd, y')).toBe('February 11, 2014');
  });

  it('transform y w', () => {
    expect(pipe.transform(date, 'y w')).toBe('2014 7');
  });

  it('transform yMd', () => {
    expect(pipe.transform(date1, 'y/M/d')).toBe('2015/5/5');
  });

  it('transform yMd E', () => {
    expect(pipe.transform(date1, 'y/M/d E')).toBe('2015/5/5 Tue');
  });

  it('transform yMd EEEE', () => {
    expect(pipe.transform(date1, 'y/M/d EEEE')).toBe('2015/5/5 Tuesday');
  });

  it('transform yMd EEEEE', () => {
    expect(pipe.transform(date1, 'y/M/d EEEEE')).toBe('2015/5/5 T');
  });

  it('transform yMd W', () => {
    expect(pipe.transform(date1, 'y/M/d W')).toBe('2015/5/5 2');
  });

  it('transform yMd a', () => {
    expect(pipe.transform(date1, 'y/M/d a')).toBe('2015/5/5 AM');
  });

  it('transform yMd hhmmss', () => {
    expect(pipe.transform(date, 'y/M/d hh:mm:ss')).toBe('2014/2/11 01:01:22');
  });

  it('transform yMd HHmmss', () => {
    expect(pipe.transform(date, 'y/M/d HH:mm:ss')).toBe('2014/2/11 13:01:22');
  });

  it('transform yMd HHmmss zzzz', () => {
    expect(pipe.transform(date, 'y/M/d HH:mm:ss zzzz')).toBe('2014/2/11 13:01:22 GMT+08:00');
  });

  it('no date', () => {
    expect(pipe.transform(null, 'y/M/d')).toBeUndefined();
  });
});

describe('simulate tag', () => {
  let fixture: ComponentFixture<any>;
  let component: TestSimulateTagComponent;
  let buttonElement: HTMLElement;
  let buttonFuncElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, DCommonModule],
      declarations: [TestSimulateTagComponent],
    });

    fixture = TestBed.createComponent(TestSimulateTagComponent);
    component = fixture.debugElement.componentInstance;
    buttonElement = fixture.nativeElement.querySelector('button');
    buttonFuncElement = fixture.nativeElement.querySelector('.btn-func');
    fixture.detectChanges();
  });

  it('should create successfully', () => {
    expect(component).toBeTruthy();
  });

  it('click to open a new tag by directive', () => {
    buttonElement.click();
  });

  it('click to open a new tag by function', () => {
    buttonFuncElement.click();
  });
});

describe('download file', () => {
  let fixture: ComponentFixture<any>;
  let component: TestDownloadComponent;
  let button1Element: HTMLElement;
  let button2Element: HTMLElement;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
    declarations: [TestDownloadComponent],
    imports: [CommonModule, DCommonModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});

    fixture = TestBed.createComponent(TestDownloadComponent);
    component = fixture.debugElement.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    button1Element = fixture.nativeElement.querySelector('.btn-1');
    button2Element = fixture.nativeElement.querySelector('.btn-2');
    fixture.detectChanges();
  });

  it('should create successfully', () => {
    expect(component).toBeTruthy();
  });

  it('should download file', () => {
    button1Element.click();

    component.iframename = 'my_iframe';
    fixture.detectChanges();
    button1Element.click();

    component.method = 'POST';
    component.iframename = null;
    fixture.detectChanges();
    button1Element.click();

    component.method = 'GET';
    fixture.detectChanges();
    button1Element.click();
  });

  it('should download file with httpclient', () => {
    button2Element.click();
    const req = httpMock.expectOne('assets/Frameworks.png');
    expect(req.request.method).toEqual('POST');

    component.method = 'POST';
    fixture.detectChanges();
    button2Element.click();

    component.params = { name: 'frameworks', mycode: '3344' };
    fixture.detectChanges();
    button2Element.click();

    component.method = 'get';
    fixture.detectChanges();
    button2Element.click();
  });

  it('download with response option', () => {
    button2Element.click();
    const req = httpMock.expectOne('assets/Frameworks.png');
    expect(req.request.method).toEqual('POST');

    component.responseOption = 'response';
    fixture.detectChanges();
    button2Element.click();
    expect(req.request.method).toEqual('POST');

    component.responseOption = 'json';
    fixture.detectChanges();
    button2Element.click();
    expect(req.request.method).toEqual('POST');

    component.responseOption = 'body';
    fixture.detectChanges();
    button2Element.click();
    expect(req.request.method).toEqual('POST');

    component.method = 'get';
    component.params = { name: 'frameworks', mycode: '3344' };
    component.responseOption = 'json';
    fixture.detectChanges();
    button2Element.click();
    expect(req.request.method).toEqual('POST');
  });
});

describe('clipboard', () => {
  let fixture: ComponentFixture<any>;
  let component: TestClipBoardComponent;
  let button: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, TextInputModule, DCommonModule, FormsModule],
      declarations: [TestClipBoardComponent],
      providers: [OverlayContainerRef, DocumentRef],
    });

    fixture = TestBed.createComponent(TestClipBoardComponent);
    component = fixture.debugElement.componentInstance;
    button = fixture.nativeElement.querySelector('.icon-copy');
    fixture.detectChanges();
  });

  it('should create successfully', () => {
    expect(component).toBeTruthy();
  });

  it('get copy result', () => {
    spyOn(component, 'copyResultEvent');
    button.click();
    expect(component.copyResultEvent).toHaveBeenCalled();
  });

  it('should copy content correctly', () => {
    button.click();
    expect(component.result.content).toEqual('Copied Content');

    component.value = 'Changed content';
    fixture.detectChanges();
    button.click();
    expect(component.result.content).toEqual('Changed content');
  });
});

describe('iframe propagate', () => {
  let fixture: ComponentFixture<any>;
  let component: TestIframeComponent;
  let iframe: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, DCommonModule],
      declarations: [TestIframeComponent],
    });

    fixture = TestBed.createComponent(TestIframeComponent);
    component = fixture.debugElement.componentInstance;
    iframe = fixture.debugElement.query(By.directive(IframeEventPropagateDirective));
    fixture.detectChanges();
  });

  it('should create successfully', () => {
    expect(component).toBeTruthy();
    expect(iframe).toBeTruthy();
  });

  it('should child click trigger parent', () => {
    spyOn(component, 'hostClick');
    iframe.nativeElement.querySelector('iframe').click();
    expect(component.hostClick).toHaveBeenCalled();
  });
});
