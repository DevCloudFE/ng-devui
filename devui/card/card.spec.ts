import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CardComponent } from './card.component';
import { CardModule } from 'ng-devui/card/card.module';
import { AvatarModule } from 'ng-devui/avatar/avatar.module';
import { DomHelper } from '../utils/testing/dom-helper';

@Component({
  template: `
    <d-card>
      <img dCardMeta />
      <d-card-header>
        <d-avatar dCardAvatar></d-avatar>
        <d-card-title>title</d-card-title>
        <d-card-subtitle>subtitle</d-card-subtitle>
      </d-card-header>
      <d-card-content>content</d-card-content>
      <d-card-actions [align]="align">actions</d-card-actions>
      <!-- <d-card-extend></d-card-extend> -->
    </d-card>
  `
})
class TestCardComponent {
  align = 'start';
}

describe('card', () => {
  let fixture: ComponentFixture<TestCardComponent>;
  let debugEl: DebugElement;
  let component: TestCardComponent;
  let domHelper: DomHelper<TestCardComponent>;
  let cardElement: HTMLElement;

  beforeEach(() => {
      TestBed.configureTestingModule({
          imports: [CardModule, AvatarModule],
          declarations: [TestCardComponent]
      });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCardComponent);
    debugEl = fixture.debugElement;
    component = fixture.componentInstance;
    cardElement = debugEl.query(By.directive(CardComponent)).nativeElement;
    domHelper = new DomHelper(fixture);
    fixture.detectChanges();
  });

  describe('basic', () => {
    it('should create correctly', () => {
      expect(component).toBeTruthy();
      expect(cardElement).toBeTruthy();
    });

    it('should have correct classes', () => {
      const classList = [
        '.devui-card',
        '.devui-card-meta',
        '.devui-card-avatar',
        '.devui-card-content',
        '.devui-card-title',
        '.devui-card-subtitle',
        '.devui-card-actions',
        '.devui-card-header',
        // '.devui-card-extend'
      ];
      expect(domHelper.judgeStyleClasses(classList)).toBeTruthy();
    });

    it('should align end', () => {
      component.align = 'end';
      fixture.detectChanges();
      expect(cardElement.querySelector('.devui-card-actions-align-end')).toBeTruthy();
    });

    it('should align spaceBetween', () => {
      component.align = 'spaceBetween';
      fixture.detectChanges();
      expect(cardElement.querySelector('.devui-card-actions-align-space-between')).toBeTruthy();
    });
  });
});
