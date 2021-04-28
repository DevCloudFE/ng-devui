import { Component, ElementRef, QueryList, TemplateRef, ViewChildren } from '@angular/core';
import { MentionDirective } from './mention.directive';

@Component({
  selector: 'd-mention',
  templateUrl: './mention.component.html',
  styleUrls: ['./mention.component.scss'],
})
export class MentionComponent {

  @ViewChildren('items', { read: ElementRef })
  items!: QueryList<ElementRef>;

  suggestions = [];

  trigger: MentionDirective;

  value = '';

  activeIndex = -1;

  loading = false;

  mentionItemTemplate: TemplateRef<any>;

  mentionNotFoundContent = '';

  position;

  private get focusItemElement(): HTMLElement | null {
    const itemArr = this.items?.toArray();
    if (itemArr && itemArr[this.activeIndex]) {
      return itemArr[this.activeIndex].nativeElement;
    }
    return null;
  }

  constructor() {}

  selectSuggestion (suggestion) {
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
