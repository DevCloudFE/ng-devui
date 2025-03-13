import { Component, ElementRef, QueryList, TemplateRef, ViewChildren } from '@angular/core';
import { MentionDirective } from './mention.directive';
import { MentionPositionType } from './mention.types';

@Component({
    selector: 'd-mention',
    templateUrl: './mention.component.html',
    styleUrls: ['./mention.component.scss'],
    standalone: false
})
export class MentionComponent {
  @ViewChildren('items', { read: ElementRef }) items!: QueryList<ElementRef>;
  suggestions = [];
  activeIndex = -1;
  loading = false;
  value = '';
  mentionNotFoundContent = '';
  mentionHeaderTemplate: TemplateRef<any>;
  mentionItemTemplate: TemplateRef<any>;
  trigger: MentionDirective;
  position: MentionPositionType;

  private get focusItemElement(): HTMLElement | null {
    const itemArr = this.items?.toArray();
    if (itemArr && itemArr[this.activeIndex]) {
      return itemArr[this.activeIndex].nativeElement;
    }
    return null;
  }

  selectSuggestion(suggestion) {
    if (this.trigger) {
      this.trigger.selectSuggestion(suggestion);
    }
  }

  scrollToFocusItem(): void {
    if (this.focusItemElement) {
      this.focusItemElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    }
  }
}
