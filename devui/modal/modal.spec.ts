import { Component, DebugElement, Input, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, flush, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from '../button/button.module';
import { DomHelper } from '../utils/testing/dom-helper';
import * as EventHelper from '../utils/testing/event-helper';
import { ModalAlertComponent } from './demo/customize/modal-alert.component';
import { ModalTestComponent } from './demo/modal-test.component';
import { DialogService } from './dialog.service';
import { ModalModule } from './modal.module';
import { ModalService } from './modal.service';
import { IDialogOptions, IModalOptions } from './modal.types';

@Component({
  template: `
    <d-button (btnClick)="openDialog()">click me!</d-button>
    <ng-template #testContentTemplate>
      <div class="iAmTemplate">I am Template</div>
    </ng-template>
  `,
})
class TestDialogComponent {
  @ViewChild('testContentTemplate') testContentTemplate: TemplateRef<any>;

  results: any;
  dialogConfig: IDialogOptions = {
    id: undefined,
    title: 'test-dialog-title',
    zIndex: undefined,
    content: 'html-content-test',
    html: undefined,
    buttons: [
      {
        id: undefined,
        cssClass: undefined,
        text: 'test-dialog-btn',
        handler: ($event: Event) => {
          this.results.modalInstance.hide();
        },
        btnwidth: undefined,
        autofocus: undefined,
        disabled: undefined,
      }
    ],
    width: undefined,
    backdropCloseable: undefined,
    maxHeight: undefined,
    showAnimation: undefined,
    data: undefined,
    componentFactoryResolver: undefined,
    injector: undefined,
    onClose: undefined,
    beforeHidden: undefined,
    dialogtype: undefined,
    draggable: undefined,
    showCloseBtn: undefined,
    placement: undefined,
    offsetX: undefined,
    offsetY: undefined,
    bodyScrollable: undefined,
    contentTemplate: undefined,
    escapable: undefined,
  };

  constructor(private dialogService: DialogService) {}

  openDialog() {
    this.results = this.dialogService.open(this.dialogConfig);
  }
}

describe('dialog', () => {
  describe('basic', () => {
    let fixture: ComponentFixture<TestDialogComponent>;
    let debugEl: DebugElement;
    let component: TestDialogComponent;
    let domHelper: DomHelper<TestDialogComponent>;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ModalModule, NoopAnimationsModule, ButtonModule],
        declarations: [TestDialogComponent, ModalTestComponent],
        providers: [
          DialogService
        ],

      }).overrideModule(BrowserDynamicTestingModule, {
        set: {

        }
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TestDialogComponent);
      debugEl = fixture.debugElement;
      component = debugEl.componentInstance;

      domHelper = new DomHelper(fixture);
      fixture.detectChanges();
    });

    it('should @input parameters default value works', fakeAsync(() => {
      debugEl.query(By.css('.devui-btn')).nativeElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      const classList = [
        // modal的class
        '.modal-backdrop', '.modal', '.in', '.modal-dialog', '.modal-content',
        // dialog header的class
        '.modal-header', '.standard-title', '.title-text',
        // dialog body的class
        '.modal-body',
        // dialog footer的class
        '.modal-footer'
      ];
      expect(domHelper.judgeAppendToBodyStyleClasses(classList)).toBeTruthy();

      const titleEle = document.querySelector('.title-text');
      expect(titleEle.textContent).toBe('test-dialog-title');

      const buttonEle = document.querySelector('.modal-footer').querySelector('.devui-btn');
      expect(buttonEle.querySelector('.button-content').textContent).toContain('test-dialog-btn');

      const header = document.querySelector('d-modal-header') as HTMLElement;
      expect(header.style.cursor).toBe('move');

      expect(document.querySelector('.modal-header-close')).toBeTruthy();

      const body = document.querySelector('body') as HTMLElement;
      if (document.documentElement.scrollHeight > document.documentElement.clientHeight) {
        expect(body.classList).toContain('devui-body-scrollblock');
      }

      closeDialog(fixture);
      tick();
      flush();
    }));

    it('should buttons/handler works', fakeAsync(() => {
      debugEl.query(By.css('.devui-btn')).nativeElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      closeDialog(fixture);
      tick();
      expect(document.querySelector('.modal')).toBeFalsy();
      flush();
    }));

    it('should html/content/offset/backdropCloseable(default) works', fakeAsync(() => {
      component.dialogConfig.content = `
        <div class="iAmHtml">
          Modal Content
          <div>name: Bob</div>
          <div>age: 13</div>
          <div>address: Xi'an</div>
        </div>
      `;
      component.dialogConfig.html = true;

      component.dialogConfig.offsetX = '20px';
      component.dialogConfig.offsetY = '20px';

      tick();
      fixture.detectChanges();

      debugEl.query(By.css('.devui-btn')).nativeElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      expect(document.querySelector('.iAmHtml')).toBeTruthy();

      tick();
      fixture.detectChanges();
      const mainEle = document.querySelector('.modal-content') as HTMLElement;
      expect(mainEle.style.transform).toBe('translate(20px, 20px)');

      document.querySelector('.modal').dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      tick();
      expect(document.querySelector('.modal')).toBeFalsy();
      flush();
    }));

    it('should contentTemplate/escapable/backdropCloseable(true) works', fakeAsync(() => {
      component.dialogConfig.contentTemplate = component.testContentTemplate;
      component.dialogConfig.escapable = false;
      component.dialogConfig.backdropCloseable = true;

      debugEl.query(By.css('.devui-btn')).nativeElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      expect(document.querySelector('.iAmTemplate')).toBeTruthy();

      const escEvent: KeyboardEvent = createKeyBoardEvent('keydown', 'Escape', '27');
      window.dispatchEvent(escEvent);
      tick();
      fixture.detectChanges();
      expect(document.querySelector('.modal')).toBeTruthy();

      document.querySelector('.modal').dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      tick();
      expect(document.querySelector('.modal')).toBeFalsy();
      flush();
    }));

    it('should beforeHidden works', fakeAsync(() => {
      component.dialogConfig.beforeHidden = () => {
        return false;
      };
      fixture.detectChanges();
      debugEl.query(By.css('.devui-btn')).nativeElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      closeDialog(fixture);
      expect(document.querySelector('.modal')).toBeTruthy();
      component.results.modalInstance.beforeHidden = component.dialogConfig.beforeHidden = () => {
        return true;
      };
      fixture.detectChanges();
      closeDialog(fixture);
      tick();
      expect(document.querySelector('.modal')).toBeFalsy();
      flush();
    }));

    it('should @input parameters works', fakeAsync(() => {
      component.dialogConfig.id = 'test-dialog-id';
      component.dialogConfig.zIndex = 1051;
      component.dialogConfig.content = ModalTestComponent;
      component.dialogConfig.buttons = [
        {
          id: 'test-dialog-btn-id-1',
          cssClass: 'primary',
          text: 'testDialogBtn1',
          handler: ($event: Event) => {
            component.results.modalInstance.hide();
          },
          btnwidth: '300px',
          autofocus: true,
          disabled: false,
        },
        {
          id: 'test-dialog-btn-id-2',
          cssClass: 'common',
          text: 'testDialogBtn2',
          handler: ($event: Event) => {
            component.results.modalInstance.hide();
          },
          btnwidth: '100px',
          autofocus: false,
          disabled: true,
        }
      ];
      component.dialogConfig.width = '500px';
      component.dialogConfig.backdropCloseable = false;
      component.dialogConfig.maxHeight = '50px';
      component.dialogConfig.data = {
        name: 'Tom',
        age: 10,
        address: 'Chengdu',
      };
      component.dialogConfig.onClose = jasmine.createSpy('onClose');
      component.dialogConfig.dialogtype = 'failed';
      component.dialogConfig.draggable = false;
      component.dialogConfig.showCloseBtn = false;
      component.dialogConfig.placement = 'top';
      component.dialogConfig.bodyScrollable = true;

      fixture.detectChanges();

      debugEl.query(By.css('.devui-btn')).nativeElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      const body = document.querySelector('body') as HTMLElement;
      const modal = document.querySelector('.modal') as HTMLElement;
      const modalWrapper = document.querySelector('.modal-dialog') as HTMLElement;
      const modalContent = document.querySelector('.modal-content') as HTMLElement;
      const modalHeader = document.querySelector('d-modal-header') as HTMLElement;
      const modalBody = document.querySelector('.modal-body') as HTMLElement;
      const button1 = document.querySelector('.modal-footer').querySelectorAll('d-button')[0] as HTMLElement;
      const button2 = document.querySelector('.modal-footer').querySelectorAll('d-button')[1] as HTMLElement;
      const buttonEle1 = button1.querySelector('.devui-btn') as HTMLElement;
      const buttonEle2 = button2.querySelector('.devui-btn') as HTMLElement;

      expect(document.querySelector('#test-dialog-id')).toBeTruthy();
      expect(String(modal.style.zIndex)).toBe('1051');
      expect(document.querySelector('.modal-test-component')).toBeTruthy();
      expect(button1.id).toBe('test-dialog-btn-id-1');
      expect(button2.id).toBe('test-dialog-btn-id-2');
      expect(buttonEle1.classList).toContain('devui-btn-primary');
      expect(buttonEle2.classList).toContain('devui-btn-common');
      expect(buttonEle1.querySelector('.button-content').textContent.trim()).toBe('testDialogBtn1');
      expect(buttonEle2.querySelector('.button-content').textContent.trim()).toBe('testDialogBtn2');
      expect(buttonEle1.style.width).toBe('300px');
      expect(buttonEle2.style.width).toBe('100px');
      expect(modalWrapper.style.width).toBe('500px');
      document.querySelector('.modal').dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      expect(document.querySelector('.modal')).toBeTruthy();
      expect(modalBody.style.maxHeight).toBe('50px');
      expect(modalBody.querySelector('.modal-test-component').children[0].textContent.trim()).toContain('Tom');
      expect(modalBody.querySelector('.modal-test-component').children[1].textContent.trim()).toContain('10');
      expect(modalBody.querySelector('.modal-test-component').children[2].textContent.trim()).toContain('Chengdu');
      expect(modalBody.classList).toContain('flex-content');
      expect(modalHeader.style.cursor).not.toBe('move');
      expect(document.querySelector('.close')).toBeFalsy();
      expect(modalContent.style.transform).toBe('translate(0px, 40px)');
      expect(body.classList).not.toContain('devui-body-scrollblock');

      closeDialog(fixture);
      tick();
      expect(component.dialogConfig.onClose).toHaveBeenCalled();
      flush();
    }));
  });
});

@Component({
  template: `
    <h3 (click)="close($event)" class="closeModal">Modal Component</h3>
    <div (click)="btnClick($event)" class="btnModal">iAmBtn</div>
  `
})
class OpenModalComponent {
  constructor() {}
  @Input() data: any;
  @Input() handler: Function;

  close(e) {
    this.data.onClose(e);
  }

  btnClick(e) {
    if (this.handler) {
      this.handler(e);
    }
  }
}

@Component({
  template: `
    <d-button (btnClick)="openModal()">click me!</d-button>
  `,
})
class TestModalComponent {

  results: any;
  modalConfig: IModalOptions = {
    component: OpenModalComponent,
    handler: undefined,
    data: {
      onClose: (event) => {
        this.results.modalInstance.hide();
      }
    }
  };

  constructor(private modalService: ModalService) {}

  openModal() {
    this.results = this.modalService.open(this.modalConfig);
  }
}

describe('modal', () => {
  describe('basic', () => {
    let fixture: ComponentFixture<TestModalComponent>;
    let debugEl: DebugElement;
    let component: TestModalComponent;
    let domHelper: DomHelper<TestModalComponent>;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ModalModule, NoopAnimationsModule, ButtonModule],
        declarations: [TestModalComponent, OpenModalComponent],
        providers: [ModalService],
      }).overrideModule(BrowserDynamicTestingModule, {
        set: {

        }
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TestModalComponent);
      debugEl = fixture.debugElement;
      component = debugEl.componentInstance;

      domHelper = new DomHelper(fixture);
      fixture.detectChanges();
    });

    it('should modal open', fakeAsync(() => {
      debugEl.query(By.css('.devui-btn')).nativeElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      expect(document.querySelector('.modal')).toBeTruthy();

      closeModal(fixture);
      tick();

      expect(document.querySelector('.modal')).toBeFalsy();
      flush();
    }));

    it('should handler works', fakeAsync(() => {
      component.modalConfig.handler = jasmine.createSpy('handler');
      debugEl.query(By.css('.devui-btn')).nativeElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      document.querySelector('.btnModal').dispatchEvent(new Event('click'));
      fixture.detectChanges();

      expect(component.modalConfig.handler).toHaveBeenCalled();

      closeModal(fixture);
      flush();
    }));
  });

  describe('moveable', () => {
    let fixture: ComponentFixture<TestModalComponent>;
    let debugEl: DebugElement;
    let component: TestModalComponent;
    let domHelper: DomHelper<TestModalComponent>;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ModalModule, NoopAnimationsModule, ButtonModule],
        declarations: [TestModalComponent, ModalAlertComponent],
        providers: [ModalService],
      }).overrideModule(BrowserDynamicTestingModule, {
        set: {

        }
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TestModalComponent);
      debugEl = fixture.debugElement;
      component = debugEl.componentInstance;

      domHelper = new DomHelper(fixture);
      fixture.detectChanges();
    });

    it('should move the modal', fakeAsync(() => {
      component.modalConfig.component = ModalAlertComponent;
      debugEl.query(By.css('.devui-btn')).nativeElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      const header = document.querySelector('.modal-header') as HTMLElement;
      EventHelper.mouseMoveTrigger(header, {x: 943, y: 509}, {x: 10, y: 84});
      fixture.detectChanges();

      const modalContent = document.querySelector('.modal-content') as HTMLElement;
      expect(String(modalContent.offsetLeft)).not.toBe('0');
      expect(String(modalContent.offsetTop)).not.toBe('0');

      const buttonEle = document.querySelector('.modal-footer').querySelector('d-button');
      buttonEle.dispatchEvent(new Event('click'));
      tick();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      flush();
    }));
  });
});

function closeDialog(fixture: ComponentFixture<any>) {
  const buttonEle = document.querySelector('.modal-footer').querySelector('.devui-btn');
  buttonEle.dispatchEvent(new Event('click'));
  fixture.detectChanges();
  tick();
  fixture.detectChanges();
}

function closeModal(fixture: ComponentFixture<any>) {
  const buttonEle = document.querySelector('.closeModal');
  buttonEle.dispatchEvent(new Event('click'));
  fixture.detectChanges();
  tick();
  fixture.detectChanges();
}

function createKeyBoardEvent(type: string, key: string, keyCode?: string): KeyboardEvent {
  const event = new KeyboardEvent(type, {
    key: key,
    code: keyCode,
  });

  Object.defineProperties(event, {
    keyCode: {value: Number(keyCode)}
  });

  return event;
}
