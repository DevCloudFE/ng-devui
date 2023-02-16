import { DOWN_ARROW, ENTER, ESCAPE, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { OverlayModule } from '@angular/cdk/overlay';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TextareaModule } from '../textarea';
import { createKeyBoardEvent } from '../utils/testing/event-helper';
import { MentionDirective } from './mention.directive';
import { MentionModule } from './mention.module';

@Component({
  template: ` <textarea dTextarea placeholder="Please Enter" id="textArea" dMention [mentionSuggestions]="suggestions" 
  [mentionTrigger]="prefixes" [mentionPosition]="mentionPosition"></textarea> `,
})
class TestMentionComponent {
  @ViewChild(MentionDirective, { static: false }) trigger!: MentionDirective;
  suggestions = ['C#', 'C', 'C++', 'CPython', 'Java', 'JavaScript', 'Go'];
  prefixes = ['@', '!'];
  mentionPosition = 'bottom';
}

describe('mention', () => {
  let testComponent: TestMentionComponent;
  let fixture: ComponentFixture<TestMentionComponent>;
  let textarea: HTMLTextAreaElement;
  let mentionDropdownEl: any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MentionModule, TextareaModule, NoopAnimationsModule, OverlayModule],
      declarations: [TestMentionComponent],
    }).compileComponents();
  });

  describe('basic', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TestMentionComponent);
      testComponent = fixture.componentInstance;
      textarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
      fixture.detectChanges();
    });

    it('should create testComponent', () => {
      expect(testComponent).toBeTruthy();
    });

    it('show not open the dropdown when the input value is empty', fakeAsync(() => {
      textarea.dispatchEvent(new Event('input', {}));
      fixture.detectChanges();
      tick(300);
      mentionDropdownEl = document.querySelector('.devui-mention-dropdown');
      expect(mentionDropdownEl).toBeFalsy();
    }));

    it('show open the dropdown when the input value is @', fakeAsync(() => {
      textarea.value = '@';
      textarea.dispatchEvent(new Event('input', {}));
      fixture.detectChanges();
      tick(300);
      fixture.detectChanges();
      mentionDropdownEl = document.querySelector('.devui-mention-dropdown');
      expect(mentionDropdownEl).toBeTruthy();
    }));

    it('show open the dropdown when the input value is !', fakeAsync(() => {
      textarea.value = '!';
      textarea.dispatchEvent(new Event('input', {}));
      fixture.detectChanges();
      tick(300);
      fixture.detectChanges();
      mentionDropdownEl = document.querySelector('.devui-mention-dropdown');
      expect(mentionDropdownEl).toBeTruthy();
    }));

    it('should open the dropdown when has a selected value and click the textarea', fakeAsync(() => {
      textarea.value = '@C#';
      textarea.dispatchEvent(new Event('input', {}));
      fixture.detectChanges();
      textarea.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick(300);
      mentionDropdownEl = document.querySelector('.devui-mention-dropdown');
      expect(mentionDropdownEl).toBeTruthy();
    }));

    it('should close the dropdown when the user clicks away', fakeAsync(() => {
      textarea.value = '@';
      textarea.dispatchEvent(new Event('input', {}));
      fixture.detectChanges();
      tick(300);
      document.body.click();
      fixture.detectChanges();
      tick(300);
      mentionDropdownEl = document.querySelector('.devui-mention-dropdown');
      expect(mentionDropdownEl).toBeFalsy();
    }));

    it('should close the dropdown when an option is selected', fakeAsync(() => {
      textarea.value = '@';
      textarea.dispatchEvent(new Event('input', {}));
      fixture.detectChanges();
      tick(300);
      fixture.detectChanges();
      mentionDropdownEl = document.querySelector('.devui-mention-dropdown');
      const option = mentionDropdownEl.querySelector('li') as HTMLElement;
      option.click();
      fixture.detectChanges();
      tick(300);
      expect(textarea.value).toEqual('@C#');
      mentionDropdownEl = document.querySelector('.devui-mention-dropdown');
      expect(mentionDropdownEl).toBeFalsy();
    }));

    it('should open the dropdown at top when position change to top', fakeAsync(() => {
      testComponent.mentionPosition = 'top';
      fixture.detectChanges();
      textarea.value = '@';
      textarea.dispatchEvent(new Event('input', {}));
      fixture.detectChanges();
      tick(300);
      fixture.detectChanges();
      mentionDropdownEl = document.querySelector('.devui-mention-dropdown.devui-mention-overlay-top');
      expect(mentionDropdownEl).toBeTruthy();
    }));
  });
  describe('keyboard events', () => {
    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(TestMentionComponent);
      testComponent = fixture.componentInstance;
      textarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
      fixture.detectChanges();
    }));

    it('should select option when tap enter key', fakeAsync(() => {
      textarea.value = '@';
      textarea.dispatchEvent(new Event('input', {}));
      fixture.detectChanges();
      tick(300);
      fixture.detectChanges();
      const enterEvent = createKeyBoardEvent('keydown', {
        key: 'Enter',
        keyCode: ENTER
      });
      testComponent.trigger.onKeyDown(enterEvent);
      fixture.detectChanges();
      expect(textarea.value).toEqual('@C#');
    }));

    it('should close dropdown when tap Tab/ESC key', fakeAsync(() => {
      textarea.value = '@';
      textarea.dispatchEvent(new Event('input', {}));
      fixture.detectChanges();
      tick(300);
      fixture.detectChanges();
      const escapeEvent = createKeyBoardEvent('keydown', {
        key: 'escape',
        keyCode: ESCAPE
      });
      testComponent.trigger.onKeyDown(escapeEvent);
      fixture.detectChanges();
      mentionDropdownEl = document.querySelector('.devui-mention-dropdown');
      expect(mentionDropdownEl).toBeFalsy();
    }));

    it('should set the active item to the second option when DOWN key is pressed', fakeAsync(() => {
      textarea.value = '@';
      textarea.dispatchEvent(new Event('input', {}));
      fixture.detectChanges();
      tick(300);
      fixture.detectChanges();
      const arrowEvent = createKeyBoardEvent('keydown', {
        key: 'ArrowDown',
        keyCode: DOWN_ARROW
      });
      testComponent.trigger.onKeyDown(arrowEvent);
      fixture.detectChanges();
      const options = document.querySelector('.devui-mention-dropdown').querySelectorAll('li');
      expect(options[1].classList.contains('focus')).toBe(true);
      flush();
    }));

    it('should set the active item to the last option when UP key is pressed', fakeAsync(() => {
      textarea.value = '@';
      textarea.dispatchEvent(new Event('input', {}));
      fixture.detectChanges();
      tick(300);
      fixture.detectChanges();
      const arrowEvent = createKeyBoardEvent('keydown', {
        key: 'ArrowUp',
        keyCode: UP_ARROW
      });
      testComponent.trigger.onKeyDown(arrowEvent);
      fixture.detectChanges();
      const options = document.querySelector('.devui-mention-dropdown').querySelectorAll('li');
      expect(options[6].classList.contains('focus')).toBe(true);
      flush();
    }));

    it('should set the active item to the first option when DOWN key is pressed in last item', fakeAsync(() => {
      textarea.value = '@';
      textarea.dispatchEvent(new Event('input', {}));
      fixture.detectChanges();
      tick(300);
      fixture.detectChanges();
      const arrowEvent = createKeyBoardEvent('keydown', {
        key: 'ArrowDown',
        keyCode: DOWN_ARROW
      });
      [1, 2, 3, 4, 5, 6, 7].forEach(() => testComponent.trigger.onKeyDown(arrowEvent));
      fixture.detectChanges();
      const options = document.querySelector('.devui-mention-dropdown').querySelectorAll('li');
      expect(options[0].classList.contains('focus')).toBe(true);
      flush();
    }));

    it('should show filtering item when right/left key is pressed ', fakeAsync(() => {
      textarea.value = '@G';
      textarea.dispatchEvent(new Event('input', {}));
      fixture.detectChanges();
      tick(300);
      fixture.detectChanges();
      const arrowEvent = createKeyBoardEvent('keydown', {
        key: 'ArrowRight',
        keyCode: RIGHT_ARROW
      });
      [1, 2].forEach(() => testComponent.trigger.onKeyDown(arrowEvent));
      fixture.detectChanges();
      const options = document.querySelector('.devui-mention-dropdown').querySelectorAll('li');
      expect(options.length).toEqual(1);
      flush();
    }));
  });
});
