import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AvatarComponent } from './avatar.component';
import { AvatarModule } from './avatar.module';
@Component({
  template: ` <d-avatar #comp [name]="name" [gender]="gender" [width]="width"></d-avatar> `,
})
class TestAvatarComponent {
  @ViewChild('comp') comp: AvatarComponent;
  name = '组件头像';
  gender = 'male';
  width = 40;
}

@Component({
  template: ` <d-avatar #comp [customText]="'自定义'" [width]="80" [height]="80"></d-avatar> `,
})
class TestCustomAvatarComponent {
  @ViewChild('comp') comp: AvatarComponent;
}

describe('avatar basic', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AvatarModule],
      declarations: [TestAvatarComponent, TestCustomAvatarComponent],
    }).compileComponents();
  });

  describe('name display', () => {
    let fixture: ComponentFixture<TestAvatarComponent>;
    let component: TestAvatarComponent;
    let debugEl: DebugElement;
    let nativeEl: HTMLElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestAvatarComponent);
      component = fixture.componentInstance;
      debugEl = fixture.debugElement;
      fixture.detectChanges();
      nativeEl = debugEl.query(By.css('.devui-avatar-style')).nativeElement;
    });

    describe('name text shown correctly', () => {
      it('chinese name pick last two character', () => {
        expect(nativeEl.textContent).toBe(component.name.substr(component.name.length - 2, component.name.length));
      });

      it('should only show one character when width less than 30', () => {
        component.width = 25;
        component.comp.setDisplayName(component.name, component.width);
        fixture.detectChanges();

        expect(nativeEl.textContent).toBe(component.name.substr(component.name.length - 1, 1));
      });

      it('one word name pick first two character', () => {
        component.name = 'MyAvatar';
        fixture.detectChanges();
        expect(component.comp.name).toBe(component.name);
        expect(nativeEl.textContent).toBe(component.name.substr(0, 2).toUpperCase());
      });

      it('display origin name when name length less than 2', () => {
        component.name = 'A';
        fixture.detectChanges();
        expect(nativeEl.textContent).toBe(component.name);
      });

      it('should empty name display none text', () => {
        component.name = '';
        fixture.detectChanges();

        expect(debugEl.query(By.css('svg'))).toBeTruthy();
      });

      it('two words name pick first character of two words', () => {
        component.name = 'Avatar1 Avatar2';
        fixture.detectChanges();
        expect(debugEl.query(By.css('.devui-avatar-style')).nativeElement.textContent).toBe('AA');
      });
    });

    describe('background be ok', () => {
      beforeEach(() => {
        nativeEl = debugEl.query(By.css('.devui-avatar-style')).nativeElement;
      });

      it('should male background ok', () => {
        expect(nativeEl.classList).toContain('devui-avatar-background-1');
      });

      it('should female background ok', () => {
        component.gender = 'female';
        fixture.detectChanges();
        expect(nativeEl.classList).toContain('devui-avatar-background-0');
      });
    });

    it('gender error should throw error', () => {
      expect(() => {
        component.gender = 'unknown';
        fixture.detectChanges();
      }).toThrow(new Error('gender must be "Male" or "Female"'));
    });
  });

  describe('custom avatar', () => {
    let fixture: ComponentFixture<TestCustomAvatarComponent>;
    let avatarNativeEl: HTMLElement;

    it('should custom text display correct', () => {
      fixture = TestBed.createComponent(TestCustomAvatarComponent);
      const component = fixture.componentInstance;
      fixture.detectChanges();
      avatarNativeEl = fixture.debugElement.query(By.css('.devui-avatar-style')).nativeElement;
      expect(avatarNativeEl.textContent).toBe('自定义');
      expect(component.comp.customText).toBe('自定义');
    });
  });
});
