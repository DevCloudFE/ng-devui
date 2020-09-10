import { PopoverModule } from './../popover/popover.module';
import { FormDirective } from './form.directive';
import { FormModule } from './form.module';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  template: `
    <form dForm [layout]="layout" [labelSize]="labelSize">
      <d-form-item>
        <d-form-label [required]="required" [hasHelp]="hasHelp" [helpTips]="'这是计划名'">计划名</d-form-label>
        <d-form-control>
          <input dTextInput name="userName1" />
        </d-form-control>
      </d-form-item>
      <d-form-item>
        <d-form-label [required]="required" [hasHelp]="hasHelp" [helpTips]="'这是计划名2'">计划名2</d-form-label>
        <d-form-control>
          <input dTextInput name="userName2" />
        </d-form-control>
      </d-form-item>
    </form>
  `
})
class TestFormComponent {
  layout = 'horizontal';
  labelSize = 'sm';
  required = true;
  hasHelp = true;
}

describe('dForm', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormModule],
      declarations: [TestFormComponent]
    }).compileComponents();
  }));

  describe('Form core', () => {
    let testComponent: TestFormComponent;
    let formDebugElement: DebugElement;
    let formInsideNativeElement: HTMLElement;
    let fixture: ComponentFixture<TestFormComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestFormComponent);
      testComponent = fixture.componentInstance;
      formDebugElement = fixture.debugElement.query(By.directive(FormDirective));
      formInsideNativeElement = formDebugElement.nativeElement;
      fixture.detectChanges();
    });

    describe('form default behavior', () => {
      it('Form demo has created successfully', () => {
        expect(testComponent).toBeTruthy();
      });

      it('Form should className correct', () => {
        expect(formInsideNativeElement.classList).toContain('devui-form-horizontal');
        expect(formInsideNativeElement.classList).toContain('devui-form-sm');
      });


      it('Form should layout work', () => {
        testComponent.layout = 'vertical';
        testComponent.labelSize = 'lg';

        fixture.detectChanges();

        expect(formInsideNativeElement.classList).toContain('devui-form-vertical');
        expect(formInsideNativeElement.classList).toContain('devui-form-lg');

        testComponent.layout = 'columns';

        fixture.detectChanges();

        expect(formInsideNativeElement.classList).toContain('devui-form-columns');
      });

    });

    describe('form item default class', () => {
      it('class should correct', () => {
        const formItems = formInsideNativeElement.querySelectorAll('d-form-item');

        formItems.forEach(item => expect(item.classList).toContain('devui-form-item'));
      });
    });

    describe('form control default class', () => {
      it('class should correct', () => {
        const formItems = formInsideNativeElement.querySelectorAll('d-form-control');

        formItems.forEach(item => expect(item.classList).toContain('devui-form-controls'));
      });
    });

    describe('form label', () => {
      it('class should correct', () => {
        const formLabels = formInsideNativeElement.querySelectorAll('d-form-label');

        formLabels.forEach(item => expect(item.classList).toContain('devui-form-label'));
      });

      it('Form label should required work', () => {
        const formLabel = formInsideNativeElement.querySelectorAll('d-form-label')[0];
        const formLabelSpan = formLabel.querySelector('.devui-form-span');

        expect(formLabelSpan.classList).toContain('devui-required');

        testComponent.required = false;
        fixture.detectChanges();

        expect(formLabelSpan.classList).not.toContain('devui-required');
      });

      it('Form label should helpTip work', () => {
        const formLabel = formDebugElement.queryAll(By.css('d-form-label'))[0];
        let formLabelHelpIcon = formLabel.query(By.css('.devui-helping'));

        expect(formLabelHelpIcon).toBeTruthy();

        testComponent.hasHelp = false;
        fixture.detectChanges();

        formLabelHelpIcon = formLabel.query(By.css('.devui-helping'));
        expect(formLabelHelpIcon).toBeNull();
      });

    });
  });

});


